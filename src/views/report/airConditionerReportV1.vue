<!--
 * @Description: 车主查看的空调检测报告v1版
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-08-20 14:36:28
 -->
<template>
    <div class="page">
        <div class="inverse-bg-grey"></div>
        <div class="main-container report-container">
            <div class="solution">
                <div class="head-icon">
                    <img src="@image/report_head.png" />
                </div>
                <div class="carInfo solution-block" v-show="report.base_info">
                    <div class="carInfo-top">
                        <img class="car-icon" v-lazy="carLogoPre" v-if="report.base_info.car_icon" />
                        <span class="carName">{{report.base_info.car_model_full_name}}</span>
                    </div>
                    <ul class="carInfo-bottom">
                        <li>
                            <span class="item-name">车架号（VIN码）</span>
                            <span class="item-data">{{report.base_info.vin}}</span>
                        </li>
                    </ul>
                </div>
                <div class="solution-block" v-if="report.check_result_info.makeResultList.length">
                    <h4>
                        <div class="grid-demo grid-demo-bg1 text-left">
                            <b>检测与诊断结果</b>
                        </div>
                    </h4>
                    <div
                        class="make-result"
                        v-if="report.check_result_info.makeResultList.length > 1"
                    >
                        <van-cell
                            v-for="(value, key) in report.check_result_info.makeResultList"
                            :key="key"
                            :value="key+1+'.'+value"
                        />
                    </div>
                    <div
                        class="make-result"
                        v-if="report.check_result_info.makeResultList.length == 1"
                    >
                        <van-cell
                            v-for="(value, key) in report.check_result_info.makeResultList"
                            :key="key"
                            :value="value"
                        />
                    </div>
                </div>
                <div class="solution-block" v-if="report.maintain_scheme.length > 0">
                    <div class="solution-parts">
                        <h4>
                            <b>维修方式</b>
                        </h4>
                        <div class="selectBtn" v-if="report.maintain_scheme.length > 1">
                            <div
                                class="btn"
                                :class="activeIndex == index? 'active' : ''"
                                v-for="(item, index) of report.maintain_scheme"
                                :key="index"
                                @click="selectMaintainScheme(index)"
                            >{{index == 0? '维修方式一':'维修方式二'}}</div>
                        </div>
                        <div
                            v-if="maintainScheme.parts.length>0||maintainScheme.consumable.length>0"
                        >
                            <h5>
                                <span class="main-title">配件耗材</span>
                                <span v-if="brandTitleShow">品牌</span>
                                <span>价格(元)</span>
                            </h5>
                            <ul class="price-content">
                                <li
                                    v-for="(item, key) in maintainScheme.parts"
                                    :key="item.part_name+key"
                                >
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="11">{{item.part_name}}</van-col>
                                        <van-col span="8">{{item.part_brand}}</van-col>
                                        <van-col span="4" class="text-right">
                                            <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                        </van-col>
                                    </van-row>
                                </li>
                                <li
                                    v-for="(item, key) in maintainScheme.consumable"
                                    :key="item.consumable_name+key"
                                >
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="11">{{item.consumable_name}}</van-col>
                                        <van-col span="8">{{item.consumable_brand}}</van-col>
                                        <van-col span="4" class="text-right">
                                            <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                        </van-col>
                                    </van-row>
                                </li>
                            </ul>
                        </div>
                        <div v-if="maintainScheme.labor.length>0">
                            <h5>
                                <span class="main-title">维修项目</span>
                                <span>工时费(元)</span>
                            </h5>
                            <ul class="price-content">
                                <li v-for="(item, key3) in maintainScheme.labor" :key="key3">
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="16">{{item.labor_name}}</van-col>
                                        <van-col span="8" class="text-right">
                                            <span>{{item.labor_price>0?item.labor_price:'-'}}</span>
                                        </van-col>
                                    </van-row>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="zb" v-if="maintainScheme.quality_desc">
                        <img src="@image/zb.png" alt class="zb-icon" />
                        <span>{{maintainScheme.quality_desc}}</span>
                    </div>
                    <div class="priceTotal">
                        <span>费用总计</span>
                        <div class="total_text">
                            <span>{{maintainScheme.total_price}}元</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import { getCarBrandIconSrc } from "@/utils/common";
