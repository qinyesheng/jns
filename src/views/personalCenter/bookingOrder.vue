<!--
 * @Description: 预订单统计
 * @Author: xwq
 * @Date: 2019-02-18 09:25:19
 -->
<template>
    <div class="page">
        <headerOne :isFixed="true" :backgroundStatus="false" />
        <div class="background"></div>
        <div class="main-container">
            <h1>{{ pageTitle }}</h1>
            <div class="money-sum">
                <h3>金额</h3>
                <ul class="money-sum-list">
                    <li v-for="(item, key) in amount_title" :key="key">
                        <h4>{{ item }}</h4>
                        <span>
                            {{ order_amount[key] }}
                            <!-- <i>元</i> -->
                        </span>
                    </li>
                </ul>
                <div class="date-list">
                    <div class="date-select">
                        <p>
                            <span v-show="amountDate">{{ amount.startTime.substr(2) }}</span>
                            <i v-show="amountDate">-&nbsp;</i>
                            <span>{{ amount.endTime }}</span>
                        </p>
                        <span class="amend" @click="showPup">选择日期</span>
                    </div>
                    <p class="total">
                        <span>{{ range_amount }}</span>
                        <!-- <i>元</i> -->
                    </p>
                </div>
            </div>
            <div class="money-sum singular">
                <h3>单数</h3>
                <ul class="money-sum-list singularList">
                    <li v-for="(item, key) in num_title" :key="key">
                        <h4>{{ item }}</h4>
                        <span>
                            {{ order_num[key] }}
                            <!-- <i>单</i> -->
                        </span>
                    </li>
                </ul>
                <div class="date-list">
                    <div class="date-select">
                        <p>
                            <span v-show="numDate">{{ num.startTime.substr(2) }}</span>
                            <i v-show="numDate">-&nbsp;</i>
                            <span>{{ num.endTime }}</span>
                        </p>
                        <span class="amend" @click="showPup1">选择日期</span>
                    </div>
                    <p class="total">
                        <span>{{ range_num }}</span>
                        <!-- <i>单</i> -->
                    </p>
                </div>
            </div>
            <!-- <transition name="van-slide-up"> -->
            <van-popup v-model="amount_show" position="bottom">
                <div class="calendar" v-if="amount_startShow">
                    <van-datetime-picker
                        v-model="amount.startCurrentDate"
                        type="date"
                        :item-height="itemHeight"
                        :visible-item-count="3"
                        :formatter="formatter"
                        :min-date="amount.start_minDate"
                        :max-date="amount.start_maxDate"
                        confirm-button-text=" "
                        cancel-button-text="开始时间"
                        @cancel="cancel"
                        @confirm="confirm"
                        @change="startTimeChange()"
                    />
                    <div class="next-btn">
                        <van-button
                            type="primary"
                            size="large"
                            text="下一步"
                            @click="next"
                            class="next"
                        ></van-button>
                    </div>
                </div>
                <div class="calendar" v-if="amount_endShow">
                    <van-datetime-picker
                        v-model="amount.endCurrentDate"
                        type="date"
                        :item-height="itemHeight"
                        :visible-item-count="3"
                        :formatter="formatter"
                        :min-date="amount.end_minDate"
                        :max-date="amount.end_maxDate"
                        confirm-button-text=" "
                        cancel-button-text="结束时间"
                        @cancel="cancel"
                        @confirm="confirm"
                        @change="endTimeChange()"
                    />
                    <div class="next-btn">
                        <van-button
                            type="primary"
                            size="large"
                            text="确定"
                            @click="ensure"
                            class="next"
                        ></van-button>
                    </div>
                </div>
            </van-popup>
            <van-popup v-model="num_show" position="bottom">
                <div class="calendar" v-if="num_startShow">
                    <van-datetime-picker
                        v-model="num.startCurrentDate"
                        type="date"
                        :item-height="itemHeight"
                        :visible-item-count="3"
                        :formatter="formatter"
                        :min-date="num.start_minDate"
                        :max-date="num.start_maxDate"
                        confirm-button-text=" "
                        cancel-button-text="开始时间"
                        @cancel="cancel"
                        @confirm="confirm"
                        @change="startTimeChange()"
                    />
                    <div class="next-btn">
                        <van-button
                            type="primary"
                            size="large"
                            text="下一步"
                            @click="next"
                            class="next"
                        ></van-button>
                    </div>
                </div>
                <div class="calendar" v-if="num_endShow">
                    <van-datetime-picker
                        v-model="num.endCurrentDate"
                        type="date"
                        :item-height="itemHeight"
                        :visible-item-count="3"
                        :formatter="formatter"
                        :min-date="num.end_minDate"
                        :max-date="num.end_maxDate"
                        confirm-button-text=" "
                        cancel-button-text="结束时间"
                        @cancel="cancel"
                        @confirm="confirm"
                        @change="endTimeChange()"
                    />
                    <div class="next-btn">
                        <van-button
                            type="primary"
                            size="large"
                            text="确定"
                            @click="ensure"
                            class="next"
                        ></van-button>
                    </div>
                </div>
            </van-popup>
            <!-- </transition> -->
            <p class="bottom-text">数据统计展示可能存在延迟</p>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import personalCenterApi from "@/api/personalCenter/advanceOrderStatistics";
