<!--
 * @Description: 选择质保方案
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 14:23:18
 * @LastEditTime: 2019-09-18 14:52:07
 --> 
<template>
    <div class="jns-container">
        <div class="inverse-bg-grey"></div>
        <headerOne :title="title" :isFixed="true" :backgroundStatus="false" />
        <div class="main-container">
            <form action="#" id="vinForm">
                <div class="quality-assurance-plan">
                    <div>
                        <h3 style="font-size:27px;">维修方案</h3>
                    </div>
                    <div class="quality-assurance-plan-block">
                        <h4>
                            <div class="grid-demo grid-demo-bg1 text-left">
                                <b>诊断结果</b>
                            </div>
                        </h4>
                        <div style="padding:10px 0;">{{checkResult}}</div>
                    </div>
                    <div class="quality-assurance-plan-block">
                        <h4>
                            <div class="grid-demo grid-demo-bg1 text-left">
                                <b>选择质保方案</b>
                            </div>
                        </h4>
                        <div style="padding:10px 0;">
                            <div style="padding:10px 0;">
                                <img
                                    src="../../assets/image/zb.png"
                                    alt
                                    height="20"
                                    class="zb-icon"
                                />
                                由JNS • PICC提供保障
                            </div>
                        </div>
                        <ul class="quality-choice">
                            <li
                                class="quality-choice-li"
                                v-on:click="qualityAssurancePlanSubmit(item.solution_result_id)"
                                v-for="(item, index) in qualityAssurancePlanList"
                                :key="index"
                            >
                                <div>{{item.warranty_period}}</div>
                                <span class="quality-choice-icon">
                                    <van-icon name="arrow" />
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div class="text-center service-agreement">
                            <router-link
                                class="service-agreement-li"
                                :to="{name:'agreement',params:{agreementId:'fwxy'}}"
                            >服务协议</router-link>
                            <router-link
                                class="service-agreement-li"
                                :to="{name:'agreement',params:{agreementId:'fwxy1'}}"
                            >服务协议附件</router-link>
                            <router-link
                                class="service-agreement-li"
                                :to="{name:'agreement',params:{agreementId:'fwxy2'}}"
                            >售后维保服务协议</router-link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import aiMaintainSolutionApi from "@/api/aiMaintainSolution/solution";
export default {
    components: {
        headerOne: headerOne
    },
    data() {
        return {
            carInfo: {},
            qualityAssurancePlanList: [],
            checkResult: "",
            title: ""
        };
    },
    created: function() {
        var self = this;
        this.carInfo = this.$session.get("carInfo");
        let params = {
            solution_check_result_id: this.$route.query.checkResultSearchId
        };
        aiMaintainSolutionApi.getQualitySolutionList(params).then(res => {
            if (res.code == 20000) {
                var data = res.data;
                if (data) {
                    self.qualityAssurancePlanList = data.results_list;
                    self.checkResult = data.check_result;
                }
            }
        });
    },
    methods: {
        qualityAssurancePlanSubmit: function(solutionResultId) {
            var self = this;
            self.$router.push({
                name: "solution",
                query: {
                    checkResultSearchId: self.$route.query.checkResultSearchId,
                    solutionResultId: solutionResultId
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.header-container {
    margin-top: 60px;
}
.quality-choice-li {
    position: relative;
    padding: 10px 30px 10px 0px;
    border-bottom: 1px solid #f2f2f2;
    z-index: 2;
}
.quality-choice-li:last-child {
    border-bottom: 0px;
}
.quality-choice-li .quality-choice-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 2px;
    right: 0px;
}
.service-agreement {
    padding: 20px 0px;
    margin: 0 auto;
}
.service-agreement-li {
    border-left: 1px solid #ccc;
    padding: 5px 6px 5px 6px;
    color: #a6a6a6;
}
.service-agreement-li:first-child {
    border-left: 0px;
}
.inverse-bg-grey {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -9999;
}
.quality-assurance-plan {
    font-size: 14px;
    .quality-assurance-plan-block {
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-top: 15px;
        .zb-icon {
            vertical-align: middle;
        }
    }
}
</style>