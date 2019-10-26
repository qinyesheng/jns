<!--
 * @Description: 车况评分
 * @Author: wjx
 * @Date: 2019-07-27 11:00:29
 -->
<template>
    <div class="carScore" v-if="scoreCondition">
        <div class="carScore-Content">
            <div class="left">
                <ul>
                    <li class="score">{{scoreCondition.totalScore}}</li>
                    <li class="t1">
                        <span v-if="scoreCondition.totalScore<35">车况极差</span>
                        <span v-else-if="scoreCondition.totalScore<60">车况较差</span>
                        <span v-else-if="scoreCondition.totalScore<85">车况良好</span>
                        <span v-else-if="scoreCondition.totalScore<100">车况优良</span>
                    </li>
                    <li class="t2">车况评分</li>
                </ul>
            </div>
            <div class="right">
                <ul>
                    <li>{{scoreCondition.orgName}}</li>
                    <li>
                        <span v-if="scoreCondition.techNumber!==''">认证检测师</span>
                        {{scoreCondition.createUserName}}
                    </li>
                    <li>{{scoreCondition.detectionTime}}</li>
                </ul>
            </div>
        </div>
        <div class="carScore-foot">根据已检测项目的检测结果计算健康状态</div>
    </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
    data() {
        return {};
    },
    props: {
        scoreCondition: {
            type: Object,
            default: {}
        }
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>
<style lang="less" scoped>
.carScore {
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    .carScore-Content {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        li {
            padding: 5px 15px;
        }
        .left {
            text-align: center;
            .score {
                font-size: 65px;
                font-weight: bold;
            }
            .t1 {
                font-weight: bold;
                letter-spacing: 4px;
            }
            .t2 {
                color: #6e6e6e;
                font-size: 14px;
                letter-spacing: 4px;
            }
        }
        .right {
            color: #6e6e6e;
            display: flex;
            align-items: center;
            text-align: right;
            span {
                background: #389cd8;
                color: #ffffff;
                font-size: 0.32rem;
                padding: 1px 5px;
                border-radius: 2px;
            }
        }
    }
    .carScore-foot {
        padding: 10px;
        border-top: 1px solid #efefef;
        text-align: center;
        color: #6e6e6e;
        letter-spacing: 4px;
        font-size: 12px;
    }
}
</style>
