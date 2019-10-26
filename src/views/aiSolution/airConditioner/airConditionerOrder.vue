<!--
 * @Description: 空调工单列表
 * @Author: qys
 * @LastEditors: Please set LastEditors
 * @Date: 2019-07-11
 * @LastEditTime: 2019-09-18 14:47:22
 -->
<template>
    <section>
        <headerOne
            :title="title"
            :isFixed="true"
            :onClickLeftStatus="onClickLeftStatus"
            @onClickLeft="back"
        ></headerOne>
        <div class="inverse-bg-grey"></div>
        <div class="main-container air-conditioner-order">
            <van-tabs color="#4ab1f8" class="tab van-tabs-container" @click="setCurrentTab">
                <van-tab title="未完成">
                    <ul class="orderList">
                        <li
                            v-for="(item, index) in unOrderList"
                            :key="index"
                            @click="openUnfinishedReport(item)"
                        >
                            <div class="item-left">
                                <img v-lazy="carLogoPre + item.car_icon + '.jpg'" />
                            </div>
                            <div class="item-right">
                                <div class="data-item orderName">{{item.order_title}}</div>
                                <div class="data-item step">{{stepNames[item.step_type] || ''}}</div>
                                <div class="data-item user">{{item.create_user_name}}</div>
                                <div class="data-item time">{{item.add_time}}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="loadmore">{{unOrderLoadText}}</div>
                </van-tab>
                <van-tab title="已完成">
                    <ul class="orderList">
                        <li
                            v-for="(item, index) in orderList"
                            :key="index"
                            @click="openFinishedReport(item.id)"
                        >
                            <div class="item-left">
                                <img v-lazy="carLogoPre + item.car_icon + '.jpg'" />
                            </div>
                            <div class="item-right">
                                <div class="data-item orderName">{{item.order_title}}</div>
                                <div class="data-item step">{{stepNames[item.step_type || '']}}</div>
                                <div class="data-item user">{{item.create_user_name}}</div>
                                <div class="data-item time">{{item.end_time}}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="loadmore">{{orderLoadText}}</div>
                </van-tab>
            </van-tabs>
        </div>
    </section>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { getToken, getAppStatus } from "@/utils/auth";
