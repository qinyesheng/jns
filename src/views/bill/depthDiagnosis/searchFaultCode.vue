<!--
 * @Description: 深度诊断-故障现象查询
 * @Author: lp
 * @Date: 2019-05-30 18:17:16
 * @LastEditTime: 2019-06-05 16:46:34
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div>
        <headerOne :title="$route.meta.title" :isFixed="true" :backgroundStatus="true"/>
        <div class="depthDiagnosis">
            <div class="price">
                <van-row class="title" type="flex">
                    <van-col span="20">诊断费用</van-col>
                    <van-col
                        span="4"
                        class="right-side price-btn"
                        v-if="isSelfShop && (priceData.origin_price || priceData.discount_info.length)"
                        @click.native="isPriceDetailShow=!isPriceDetailShow"
                    >{{isPriceDetailShow? '收起':'明细'}}</van-col>
                </van-row>
                <ul v-show="isPriceDetailShow && isSelfShop" class="price-container">
                    <li v-if="priceData.origin_price">
                        <van-row
                            class="price-detail"
                            type="flex"
                            justify="space-between"
                            align="center"
                        >
                            <van-col span="20">深度诊断原价</van-col>
                            <van-col span="6" class="right-side">{{priceData.origin_price}}&nbsp;元</van-col>
                        </van-row>
                    </li>
                    <li v-if="priceData.discount_info.length">
                        <van-row
                            class="price-detail"
                            type="flex"
                            justify="space-between"
                            align="center"
                            v-for="(item, index) of priceData.discount_info"
                            :key="index"
                        >
                            <van-col span="20">{{item.discount_name}}</van-col>
                            <van-col span="6" class="right-side">-{{item.discount_price}}&nbsp;元</van-col>
                        </van-row>
                    </li>
                </ul>
                <van-row class="total" type="flex" justify="space-between" align="center">
                    <van-col span="20">合计</van-col>
                    <van-col span="6" class="right-side">{{price}}&nbsp;元</van-col>
                </van-row>
            </div>
            <div class="faultSearch">
                <van-row class="title">故障现象</van-row>
                <van-row class="detail" type="flex" justify="space-between" align="center">
                    <van-col span="20">
                        <input
                            type="text"
                            v-model.trim="searchFaultCode"
                            ref="searchInput"
                            @input="searchFault(searchFaultCode)"
                            placeholder="输入故障码/故障现象"
                        >
                    </van-col>
                    <van-col class="close" v-show="searchFaultCode">
                        <van-icon name="clear" @click="clearSearchValue"/>
                    </van-col>
                </van-row>
                <ul class="searchResultList">
                    <li
                        v-for="(item, index) in searchFaultResult"
                        :key="index"
                        @click="addSelectedFault(item.fault)"
                    >{{item.fault}}</li>
                    <div
                        class="noResult"
                        v-if="canShowResult && searchFaultResult.length == 0 && !isSelfShop"
                    >未匹配到相关结果</div>
                    <div
                        class="noResult"
                        v-if="canShowResult && searchFaultResult.length == 0 && isSelfShop"
                    >
                        未匹配到相关结果，
                        <span
                            class="jns-input"
                            @click="addSelectedFault(searchFaultCode)"
                        >直接使用"{{searchFaultCode}}"</span>
                    </div>
                </ul>
            </div>
            <div class="faultSelected" v-if="selectedFaultList.length>0">
                <van-row class="title">车况描述</van-row>
                <ul class="selectedFaultList">
                    <li v-for="(item, index) in selectedFaultList" :key="index">
                        <van-row type="flex" justify="space-between" align="center">
                            <van-col span="22">{{item}}</van-col>
                            <van-col span="2" class="close">
                                <van-icon name="cross" @click="removeSelectedFault(index)"/>
                            </van-col>
                        </van-row>
                    </li>
                </ul>
            </div>
            <div class="btn" @click="next">
                <div class="next-btn" v-if="selectedFaultList.length>0">下一步</div>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import helperApi from "@/api/helper/depthDiagnosis";
import billApi from "@/api/bill/createNew";
import { debounce } from "@/utils/common";

