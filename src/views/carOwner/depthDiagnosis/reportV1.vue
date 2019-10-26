<!--
 * @Description: 车主查看的深度检测报告v1版
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-15 10:18:34
 * @LastEditTime: 2019-06-03 15:59:25
 -->

<template>
    <div class="page">
        <div class="main-container">
            <depthDiagnosisReportV1
                v-if="report.base_info && existsNotMatching!='1'"
                :report="report"
            />
            <technicianDiagnosisReport
                v-if="report.base_info &&existsNotMatching=='1'"
                :report="report"
            />
            <van-row class="payMode" v-if="orderInfo.is_pay==0">
                <van-col span="24" class="pay-mode-title">检测与诊断结果</van-col>
                <van-col span="24" class="pay-mode-desc">支付费用可查看完整报告</van-col>
                <van-col span="24">
                    <pubButton @buttonConfirm="payReport" title="支付诊断费用" :isFixed="false"></pubButton>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import commonApi from "@/api/common/report";
import pubButton from "@/components/public/pubButton";
import depthDiagnosisReportV1 from "@/views/report/depthDiagnosisReportV1";
import technicianDiagnosisReport from "@/views/report/technicianDiagnosisReport";

export default {
    data() {
        return {
            report: {},
            orderInfo: {},
            existsNotMatching: ""
        };
    },
    components: {
        depthDiagnosisReportV1,
        technicianDiagnosisReport,
        pubButton
    },
    created: function() {},
    mounted: function() {
        this.code = this.$route.query.code;
        if (this.code) {
            this.getDepthDiagnosisReport(this.code);
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
         * 根据报告code获取c端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getDepthDiagnosisReport(reportCode) {
            var params = {
                code: reportCode
            };
            commonApi.getDepthDiagnosisReport(params).then(res => {
                if (res.code == 20000) {
                    let data = res.data;
                    if (data.report && data.report.base_info) {
                        let vin = data.report.base_info.vin;
                        data.report.base_info.vin = this.vinEncode(vin);
                    }
                    this.report = data.report;
                    if (Object.keys(this.report) == 0) {
                        // 若返回空对象，则跳出
                        return;
                    }
                    if (res.data.report.exists_not_matching) {
                        this.existsNotMatching =
                            res.data.report.exists_not_matching;
                    }
                    this.orderInfo = data.order_info;
                    document.title = this.report.title;
                }
            });
        },
        payReport() {
            this.$router.push({
                name: "dynamicRedirect",
                query: {
                    toPath: "/carOwner/author",
                    nextPath: "/carOwner/payMode",
                    reportCode: this.code
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .payMode {
        margin-top: 15px;
        padding: 15px;
        background: #fff;
        .pay-mode-title {
            font-size: 20px;
            font-weight: bold;
        }
        .pay-mode-desc {
            font-size: 16px;
            color: #ccc;
            padding: 15px 0;
            text-align: center;
        }
    }
}
</style>