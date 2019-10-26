<!--
 * @Description: 报告维修方式
 * @Author: lp
 * @Date: 2019-05-30 09:26:45
 * @LastEditTime: 2019-07-29 15:21:52
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div>
        <div class="report-block">
            <h4>
                <b>维修方式</b>
            </h4>
            <div
                class="selectBtn"
                v-if="selectBtnName.length"
                :class="selectBtnName.length == 1? 'selectBtnOnly':''"
            >
                <div
                    class="btn"
                    :class="activeIndex == index? 'active' : ''"
                    v-for="(item, index) of selectBtnName"
                    :key="index"
                    @click="selectMaintainScheme(index)"
                >{{item}}</div>
            </div>
            <div v-if="maintainScheme.parts.length>0||maintainScheme.consumable.length>0">
                <h5>
                    <span class="main-title">配件耗材</span>
                    <span v-if="brandTitleShow">品牌</span>
                    <span>价格(元)</span>
                </h5>
                <ul class="list-content">
                    <li v-for="(item, key) in maintainScheme.parts" :key="item.part_name+key">
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
                <ul class="list-content">
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
            <div v-if="giftList.length>0">
                <h5>
                    <span class="main-title">赠送项目</span>
                    <span>价格/工时费(元)</span>
                </h5>
                <ul class="list-content">
                    <li v-for="(item, key4) in giftList" :key="key4">
                        <van-row type="flex" justify="space-between">
                            <van-col span="11">{{item.name}}</van-col>
                            <van-col span="8">{{item.brand}}</van-col>
                            <van-col span="4" class="text-right">
                                <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                            </van-col>
                        </van-row>
                    </li>
                </ul>
            </div>
            <div v-if="showStates">
                <reportQualitySingle
                    :qualityDesc="maintainScheme.quality_desc"
                    :qualityList=" maintainScheme.quality_list"
                    v-if="qualityStatus == 'single'"
                />
                <reportQualityMultiple
                    :qualityDesc="maintainScheme.quality_desc"
                    :qualityList=" maintainScheme.quality_list"
                    v-if="qualityStatus == 'multiple'"
                />
                <div class="priceTotal">
                    <span>费用总计</span>
                    <div class="total_text">
                        <span>{{maintainScheme.total_price}} 元</span>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="report-block"
            v-if="maintainScheme.price_ssss && maintainScheme.price_ssss !== '0.00'"
        >
            <div class="priceTotal">
                <span>4S店维修参考价</span>
                <div class="total_text">
                    <span>{{maintainScheme.price_ssss}} 元</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import reportQualityMultiple from "@/components/report/underlineRule/reportQualityMultiple";
import reportQualitySingle from "@/components/report/underlineRule/reportQualitySingle";
export default {
    data() {
        return {
            brandTitleShow: false,
            giftList: [],
            activeIndex: 0
        };
    },
    props: {
        maintainScheme: {
            type: Object,
            default: {}
        },
        selectBtnName: {
            type: Array,
            default() {
                return [];
            }
        },
        // 质保显示方式，默认单行single，若多行传值multiple
        qualityStatus: {
            type: String,
            default: "single"
        },
        // 质保内容是否展示
        showStates: {
            type: Boolean,
            default: true
        }
    },
    components: {
        reportQualityMultiple,
        reportQualitySingle
    },
    created() {
        this.initData();
    },
    mounted() {},
    methods: {
        // 切换维修方案
        selectMaintainScheme(index) {
            this.activeIndex = index;
            this.$emit("selectMaintainScheme", index);
        },
        // 数据处理
        initData() {
            // 赠送处理
            this.giftList = [];
            let parts = this.maintainScheme.parts || [];
            let consumable = this.maintainScheme.consumable || [];
            let labor = this.maintainScheme.labor || [];
            for (let i = 0; i < parts.length; i++) {
                let item = parts[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.part_name,
                        brand: item.part_brand,
                        subtotal: item.subtotal
                    };
                    this.giftList.push(newItem);
                    parts.splice(i, 1);
                    i--;
                }
                // 有品牌数据则显示品牌标题
                if (!this.brandTitleShow) {
                    if (item.part_brand) {
                        this.brandTitleShow = true;
                    }
                }
            }
            for (let i = 0; i < consumable.length; i++) {
                let item = consumable[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.consumable_name,
                        brand: item.consumable_brand,
                        subtotal: item.subtotal
                    };
                    this.giftList.push(newItem);
                    consumable.splice(i, 1);
                    i--;
                }
                // 有品牌数据则显示品牌标题
                if (!this.brandTitleShow) {
                    if (item.consumable_brand) {
                        this.brandTitleShow = true;
                    }
                }
            }
            for (let i = 0; i < labor.length; i++) {
                let item = labor[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.labor_name,
                        subtotal: item.labor_price
                    };
                    this.giftList.push(newItem);
                    labor.splice(i, 1);
                    i--;
                }
            }
        }
    },
    watch: {
        maintainScheme: function(newVal, oldVal) {
            this.initData();
        }
    }
};
</script>
<style lang='less' scoped>
.report-block {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
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
        .zb-icon {
            vertical-align: middle;
            margin-right: 5px;
            height: 24px;
        }
        .quality-list {
            display: flex;
            flex-direction: column;
            .quality-list-title {
                color: #666;
            }
            .quality-list-detail {
                li {
                    padding-top: 10px;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #ccc;
                    .item-title {
                        margin-bottom: 8px;
                        color: #666;
                    }
                    .item-desc {
                        color: #999;
                        line-height: 120%;
                    }
                    &:last-child {
                        padding-bottom: 0;
                        border-bottom: 0;
                    }
                }
            }
            .quality-desc-list {
                li {
                    padding-top: 10px;
                    &:last-child {
                        padding-bottom: 0;
                    }
                }
            }
        }
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
    .selectBtnOnly {
        justify-content: flex-start;
    }
    .list-content {
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
    .priceTotal {
        display: flex;
        font-size: 16px;
        & > span {
            flex: 1;
            padding: 9px 8px;
        }
        .total_text {
            width: 100px;
            padding: 9px 8px;
            text-align: right;
        }
    }
}
</style>