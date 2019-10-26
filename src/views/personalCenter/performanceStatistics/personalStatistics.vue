<!--
 * @Description: 个人业绩统计
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-28 16:12:02
 * @LastEditTime: 2019-09-18 14:31:46
 -->

<template>
    <div class="page">
        <headerOne title="个人业绩统计" :isFixed="true" :backgroundStatus="status" />
        <selectDatePick
            :dateTimeYear="dateYear"
            :dateTimeMonth="dateMonth"
            :isShowScreenMenu="false"
            @selectMonthHandle="selectMonthHandle"
        />
        <div class="main-container">
            <div class="inverse-bg-grey"></div>
            <!-- <div class="page-title" :style="{color:status?'#f2f2f2':'#333'}">个人业绩统计</div> -->
            <!-- 账户信息 -->
            <div class="page-block userinfo" v-if="data.name">
                <div class="block-title">账号信息</div>
                <div class="row">{{data.name}}</div>
                <div>{{data.role_name}}</div>
            </div>
            <!-- 分成统计 -->
            <div class="page-block">
                <div class="block-title">
                    <van-row type="flex" justify="space-between">
                        <van-col span="10" style="font-weight:bold">分成统计</van-col>
                        <van-col
                            style="color:#46afe7; font-size:16px"
                            @click.native="divideStatistics"
                            v-if="bill_bonus_total && bill_bonus_total!=''"
                        >明细</van-col>
                    </van-row>
                </div>
                <div class="all-accumul">
                    <span class="accumul-title">累计完成</span>
                    <span class="accumul-value">{{bill_bonus_total?'￥'+bill_bonus_total:'暂无'}}</span>
                </div>
                <div class="all-accumul">
                    <span class="accumul-title">本月完成</span>
                    <span class="accumul-value">{{bill_bonus_month?'￥'+bill_bonus_month:'暂无'}}</span>
                </div>
            </div>
            <!-- 已完成工单 -->
            <div class="page-block chart-content">
                <div class="block-title">
                    <van-row type="flex" justify="space-between">
                        <van-col span="10" style="font-weight:bold">{{bill_total?'已完成工单':'工单统计'}}</van-col>
                        <van-col
                            style="color:#46afe7; font-size:16px"
                            @click.native="openBillStatistics"
                            v-if="bill_total && bill_total!=''"
                        >明细</van-col>
                    </van-row>
                </div>
                <div class="accumul-main" :class="{'accumul-active':billData.length>0}">
                    <div class="all-accumul">
                        <span class="accumul-title">累计完成</span>
                        <span class="accumul-value">{{show_bill_total?show_bill_total+'单':'暂无'}}</span>
                    </div>
                    <div class="all-accumul">
                        <span class="accumul-title">本月完成</span>
                        <span
                            class="accumul-value"
                        >{{show_bill_total_month?show_bill_total_month+'单':'暂无'}}</span>
                    </div>
                </div>

                <v-chart v-if="billData.length" :options="chartOptions" />
                <ul class="label">
                    <li class="label-list" v-for="(item, index) of billData" :key="index">
                        <span class="label-icon" :style="{'background':colorList[index]}"></span>
                        <span class="bill-name">{{item.name}}</span>
                        <span class="bill-value">{{item.value+'单'}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
const ECharts = () => import("vue-echarts");
import "echarts/lib/chart/pie"; // 按需引入，本页面只引入饼图
import { DatetimePicker, Swipe, SwipeItem } from "vant";
import billApi from "@/api/personalCenter/billStatistics";
import { dateFormat } from "@/utils/common";
import selectDatePick from "@/components/dateTimePick/selectDatePick";
export default {
    components: {
        headerOne,
        [DatetimePicker.name]: DatetimePicker,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        "v-chart": ECharts,
        selectDatePick
    },
    data() {
        return {
            id: "",
            title: "",
            status: false,
            currentDate: new Date(),
            dateYear: new Date().getFullYear(),
            dateMonth: new Date().getMonth() + 1,
            data: {
                name: "",
                role_name: "",
                bill_total: ""
            },
            billData: [], // 统计源数据
            colorList: [],
            chartOptions: {
                legend: {
                    orient: "vertical",
                    left: "left",
                    bottom: 10,
                    show: false
                },
                tooltip: {
                    trigger: "item"
                },
                series: [
                    {
                        name: "已完成工单",
                        type: "pie",
                        center: ["50%", "50%"],
                        hoverAnimation: false,
                        radius: "50%",
                        data: [],
                        clickable: false,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }
                    }
                ]
            },
            // rankList: [],
            bill_bonus_total: "", //分成累计
            bill_bonus_month: "", //本月分成
            bill_total: "", //完成工单累计
            bill_total_month: "", //本月完成工单
            show_bill_total: "", //显示 完成工单累计
            show_bill_total_month: "", //显示 本月完成工单
            show_bill_bonus_total: "", //显示 分成累计
            show_bill_bonus_month: "" //显示 本月分成
        };
    },
    computed: {
        dateFormat() {
            return dateFormat(this.currentDate, "yyyy-MM"); // 请求服务器的格式如：2019-04
        },
        // 饼图数据
        chartData() {
            let chartData = [];
            this.colorList = [];
            if (this.bill_total_month && this.billData.length) {
                for (let item of this.billData) {
                    let percent = (
                        (item.value / this.bill_total_month) *
                        100
                    ).toFixed(2);
                    let percentStr = parseFloat(percent) + "%";
                    let newItem = {
                        value: item.value,
                        name: item.name + percentStr,
                        itemStyle: {
                            color: item.color
                        }
                    };
                    this.colorList.push(item.color);
                    chartData.push(newItem);
                }
            }
            return chartData;
        }
    },
    mounted() {},
    created() {
        //this.setHeadTitle();
        let sessionParams = this.$session.get("dateSearchKey"); // 从员工工作量页跳转过来
        if (sessionParams) {
            this.currentDate = new Date(sessionParams.date);
            this.id = sessionParams.id;
        }
        let urlParamsId = this.$route.query.id; // 从个人中心首页跳转过来
        if (urlParamsId) {
            this.currentDate = new Date();
            this.id = urlParamsId;
        }
        this.dateYear = this.currentDate.getFullYear();
        this.dateMonth = this.currentDate.getMonth() + 1;
        console.log(this.dateMonth);
        this.selectMonthHandle();
    },
    methods: {
        selectMonthHandle(date) {
            this.getStaff(date);
        },
        /**
         * @Description: 获取个人统计信息
         * @Author: linpeng
         * @Date: 2019-04-29 15:56:28
         */
        getStaff(date) {
            //判断没有获取到用户ID时 重新获取
            if (!this.id) {
                this.getDateSearchKey();
                return;
            }
            this.currentDate = date;

            if (!this.currentDate) {
                this.currentDate = new Date();
            } else {
                this.currentDate = new Date(this.currentDate);
            }
            let params = {
                user_id: this.id,
                date: date
            };
            billApi.getStaff(params).then(res => {
                /* this.$toast.loading({
                    duration: 0
                }); */
                if (res.code == 20000) {
                    this.data = res.data;
                    this.billData = res.data.bill_Statistics; // 已完成工单数据
                    this.bill_bonus_total = +res.data.bill_bonus_total; // 分成累计
                    this.bill_bonus_month = +res.data.bill_bonus_month; // 本月分成
                    this.bill_total = +res.data.bill_total; // 完成工单累计
                    this.bill_total_month = +res.data.bill_total_month; // 本月完成工单
                    // 完成工单累计 判断是否大于等于10000
                    if (this.bill_total && this.bill_total > 9999) {
                        this.show_bill_total = this.dataTransition(
                            this.bill_total
                        );
                    } else {
                        this.show_bill_total = this.bill_total;
                    }
                    // 本月完成工单 判断是否大于等于10000
                    if (this.bill_total_month && this.bill_total_month > 9999) {
                        this.show_bill_total_month = this.dataTransition(
                            this.bill_total_month
                        );
                    } else {
                        this.show_bill_total_month = this.bill_total_month;
                    }
                    // 分成累计 判断是否大于等于10000
                    if (this.bill_bonus_total && this.bill_bonus_total > 9999) {
                        this.show_bill_bonus_total = this.dataTransition(
                            this.bill_bonus_total
                        );
                    } else {
                        this.show_bill_bonus_total = this.bill_bonus_total;
                    }
                    // 本月分成 判断是否大于等于10000
                    if (this.bill_bonus_month && this.bill_bonus_month > 9999) {
                        this.show_bill_bonus_month = this.dataTransition(
                            this.bill_bonus_month
                        );
                    } else {
                        this.show_bill_bonus_month = this.bill_bonus_month;
                    }
                    // this.chartData();
                    // this.rankList = res.data.ranking_list; // 排行数据
                    this.chartOptions.series[0].data = this.chartData; // 计算处理后的饼图数据
                    /* setTimeout(() => {
                        this.$toast.clear();
                    }, 500); */
                } else {
                    this.$toast.fail(res.msg);
                }
            });
            this.chartOptions.series[0].data = this.chartData;
        },
        //超过10000 数据处理
        dataTransition(value) {
            let num = value / 10000;
            num = Math.floor(num * 100) / 100 + "万";
            return num;
        },
        // 头部样式切换
        setHeadTitle() {
            window.onscroll = () => {
                var a =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //滚动条y轴上的距离
                var b =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //可视区域的高度
                var c =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
                if (a + b == c) {
                    // alert('已滚动到底部!')
                }
                if ((a <= b || a > b) && a >= 30) {
                    this.title = "个人业绩统计";
                    this.status = true;
                } else {
                    this.title = "";
                    this.status = false;
                }
            };
        },
        // 跳转已完成工单明细页
        openBillStatistics() {
            let parmas = {
                date: this.currentDate.getTime(),
                id: this.id
            };
            this.$session.set("dateSearchKey", parmas);
            this.$router.push({
                name: "billStatistics"
            });
        },
        //跳转分成统计明细页面
        divideStatistics() {
            let parmas = {
                date: this.currentDate.getTime(),
                id: this.id
            };
            this.$session.set("dateSearchKey", parmas);
            this.$router.push({
                name: "dividedStatisticalDetail"
            });
        }
    }
};
</script>
<style lang='less' scoped>
.echarts {
    width: 100%;
    max-height: 25vh;
}
.page {
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
    .main-container {
        margin-top: 50px;
        .page-title {
            margin-top: 5px;
            margin-bottom: 15px;
            font-size: 22px;
            color: #333;
            font-weight: bold;
        }
        .page-block {
            background: #fff;
            border-radius: 8px;
            padding: 10px;
            margin-bottom: 10px;
            .block-title {
                font-size: 18px;
                color: #333;
                margin-bottom: 15px;
                font-weight: bold;
            }
            .block-content {
                font-size: 16px;
                color: #666;
            }
            .row {
                margin-bottom: 10px;
                &:last-child {
                    margin-bottom: 0px;
                }
            }
            .rank {
                color: #ccc;
            }
            .rank-self {
                color: #333;
            }
            .accumul-main {
                padding-top: 15px;
                padding-bottom: 10px;
            }
            .accumul-active {
                border-bottom: 1px solid #ccc;
            }
            .all-accumul {
                padding: 0px;
                height: 28px;
                line-height: 28px;
                color: #6a6a6a;
                .accumul-title {
                    display: block;
                    float: left;
                }
                .accumul-value {
                    display: block;
                    float: right;
                    color: #ccc;
                }
            }
        }
        .chart-content {
            .block-title {
                margin-bottom: 0;
            }
            .label {
                .label-list {
                    display: block;
                    height: 30px;
                    .label-icon {
                        width: 16px;
                        height: 16px;
                        display: block;
                        float: left;
                        border-radius: 2px;
                        margin-right: 15px;
                        margin-left: 5px;
                    }
                    .bill-name {
                        display: block;
                        float: left;
                    }
                    .bill-value {
                        display: block;
                        float: right;
                        text-align: right;
                        color: #ccc;
                    }
                }
            }
        }
    }
}
</style>