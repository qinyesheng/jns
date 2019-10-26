<!--
 * @Description: 公众号-订单
 * @Author: xwq
 * @Date: 2019-07-05 22:04:22
 * @LastEditTime: 2019-10-12 16:47:27
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container" v-if="finishedStatus">
            <van-tabs v-model="active" @change="changeTabs">
                <van-tab title="订单">
                    <van-pull-refresh
                        v-model="bookingData.refresh"
                        @refresh="onRefreshForBookingData"
                    >
                        <van-list
                            v-model="bookingData.loading"
                            :finished="bookingData.finished"
                            finished-text="没有更多了"
                            @load="getBookingList"
                        >
                            <div v-show="bookingData.list.length">
                                <div
                                    class="booking-data-block"
                                    v-for="(item,key) in bookingData.list"
                                    :key="key"
                                    @click="bookingLocation(item.bill_id)"
                                >
                                    <van-row class="booking-data-block-top">
                                        <van-row class="booking-data-block-title">
                                            <van-col span="24">
                                                <h4>小虎检车预约</h4>
                                            </van-col>
                                        </van-row>
                                        <van-row>
                                            <van-col span="5">预约状态:</van-col>
                                            <van-col
                                                span="18"
                                            >{{bookingData.statusList[item.status]}}</van-col>
                                        </van-row>
                                        <van-row>
                                            <van-col span="5">预约站点:</van-col>
                                            <van-col span="18">{{item.shop_name}}</van-col>
                                        </van-row>
                                        <van-row>
                                            <van-col span="5">站点地址:</van-col>
                                            <van-col span="18">{{item.address}}</van-col>
                                        </van-row>
                                    </van-row>
                                    <van-row class="booking-data-block-detail">
                                        <van-cell title value="点击查看订单详情" is-link>
                                            <template slot="title">
                                                <span class="custom-text">&nbsp;</span>
                                            </template>
                                        </van-cell>
                                    </van-row>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
                <van-tab title="报告">
                    <van-pull-refresh v-model="reportData.refresh" @refresh="onRefreshForReport">
                        <van-list
                            v-model="reportData.loading"
                            :finished="reportData.finished"
                            :finished-text="!reportData.list.length&&this.reportData.finished?'':'没有更多了'"
                            @load="getReportList"
                        >
                            <div v-if="!reportData.list.length&&this.reportData.finished">
                                <div class="experience-block">
                                    <van-row class="experience-block-no-data">暂无数据,下拉即可刷新</van-row>
                                    <div class="no-report" @click="experienceUrl">
                                        <span>点击查看JNS体验报告</span>
                                    </div>
                                </div>
                            </div>
                            <div v-show="reportData.list.length">
                                <div
                                    class="booking-data-block"
                                    v-for="(item,key) in reportData.list"
                                    :key="key"
                                    @click="reportLocation(item.ownerSmsUrl)"
                                >
                                    <van-row class="booking-data-block-top">
                                        <van-row class="booking-data-block-title">
                                            <van-col span="24">
                                                <h4>{{item.title}}</h4>
                                            </van-col>
                                        </van-row>
                                        <van-row>
                                            <van-col span="5">预约站点:</van-col>
                                            <van-col span="18">{{item.shopName}}</van-col>
                                        </van-row>
                                        <van-row>
                                            <van-col span="5">站点地址:</van-col>
                                            <van-col span="18">{{item.address}}</van-col>
                                        </van-row>
                                    </van-row>
                                    <van-row class="booking-data-block-detail">
                                        <van-cell title value="点击查看报告详情" is-link>
                                            <template slot="title">
                                                <span class="custom-text">&nbsp;</span>
                                            </template>
                                        </van-cell>
                                    </van-row>
                                </div>
                            </div>
                        </van-list>
                    </van-pull-refresh>
                </van-tab>
            </van-tabs>
        </div>
        <!-- <xhMenu v-model="showMenuStatus"></xhMenu> -->
    </div>
