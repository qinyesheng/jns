<!--
 * @Description: 技师端的二手车检测报告v1版
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-09 13:43:55
 * @LastEditTime: 2019-10-12 16:58:02
 -->

<template>
    <div class="page">
        <headerOne
            title="报告详情"
            :isFixed="true"
            :backgroundStatus="true"
            :rightText="this.qrCodeLink?'分享':''"
            @onClickRight="reportShare"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
        />
        <Vbackground />
        <div class="main-container">
            <usedCarDetectionReportV1
                v-if="report.base_info"
                :report="report"
                :reportdata="reportdata"
                :data="data"
                :adList="adList"
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
                <!--     <template #makeResult>
                    <VreportResultList :makeResult="makeResult" />
                </template>-->
                <!-- 重大事故 -->
                <!--  <template #accidentDetection>
                    <VaccidentDetection :accidentDetectionInfo="report" />
                </template>-->
            </usedCarDetectionReportV1>
            <qrCodeReport v-if="qrCodeLink" :isFixed="true" :qrCodeLink="qrCodeLink" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/bill/report";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import usedCarDetectionReportV1 from "@/views/report/usedCarDetectionReportV1";
// import accidentDetection from "@/components/report/accidentDetection";
// import reportResultList from "@/components/report/reportResultList";
// import reportBanner from "@/components/report/reportBanner";
// import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import background from "@/components/background/background";
import { getCarBrandIconSrc, copyObject } from "@/utils/common";
import { getToken, getAppStatus } from "@/utils/auth";
import back from "@/utils/back";
var dataThis = ""; //为了原生回调，使用的全局数据
export default {
    components: {
        headerOne,
        qrCodeReport,
        usedCarDetectionReportV1,
        // VaccidentDetection: accidentDetection,
        // VreportResultList: reportResultList,
        // VreportBaseInfo: reportBaseInfo,
        Vbackground: background
        // VreportBanner: reportBanner
    },
    data() {
        return {
            data: {},
            report: {},
            baseInfo: {},
            makeResult: "",
            reportdata: {}, //去除重大事故系统
            // accidentDetectionInfo: {},
            billId: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            hederTitle: "",
            leftText: "",
            onClickLeftStatus: false,
            adList: {}
        };
    },
    created: function() {},
    mounted: function() {
        this.init();
        dataThis = this;
        window.appToH5 = function() {
            dataThis.getReportById(dataThis.billId);
        };
    },
    computed: {},
    methods: {
        /**
         * @Description: 初始化
         * @Author: linpeng
         * @Date: 2019-05-10 10:10:58
         */
        init() {
            let query = this.$route.query;
            if (query) {
                this.billId = query.billId;
                if (this.billId) {
                    this.getReportById(this.billId);
                }
                if (query.jnsAppStep && query.jnsAppStep == "E002_report") {
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
            }
        },
        /**
         * 根据报告bill_id获取技师端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getReportById(billId) {
            reportApi.getReportByBillIdV2(billId).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    this.report = res.data.report;
                    this.baseInfo = this.report.base_info;
                    this.makeResult = this.report.check_result_info.make_result;
                    this.qrCodeLink = this.report.owner_report_url;
                    this.reportFormate(res.data.report);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        //过滤三大系统
        reportFormate(report) {
            let data = copyObject(report);
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
        //分享
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                logo: getCarBrandIconSrc(this.baseInfo.car_icon),
                bill_id: this.billId,
                sms: 1,
                bill_type: "E002"
            };
            // jnsApi.share(share);
            jnsApi.h5ToApp("share", share);
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