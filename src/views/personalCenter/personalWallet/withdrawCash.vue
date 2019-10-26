<!--
 * @Description: 提现记录
 * @Author: qys
 * @Date: 2019-04-29
 -->
<template>
    <div class="page">
        <headerOne :title="title" :isFixed="true"></headerOne>
        <background/>
        <div class="main-container">
            <div class="main-time">
                <span class="main-time-left">筛选时间:&nbsp;&nbsp;</span>
                <span class="main-time-left main-time-center" @click="startClick">{{startDate?startDate:'开始日期'}}</span>
                <span class="main-time-left">&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                <span class="main-time-left main-time-center" @click="endClick">{{endDate?endDate:'结束日期'}}</span>
                <span class="main-time-right" @click="queryClick">查询</span>
            </div>
            <ul class="list">
                <li v-for="(item, index) in getWithdrawDepositRecordList" :key="index">
                    <div class="item-top">
                        <span class="item-top-left">提现金额&nbsp;</span>
                        <span v-if="item.status==1" class="item-top-left">成功</span>
                        <span v-if="item.status==2" class="item-top-left item-top-fail">失败</span>
                        <span v-if="item.status==0" class="item-top-left item-top-apply">申请中</span>
                        <span class="item-top-right">{{item.addTime}}</span>
                    </div>
                    <div class="item-price">￥&nbsp;{{item.operatePrice}}</div>
                    <div v-if="item.desc!=''" class="item-remark">
                        <div class="item-remark-title">备注</div>
                        <div class="item-remark-mian">{{item.desc}}</div>
                    </div>
                </li>
            </ul>
            <div v-if="tipShow" class="tips">暂无提现记录</div>
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
            title: this.$route.meta.title,
            startDate: "", //开始时间参数
            endDate: "", //开始时间参数
            getWithdrawDepositRecordList: [],
            tipShow: false,
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
        this.getWithdrawDepositRecord();
    },
    mounted() {},
    methods: {
        /**
         * @Description: 获取初始化开始时间和结束时间
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:31:23
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
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return: {Object} 返回值描述
         * @Date: 2019-05-10 11:31:43
         */
        getWithdrawDepositRecord() {
            this.$toast.loading({
                duration: 0
            });
            let params = {
                startDate: this.startDate,
                endDate: this.endDate,
                page: 1,
                pagesize: 1000
            };
            extendWarrantyApi.getWithdrawDepositRecord(params).then(res => {
                if (res.code == 20000) {
                    this.tipShow = false;
                    this.getWithdrawDepositRecordList = res.data.list;
                } else if (res.code == 20400) {
                    this.getWithdrawDepositRecordList = [];
                    this.tipShow = true;
                }
                setTimeout(() => {
                    this.$toast.clear();
                }, 500);
            });
        },

        /**
         * @Description: 点击查询
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:32:13
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
            this.getWithdrawDepositRecord();
        },
        //显示开始时间选择器
        startClick() {
            this.startShow = true;
            this.timeSohw = true;
            this.endShow = false;
        },
        //显示结束时间选择器
        endClick() {
            this.endShow = true;
            this.timeSohw = true;
            this.startShow = false;
        },
        //开始取消
        startCancel() {
            this.startShow = false;
            this.timeSohw = false;
        },
        //确定开始时间
        startConfirm(val) {
            let n_year = val.getFullYear();
            let n_month = val.getMonth();
            let n_day = val.getDate();
            this.startDate = dateFormat(val, "yyyy-MM-dd");
            // this.endDate = dateFormat(val, "yyyy-MM-dd");
            // this.endCurrentDate = new Date(n_year, n_month, n_day);
            this.startShow = false;
            this.timeSohw = false;
        },
        //触发显示
        startChange(e) {
            // console.log(e.getValues()); // 打印出了选中的时间，是个数组
        },
        //结束取消
        endCancel() {
            this.endShow = false;
            this.timeSohw = false;
        },
        //确定结束时间
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
                .item-top {
                    margin-bottom: 10px;
                    height: 16px;
                    line-height: 16px;
                    .item-top-left {
                        float: left;
                        color: #bcbcbc;
                    }
                    .item-top-right {
                        float: right;
                    }
                    .item-top-fail {
                        color: #ff4d4d;
                    }
                    .item-top-apply {
                        color: #25af73;
                    }
                }
                .item-price {
                    font-weight: bold;
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .item-remark {
                    .item-remark-title {
                        color: #bcbcbc;
                        margin-bottom: 10px;
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