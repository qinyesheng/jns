<!--
 * @Description: C端查看汽车不解体尾气AI诊断报告
 * @Author: xwq
 * @Date: 2019-06-05 15:41:47
 -->
<template>
    <div class="page">
        <div class="main-container">
            <tailAiDiagnosisReport
                v-if="report.base_info && reportPay=='1'"
                :report="report"
                :makeResultText="makeResultText"
                :maintainSchemeStatus="maintainSchemeStatus"
            />
            <div class="noPay" v-if="reportPay == '0'">报告暂未生成，请稍后查看。</div>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import commonApi from "@/api/common/report";
import pubButton from "@/components/public/pubButton";
import tailAiDiagnosisReport from "@/views/report/tailAiDiagnosisReport";

export default {
    components: {
        tailAiDiagnosisReport,
        pubButton
    },
    data() {
        return {
            report: {},
            orderInfo: {},
            makeResultText: "",
            maintainSchemeStatus: "",
            reportPay: ""
        };
    },
    created: function() {},
    mounted: function() {
        this.code = this.$route.query.code;
        if (this.code) {
            this.getReportV3(this.code);
        }
    },
    methods: {
        vinEncode(vinStr) {
            return (
                vinStr.substring(0, 4) +
                "*****" +
                vinStr.substring(vinStr.length - 4)
            );
        },

        /**
         * @Description: 根据报告code获取c端尾气诊断报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-05 16:02:27
         */
        getReportV3(reportCode) {
            commonApi.getReportV3(reportCode).then(res => {
                if (res.code == 20000) {
                    let reportInfo = res.data.report;
                    let makeResult = reportInfo.check_result_info.make_result;
                    if (reportInfo && reportInfo.base_info) {
                        let vin = reportInfo.base_info.vin;
                        reportInfo.base_info.vin = this.vinEncode(vin);
                    }
                    this.report = reportInfo;
                    this.reportPay = res.data.report_status;
                    if (Object.keys(this.report) == 0) {
                        // 若返回空对象，则跳出
                        return;
                    }
                    if (!makeResult) {
                        this.makeResultText =
                            "AI尾气诊断结果良好，未发现异常情况，请继续保持。";
                    }
                    document.title = this.report.title;
                }
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
    }
}
</style>