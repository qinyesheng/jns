<!--
 * @Description: B端查看汽车不解体尾气AI诊断报告
 * @Author: xwq
 * @Date: 2019-06-05 09:55:15
 -->
<template>
    <div class="page">
        <headerOne
            title="报告详情"
            :isFixed="true"
            :backgroundStatus="true"
            :rightText="this.qrCodeLink?'分享':''"
            @onClickRight="reportShare"
            :onClickLeftStatus="onClickLeftStatus"
            @onClickLeft="back"
        />
        <div class="main-container">
            <tailAiDiagnosisReport
                v-if="report.base_info && reportPay=='1'"
                :report="report"
                :makeResultText="makeResultText"
                :maintainSchemeText="maintainSchemeText"
            />
            <div class="noPay" v-if="reportPay == '0'">报告暂未生成，请稍后查看。</div>
            <qrCodeReport
                v-if="this.qrCodeLink"
                :qrCodeLink="qrCodeLink"
                :isFixed="true"
                :isPost="isPost"
                @postConfirm="postConfirm"
            />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import qrCodeReport from "@/components/qrCode/qrCodeAndPost";
import reportApi from "@/api/bill/report";
import tailAiDiagnosisReport from "@/views/report/tailAiDiagnosisReport";
import { getToken, getAppStatus } from "@/utils/auth";
import { getCarBrandIconSrc } from "@/utils/common";
import back from "@/utils/back";
export default {
    components: {
        headerOne,
        qrCodeReport,
        tailAiDiagnosisReport
    },
    data() {
        return {
            billId: "",
            headerTitle: "",
            data: {},
            report: {},
            baseInfo: {},
            qrCodeLink: "", //仅用于技师端 短链读取
            onClickLeftStatus: false,
            makeResultText: "",
            maintainSchemeText: "",
            reportPay: "",
            isPost: true // 是否显示提交合格证按钮
        };
    },
    created: function() {},
    mounted: function() {
        let query = this.$route.query;
        if (query) {
            this.billId = query.billId;
            if (this.billId) {
                this.getReportByBillIdV2(this.billId);
            }
            if (query.jnsAppStep && query.jnsAppStep == "J007_report") {
                let _this = this;
                _this.onClickLeftStatus = true;
                jnsApi.androidCallback().cover(function() {
                    _this.back();
                });
            }
        }
    },
    methods: {
        getReportByBillIdV2(billId) {
            reportApi.getReportByBillIdV2(billId).then(res => {
                if (res.code == 20000) {
                    let reportInfo = res.data.report;
                    let makeResult = reportInfo.check_result_info.make_result;
                    let maintainScheme = reportInfo.maintain_scheme.length;
                    this.report = reportInfo;
                    this.baseInfo = reportInfo.base_info;
                    /*  this.isPost =
                        res.data.certificate_status == "0" ? true : false; */
                    this.isPost = res.data.certificate_status;
                    this.qrCodeLink = reportInfo.ownerReportUrl;
                    this.reportPay = res.data.report_status;
                    if (!makeResult) {
                        this.makeResultText = "暂未发现异常情况";
                    }
                    if (maintainScheme == 0) {
                        this.maintainSchemeText = "暂无维修方案";
                    }
                }
            });
        },
        // 提交合格证页面
        postConfirm() {
            this.$router.push({
                name: "tailPost",
                query: {
                    bill_id: this.billId
                }
            });
        },
        reportShare() {
            let share = {
                bill_id: this.billId,
                shareUrl: this.qrCodeLink,
                bill_type: "J007",
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                sms:1,
                logo: getCarBrandIconSrc(this.baseInfo.car_icon)
            };
            jnsApi.h5ToApp("share", share);
        },
        back() {
            let query = {
                token: getToken(),
                status: getAppStatus(),
                jnsAppStep: "J007_list"
            };
            this.$router.push({
                name: "appToH5",
                query: query
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .noPay {
            margin-bottom: 20px;
            color: #f3f3f3;
            padding: 14px;
            background-color: #ccc;
            font-size: 18px;
            text-align: center;
        }
        .qrcode {
            position: fixed;
            bottom: 10px;
            left: 10px;
            right: 10px;
        }
    }
}
</style>