export default {
    components: {
        headerOne
    },
    data() {
        return {
            carInfo: {},
            searchFaultCode: "", // 当前搜索的故障码或故障现象
            searchFaultResult: [], // 搜索结果
            selectedFaultList: [], // 已选中的故障码或故障现象
            price: "0.00", // 诊断最终费用
            priceData: {
                origin_price: "", // 原价
                //优惠信息
                discount_info: []
            }, // 诊断费用明细
            canNext: true, // 是否允许下一步操作
            isSelfShop: false, // 是否为自营店
            isPriceDetailShow: false, // 是否展示费用明细
            canShowResult: false // 是否能展示故障搜索结果
        };
    },
    methods: {
        // 搜索故障现象
        searchFault(value) {
            if (!value) {
                this.searchFaultResult = [];
                return;
            }
            this.searchFaultCode = value;
            let searchDebounce = debounce(this.searchFaultFromServer, 200);
            searchDebounce(this.searchFaultCode);
        },

        // 清空搜索框
        clearSearchValue() {
            this.searchFaultCode = "";
            this.searchFaultResult = [];
            this.canShowResult = false;
        },
        // 判断字符串长度  输入英数达到满足5个字符或者中文满足两个字符（中英混合当成中文处理）
        strLenCheck(value) {
            let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
            if (reg.test(value)) {
                if (value.length >= 2) {
                    return true;
                }
            } else {
                if (value.length >= 5) {
                    return true;
                }
            }
        },
        /**
         * @Description: 根据输入数据请求数据
         * @Author: linpeng
         * @Date: 2019-04-15 15:00:07
         */
        searchFaultFromServer(value) {
            let isLengthEnough = this.strLenCheck(value);
            if (!isLengthEnough) {
                this.canShowResult = false;
                return;
            }
            let params = {
                keyword: value,
                car_brand: this.carInfo.carBrandName,
                car_line: this.carInfo.carLineName,
                car_cc: this.carInfo.carCc,
                car_cc_unit: this.carInfo.unit
            };
            helperApi.getFaultCode(params).then(res => {
                if (res.code == 20000) {
                    this.searchFaultResult = res.data.list;
                    this.isSelfShop = res.data.is_jns == "1" ? true : false;
                    this.canShowResult = true;
                }
            });
        },
        // 添加到已选故障列表 获取诊断价格 清空搜索框
        addSelectedFault(item) {
            this.$toast.clear(); // 清除旧弹框
            if (!this.selectedFaultList.includes(item)) {
                this.selectedFaultList.push(item);
                this.getPrice();
                this.clearSearchValue();
            } else {
                this.$toast({
                    message: "该故障现象已选择",
                    duration: 1000
                });
            }
        },
        // 在已选故障列表中移除点击项
        removeSelectedFault(index) {
            this.selectedFaultList.splice(index, 1);
            if (this.selectedFaultList.length > 0) {
                this.getPrice();
            } else {
                this.price = "0.00";
                this.priceData.origin_price = "";
                this.priceData.discount_info = [];
                this.isPriceDetailShow = false;
            }
        },

        // 获取诊断价格
        getPrice() {
            let params = {
                vin: this.carInfo.vin,
                car_brand: this.carInfo.carBrandName,
                car_line: this.carInfo.carLineName,
                car_cc: this.carInfo.carCc,
                car_cc_unit: this.carInfo.unit
            };
            for (let i = 0; i < this.selectedFaultList.length; i++) {
                params[`fault_list[${i}]`] = this.selectedFaultList[i];
            }
            helperApi.getSystemQuote(params).then(res => {
                if (res.code == 20000) {
                    this.price = res.data.pay_price;
                    this.priceData = res.data;
                }
            });
        },

        // 跳转下一流程
        next() {
            if (!this.canNext) {
                return;
            }
            this.canNext = false;
            let baseInfo = this.$session.get("carInfo");
            baseInfo.carStyle = baseInfo["nianKuan"];
            delete baseInfo["nianKuan"];
            baseInfo.carBrandLogo = baseInfo["icoName"];
            delete baseInfo["icoName"];
            baseInfo.carCc = baseInfo.carCc + baseInfo.unit;
            baseInfo.tripDistance = baseInfo["carKm"];
            delete baseInfo["carKm"];
            if (baseInfo.carModelId) {
                baseInfo.carType = 0;
            } else {
                baseInfo.carType = 1;
            }
            let faultPhenomenonDescs = this.selectedFaultList.join(",");

            let params = {
                baseInfo,
                faultPhenomenonDescs
            };
            billApi.saveCreateDiagnosesBill(params).then(res => {
                this.canNext = true;
                if (res.code == 20000) {
                    let h5Params = {
                        bill_id: res.data.billStatus.billId,
                        bill_type: "J005"
                    };
                    jnsApi.h5ToApp(
                        res.data.billStatus.nextStatusCode,
                        h5Params
                    );
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    },
    mounted() {
        // 输入框自动聚焦
        this.$nextTick(() => {
            this.$refs["searchInput"].focus();
        });

        // 获取carInfo缓存数据
        this.carInfo = this.$session.get("carInfo");
        if (this.carInfo.icoName) {
            this.iconShow = true;
        }
    }
};
</script>
<style lang='less' scoped>
input {
    background: none;
    outline: none;
    border: 0px;
    width: 100%;
}
.depthDiagnosis {
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    // 车辆信息
    .carInfo {
        margin-top: 10px;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 18px;
        text-overflow: ellipsis;
        overflow: hidden;
        .car-icon {
            vertical-align: middle;
            height: 44px;
        }
        .carName {
            font-weight: bold;
            margin-left: 12px;
            line-height: 120%;
        }
    }
    // 行驶里程
    .mileage {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
            color: #333333;
            font-size: 16px;
            // font-weight: bold;
        }
        .detail {
            padding: 12px;
            background: #f2f2f2;
            border-radius: 4px;
            margin-top: 10px;
            color: #666666;
            .unit {
                padding-left: 8px;
                border-left: 1px solid #cccccc;
            }
        }
    }
    // 检测前提醒
    .tip {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
            color: #333333;
            font-size: 16px;
        }
        .detail {
            padding: 9px 0px;
            color: #969799;
            line-height: 1.1;
            float: left;
            .black {
                color: #000;
            }
        }
    }
    // 诊断费用
    .price {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        .title {
            color: #333333;
            font-size: 16px;
            .right-side {
                text-align: right;
                font-size: 16px;
                color: #969799;
            }
            .price-btn {
                color: #4fb1f7;
            }
        }
        .price-container {
            padding-top: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #d9d9d9;
            .price-detail {
                padding: 6px 0px;
                color: #666666;
                font-size: 16px;
                .right-side {
                    text-align: right;
                }
            }
        }
        .total {
            padding: 12px 0px;
            color: #666666;
            .right-side {
                text-align: right;
            }
        }
    }
    // 故障现象
    .faultSearch {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        .title {
            color: #333333;
            font-size: 16px;
        }
        .detail {
            padding: 12px;
            background: #f2f2f2;
            border-radius: 4px;
            margin-top: 10px;
            color: #666666;
            .close {
                font-size: 20px;
            }
        }
        .searchResultList {
            li {
                padding: 15px;
                line-height: 1.2;
                color: #666666;
                border-bottom: 1px solid #ccc;
            }
            .noResult {
                margin: 10px;
                padding-left: 4px;
                line-height: 120%;
                font-size: 16px;
                color: #c9c2c2;
                .jns-input {
                    color: #4fb1f7;
                }
            }
        }
    }
    // 车况描述
    .faultSelected {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        .title {
            color: #333333;
            font-size: 16px;
            font-weight: bold;
        }
        .selectedFaultList {
            margin-top: 10px;
            li {
                padding: 10px;
                line-height: 1.2;
                color: #666666;
                .close {
                    font-size: 18px;
                    text-align: right;
                    padding-top: 4px;
                }
                // border: 1px solid #ccc;
                border-radius: 4px;
                margin-top: 8px;
            }
        }
    }

    // 下一步按钮
    .btn {
        margin: 8px 0 10px;
        .next-btn {
            box-sizing: border-box;
            width: 100%;
            padding: 15px;
            color: #fff;
            background-color: #5aa5f8;
            text-align: center;
            border-radius: 2px;
            font-size: 16px;
            height: 46px;
            border-radius: 4px;
        }
        .disabled {
            background-color: #d2d2d2;
        }
    }
}
</style>