import jnsApi from "@/utils/jnsApi";
import { DatetimePicker } from "vant";
export default {
    components: {
        headerOne,
        [DatetimePicker.name]: DatetimePicker
    },
    data() {
        return {
            pageTitle: "预订单统计",
            amount_title: {
                month_amount: "本月",
                week_amount: "本周",
                today_amount: "今日"
            },
            order_amount: {
                today_amount: "", //单位：元，过万元自行换算到万元单位
                week_amount: "",
                month_amount: ""
            },
            range_amount: "", //金额合计
            num_title: {
                month_num: "本月",
                week_num: "本周",
                today_num: "今日"
            },
            order_num: {
                today_num: "", //单位：单
                week_num: "",
                month_num: ""
            },
            range_num: "", //单数合计
            amount_show: false, //弹层组件
            num_show: false,
            amountDate: true, //日期相同时合并日期
            numDate: true,
            name: "", //修改对应板块的日期
            amount_startShow: false,
            amount_endShow: false,
            num_startShow: false,
            num_endShow: false,
            endTimeisShow: false,
            amount_startTimeSave: "",
            num_startTimeSave: "",
            amount: {
                startTime: "",
                endTime: "",
                startCurrentDate: "",
                endCurrentDate: new Date(),
                FormatStartTime: "",
                FormatEndTime: "",
                start_minDate: "",
                start_maxDate: new Date(),
                end_minDate: "",
                end_maxDate: new Date()
            },
            num: {
                startTime: "", //页面显示的日期开始时间
                endTime: "", //页面显示的日期结束时间
                startCurrentDate: "", //起始日期的当前时间
                endCurrentDate: new Date(), //结束日期的当前时间
                FormatStartTime: "", //滚动日期组件得到的开始时间
                FormatEndTime: "", //滚动日期组件得到的结束时间
                start_minDate: "", //日期组件开始的最小日期
                start_maxDate: new Date(), //日期组件开始的最大日期
                end_minDate: "", //日期组件结束的最小日期
                end_maxDate: new Date() //日期组件结束的最大日期
            },
            itemHeight: 56
        };
    },

    mounted() {
        var self = this;
        var minDate = self.getDateTime(new Date()).y;
        self.amount.startCurrentDate = new Date(minDate, 0, 1);
        self.num.startCurrentDate = new Date(minDate, 0, 1);
        self.amount.start_minDate = new Date(minDate - 5, 0, 1);
        self.num.start_minDate = new Date(minDate - 5, 0, 1);
        self.amount.startTime = self.getDateTime(
            self.amount.startCurrentDate
        ).dateTime;
        self.num.startTime = self.getDateTime(
            self.num.startCurrentDate
        ).dateTime;
        self.getAdvanceOrderIndex();
    },
    methods: {
        formatter(type, value) {
            if (type === "year") {
                return `${value}年`;
            } else if (type === "month") {
                return `${value}月`;
            } else if (type === "day") {
                return `${value}日`;
            }
            return value;
        },
        cancel() {
            return false;
        },
        confirm() {
            return false;
        },
        /**
         * @Description: 获取预订单首页数据渲染页面
         * @Param: token [tring]  登入标识
         * @Author: xwq
         * @Date: 2019-02-19 10:06:56
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        getAdvanceOrderIndex() {
            var self = this;
            personalCenterApi.getAdvanceOrderIndex().then(res => {
                if (res.code === 20000) {
                    var amount = res.data.order_amount;
                    var num = res.data.order_num;
                    var range_amount_W = amount.range_amount / 10000;
                    self.range_amount =
                        range_amount_W >= 1
                            ? range_amount_W.toFixed(2) + "万元"
                            : amount.range_amount + "元";
                    self.range_num = num.range_num + "单";
                    for (var key in amount) {
                        self.order_amount[key] =
                            amount[key] / 10000 >= 1
                                ? (amount[key] / 10000).toFixed(2) + "万元"
                                : amount[key] + "元";
                    }
                    for (var key in num) {
                        self.order_num[key] = num[key] + "单";
                    }
                } else if (res.code == 40000) {
                    this.$toast(res.msg);
                }
            });
            if (self.amount.endTime == "") {
                self.amount.endTime = "今日";
            }
            if (self.num.endTime == "") {
                self.num.endTime = "今日";
            }
        },

        /**
         * @Description: 获取某日期范围的预订单统计金额
         * @Param: token [tring]  登入标识
         * @Param: begin_date [string] 查询开始日期
         * @Param: end_date [string] 查询结束日期
         * @Author: xwq
         * @Date: 2019-02-19 13:33:21
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        getAdvanceOrderAmount(begin_date, end_date) {
            // console.log("传入的参数===", begin_date, end_date);
            var self = this;
            var date = new Date();
            begin_date = begin_date || self.dateFormate(self.amount.startTime);
            end_date =
                end_date ||
                (self.amount.endTime == "" ||
                self.amount.endTime.indexOf("今") >= 0
                    ? self.getDateTime(date).date_N
                    : self.amount.endTime);
            begin_date = self.dateFormattion(begin_date);
            end_date = self.dateFormattion(end_date);
            var params = {
                begin_date: begin_date,
                end_date: end_date
            };
            var beginDate_Temp = Date.parse(begin_date);
            var endDate_temp = Date.parse(end_date);
            var currentTime = self.getDateTime(new Date());
            currentTime =
                currentTime.y + "-" + currentTime.m + "-" + currentTime.d;
            currentTime = Date.parse(currentTime);
            if (
                beginDate_Temp == endDate_temp &&
                beginDate_Temp == currentTime
            ) {
                self.amountDate = false;
                self.amount.endTime = "今日";
            } else if (
                beginDate_Temp == endDate_temp &&
                beginDate_Temp != currentTime
            ) {
                self.amountDate = false;
                self.amount.endTime = self.amount.endTime.substr(2);
            } else {
                self.amountDate = true;
                self.amount.endTime =
                    self.amount.endTime.indexOf("今") >= 0
                        ? self.amount.endTime
                        : self.amount.endTime.substr(2);
            }
            if (beginDate_Temp > endDate_temp) {
                this.$toast("结束时间不能小于开始时间");
                self.amount_endShow = true;
                self.amount_show = true;
                return false;
            }
            self.amount_show = false;
            personalCenterApi.getAdvanceOrderAmount(params).then(res => {
                if (res.code == 20000) {
                    var range_amount = res.data.range_amount;
                    var amount_W = range_amount / 10000;
                    self.range_amount =
                        amount_W >= 1
                            ? amount_W.toFixed(2) + "万元"
                            : range_amount === null
                            ? 0 + "元"
                            : range_amount + "元";
                } else if (res.code == 40000) {
                    this.$toast(res.msg);
                }
            });
        },

        /**
         * @Description: 获取某日期范围的预订单统计工单数
         * @Param: token [tring]  登入标识
         * @Param: begin_date [string] 查询开始日期
         * @Param: end_date [string] 查询结束日期
         * @Author: xwq
         * @Date: 2019-02-19 13:33:21
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        getAdvanceOrderNum(begin_date, end_date) {
            // console.log("传入的参数===", begin_date, end_date);
            var self = this;
            var date = new Date();
            begin_date = begin_date || self.dateFormate(self.num.startTime);
            end_date =
                end_date ||
                (self.num.endTime == "" || self.num.endTime.indexOf("今") >= 0
                    ? self.getDateTime(date).date_N
                    : self.num.endTime);
            begin_date = self.dateFormattion(begin_date);
            end_date = self.dateFormattion(end_date);
            var params = {
                begin_date: begin_date,
                end_date: end_date
            };
            var beginDate_Temp = Date.parse(begin_date);
            var endDate_temp = Date.parse(end_date);
            var currentTime = self.getDateTime(new Date());
            currentTime =
                currentTime.y + "-" + currentTime.m + "-" + currentTime.d;
            currentTime = Date.parse(currentTime);
            if (
                beginDate_Temp == endDate_temp &&
                beginDate_Temp == currentTime
            ) {
                self.numDate = false;
                self.num.endTime = "今日";
            } else if (
                beginDate_Temp == endDate_temp &&
                beginDate_Temp != currentTime
            ) {
                self.numDate = false;
                self.num.endTime = self.num.endTime.substr(2);
            } else {
                self.numDate = true;
                self.num.endTime =
                    self.num.endTime.indexOf("今") >= 0
                        ? self.num.endTime
                        : self.num.endTime.substr(2);
            }
            if (beginDate_Temp > endDate_temp) {
                this.$toast("结束时间不能小于开始时间");
                self.num_endShow = true;
                self.num_show = true;
                return false;
            }
            self.num_show = false;
            personalCenterApi.getAdvanceOrderNum(params).then(res => {
                if (res.code == 20000) {
                    var range_num = res.data.range_num;
                    var num_W = range_num / 10000;
                    self.range_num =
                        num_W >= 1
                            ? num_W + "单"
                            : range_num === null
                            ? 0 + "单"
                            : range_num + "单";
                } else if (res.code == 40000) {
                    this.$toast(res.msg);
                }
            });
        },
        // 选择开始日期时触发
        startTimeChange() {
            var self = this;
            if (self.name === "amount") {
                var date_res = self.getDateTime(self.amount.startCurrentDate);
                self.amount.FormatStartTime = date_res.dateTime;
                self.amount_startTimeSave = date_res;
            } else if (self.name === "num") {
                var date_res = self.getDateTime(self.num.startCurrentDate);
                self.num.FormatStartTime = date_res.dateTime;
                self.num_startTimeSave = date_res;
            }
        },
        // 选择结束日期时触发
        endTimeChange() {
            var self = this;
            if (self.name === "amount") {
                var date_res = self.getDateTime(self.amount.endCurrentDate);
                self.amount.FormatEndTime = date_res.dateTime;
            } else if (self.name === "num") {
                var date_res = self.getDateTime(self.num.endCurrentDate);
                self.num.FormatEndTime = date_res.dateTime;
            }
        },
        //选择日期下一步按钮
        next() {
            var self = this;
            self.amount_startShow = false;
            self.amount_endShow = true;
            self.num_startShow = false;
            self.num_endShow = true;
            if (self.name == "amount") {
                if (self.amount.FormatStartTime == "") {
                    var date = self.dateFormate(self.amount.startTime);
                    var y = date.substr(0, 4),
                        m = String(date.substr(4, 2) - 1),
                        d = date.substr(6, 2);
                    self.amount.end_minDate = new Date(y, m, d);
                } else {
                    var date = self.dateFormate(self.amount.FormatStartTime);
                    var y = date.substr(0, 4),
                        m = String(date.substr(4, 2) - 1),
                        d = date.substr(6, 2);
                    self.amount.end_minDate = new Date(y, m, d);
                    self.amount.startTime = self.amount.FormatStartTime;
                }
                self.amountDate = true;
            } else if (self.name == "num") {
                if (self.num.FormatStartTime == "") {
                    var date = self.dateFormate(self.num.startTime);
                    var y = date.substr(0, 4),
                        m = String(date.substr(4, 2) - 1),
                        d = date.substr(6, 2);
                    self.num.end_minDate = new Date(y, m, d);
                } else {
                    var date = self.dateFormate(self.num.FormatStartTime);
                    var y = date.substr(0, 4),
                        m = String(date.substr(4, 2) - 1),
                        d = date.substr(6, 2);
                    self.num.end_minDate = new Date(y, m, d);
                    self.num.startTime = self.num.FormatStartTime;
                }
                self.numDate = true;
            }
        },
        //选择日期确定按钮
        ensure() {
            var self = this;
            self.endTimeisShow = false;
            self.amount_show = false;
            self.num_show = false;
            if (self.name === "amount") {
                var date = new Date();
                self.amount.endTime = self.amount.FormatEndTime
                    ? self.amount.FormatEndTime
                    : self.amount.endTime;
                var begin_date = self.dateFormate(self.amount.startTime),
                    end_date =
                        self.amount.endTime.indexOf("今") >= 0
                            ? self.getDateTime(date).date_N
                            : self.dateFormate(self.amount.endTime);
                if (begin_date == self.getDateTime(date).date_N) {
                    end_date = begin_date;
                }
                if (end_date == self.getDateTime(date).date_N) {
                    self.amount.endTime = "今日";
                }
                self.getAdvanceOrderAmount(begin_date, end_date);
            } else if (self.name === "num") {
                var date = new Date();
                self.num.endTime = self.num.FormatEndTime
                    ? self.num.FormatEndTime
                    : self.num.endTime;
                var begin_date = self.dateFormate(self.num.startTime),
                    end_date =
                        self.num.endTime.indexOf("今") >= 0
                            ? self.getDateTime(date).date_N
                            : self.dateFormate(self.num.endTime);
                if (begin_date == self.getDateTime(date).date_N) {
                    end_date = begin_date;
                }
                if (end_date == self.getDateTime(date).date_N) {
                    self.num.endTime = "今日";
                }
                self.getAdvanceOrderNum(begin_date, end_date);
            }
        },
        /**
         * @Description: 日期时间获取
         * @Param:
         * @Author: xwq
         * @Date: 2019-02-18 14:45:04
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        getDateTime(date) {
            var self = this;
            var currentDate = date;
            var y = currentDate.getFullYear(),
                m = currentDate.getMonth() + 1,
                d = currentDate.getDate(),
                day = currentDate.getDay();
            m = m > 9 ? m : "0" + m;
            d = d > 9 ? d : "0" + d;
            m = m;
            d = d;
            var dateTime = y + "年" + m + "月" + d + "日";
            var date_N = y + m + d;
            return {
                y,
                m,
                d,
                day,
                dateTime,
                date_N
            };
        },
        //日期去除年月日
        dateFormate(date) {
            if (date) {
                var res = date
                    .replace("年", "")
                    .replace("月", "")
                    .replace("日", "");
                return res;
            }
        },
        //年-月-日格式化
        dateFormattion(date) {
            if (date) {
                var res =
                    date.substr(0, 4) +
                    "-" +
                    date.substr(4, 2) +
                    "-" +
                    date.substr(6, 2);
                return res;
            }
        },
        //金额模块修改日期
        showPup() {
            var self = this;
            self.amount_show = true;
            self.amount_startShow = true;
            self.amount_endShow = false;
            self.name = "amount";
        },
        //工单数模块修改日期
        showPup1() {
            var self = this;
            self.num_show = true;
            self.num_startShow = true;
            self.num_endShow = false;
            self.name = "num";
        }
    }
};
</script>
<style lang='less'>
.page {
    .van-popup--bottom {
        width: 351px !important;
        border-radius: 12px;
        box-sizing: border-box;
        bottom: 6px !important;
        color: #ccc;
        // height:270px;
    }

    .van-picker__cancel {
        color: #000 !important;
    }

    .van-picker-column {
        font-size: 16px !important;
        color: #999 !important;
        height: 150px !important;
    }

    .van-picker-column__item--selected {
        font-size: 24px !important;
        color: #333 !important;
    }
}
</style>

<style lang='less' scoped>
.page {
    .background {
        background: rgb(242, 242, 242);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: -1;
    }
    .main-container {
        padding-top: 0;
        h1 {
            padding: 20px 0;
            font-weight: bold;
            font-size: 28px;
            color: #333;
        }

        .money-sum {
            margin-bottom: 12px;
            background-color: #fff;
            padding: 0px 12px 12px 12px;

            h3 {
                padding: 12px 12px 12px 0px;
                font-size: 20px;
                color: #333;
            }

            .money-sum-list {
                font-size: 16px;
                color: #333;
                border-bottom: 1px solid #ccc;
                padding-bottom: 15px;
                display: flex;

                li {
                    box-sizing: border-box;
                    border-right: 1px solid #ccc;
                    padding-left: 15px;
                    flex: 1;

                    h4 {
                        font-size: 16px;
                        color: #666;
                        padding: 5px 0 11px 0;
                    }

                    span > i {
                        font-style: normal;
                    }
                }

                li:first-child {
                    padding-left: 0;
                }

                li:last-child {
                    border-right: 0 none;
                }
            }

            .date-list {
                padding: 10px 0;
                font-size: 14px;

                .date-select {
                    display: flex;
                    padding: 10px 0;

                    > p {
                        flex: 1;
                    }

                    .amend {
                        font-size: 16px;
                        color: #46aef7;
                        text-align: right;
                    }
                }

                .total {
                    > i {
                        font-style: normal;
                    }
                }
            }
        }

        .calendar {
            width: 351px;
            background-color: #fff;
            border-radius: 12px;
            box-sizing: border-box;
            margin: 0 auto;
            height: 270px;

            .next-btn {
                background-color: #fff;
                width: 351px;
                position: fixed;
                bottom: 12px;
                right: 0;
                left: 0;

                .next {
                    width: 327px;
                    border: 0 none;
                    font-size: 20px;
                    color: #fff;
                    background-color: rgb(93, 174, 241);
                    border-radius: 10px;
                    bpx-sizing: border-box;
                    height: 44px;
                    margin-left: 12px;
                }
            }
        }

        .bottom-text {
            font-size: 16px;
            color: #ccc;
            text-align: center;
            padding: 5px 12px;
            position: fixed;
            right: 0;
            bottom: 0;
            left: 0;
        }
    }
}
</style>