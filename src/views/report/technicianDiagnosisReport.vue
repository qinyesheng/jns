<!--
 * @Description: JNS_认证技师检测报告  渲染模板
 * @Author: xwq
 * @Date: 2019-05-31 11:17:20  
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container">
            <div class="container-head">
                <div class="container-head-top">
                    <img src="@image/report_head3.png" @click.prevent />
                </div>
                <div class="container-head-bt">
                    <p>
                        <span>{{headInfo.create_user_name}}</span>
                        <span>{{headInfo.detection_time}}</span>
                    </p>
                    <p>
                        <span>{{headInfo.org_name}}</span>
                    </p>
                </div>
            </div>
            <reportBaseInfo :baseInfo="report.base_info" />
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
import background from "@/components/background/background";
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import reportResultList from "@/components/report/reportResultList";
import reportMaintainScheme from "@/components/report/underlineRule/reportMaintainScheme";
export default {
    props: ["report"],
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
            maintainSchemeLength: "",
            headInfo: {
                create_user_name: "",
                detection_time: "",
                org_name: ""
            }
        };
    },
    created() {
        let baseInfo = this.report.base_info;
        for (let key in this.headInfo) {
            if (baseInfo[key]) {
                this.headInfo[key] = baseInfo[key];
            }
        }
        this.headInfo.detection_time = this.headInfo.detection_time.split(
            " "
        )[0];

        //诊断结果
        if (this.report.checkResultArr.makeResult) {
            this.makeResult = this.report.checkResultArr.makeResult;
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
                this.maintainScheme = this.report.maintain_scheme[index];
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
            background: linear-gradient(to right, #46adf7 20%, #5996fe 100%);
            border-radius: 5px;
            padding: 20px 50px;
            margin-bottom: 10px;
            .container-head-top {
                margin-bottom: 5px;
                > img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .container-head-bt {
                > p {
                    padding: 5px 0;
                    color: #fff;
                    text-align: right;
                    > span {
                        color: #e9f2ff;
                        font-size: 14px;
                    }
                }
                > p:first-child {
                    & > span:first-child {
                        margin-right: 8px;
                    }
                }
            }
        }
    }
}
</style>

