<!--
 * @Description: 报告诊断结果
 * @Author: xwq
 * @Date: 2019-06-11 11:56:22
 -->
<template>
    <div class="page">
        <div class="result-list" v-if="makeResultList.length>0">
            <h4>
                <b>{{title}}</b>
            </h4>
            <div class="make-result">
                <div>
                    <van-cell v-for="(value, key) in makeResultList" :key="key" :value="value" />
                </div>
                <div class="prove" v-if="isProve">
                    <img src="@image/question.png" />
                    <span>诊断结果由JNS提供技术支持</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Cell, CellGroup } from "vant";
export default {
    components: {
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup
    },
    props: {
        title: {
            type: String,
            default: "诊断结果"
        },
        makeResult: {
            type: String
        },
        // 是否显示JNS技术支持标语
        isProve: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            makeResultList: []
        };
    },
    created() {
        this.reportHandle();
    },
    mounted() {},
    methods: {
        /**
         * @Description: 处理诊断结果字段数据
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-31 16:51:41
         */
        reportHandle() {
            if (this.makeResult) {
                this.makeResult.indexOf("<br>") > -1
                    ? (this.makeResultList = this.makeResult.split("<br>"))
                    : this.makeResult.indexOf("\n") > -1
                    ? (this.makeResultList = this.makeResult.split("\n"))
                    : this.makeResultList.push(this.makeResult);
            }
            this.resultFormate(this.makeResultList);
        },
        /**
         * @Description: 过虑诊断结果空字段数据和添加序号
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-03 14:08:28
         */
        resultFormate(item) {
            if (item.length > 1) {
                let result = item
                    .filter(item => {
                        return item != "";
                    })
                    .map((item, index) => {
                        return index + 1 + "." + item;
                    });
                return (this.makeResultList = result);
            } else {
                return (this.makeResultList = item);
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .result-list {
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
        h4 {
            margin-left: 8px;
            padding: 10px 0 0 0px;
            margin-bottom: 15px;
            font-size: 18px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
            b {
                font-size: 20px;
                font-weight: bold;
            }
        }
        .make-result {
            letter-spacing: 0.1em;
            line-height: 1.2;
            margin-top: 5px;
            .prove {
                margin-top: 10px;
                margin-bottom: 10px;
                margin-left: 8px;
                color: #7fc3f0;
                img {
                    width: 16px;
                    height: auto;
                    vertical-align: bottom;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>