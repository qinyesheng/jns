<!--
 * @Description: 技师端的二手车评估报告v1版
 * @Author: your name
 * @Date: 2019-05-22 13:46:48
 * @LastEditTime: 2019-09-18 14:49:24
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page">
        <background />
        <headerOne
            :isFixed="true"
            :backgroundStatus="true"
            :leftText="leftText"
            :rightText="this.qrCodeLink?'分享':''"
            @onClickRight="reportShare"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
            title="报告详情"
        />
        <div class="main-container">
            <usedCarAssessReportV1 v-if="report.base_info && reportReady" :report="report" />
            <!-- <usedCarAssessReportV1 v-if="reportReady"/> -->
            <reportNotReady v-if="!reportReady" />
            <qrCodeReport v-if="qrCodeLink" :qrCodeLink="qrCodeLink" :isFixed="true" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/bill/report";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import background from "@/components/background/background";
import reportNotReady from "@/components/report/reportNotReady";
import usedCarAssessReportV1 from "@/views/report/usedCarAssessReportV1";
import back from "@/utils/back";
var dataThis = ""; //为了原生回调，使用的全局数据
export default {
    components: {
        headerOne,
        qrCodeReport,
        reportNotReady,
        usedCarAssessReportV1,
        background
    },
    data() {
        return {
            data: {},
            report: {},
            billId: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            title: this.$route.meta.title,
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            leftText: "",
            onClickLeftStatus: false,
            reportReady: true
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
                if (query.jnsAppStep && query.jnsAppStep == "E003_report") {
                    let _this = this;
                    _this.onClickLeftStatus = true;
                    jnsApi.androidCallback().cover(function() {
                        _this.back();
                    });
                } else {
                    this.leftText = "返回检测工单";
                }
            }
        },
        /**
         * 根据报告billId获取技师端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getReportById(billId) {
            reportApi.getReportByBillIdV3(billId).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    this.report = res.data.report;
                    this.baseInfo = this.report.base_info;
                    this.qrCodeLink = this.report.owner_report_url;
                    this.title = this.report.title;
                    this.reportReady =
                        res.data.report_status == "1" ? true : false;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                logo: this.carLogoPre + this.baseInfo.car_icon + ".jpg",
                bill_id: this.billId,
                sms: 1,
                bill_type: "E003"
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