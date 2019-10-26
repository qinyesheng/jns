<!--
 * @Description: 车主查看的汽车安检报告v1版
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-14 14:41:53
 * @LastEditTime: 2019-05-17 10:49:17
 -->
 
<template>
    <div class="page">
        <div class="main-container">
            <carSecurityCheckReportV1 v-if="report.baseInfo" :report="report"/>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/common/report";
import carSecurityCheckReportV1 from "@/views/report/carSecurityCheckReportV1";
export default {
    data() {
        return {
            report: {}
        };
    },
    components: {
        carSecurityCheckReportV1
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
        getReportByCode(reportCode) {
            let params = {
                code: reportCode,
                version: 7
            };
            reportApi.getWholeCarReport(params).then(res => {
                if (res.code == 20000) {
                    if (res.data.reportData && res.data.reportData.baseInfo) {
                        let vin = res.data.reportData.baseInfo.carVinNo;
                        res.data.reportData.baseInfo.carVinNo = this.vinEncode(
                            vin
                        );
                    }
                    this.report = res.data.reportData;
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