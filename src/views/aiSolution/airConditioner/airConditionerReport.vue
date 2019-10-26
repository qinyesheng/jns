<!--
 * @Description: 技师端预览的空调检测报告v1版
 * @Author: qys
 * @LastEditors: Please set LastEditors
 * @Date: 2019-08-26
 * @LastEditTime: 2019-09-18 14:47:37
 -->
<template>
    <div class="page">
        <headerOne
            :backgroundStatus="false"
            :isFixed="true"
            :rightText="rightText"
            @onClickRight="reportShare"
            title="报告详情"
            :onClickLeftStatus="onClickLeftStatus"
            @onClickLeft="back"
        />
        <div class="main-container">
            <airConditionerReportV1 v-if="report.base_info" :report="report" />
            <qrCodeReport v-if="qrCodeLink" :isFixed="true" :qrCodeLink="qrCodeLink" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
// import aiMaintainSolutionApi from "@/api/aiMaintainSolution/airConditioner";
import reportApi from "@/api/bill/report";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import airConditionerReportV1 from "@/views/report/airConditionerReportV1";
import { getToken, getAppStatus } from "@/utils/auth";
import { getCarBrandIconSrc } from "@/utils/common";
export default {
    components: {
        headerOne,
        qrCodeReport,
        airConditionerReportV1
    },
    data() {
        return {
            report: {},
            baseInfo: {},
            makeResult: [], // 诊断结果
            quality_time: "", // 质保时长：默认0,单位月,前端处理：>12个月要转为x年x个月
            quality_km: "", // 质保公里数
            total_price: "", // 方案总价
            qrCodeLink: "", //仅用于技师端 短链读取
            hederTitle: "",
            // carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            onClickLeftStatus: true,
            rightText: "",
            leftText: "",
            billId: ""
        };
    },

    created: function() {},
    mounted: function() {
        this.hederTitle = this.$router.history.current.meta.title;
        this.stepHandle();
        let query = this.$route.query;
        if (query) {
            if (query.billId) {
                this.billId = query.billId;
                this.getReportById(this.billId);
            }
            if (query.jnsAppStep && query.jnsAppStep == "J009_report") {
                let _this = this;
                _this.leftText = "";
                _this.onClickLeftStatus = true;
                jnsApi.androidCallback().cover(function() {
                    jnsApi.back();
                });
            } else {
                this.leftText = "返回检测工单";
                // this.onClickLeftStatus = false;
            }
        }
    },
    methods: {
        /**
         * 根据报告billId获取技师端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getReportById(billId) {
            reportApi.getReportByBillIdV2(billId).then(res => {
                if (res.code == 20000) {
                    this.report = res.data.report;
                    this.baseInfo = this.report.base_info;
                    this.qrCodeLink = this.report.owner_report_url;
                    this.rightText = this.report.owner_report_url ? "分享" : "";
                }
            });
        },
        stepHandle() {
            let _this = this;
            jnsApi.androidCallback().cover(function() {
                _this.back();
            });
        },
        //返回
        back() {
            if (this.qrCodeLink == "") {
                jnsApi.back();
            } else {
                let query = {
                    token: getToken(),
                    jnsAppStatus: getAppStatus(),
                    jnsAppStep: "J006_list"
                };
                this.$router.push({
                    name: "appToH5",
                    query: query
                });
            }
        },
        //报告分享
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                logo: getCarBrandIconSrc(this.baseInfo.car_icon),
                bill_id: this.billId,
                bill_type: "J009",
                platforms: ["WechatSession,WechatTimeLine,Sms,QQ"] //显示分享平台 Sms 短信、 WechatSession 微信、 WechatTimeLine  微信朋友圈、  QQ QQ聊天、  Qzone  qq空间
            };
            jnsApi.h5ToApp("share", share);
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