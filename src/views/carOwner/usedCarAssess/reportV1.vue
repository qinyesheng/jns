<!--
 * @Description: 车主查看的二手车评估报告v1版
 * @Author: lp
 * @Date: 2019-05-20 14:28:02
 * @LastEditTime: 2019-05-24 09:34:39
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page">
        <div class="main-container">
            <usedCarAssessReportV1 v-if="report.base_info" :report="report"/>
            <!-- <usedCarAssessReportV1/> -->
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/common/report";
import usedCarAssessReportV1 from "@/views/report/usedCarAssessReportV1";
export default {
    data() {
        return {
            report: {}
        };
    },
    components: {
        usedCarAssessReportV1
    },
    created: function() {},
    mounted: function() {
        this.code = this.$route.query.code;
        if (this.code) {
            this.getReportByCode(this.code);
        }
    },
    methods: {
        vinEncode(vinStr) {
            return vinStr.substring(0, vinStr.length - 4) + "****";
        },
        /**
         * 根据报告code获取c端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/5/22
         */
        getReportByCode(reportCode) {
            reportApi.getReportV3(reportCode).then(res => {
                if (res.code == 20000) {
                    if (res.data.report && res.data.report.base_info) {
                        let vin = res.data.report.base_info.vin;
                        res.data.report.base_info.vin = this.vinEncode(vin);
                    }
                    this.report = res.data.report;
                    if (Object.keys(this.report) == 0) {
                        // 若返回空对象，则跳出
                        return;
                    }
                    document.title = this.report.title;
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
</style>