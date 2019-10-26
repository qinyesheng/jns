<!--
 * @Description: 车主查看的汽车检测报告v1版
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-05-10 10:33:51
 -->
<template>
    <div class="page">
        <div class="main-container">
            <carDetectionReportV1 v-if="report.baseInfo" :report="report"/>
            <!-- <carDetectionReportV1 v-if="report.baseInfo" :report="report" :ownerNoPay="buyBtnShow"/> -->
        </div>
        <!-- <div class="btn" v-if="buyBtnShow">
            <div class="text">车主支付报告费用<span class="priceNum">{{price}}</span>元即可查看完整的报告内容</div>
            <div class="report-btn">购买报告</div>
        </div>-->
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import commonApi from "@/api/common/report";
import carDetectionReportV1 from "@/views/report/carDetectionReportV1";
export default {
    data() {
        return {
            report: {},
            buyBtnShow: true,
            price: "" // 车主端报告价格
        };
    },
    components: {
        carDetectionReportV1
    },
    created: function() {},
    mounted: function() {
        this.code = this.$route.query.code;
        if (this.code) {
            this.getWholeCarReport(this.code);
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
        getWholeCarReport(reportCode) {
            var params = {
                code: reportCode,
                version: 6
            };
            commonApi.getWholeCarReport(params).then(res => {
                if (res.code == 20000) {
                    if (res.data.reportData && res.data.reportData.baseInfo) {
                        let vin = res.data.reportData.baseInfo.carVinNo;
                        res.data.reportData.baseInfo.carVinNo = this.vinEncode(
                            vin
                        );
                    }
                    this.report = res.data.reportData;
                    if (res.data.orderInfo.isPay) {
                        // 是否支付：1支付，0未支付
                        this.buyBtnShow =
                            res.data.orderInfo.isPay == 1 ? false : true;
                        this.price = res.data.orderInfo.reportPrice;
                    }
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
.btn {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 5px;
    padding: 15px 20px;
    margin-bottom: 15px;
    box-sizing: border-box;
    width: calc(100% - 20px);
    margin-left: 10px;
    .text {
        color: #999;
        margin-bottom: 15px;
        font-size: 14px;
        .priceNum {
            color: #323233;
        }
    }
    .report-btn {
        box-sizing: border-box;
        padding: 10px;
        color: #fff;
        background-color: #46aef7;
        text-align: center;
        border-radius: 2px;
        font-size: 16px;
    }
}
</style>