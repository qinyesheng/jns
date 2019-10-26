<!--
 * @Description: 捕车车辆详情（微信页）
 * @Author: linpeng
 * @Date: 2019-06-17 18:05:56
 * @LastEditTime: 2019-06-20 17:55:15
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page">
        <background/>
        <div class="banner" v-if="pic.length">
            <van-swipe :autoplay="3000" :show-indicators="false" :height="bannerHeight">
                <van-swipe-item v-for="(image, index) in pic" :key="index" class="img-item">
                    <img v-lazy="image" @click="enlargeImage(pic, index)">
                </van-swipe-item>
            </van-swipe>
            <div class="imgText">{{carData.carFullName}}</div>
        </div>
        <ul class="carInfo-list">
            <li v-if="carData.plateNo">
                <div class="name">车牌属地</div>
                <div class="value">{{carData.plateNo}}</div>
            </li>
            <li v-if="carData.tripDistance">
                <div class="name">表显里程</div>
                <div class="value">{{carData.tripDistance}}KM</div>
            </li>
            <li v-if="carData.carFullName">
                <div class="name">车辆全称</div>
                <div class="value">{{carData.carFullName}}</div>
            </li>
            <li v-if="carData.emissionsStandards">
                <div class="name">排放标准</div>
                <div class="value">{{carData.emissionsStandards}}</div>
            </li>
            <li v-if="carData.productionDate">
                <div class="name">出厂日期</div>
                <div class="value">{{carData.productionDate}}</div>
            </li>
            <li v-if="carData.registrationDate">
                <div class="name">注册日期</div>
                <div class="value">{{carData.registrationDate}}</div>
            </li>
            <li v-if="carData.issueDate">
                <div class="name">发证日期</div>
                <div class="value">{{carData.issueDate}}</div>
            </li>
            <li v-if="carData.carNature">
                <div class="name">车辆性质</div>
                <div class="value">{{carData.carNature}}</div>
            </li>
            <li v-if="carData.userNature">
                <div class="name">使用性质</div>
                <div class="value">{{carData.userNature}}</div>
            </li>
            <li v-if="carData.endAnnualSurveyDate">
                <div class="name">年检到期时间</div>
                <div class="value">{{carData.endAnnualSurveyDate}}</div>
            </li>
            <li v-if="carData.trafficInsuranceDate">
                <div class="name">交强险到期时间</div>
                <div class="value">{{carData.trafficInsuranceDate}}</div>
            </li>
            <li v-if="carData.businessInsuranceDate">
                <div class="name">商业险到期时间</div>
                <div class="value">{{carData.businessInsuranceDate}}</div>
            </li>
            <li v-if="carData.carLocation">
                <div class="name">检测地点</div>
                <div class="value">{{carData.carLocation}}</div>
            </li>
            <li v-if="payStatus !== '0'">
                <div class="name">联系人</div>
                <div class="value">{{carData.carContact}}</div>
            </li>
            <li v-if="payStatus !== '0'">
                <div class="name">联系电话</div>
                <div class="value">
                    {{carData.carContactTel}}
                    <img
                        class="phone-icon"
                        src="../assets/image/cellphoneUCD.png"
                        @click.prevent="phoneCall(carData.carContactTel)"
                    >
                </div>
            </li>
        </ul>
        <pubButton title="信息查询" :isFixed="false" @buttonConfirm="buttonConfirm"/>
    </div>
</template>
<script>
import background from "@/components/background/background";
import pubButton from "@/components/public/pubButton";
import { ImagePreview, Swipe, SwipeItem } from "vant";
import { bannerHeightHandle, getUrlParams } from "@/utils/common";
import usedCarApi from "@/api/buche/buche";
export default {
    data() {
        return {
            carData: {},
            billId: "",
            pic: [require('../assets/image/car_default_bm_share.png')],
            payStatus: "0" ,// 支付状态 0待支付 1 支付成功
            imgPre:process.env.VUE_APP_BCIMG_URL
        };
    },
    computed: {
        bannerHeight() {
            return bannerHeightHandle();
        }
    },
    components: {
        background,
        pubButton,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        /**
         * @Description: 获取车型基本信息
         * @Author: linpeng
         * @Date: 2019-06-19 15:44:43
         */
        init() {
            let query = getUrlParams();
            if (query) {
                this.billId = query.billId;
                if (this.billId) {
                    let params = {
                        reqAct: "h5CarInfo",
                        workOrderId: this.billId
                    };
                    usedCarApi.usedCar(params).then(res => {
                        if (res.retCode == "0") {
                            this.carData = res.result;
                            if(this.carData.plateNo){
                                this.carData.plateNo = this.carData.plateNo.substring(0,2);
                            }
                            this.payStatus = res.result.payStatus;
                            if (res.result.carPic) {
                                this.pic = res.result.carPic.split(",");
                                for (var i=0;i<this.pic.length;i++) {
                                    this.pic[i] = this.imgPre+this.pic[i];
                                }
                            }
                        } else {
                            this.$toast.fail(res.retMsg);
                        }
                    });
                }
            }
        },
        /**
         * @Description: 放大图片
         * @Author: linpeng
         * @Date: 2019-05-10 16:07:34
         */
        enlargeImage(imgArray, index) {
            ImagePreview({
                images: imgArray,
                loop: false,
                startPosition: index,
                lazyLoad: true,
                showIndicators: true
            });
        },
        /**
         * @Description: 拨打电话
         * @Author: linpeng
         * @Date: 2019-06-19 11:15:39
         */
        phoneCall(phoneNum) {
            window.location.href = "tel:" + phoneNum;
        },
        /**
         * @Description: 信息查询按钮点击跳转
         * @Author: linpeng
         * @Date: 2019-06-18 11:46:46
         */
        buttonConfirm() {
            if (this.payStatus !== "0") {
                window.location.href = process.env.VUE_APP_WEB_BUCHE_URL +`/index.html#/bill/usedCarAssessDetectionReport?billId=${this.billId}&&sourceName=bcWechat`;
            } else {
                let params = {
                    reqAct: "toHelpBuyCarH5Pay",
                    workOrderId: this.billId,
                    payType: "1"
                };
                usedCarApi.usedCar(params).then(res => {
                    console.log(res);
                    if (res.retCode == "0") {
                        window.location.href = res.result.retUrl;
                    } else {
                        this.$toast.fail(res.retMsg);
                    }
                });
            }
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .banner {
        margin-bottom: 8px;
        position: relative;
        .img-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
        .imgText {
            position: absolute;
            text-align: center;
            width: calc(100% - 20px);
            left: 0;
            bottom: 0;
            font-size: 16px;
            color: #fff;
            padding: 13px 10px;
            line-height: 1.1;
            background: rgba(0, 0, 0, 0.2);
        }
    }
    .carInfo-list {
        margin-top: 10px;
        margin-bottom: 10px;
        li {
            margin-bottom: 1px;
            padding: 13px 10px;
            background: #fff;
            display: flex;
            font-size: 16px;
            .name {
                color: #969799;
                min-width: 37%;
            }
            .value {
                line-height: 1.1;
            }
            &:last-child {
                margin-bottom: 0;
            }
            .phone-icon {
                width: 16px;
                height: 16px;
                margin-left: 5px;
                vertical-align: bottom;
            }
        }
    }
}
</style>