import jnsApi from "@/utils/jnsApi";
import aiMaintainSolutionApi from "@/api/aiMaintainSolution/airConditioner";
import back from "@/utils/back";
export default {
    components: {
        headerOne
    },
    data() {
        return {
            title: "空调工单",
            orderList: [],
            unOrderList: [],
            orderPage: 1, // 已完成订单列表当前页码
            unOrderPage: 1, // 未完成订单列表当前页码
            pagesize: 10, // 单页显示条数
            orderLoadText: "加载更多",
            unOrderLoadText: "加载更多",
            orderCanLoad: true,
            unOrderCanLoad: true,
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            currentTab: "未完成",
            stepNames: {
                "1": "问询",
                "2": "初检",
                "3": "推送"
            },
            turnURL:
                process.env.VUE_APP_WEB_DOCDEV_URL +
                "/billimenu.html?token=" +
                getToken() +
                "&status=" +
                getAppStatus() +
                "&menuId=3",
            onClickLeftStatus: true
        };
    },

    created() {},
    mounted() {
        this.headWatch();
        this.getUnOrderList();
        this.appToH5();
        this.stepHandle();
    },
    methods: {
        appToH5() {
            var _this = this;
            window.appToH5 = function(obj) {
                var obj = JSON.parse(decodeURIComponent(obj));
                var jnsAppStep = obj.jnsAppStep;
                window.jnsAppStatus = obj.jnsAppStatus;
                console.log("jnsAppStepName:" + jnsAppStep);
                console.log("jnsAppStatus:" + jnsAppStatus);
                // console.log(obj);
                switch (jnsAppStep) {
                    case "airCondition":
                        scrollTo(0, 0);
                        _this.unOrderPage = 1;
                        _this.unOrderList = [];
                        _this.unOrderCanLoad = true;
                        _this.getUnOrderList();
                        break;
                    default:
                        console.log("Unknown jnsAppStep");
                        break;
                }
            };
        },
        // 设置当前tab栏
        setCurrentTab(index, title) {
            this.currentTab = title;
            if (title == "已完成" && this.orderList.length == 0) {
                this.getOrderList();
            }
        },
        // 根据滚动条判断是否拉取新数据
        headWatch() {
            window.onscroll = () => {
                let a =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop; //滚动条y轴上的距离
                let b =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight; //可视区域的高度
                let c =
                    document.documentElement.scrollHeight ||
                    document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
                if (a + b == c) {
                    // alert('已滚动到底部!')
                    if (this.currentTab == "已完成") {
                        this.orderPage++;
                        this.getOrderList();
                    } else if (this.currentTab == "未完成") {
                        this.unOrderPage++;
                        this.getUnOrderList();
                    }
                }
            };
        },
        /**
         * 获取已完成空调工单
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getOrderList() {
            if (!this.orderCanLoad) {
                return false;
            }
            this.orderLoadText = "加载中...";
            let params = {
                status: "1",
                page: this.orderPage,
                pagesize: this.pagesize
            };
            aiMaintainSolutionApi.getAirConditionerList(params).then(res => {
                if (res.code == 20000) {
                    this.orderList = this.orderList.concat(res.data.list);
                    if (res.data.list.length < this.pagesize) {
                        this.orderLoadText = "没有更多了";
                        this.orderCanLoad = false;
                    } else {
                        this.orderLoadText = "加载更多";
                    }
                }
            });
        },
        /**
         * 获取未完成空调工单
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getUnOrderList() {
            if (!this.unOrderCanLoad) {
                return false;
            }
            this.unOrderLoadText = "加载中...";
            let params = {
                status: "0",
                page: this.unOrderPage,
                pagesize: this.pagesize
            };
            aiMaintainSolutionApi.getAirConditionerList(params).then(res => {
                if (res.code == 20000) {
                    this.unOrderList = this.unOrderList.concat(res.data.list);
                    if (res.data.list.length < this.pagesize) {
                        this.unOrderLoadText = "没有更多了";
                        this.unOrderCanLoad = false;
                    } else {
                        this.unOrderLoadText = "加载更多";
                    }
                }
            });
        },
        /**
         * 跳转h5报告页面
         * @param {string} id 订单id
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        openFinishedReport(id) {
            this.$router.push({
                path: "/aiSolution/airConditionerReport",
                query: {
                    order_id: id
                }
            });
        },
        /**
         * 跳转原生报告页面
         * @param {string} orderData 所点订单所有数据
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        openUnfinishedReport(orderData) {
            orderData = {
                order_id: orderData.id,
                step_type: orderData.step_type
            };
            jnsApi.airConditionAi(orderData);
        },
        stepHandle() {
            let _this = this;
            jnsApi.androidCallback().cover(function() {
                _this.back();
            });
        },
        back() {
            window.location.replace(this.turnURL);
        }
    }
};
</script>
<style lang='less' scoped>
.inverse-bg-grey {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
}
.air-conditioner-order {
    padding: 0px 0px 10px 0px;
}
.main-container {
    /deep/.van-tabs-container {
        .van-tabs__wrap {
            position: fixed;
            top: 46px;
        }
    }
    position: relative;
    .orderList {
        margin: 10px;
        display: flex;
        flex-direction: column;
        li {
            background: #fff;
            padding: 10px 0px;
            margin-bottom: 8px;
            display: flex;
            .item-left {
                min-width: 110px;
                box-sizing: border-box;
                padding: 0px 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    width: 70px;
                }
                border-right: 1px solid #efefef;
            }
            .item-right {
                padding-left: 15px;
                display: flex;
                flex-direction: column;
                .data-item {
                    margin-bottom: 10px;
                }
                .data-item:last-child {
                    margin-bottom: 0px;
                }
                .orderName {
                    font-size: 18px;
                    font-weight: bold;
                }
                .step {
                    color: #4ec08e;
                }
                .time {
                    color: #babcbd;
                }
            }
        }
    }
    .loadmore {
        text-align: center;
        font-size: 14px;
        color: #cecece;
        padding-bottom: 15px;
    }
}
</style>