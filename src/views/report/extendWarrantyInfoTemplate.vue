<!--
 * @Description: 延长保修报告 渲染模板
 * @Author: wjx
 * @Date: 2019-09-02 14:35:35
 -->
<template>
    <div>
        <div class="titleBox">
            <img :src="titleImg" />
            <div class="info">
                <span>认证技师</span>
                <span>{{baseInfo.createUserName}}</span>
                <span>{{baseInfo.detectionTime}}</span>
            </div>
        </div>
        <div class="banner-base-info" id="reportBaseInfo">
            <!-- 报告基本信息 -->
            <reportBaseInfo :baseInfo="baseInfo" />
        </div>
        <div id="reportResultList">
            <!-- 报告诊断结果 -->
            <reportResultList :makeResult="makeResult" />
        </div>
        <div v-if="maintainSchemes" id="reportMaintainScheme">
            <!-- 维修方式 -->
            <reportMaintainScheme
                :maintainScheme="maintainSchemes"
                :showStates="false"
                v-if="report.maintenance"
            />
            <van-row class="total" v-if="maintainSchemes.total_price">
                <van-col :span="16">合计</van-col>
                <van-col :span="8" class="text-right">{{maintainSchemes.total_price}} 元</van-col>
            </van-row>
        </div>

        <!-- <div class="explain" :class="report.maintenance.length>0?'move':''">
            <div>声明</div>
            <div>1、本报告内容最终解释权归：{{report.shopName}}所有</div>
            <div>2、报告展示效果由JNS提供</div>
        </div>-->
        <div class="ad">
            <a class="a" href="https://d.wps.cn/v/8qiEP" target="_blank">
                <img class="bg" :src="adImg" />
                <img class="carClick" :src="carClick" />
            </a>
        </div>
    </div>
</template> 

<script>
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import reportResultList from "@/components/report/reportResultList";
import reportMaintainScheme from "@/components/report/underlineRule/reportMaintainScheme";
import reportApi from "@/api/common/report";
import { Tag } from "vant";
import { ImagePreview, Swipe, SwipeItem } from "vant";

export default {
    props: {
        report: {
            type: Object,
            default: {}
        },
        // 报告基本信息
        baseInfo: {
            type: Object,
            default: {}
        },
        // 报告诊断结果
        makeResult: {
            type: String,
            default: ""
        },
        // 维修方式
        maintainScheme: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            titleImg: require("@image/extendWarranty.png"),
            adImg: require("@image/extendWarranty_ad.png"),
            carClick: require("@image/carClick.png"),
            maintainSchemeLength: "",
            maintainSchemes: this.maintainScheme
        };
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        reportBaseInfo,
        reportResultList,
        reportMaintainScheme,
        Tag
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 箭头点击函数
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 18:14:50
         */
        arrowClick(item, index) {
            item.more = !item.more;
            this.$set(this.sysInfo, index, item);
        },
        /**
         * @Description: 放大缩略图
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 16:02:14
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        }
    }
};
</script>
<style lang="less" scoped>
.titleBox {
    padding: 15px 0;
    img {
        width: 100%;
    }
    .info {
        padding-top: 10px;
        color: #999999;
        span:nth-child(1) {
            background: #389cd8;
            color: #ffffff;
            font-size: 0.32rem;
            padding: 1px 5px;
            border-radius: 2px;
            margin-right: 10px;
        }
        span:nth-child(2) {
            margin-right: 20px;
        }
    }
}
.explain {
    background-color: #fff;
    padding: 10px 15px 10px 15px;
    color: #999999;
    border-radius: 5px;
    div {
        line-height: 20px;
        padding-bottom: 10px;
    }
    div:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
        color: #595959;
    }
}
.total {
    background: #fff;
    margin-bottom: 15px;
    margin-top: -30px;
    padding: 15px;
    border-radius: 4px;
    color: #666;
}
.ad {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    .bg {
        width: 100%;
        border-radius: 5px;
    }
    .carClick {
        position: absolute;
        top: 50px;
        left: 70px;
        z-index: 1;
        width: 40px;
        height: 40px;
        animation: myfirst 0.2s linear 0.2s infinite alternate;
        -moz-animation: myfirst 0.2s linear 0.2s infinite alternate;
        -webkit-animation: myfirst 0.2s linear 0.2s infinite alternate;
        -o-animation: myfirst 0.2s linear 0.2s infinite alternate;
    }
}
.move {
    margin-bottom: 0.4rem;
    margin-top: -20px;
    padding: 0px 15px 10px 15px;
}
// 重写样式
.van-tag {
    padding: 2px 0.5em;
    display: block;
    text-align: center;
    font-size: 14px;
}

.report-block {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
}
.text-right {
    text-align: right;
}

@keyframes myfirst {
    0% {
        top: 50px;
        left: 75px;
    }
    50% {
        top: 45px;
        left: 70px;
    }
    100% {
        top: 50px;
        left: 75px;
    }
}
</style>

