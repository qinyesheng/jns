<!--
 * @Description: 个人收益明细
 * @Author: qys
 * @Date: 2019-04-29
 -->
<template>
    <div class="page">
        <headerOne :title="$route.meta.title" :isFixed="true"></headerOne>
        <background/>
        <div class="main-container">
            <div class="main-time">
                <span class="main-time-left">筛选时间:&nbsp;&nbsp;</span>
                <span class="main-time-left main-time-center" @click="startClick">{{startDate?startDate:'开始日期'}}</span>
                <span class="main-time-left">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                <span class="main-time-left main-time-center" @click="endClick">{{endDate?endDate:'结束日期'}}</span>
                <span class="main-time-right" @click="queryClick">查询</span>
            </div>
            <van-tabs v-model="typeVal" @click="activeClick" color="#46aef7">
                <van-tab title="待返现金额"></van-tab>
                <van-tab title="已返现金额"></van-tab>
            </van-tabs>
            <ul class="list">
                <li v-for="(item, index) in getIncomeRecordList" :key="index">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-top">{{item.name}}</div>
                    <div class="item-center">
                        <span class="item-center-left">返现时间</span>
                        <span class="item-center-right">返现金额</span>
                    </div>
                    <div class="item-clear"></div>
                    <div class="item-bottom">
                        <span class="item-bottom-left">{{item.time}}</span>
                        <span class="item-bottom-right">{{item.price}}</span>
                    </div>
                </li>
            </ul>
            <div v-if="tipShow" class="tips">暂无返现明细</div>
        </div>
        <!-- 时间组件 -->
        <van-popup class="time-box" v-model="timeSohw" position="bottom">
            <div v-if="startShow">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="startConfirm"
                    @change="startChange"
                    @cancel="startCancel"
                />
            </div>
            <div v-if="endShow">
                <van-datetime-picker
                    v-model="endCurrentDate"
                    type="date"
                    :min-date="endMinDate"
                    :max-date="maxDate"
                    @confirm="endConfirm"
                    @change="endChange"
                    @cancel="endCancel"
                />
            </div>
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import extendWarrantyApi from "@/api/extendWarranty/mineGain";
import { dateFormat } from "@/utils/common";
import { DatetimePicker } from "vant";
export default {
    components: {
        headerOne,
        [DatetimePicker.name]: DatetimePicker,
        background
    },
    data() {
        return {
            startDate: "", //开始时间参数
            endDate: "", //开始时间参数
            getIncomeRecordList: [],
            tipShow: false,
            typeVal: 0, //0为待返现金额列表， 1为已返现金额列表,默认0
            renderingList: [], //渲染前的数据
            currentDate: new Date(), //开始时间,
            endCurrentDate: new Date(), //结束时间,
            minDate: new Date(2015, 0, 1), //时间组件,
            maxDate: new Date(
                new Date().getTime() + 365 * 2 * 24 * 3600 * 1000
            ), //时间组件最大日期,当前年份加两年
            endMinDate: new Date(2015, 0, 1), //时间组件,
            timeSohw: false,
            startShow: false, //开始控制
            endShow: false //开始控制
        };
    },
    created() {
        this.initTime();
        this.getIncomeRecord();
    },
    methods: {
        /**
         * @Description: 获取初始化开始时间和结束时间
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:24:55
         */
        initTime() {
            let n_time = new Date();
            let n_year = n_time.getFullYear();
            let n_month = n_time.getMonth();
            this.currentDate = new Date(n_year, n_month, 1);
            this.startDate = "";
            this.endDate = "";
        },
        /**
         * @Description: 获取个人收益明细列表
         * @Param: params  查询日期信息
         * @Param: startDate  开始时间
         * @Param: endDate   结束时间
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:25:44
         */
        getIncomeRecord() {
            this.$toast.loading({
                message: "加载中...",
                duration: 0
            });
            let params = {
                startDate: this.startDate,
                endDate: this.endDate
            };
            extendWarrantyApi.getIncomeRecord(params).then(res => {
                if (res.code == 20000) {
                    this.tipShow = false;
                    this.renderingList = res.data.list;
                    this.renderingDatat();
                } else if (res.code == 20400) {
                    this.getIncomeRecordList = [];
                    this.tipShow = true;
                }
                setTimeout(() => {
                    this.$toast.clear();
                }, 500);
            });
        },
        /**
         * @Description: 渲染前数据处理，再渲染
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return: [Arr] 返回值描述
         * @Date: 2019-05-10 11:27:29
         */
        renderingDatat() {
            var Arr = [];
            var type = this.typeVal;
            this.renderingList.forEach(function(item, index, array) {
                var itemObj = {
                    title: item.packageBTitle,
                    name: item.showName
                };
                //0为待返现金额列表
                if (type == 0) {
                    if (item.cashBackStatus == 0 || item.cashBackStatus == 1) {
                        itemObj.price = "￥" + item.warrantyMoney;
                        itemObj.time = item.wmPredictTime;
                        Arr.push(itemObj);
                    }
                } else {
                    if (item.cashBackStatus == 1) {
                        itemObj.price = "￥" + item.cashbackTotal;
                        itemObj.time = item.tradingTime;
                        Arr.push(itemObj);
                    } else if (item.cashBackStatus == 2) {
                        itemObj.time = item.tradingTime;
                        itemObj.price =
                            "￥" +
                            (
                                (item.cashbackTotal * 100 +
                                    item.warrantyMoney * 100) /
                                100
                            ).toFixed(2);
                        Arr.push(itemObj);
                    }
                }
            });
            this.getIncomeRecordList = Arr;
            if (Arr.length > 0) {
                this.tipShow = false;
            } else {
                this.tipShow = true;
            }
        },

        /**
         * @Description: 点击查询
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        queryClick() {
            if(!this.startDate || !this.endDate){
                this.$toast("请选择开始日期和结束日期");
                setTimeout(() => {
                    this.$toast.clear();
                }, 500);
                return false;
            }
            let startTimeDates = Date.parse(this.currentDate);
            let endTimeDates = Date.parse(this.endCurrentDate);
            if (startTimeDates > endTimeDates) {
                this.$toast("开始日期不能大于结束日期");
                return false;
            } else if (endTimeDates - startTimeDates > 86400 * 31 * 3 * 1000) {
                this.$toast("时间间隔不能超过三个月");
                return false;
            }
            this.getIncomeRecord();
        },
        /**
         * @Description: 切换tab
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        activeClick() {
            this.renderingDatat();
        },

        /**
         * @Description: 显示开始时间选择器
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        startClick() {
            this.startShow = true;
            this.timeSohw = true;
            this.endShow = false;
        },

        /**
         * @Description: 显示结束时间选择器
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        endClick() {
            this.endShow = true;
            this.timeSohw = true;
            this.startShow = false;
        },

        /**
         * @Description: 开始取消
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        startCancel() {
            this.startShow = false;
            this.timeSohw = false;
        },

        /**
         * @Description: 确定开始时间
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        startConfirm(val) {
            let n_year = val.getFullYear();
            let n_month = val.getMonth();
            let n_day = val.getDate();
            this.startDate = dateFormat(val, "yyyy-MM-dd");
            //this.endDate = dateFormat(val, "yyyy-MM-dd");
            //this.endCurrentDate = new Date(n_year, n_month, n_day);
            this.startShow = false;
            this.timeSohw = false;
        },

        /**
         * @Description: 触发显示
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        startChange(e) {
            // console.log(e.getValues()); // 打印出了选中的时间，是个数组
        },

        /**
         * @Description: 结束取消
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        endCancel() {
            this.endShow = false;
            this.timeSohw = false;
        },

        /**
         * @Description: 确定结束时间
         * @Param:
         * @Author: qys
         * @return:
         * @Date: 2019-05-10 11:28:11
         */
        endConfirm(val) {
            this.endDate = dateFormat(val, "yyyy-MM-dd");
            this.endShow = false;
            this.timeSohw = false;
        },
        //触发显示
        endChange(e) {
            // console.log(e.getValues()); // 打印出了选中的时间，是个数组
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0px 0px 10px 0px;
        position: relative;
        .main-time {
            background: #fff;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            padding: 0px 10px;
            height: 40px;
            .main-time-center {
                color: #aaa;
            }
            .main-time-left {
                float: left;
                line-height: 40px;
            }
            .main-time-right {
                float: right;
                width: 60px;
                height: 32px;
                line-height: 32px;
                background: #46aef7;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                margin-top: 4px;
            }
        }
        .list {
            margin: 10px;
            display: flex;
            flex-direction: column;
            padding-top: 8px;
            li {
                background: #fff;
                padding: 15px;
                margin-bottom: 8px;
                .item-title {
                    font-weight: bold;
                    color: #474747;
                    padding-bottom: 10px;
                }
                .item-top {
                    color: #aaa;
                    padding-bottom: 10px;
                }
                .item-center {
                    color: #aaa;
                    .item-center-left {
                        float: left;
                    }
                    .item-center-right {
                        float: right;
                    }
                }
                .item-clear {
                    clear: both;
                    height: 10px;
                }
                .item-bottom {
                    clear: both;
                    font-size: 16px;
                    .item-bottom-left {
                        float: left;
                    }
                    .item-bottom-right {
                        float: right;
                    }
                }
            }
        }
        .tips {
            text-align: center;
            font-size: 14px;
            color: #999;
            padding-bottom: 15px;
        }
    }
    .time-box {
        width: 100%;
    }
}
</style>