export default {
    data() {
        return {
            // carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            carLogoPre: "",
            maintainScheme: "", // 当前维修方案
            activeIndex: 0,
            brandTitleShow: false
        };
    },
    props: ["report"],
    components: {},
    watch: {},
    created: function() {
        this.reportHandle();
        this.carLogoPre = getCarBrandIconSrc(this.report.base_info.car_icon);
    },
    mounted: function() {},
    methods: {
        // 选择方案
        selectMaintainScheme(index) {
            this.activeIndex = index;
            let num = this.report.maintain_scheme.length;
            if (num - 1 >= index) {
                this.maintainScheme = this.report.maintain_scheme[index];
                if (!this.maintainScheme.quality_list) {
                    this.maintainScheme.quality_list = [];
                }
            }
        },
        reportHandle() {
            this.report.check_result_info.makeResultList = [];
            if (this.report.check_result_info.make_result) {
                this.report.check_result_info.makeResultList = this.report.check_result_info.make_result.split(
                    "\n"
                );
            }
            if (this.report.maintain_scheme.length) {
                this.selectMaintainScheme(0); // 默认选择第一种方案
                let quality_time = "";
                if (
                    this.maintainScheme.quality_time &&
                    this.maintainScheme.quality_time != "0"
                ) {
                    quality_time = this.maintainScheme.quality_time;
                }
                let quality_km = "";
                if (
                    this.maintainScheme.quality_km &&
                    this.maintainScheme.quality_km != "0"
                ) {
                    quality_km = this.maintainScheme.quality_km;
                }
                let quality_desc = "";
                if (quality_time || quality_km) {
                    quality_desc = "质保";
                }
                // 年份;
                quality_desc += quality_time
                    ? this.moonTurnYear(quality_time)
                    : "";

                // 年份跟公里数都有
                if (quality_km && quality_time && quality_km != "0") {
                    quality_desc += "或";
                }

                // 质保公里数处理
                quality_km = quality_km ? this.handleQualityKm(quality_km) : "";
                quality_desc += quality_km;
                this.maintainScheme.quality_desc = quality_desc;

                // 配件耗材 品牌标题处理
                let parts = this.maintainScheme.parts || [];
                let consumable = this.maintainScheme.consumable || [];
                for (let i = 0; i < parts.length; i++) {
                    let item = parts[i];
                    // 有品牌数据则显示品牌标题
                    if (!this.brandTitleShow) {
                        if (item.part_brand) {
                            this.brandTitleShow = true;
                        }
                    }
                }
                for (let i = 0; i < consumable.length; i++) {
                    let item = consumable[i];
                    // 有品牌数据则显示品牌标题
                    if (!this.brandTitleShow) {
                        if (item.consumable_brand) {
                            this.brandTitleShow = true;
                        }
                    }
                }
            }
        },
        handleQualityKm(quality_km) {
            if (!quality_km) {
                return "";
            }
            quality_km = parseInt(quality_km);
            if (quality_km > 10000) {
                quality_km = (quality_km / 10000).toFixed(1) + "万";
                // if (quality_km.slice(-1) == 0) {
                //     // quality_km = parseInt(quality_km) + "万";
                // }
            }
            return quality_km.toString() + "公里";
        },
        moonTurnYear(value) {
            if (!value) {
                return "";
            }
            let year = parseInt(value / 12);
            let moon = value % 12;
            let yearStr = "";
            let moonStr = "";
            if (year > 0) {
                yearStr = year + "年";
            }
            if (moon > 0) {
                moonStr = moon + "个月";
            }
            return yearStr + moonStr;
        }
    }
};
</script>
<style lang='less' scoped>
.report-container {
    padding: 0;
}
.main-container {
    width: 100%;
    .van-button {
        border-radius: 10px;
        width: 100%;
        font-size: 16px;
    }
    .booking-btn {
        background-color: #46aef7;
        border: 1px solid #46aef7; /*no*/
        color: #fff;
    }
    .head-icon {
        padding: 0px 10px;
        img {
            width: 100%;
        }
    }
    .carInfo {
        display: flex;
        flex-direction: column;
        .carInfo-top {
            display: -webkit-box;
            padding-bottom: 10px;
            border-bottom: 1px solid #efefef;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            .car-icon {
                vertical-align: middle;
                height: 32px;
                margin-top: 2px;
                margin-bottom: 4px;
            }
            .carName {
                font-weight: bold;
                margin-left: 5px;
                margin-top: 5px;
                color: #6e6e6e;
            }
        }
        .carInfo-bottom {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            li {
                display: flex;
                padding: 8px 0px;
                justify-content: space-between;
                .item-name {
                    color: #666;
                }
                .item-data {
                    color: #bdbdbd;
                }
            }
        }
    }
    .make-result {
        letter-spacing: 0.1em;
        line-height: 1.2;
    }
}

.inverse-bg-grey {
    display: -webkit-box;
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
}
.solution-block {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-top: 15px;
    h4 {
        padding: 10px 0 0 0px;
        margin-bottom: 10px;
        b {
            font-weight: bold;
            font-size: 20px;
        }
    }
    h5 {
        padding: 10px 0 0 8px;
        margin-bottom: 10px;
        font-size: 16px;
        color: #666;
        display: flex;
        justify-content: space-between;
        .main-title {
            font-size: 17px;
            font-weight: bold;
            color: #595959;
        }
    }
    .zb {
        padding-left: 10px;
        font-size: 16px;
        color: #898989;
        line-height: 30px;
        height: 30px;
    }
    .zb-icon {
        vertical-align: middle;
        margin-right: 5px;
        height: 24px;
    }
    .selectBtn {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        margin-bottom: 5px;
        .btn {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #389cd8;
            color: #389cd8;
            border-radius: 8px;
            width: 40%;
            text-align: center;
            margin-right: 6px;
            &:last-child {
                margin-right: 0;
            }
        }
        .active {
            color: #fff;
            background: #389cd8;
        }
    }
}
.solution-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    overflow: hidden;
}
.priceTotal {
    display: flex;
    font-size: 16px;
}
.priceTotal > span {
    flex: 1;
    padding: 9px 8px;
}
.priceTotal .total_text {
    width: 100px;
    padding: 9px 8px;
    text-align: right;
}
.price-content {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    li {
        padding: 9px 8px;
        color: #666;
        min-height: 20px;
        line-height: 20px;
        .text-right {
            text-align: right;
        }
    }
}
</style>