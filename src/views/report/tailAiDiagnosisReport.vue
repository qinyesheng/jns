<!--
 * @Description: 汽车不解体尾气AI诊断报告  渲染模板
 * @Author: xwq
 * @Date: 2019-06-04 09:40:57
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container">
            <div class="container-head">
                <div class="container-head-top">
                    <img src="@image/report_head4.png" @click.prevent />
                </div>
            </div>
            <reportBaseInfo :baseInfo="report.base_info" />
            <reportResultList title="检测与诊断结果" :makeResult="makeResult" />
            <div class="none-result-list" v-if="makeResultText">
                <h4>
                    <b>检测与诊断结果</b>
                </h4>
                <p>{{makeResultText}}</p>
            </div>
            <reportMaintainScheme
                :maintainScheme="maintainScheme"
                :selectBtnName="selectBtnName"
                qualityStatus="multiple"
                @selectMaintainScheme="selectMaintainScheme"
                v-if="report.maintain_scheme.length"
            />
            <div class="none-maintain-scheme-list" v-if="maintainSchemeText">
                <h4>
                    <b>维修方式</b>
                </h4>
                <P>{{maintainSchemeText}}</P>
            </div>
        </div>
    </div>
</template>
<script>
import background from "@/components/background/background";
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import reportResultList from "@/components/report/reportResultList";
import reportMaintainScheme from "@/components/report/underlineRule/reportMaintainScheme";
export default {
    props: {
        report: Object,
        makeResultText: {
            type: String,
            default: ""
        },
        maintainSchemeText: {
            type: String,
            default: ""
        }
    },
    components: {
        reportResultList,
        reportBaseInfo,
        reportMaintainScheme,
        background
    },
    data() {
        return {
            makeResult: "",
            maintainScheme: "", // 当前维修方案
            activeIndex: 0,
            selectBtnName: [],
            maintainSchemeLength: ""
        };
    },
    created() {
        //诊断结果
        let makeResult = this.report.check_result_info.make_result;
        if (makeResult && !this.makeResultText) {
            this.makeResult = makeResult;
        }
        //维修方式方案选择
        if (this.report.maintain_scheme.length) {
            this.selectMaintainScheme(0); // 默认选择第一种方案
        }
    },
    mounted() {
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
                this.maintainScheme = JSON.parse(
                    JSON.stringify(this.report.maintain_scheme[index])
                );
                if (!this.maintainScheme.quality_list) {
                    this.maintainScheme.quality_list = [];
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        padding: 0;
        .container-head {
            padding: 20px;
            margin-bottom: 10px;
            .container-head-top {
                margin-bottom: 5px;
                > img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
        }
        .none-maintain-scheme-list {
            background: #fff;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 15px;
            h4 {
                padding-top: 10px;
                margin-bottom: 10px;
                b {
                    font-weight: bold;
                    font-size: 20px;
                }
            }
            p {
                padding: 10px;
                font-size: 16px;
                color: #666;
                line-height: 20px;
            }
        }
        .none-result-list {
            background: #fff;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 15px;
            h4 {
                padding-top: 10px;
                margin-bottom: 10px;
                b {
                    font-weight: bold;
                    font-size: 20px;
                }
            }
            p {
                padding: 10px;
                font-size: 16px;
                color: #666;
                line-height: 20px;
            }
        }
    }
}
</style>

