<!--
 * @Description:b端查看的深度检测报告v1版
 * @Author: qjy
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-15 10:18:34
 * @LastEditTime: 2019-09-18 14:48:16
 -->
<template>
    <div class="page">
        <headerOne
            :isFixed="true"
            :backgroundStatus="true"
            leftText="返回检测工单"
            :rightText="this.qrCodeLink?'分享':''"
            @onClickRight="reportShare"
            :onClickLeftStatus="onClickLeftStatus"
            @onClickLeft="back"
        />
        <div class="main-container">
            <depthDiagnosisReportV1
                v-if="report.base_info && existsNotMatching!='1'"
                :report="report"
                :reportPay="reportPay"
            />
            <technicianDiagnosisReport
                v-if="report.base_info && existsNotMatching=='1'"
                :report="report"
                :reportPay="reportPay"
            />
            <div class="noPay" v-if="reportPay == '0'">车主未购买报告</div>
            <qrCodeReport
                v-if="this.qrCodeLink"
                :isFixed="true"
                :qrCodeLink="qrCodeLink"
                :class="reportPay=='0'?'qrcode':''"
            />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import reportApi from "@/api/bill/report";
import depthDiagnosisReportV1 from "@/views/report/depthDiagnosisReportV1";
import technicianDiagnosisReport from "@/views/report/technicianDiagnosisReport";
import { getToken, getAppStatus } from "@/utils/auth";
import { getCarBrandIconSrc } from "@/utils/common";
import back from "@/utils/back";
var dataThis = ""; //为了原生回调，使用的全局数据
export default {
    components: {
        headerOne,
        qrCodeReport,
        depthDiagnosisReportV1,
        technicianDiagnosisReport
    },
    data() {
        return {
            billId: "",
            headerTitle: "",
            data: {},
            report: {},
            baseInfo: {},
            reportPay: "",
            qrCodeLink: "", //仅用于技师端 短链读取
            onClickLeftStatus: false,
            existsNotMatching: ""
        };
    },

    created: function() {},
    mounted: function() {
        let query = this.$route.query;
        if (query) {
            this.billId = query.billId;
            if (this.billId) {
                this.getBillDetail(this.billId);
            }
            if (query.jnsAppStep && query.jnsAppStep == "J005_report") {
                let _this = this;
                _this.onClickLeftStatus = true;
                jnsApi.androidCallback().cover(function() {
                    _this.back();
                });
            }
        }
        dataThis = this;
        window.appToH5 = function() {
            dataThis.getReportById(dataThis.billId);
        };
    },
    methods: {
        getBillDetail(billId) {
            reportApi.getBillDetail(billId).then(res => {
                if (res.code == 20000) {
                    this.report = res.data.reportData;
                    this.baseInfo = this.report.base_info;
                    this.qrCodeLink = this.report.ownerReportUrl;
                    this.reportPay = res.data.order_info.is_pay;
                    if (this.report.exists_not_matching) {
                        this.existsNotMatching =
                            res.data.reportData.exists_not_matching;
                    }
                }
            });
        },
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                logo: getCarBrandIconSrc(this.baseInfo.car_icon),
                bill_id: this.billId,
                sms: 1,
                bill_type: "J005"
            };
            // jnsApi.share(share);
            jnsApi.h5ToApp("share", share);
        },
        back() {
            let query = {
                token: getToken(),
                status: getAppStatus(),
                jnsAppStep: "E002_list"
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
.main-container {
    .report-title {
        font-size: 28px;
        font-weight: 500;
        text-align: center;
        background: none;
        padding-bottom: 20px;
    }
    .noPay {
        margin-bottom: 20px;
        color: #f3f3f3;
        padding: 14px;
        // border-radius: 5px;
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
</style>