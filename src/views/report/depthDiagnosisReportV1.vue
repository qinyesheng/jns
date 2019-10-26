<!--
 * @Description: C端深度检测报告V1版 渲染模板
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-04-15 10:18:34
 * @LastEditTime: 2019-08-02 10:59:29
 -->

<template>
    <div class="page">
        <background />
        <div class="main-container report-container">
            <reportHeadImg :imgSrc="headImgSrc" />
            <reportBaseInfo :baseInfo="report.base_info" v-if="report.base_info" />
            <reportResultList title="检测与诊断结果" :makeResult="makeResult" />
            <reportMaintainScheme
                :maintainScheme="maintainScheme"
                :selectBtnName="selectBtnName"
                qualityStatus="multiple"
                @selectMaintainScheme="selectMaintainScheme"
                v-if="report.maintain_scheme.length"
            />
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import background from "@/components/background/background";
import reportHeadImg from "@/components/report/reportHeadImg";
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import reportResultList from "@/components/report/reportResultList";
import reportMaintainScheme from "@/components/report/underlineRule/reportMaintainScheme";
export default {
    data() {
        return {
            headImgSrc: require("@image/report_head2.png"),
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            maintainScheme: "", // 当前维修方案
            activeIndex: 0,
            giftList: [],
            brandTitleShow: false,
            selectBtnName: [],
            makeResult: "",
            maintainSchemeLength: ""
        };
    },
    props: ["report"],
    components: {
        background,
        reportHeadImg,
        reportBaseInfo,
        reportResultList,
        reportMaintainScheme
    },
    created: function() {
        //诊断结果
        if (this.report.checkResultArr.makeResult) {
            this.makeResult = this.report.checkResultArr.makeResult;
        }
        //维修方式方案选择
        if (this.report.maintain_scheme.length) {
            this.selectMaintainScheme(0); // 默认选择第一种方案
        }
    },
    mounted: function() {
        this.selectBtnName =
            this.maintainSchemeLength > 1 ? ["维修方式一", "维修方式二"] : [];
    },
    methods: {
        // 选择方案
        selectMaintainScheme(index) {
            this.activeIndex = index;
            let num = this.report.maintain_scheme.length;
            this.maintainSchemeLength = num;
            if (num - 1 >= index) {
                this.maintainScheme = this.report.maintain_scheme[index];
                if (!this.maintainScheme.quality_list) {
                    this.maintainScheme.quality_list = [];
                }
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    margin-bottom: 10px;
    .report-container {
        padding: 0;
    }
}
</style>