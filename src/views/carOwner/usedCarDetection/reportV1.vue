<!--
 * @Description: 车主查看的二手车检测报告v1版
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-10-12 15:05:50
 -->
<template>
    <div class="page" v-if="ready">
        <div class="main-container">
            <usedCarDetectionReportV1
                v-if="report.base_info"
                :report="report"
                :reportdata="reportdata"
                :data="data"
                :adList="adList"
                :adData="adData"
            >
                <!-- 轮播图 -->
                <!--  <template #reportBanner>
                    <VreportBanner :baseInfoPic="report.base_info.pic" />
                </template>-->
                <!-- 基础信息 -->
                <!-- <template #reportBaseInfo>
                    <VreportBaseInfo :baseInfo="baseInfo" />
                </template>-->
                <!-- 诊断结果 -->
                <!--  <template #makeResult>
                    <VreportResultList :makeResult="makeResult" />
                </template>-->
                <!-- 重大事故 -->
                <!--  <template #accidentDetection>
                    <VaccidentDetection :accidentDetectionInfo="report" />
                </template>-->
            </usedCarDetectionReportV1>
            <!-- <usedCarDetectionReportV1/> -->
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/common/report";
// import accidentDetection from "@/components/report/accidentDetection";
// import reportResultList from "@/components/report/reportResultList";
// import reportBanner from "@/components/report/reportBanner";
// import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import usedCarDetectionReportV1 from "@/views/report/usedCarDetectionReportV1";
import { copyObject } from "@/utils/common";
export default {
    data() {
        return {
            data: {},
            report: {},
            baseInfo: "",
            makeResult: "",
            reportdata: {}, //去除重大事故系统
            adList: {},
            adData: {
                loc_id: ["C00007", "C00008"], //广告位ID
                code: ""
            },
            adMark: 0,
            ready: false
        };
    },
    components: {
        usedCarDetectionReportV1
        // VaccidentDetection: accidentDetection,
        // VreportResultList: reportResultList,
        // VreportBaseInfo: reportBaseInfo,
        // VreportBanner: reportBanner
    },
    created: function() {},
    mounted: function() {
        window.console.log(
            "report===",
            this.report,
            "reportdata==",
            this.reportdata
        );
        this.code = this.$route.query.code;
        if (this.code) {
            this.getReportByCode(this.code);
            this.adData.code = this.code;
            this.getAdList();
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
            reportApi.getReportV2(reportCode).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    if (res.data.report && res.data.report.base_info) {
                        let vin = res.data.report.base_info.vin;
                        this.baseInfo = res.data.report.base_info;
                        this.makeResult =
                            res.data.report.check_result_info.make_result;
                        res.data.report.base_info.vin = this.vinEncode(vin);
                        this.reportFormate(res.data.report);
                        this.report = res.data.report;
                    }
                    if (Object.keys(this.report) == 0) {
                        // 若返回空对象，则跳出
                        return;
                    }
                    document.title = this.report.title;
                }
            });
        },
        /**
         * @Description: 过滤三大重大事故项
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-05 16:40:36
         */
        reportFormate(list) {
            let data = copyObject(list);
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
        /**
         * @Description: 获取广告信息列表
         * @Param: loc_id(广告位ID) , report_code(报告code)
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-13 17:23:42
         */
        getAdList() {
            if (this.adMark == this.adData.loc_id.length) {
                this.ready = true;
                return;
            }
            let params = {
                loc_id: this.adData.loc_id[this.adMark],
                report_code: this.adData.code
            };
            reportApi.getAdList(params).then(res => {
                if (res.code == 20000) {
                    this.adList[this.adData.loc_id[this.adMark]] =
                        res.data.list;
                    this.adMark += 1;
                    this.getAdList();
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    background: #f2f2f2;
}
</style>