</template>
<script>
import background from "@/components/background/background";
import xhjcOwnerApi from "@/api/xhjcOwner/xhjcOwner";
import { copyObject } from "@/utils/common";
import { Tab, Tabs, Panel, PullRefresh, List, Tag } from "vant";
export default {
    components: {
        background,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Panel.name]: Panel,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        [Tag.name]: Tag
    },
    name: "order",
    data() {
        return {
            finishedStatus: false,
            active: 1,
            showMenuStatus: false,
            reportData: {
                loading: false,
                finished: false,
                list: [],
                page: 1,
                pagesize: 10,
                total: 0,
                refresh: false
            }, // 报告数据
            bookingData: {
                loading: false,
                finished: false,
                list: [],
                page: 1,
                pagesize: 10,
                total: 0,
                statusList: {
                    0: "预约成功",
                    1: "待处理",
                    2: "已取消",
                    3: "已完成",
                    4: "处理中"
                },
                refresh: false
            }, // 预约数据
            noReport: false,
            created: false
        };
    },

    beforeRouteLeave(to, from, next) {
        next();
    },
    created() {
        // console.log("created");
        /*   let queryOrderActive = this.$route.query["orderActive"];
        if (queryOrderActive) {
            this.$session.set("orderActive", queryOrderActive);
        } */
        this.orderHandle();
    },
    mounted() {},
    activated() {
        // console.log("activated");
        let _this = this;
        this.orderHandle(function() {
            _this.refreshForBooking();
        });
    },
    methods: {
        appointment() {},
        closeMenu() {
            this.$emit("closeEvent", false);
        },
        showMenu() {
            this.showMenuStatus = true;
        },
        getReportList() {
            xhjcOwnerApi
                .getReportList({
                    page: this.reportData.page,
                    pagesize: this.reportData.pagesize
                })
                .then(res => {
                    this.reportData.loading = false;
                    if (res.code == 20000) {
                        let list = res.data.list;
                        let total = res.total;
                        if (this.reportData.refresh === true) {
                            this.reportData.total = 0;
                            this.reportData.list = [];
                            this.reportData.finished = false;
                            this.reportData.refresh = false;
                        }
                        this.reportData.total += list.length;
                        if (list.length > 0) {
                            this.reportData.list = [
                                ...this.reportData.list,
                                ...list
                            ];
                            this.reportData.page++;
                        }
                        if (
                            total == 0 ||
                            list.length === 0 ||
                            total < this.reportData.pagesize ||
                            total == this.reportData.total
                        ) {
                            this.reportData.finished = true;
                        }
                        // console.log(this.reportData.finished);
                    } else {
                        this.$toast.fail(res.msg);
                        this.reportData.finished = true;
                    }
                });
        },
        getBookingList() {
            xhjcOwnerApi
                .getBookingList({
                    page: this.bookingData.page,
                    pagesize: this.bookingData.pagesize
                })
                .then(res => {
                    if (res.code == 20000) {
                        this.bookingData.loading = false;
                        let list = res.data.list;
                        let total = res.total;
                        if (this.bookingData.refresh === true) {
                            this.bookingData.total = 0;
                            this.bookingData.list = [];
                            this.bookingData.finished = false;
                            this.bookingData.refresh = false;
                        }
                        this.bookingData.total += list.length;
                        if (list.length > 0) {
                            // console.log(list);
                            this.bookingData.list = [
                                ...this.bookingData.list,
                                ...list
                            ];
                            // console.log(this.bookingData.list);
                            this.bookingData.page++;
                        }
                        if (
                            total == 0 ||
                            list.length === 0 ||
                            total < this.bookingData.pagesize ||
                            total == this.bookingData.total
                        ) {
                            this.bookingData.finished = true;
                        }
                    } else {
                        this.$toast.fail(res.msg);
                        this.bookingData.finished = true;
                    }
                });
        },
        loadingBookingList(data) {},
        changeTabs(index) {
            // console.log(index);
        },
        onRefreshForReport() {
            setTimeout(() => {
                this.refreshForReport();
            }, 1000);
        },
        onRefreshForBookingData() {
            setTimeout(() => {
                this.refreshForBooking();
            }, 1000);
        },
        refreshForBooking() {
            this.bookingData.refresh = true;
            this.bookingData.page = 1;
            this.getBookingList();
        },
        refreshForReport() {
            this.reportData.refresh = true;
            this.reportData.page = 1;
            this.getReportList();
        },
        reportLocation(url) {
            location.href = url;
        },
        bookingLocation(billId) {
            this.$router.push({
                name: "orderDetail",
                params: {
                    billId: billId
                }
            });
        },
        orderHandle(callBack) {
            let orderActive = this.$session.get("orderActive");
            if (orderActive) {
                this.active = 0;
                this.bookingData.list = [];
                this.bookingData.page = 1;
                this.bookingData.total = 0;
                if (callBack) {
                    callBack();
                }
                this.$session.remove("orderActive");
            }
            this.finishedStatus = true;
        },
        /**
         * @Description: 体验报告跳转
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-28 14:18:17
         */
        experienceUrl() {
            location.href = process.env.VUE_APP_J002_REPORT;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
    }
    .nav-memu {
        width: 75%;
        height: 100%;
    }
    .booking-data-block {
        margin: 10px;
        padding: 10px;
        background: #fff;
        border-radius: 4px;
        .van-col {
            line-height: 2;
        }
        .booking-data-block-top {
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .booking-data-block-title {
            font-weight: bold;
        }
        .booking-data-block-detail {
            border-top: 1px solid #ccc;
            .van-cell__value--alone {
                text-align: right;
            }
        }
    }
    .van-pull-refresh {
        /deep/ .van-pull-refresh__track {
            min-height: calc(100vh - 95px);
        }
    }
    .experience-block {
        padding-top: 40px;
        .experience-block-no-data {
            padding: 20px;
            color: #969799;
            text-align: center;
            font-size: 13px;
        }
        .no-report {
            padding: 15px;
            border: 1px solid #ccc;
            background-color: #ccc;
            text-align: center;
            width: 60%;
            margin: auto;
            color: #fff;
            border-radius: 4px;
            span {
                color: #fff;
            }
        }
    }
}
</style>
