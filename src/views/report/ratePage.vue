<!--
 * @Description: 评价
 * @Author: wjx
 * @Date: 2019-09-27 09:28:52
 -->
 
<template>
    <div class="page ratePage">
        <background />
        <headerOne
            :title="$route.meta.title"
            :isFixed="true"
            :backgroundStatus="true"
            :onClickLeftStatus="true"
            @onClickLeft="back"
        />
        <div class="main-container">
            <div class="box">
                <div class="title row">环境舒适度</div>
                <div class="row evaluate">
                    <span v-if="comfort==0"></span>
                    <span v-else-if="comfort==1">"差评"</span>
                    <span v-else-if="comfort==2">"合格"</span>
                    <span v-else-if="comfort==3">"一般"</span>
                    <span v-else-if="comfort==4">"满意"</span>
                    <span v-else-if="comfort==5">"好评"</span>
                </div>
                <div class="row">
                    <van-rate
                        v-model="comfort"
                        :readonly="status!=0"
                        void-icon="star"
                        @change="selectComfortChange"
                    />
                </div>
            </div>
            <div class="box">
                <div class="title row">技师专业度</div>
                <div class="row evaluate">
                    <span v-if="proficient==0"></span>
                    <span v-else-if="proficient==1">"差评"</span>
                    <span v-else-if="proficient==2">"合格"</span>
                    <span v-else-if="proficient==3">"一般"</span>
                    <span v-else-if="proficient==4">"满意"</span>
                    <span v-else-if="proficient==5">"好评"</span>
                </div>
                <div class="row">
                    <van-rate
                        v-model="proficient"
                        :readonly="status!=0"
                        void-icon="star"
                        @change="selectProficientChange"
                    />
                </div>
            </div>
            <div class="box service">
                <div class="title row">服务满意度</div>
                <div class="row evaluate">
                    <span v-if="satisfaction==0"></span>
                    <span v-else-if="satisfaction==1">"差评"</span>
                    <span v-else-if="satisfaction==2">"合格"</span>
                    <span v-else-if="satisfaction==3">"一般"</span>
                    <span v-else-if="satisfaction==4">"满意"</span>
                    <span v-else-if="satisfaction==5">"好评"</span>
                </div>
                <div class="row">
                    <van-rate
                        v-model="satisfaction"
                        :readonly="status!=0"
                        void-icon="star"
                        @change="selectSatisfactionChange"
                    />
                </div>
                <div class="title row" style="margin-top: 10px;">评价原因</div>
                <div class="row cause">
                    <textarea
                        class="site"
                        rows="6"
                        v-model="content"
                        :placeholder="status==0?'输入内容':'暂无原因'"
                        :readonly="status!=0"
                    ></textarea>
                    <div
                        class="text-right"
                        v-if="status==0"
                    >{{this.contentMaxLength - this.content.length}}</div>
                </div>
            </div>
            <pubButton v-if="status==0" title="提交" :isFixed="true" @buttonConfirm="rate()"></pubButton>
        </div>
    </div>
</template>

<script>
import headerOne from "@/components/header/headerOne";
import { Rate } from "vant";
import pubButton from "@/components/public/pubButton";
import background from "@/components/background/background";
// import back from "@/utils/back";
import billScoreApi from "@/api/common/billScore";
export default {
    components: {
        [Rate.name]: Rate,
        pubButton,
        background,
        headerOne
    },
    data() {
        return {
            comfort: 0, // 环境舒适度
            oldComfort: 0,
            proficient: 0, // 技师专业度
            oldProficient: 0,
            satisfaction: 0, // 服务满意度
            oldSatisfaction: 0,
            content: "", // 评价原因
            contentMaxLength: 300, // 输入长度
            data: {},
            reportType:"",//报告类型
            code: "",
            status: 0
        };
    },
    created() {},
    mounted() {
        let query = this.$route.query;
        if (query) {
            this.code = query.code;
            if (this.code) {
                this.getBillScoreInfo(this.code);
            }
            this.reportType = query.reportType;
        }
    },
    methods: {
        rate() {
            this.saveBillScore();
        },
        /**
         * @Description: 根据code获取工单报告综合评价
         * @Param: code
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 18:09:51
         */
        getBillScoreInfo(code) {
            billScoreApi.getBillScoreInfo({ code }).then(res => {
                if (res.code == 20000) {
                    var data = res.data;
                    this.comfort = Number(data.star_a); // 环境舒适度
                    this.proficient = Number(data.star_b); // 技师专业度
                    this.satisfaction = Number(data.star_c); // 服务满意度
                    this.content = data.descs ? data.descs : ""; // 评价原因
                    this.status = data.status;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 保存工单报告满意度评分
         * @Param: code
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 18:10:08
         */
        saveBillScore(code) {
            var parms = {
                code: this.code,
                star_a: this.comfort,
                star_b: this.proficient,
                star_c: this.satisfaction,
                descs: this.content
            };
            billScoreApi.saveBillScore(parms).then(res => {
                if (res.code == 20000) {
                    this.$toast.fail("评价完成");
                    setTimeout(() => {
                        if(this.reportType=='J002'){
                            let owner_url = process.env.VUE_APP_WEB_OWNER_URL+"/carReport.html?code="+this.code;
                            window.location.replace(owner_url);
                        }
                        // this.getBillScoreInfo(this.code);
                        // 浏览器返回
                        // this.back();
                    }, 1000);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 选中星星事件
         * @Param: 分数
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 18:10:31
         */
        selectComfortChange(value) {
            if (this.oldComfort == value) {
                this.comfort = 0;
            }
        },
        selectProficientChange(value) {
            if (this.oldProficient == value) {
                this.proficient = 0;
            }
        },
        selectSatisfactionChange(value) {
            if (this.oldSatisfaction == value) {
                this.satisfaction = 0;
            }
        },
        /**
         * @Description: 后退事件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-30 11:12:13
         */
        back() {
            // this.$route.back();
            // window.history.back();
            if(this.reportType=='J002'){
                let owner_url = process.env.VUE_APP_WEB_OWNER_URL+"/carReport.html?code="+this.code;
                window.location.replace(owner_url);
            }
        }
    },
    watch: {
        comfort: function(val, oldVal) {
            this.oldComfort = val;
        },
        proficient: function(val, oldVal) {
            this.oldProficient = val;
        },
        satisfaction: function(val, oldVal) {
            this.oldSatisfaction = val;
        },
        content() {
            if (this.content.length > this.contentMaxLength) {
                this.content = String(this.content).slice(
                    0,
                    this.contentMaxLength
                );
            }
        }
    }
};
</script>
<style lang="less" scoped>
.ratePage {
    .box {
        color: #666;
        background: #fff;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 15px;
        .content {
            width: 100%;
        }
        .row {
            padding-bottom: 10px;
        }
        .evaluate {
            text-align: center;
            color: #f9bc2d;
        }
        /deep/.van-rate__item {
            display: inline-block;
            position: relative;
            padding: 0 0.05333rem;
            width: 18.8%;
            text-align: center;
        }
        /deep/.van-icon {
            font-size: 25px !important;
        }
    }
    .service {
        .cause {
            background-color: #f2f2f2;
            padding: 10px;
            textarea {
                border: none;
                resize: none;
                width: 98%;
                background-color: #f2f2f2;
            }
        }
    }
    .text-center {
        text-align: center;
    }
    .text-right {
        text-align: right;
    }
}
</style>
