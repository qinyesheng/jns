<!--
 * @Description: 车主查看的空调检测报告v1版
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-08-20 09:28:58
 -->
<template>
    <div class="page">
        <div class="main-container">
            <airConditionerReportV1 v-if="report.base_info" :report="report" />
        </div>
    </div>
</template>
<script>
import commonApi from "@/api/common/report";
import airConditionerReportV1 from "@/views/report/airConditionerReportV1";
export default {
    components: {
        airConditionerReportV1
    },
    data() {
        return {
            report: {}
        };
    },
    created: function() {},
    mounted: function() {
        let code = this.$route.query.code;
        if (code) {
            this.getAirConditionerReport(code);
        }
    },
    methods: {
        /**
         * @Description: VIN码处理
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-20 09:27:47
         */
        vinEncode(vinStr) {
            return (
                vinStr.substring(0, 4) +
                "*****" +
                vinStr.substring(vinStr.length - 4)
            );
        },
        /**
         * @Description: 根据code获取报告信息
         * @Param: code [String]
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-20 09:24:45
         */
        getAirConditionerReport(code) {
            commonApi.getReportV3(code).then(res => {
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