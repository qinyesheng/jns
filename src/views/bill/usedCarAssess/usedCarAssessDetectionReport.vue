<!--
 * @Description: buche_二手车检测报告v2版
 * @Author: xwq
 * @Date: 2019-05-24 15:17:03
 -->
<template>
    <div class="page">
        <Vbackground />
        <div class="main-container">
            <usedCarAssessDetectionReport
                v-if="report.base_info"
                :report="report"
                :reportdata="reportdata"
                :payStatus="payStatus"
                :isWechat="isWechat"
                @payReport="payReport"
                @bcDownLoad="bcDownLoad"
            >
                <!-- 使用插槽分发的模式增加组件模块,只有一个默认插槽时,v-slot可以直接作用在组件上 -->
                <!-- 轮播图 -->
                <!--  <template #reportBanner>
                    <VreportBanner :baseInfoPic="report.base_info.pic" />
                </template>-->
                <!-- 基础信息 -->
                <!--  <template #reportBaseInfo>
                    <VreportBaseInfo :baseInfo="baseInfo" />
                </template>-->
                <!-- 诊断结果 -->
                <!--   <template #makeResult>
                    <VreportResultList :makeResult="makeResult" />
                </template>-->
                <!-- 重大事故 -->
                <!--  <template #accidentDetection>
                    <VaccidentDetection :accidentDetectionInfo="accidentDetectionInfo" />
                </template>-->
            </usedCarAssessDetectionReport>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import commonApi from "@/api/common/buChe";
import bucheApi from "@/api/buche/buche";
import usedCarAssessDetectionReport from "@/views/report/usedCarAssessDetectionReport";
// import accidentDetection from "@/components/report/accidentDetection";
// import reportResultList from "@/components/report/reportResultList";
// import reportBanner from "@/components/report/reportBanner";
// import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import background from "@/components/background/background";
import { getToken, getAppStatus } from "@/utils/auth";
import Qs from "qs";
import back from "@/utils/back";
import { copyObject } from "@/utils/common";
var dataThis = '';//为了原生回调，使用的全局数据
export default {
    components: {
        usedCarAssessDetectionReport,
        // VaccidentDetection: accidentDetection,
        // VreportResultList: reportResultList,
        // VreportBaseInfo: reportBaseInfo,
        Vbackground: background
        // VreportBanner: reportBanner
    },
    data() {
        return {
            report: {},
            reportdata: {}, //去除重大事故系统
            baseInfo: {},
            makeResult: "",
            accidentDetectionInfo: {},
            hederTitle: "",
            leftText: "",
            onClickLeftStatus: false,
            payStatus: "",
            requestInfo: {
                bill_id: "",
                bc_token: ""
            },
            isWechat: false,
            bcDownloadLink: {
                android: "https://www.pgyer.com/buche", //捕车安卓版下载链接，下为ios。
                ios:
                    "https://apps.apple.com/cn/app/%E6%8D%95%E8%BD%A6/id1207720514"
            }
        };
    },
    created: function() {},
    mounted: function() {
        this.init();
        dataThis = this;
        window.appToH5 = function(){
            dataThis.getReportById(dataThis.requestInfo);
        };
    },
    methods: {
        /**
         * @Description: 初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-24 15:43:06
         *
         */
        init() {
            let query = Qs.parse(this.$route.query);
            if (query) {
                this.requestInfo.bill_id = query.billId ? query.billId : false;
                this.requestInfo.bc_token = query.bucheToken
                    ? query.bucheToken
                    : sessionStorage.getItem("bucheToken");
                if (this.requestInfo.bill_id && this.requestInfo.bc_token) {
                    this.getReportById(this.requestInfo);
                } else {
                    let url = `${process.env.VUE_APP_WEB_BUCHES_URL}/buche.html?billId=${this.requestInfo.bill_id}#/carInfo`;
                    window.location.replace(url);
                }
                if (
                    query.jnsAppStep &&
                    query.jnsAppStep == "E003_buche_detection_report"
                ) {
                    let _this = this;
                    _this.leftText = "";
                    _this.onClickLeftStatus = true;
                    jnsApi.androidCallback().cover(function() {
                        _this.back();
                    });
                } else {
                    this.leftText = "返回检测工单";
                    this.onClickLeftStatus = false;
                }
                if (query.sourceName && query.sourceName == "bcWechat") {
                    this.isWechat = true;
                }
            }
        },
        /**
         * @Description: 根据报告bill_id获取技师端报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return: {Object} 返回值描述
         * @Date: 2019-05-24 15:42:39
         */
        getReportById(params) {
            commonApi.getUsedCarAssessReport(params).then(res => {
                if (res.code == 20000) {
                    this.report = res.data.report;
                    this.baseInfo = this.report.base_info;
                    this.makeResult = this.report.check_result_info.make_result;
                    this.payStatus = res.data.pay_status;
                    this.reportFormate(res.data.report);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 过滤三大重大事故项
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-05 16:40:36
         */
        reportFormate(list) {
            let data = copyObject(list);
            let result = data.system_list.filter((item, ley) => {
                return (
                    item.code != "greatImpact" &&
                    item.code != "bubbleCar" &&
                    item.code != "burnCar"
                );
            });
            data.system_list = result;
            this.reportdata = data;
        },

        /**
         * @Description: 维修档案查询  区分来源是App还是微信端，调起不同的支付接口
         * @Param: params  接口必需参数
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-19 10:42:27
         */
        payReport() {
            //微信端支付
            if (this.isWechat) {
                let params = {
                    reqAct: "toHelpBuyCarH5Pay",
                    workOrderId: this.requestInfo.bill_id,
                    payType: "2"
                };
                bucheApi.usedCar(params).then(res => {
                    if (res.retCode == "0") {
                        window.location.href = res.result.retUrl;
                    } else {
                        this.$toast.fail(res.retMsg);
                    }
                });
            }
            //App端
            else {
                let params = {
                    bill_id: this.requestInfo.bill_id
                };
                jnsApi.h5ToApp("payReport", params);
            }
        },
        /**
         * @Description: 跳转下载捕车APP连接
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-18 14:17:05
         */
        bcDownLoad() {
            location.href = this.bcDownloadLink[jnsApi.getTerminalType()];
        },

        back() {
            jnsApi.back();
        }
    }
};
</script>
<style lang='less' scoped>
.main-container {
    .report-title {
        font-size: 28px;
        font-weight: 500;
        text-align: center;
        background: none;
        padding-bottom: 20px;
    }
}
</style>