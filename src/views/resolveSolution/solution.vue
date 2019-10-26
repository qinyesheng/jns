<!--
 * @Description: 维修方案
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 15:39:35
 * @LastEditTime: 2019-09-18 14:52:23
 -->

<template>
    <div id="solutionContainer" class="jns-container">
        <div class="inverse-bg-grey"></div>
        <headerOne :title="title" :isFixed="true" :backgroundStatus="true" />
        <div class="header-container">
            <div class="solution">
                <div>
                    <h3 style="font-size:27px;">维修方案</h3>
                </div>
                <div class="solution-block">
                    <h4>
                        <div class="grid-demo grid-demo-bg1 text-left">
                            <b>诊断结果</b>
                        </div>
                    </h4>
                    <div style="padding:10px 0;">{{checkResult}}</div>
                </div>
                <!-- 权限验证 -->
                <div v-if="checkSolution==1">
                    <div class="solution-block" v-if="warrantyPeriod&&warrantyPeriod!='无质保'">
                        <h4>
                            <b>优选技术支持服务商</b>
                        </h4>
                        <div style="padding:10px 0;">
                            <img src="../../assets/image/zb.png" alt height="20" class="zb-icon" />
                            由JNS • PICC提供{{warrantyPeriod}}保障
                        </div>
                    </div>
                    <div class="solution-block" v-if="maintenanceData.resolvent.length>0">
                        <h4 style="padding:10px 0 0 0;">
                            <b>方案工艺流程</b>
                        </h4>
                        <ul class="quality-choice">
                            <li
                                class="quality-choice-li"
                                v-for="(item, index) in maintenanceData.resolvent"
                                :key="index"
                            >
                                <div>{{index+1}}.{{item.repair}}</div>
                                <van-icon
                                    class="videoPlayPop-icon"
                                    v-if="item.video.video_id"
                                    name="play-circle-o"
                                    v-on:click="toolVideoImg(item.video)"
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="solution-block" v-if="maintenanceData.parts.length>0">
                        <div class="solution-parts">
                            <h4 style="padding:10px 0 0 8px;">
                                <b>方案配件耗材采购价</b>
                            </h4>
                            <ul class="price-content">
                                <li v-for="(item, index) in maintenanceData.parts" :key="index">
                                    <div>{{item.name}}</div>
                                    <div class="text-right">
                                        <span>￥{{item.price}}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="solution-project" v-if="maintenanceData.labor.length>0">
                            <h4 style="padding:10px 0 0 8px;">
                                <b>方案工时费</b>
                            </h4>
                            <ul class="price-content">
                                <li v-for="(item, index) in maintenanceData.labor" :key="index">
                                    <div>{{item.name}}</div>
                                    <div class="text-right">
                                        <span>￥{{item.price}}</span>
                                    </div>
                                </li>
                            </ul>
                            <div class="priceTotal">
                                <span>服务费合计</span>
                                <div class="total_text">
                                    <span>￥{{priceTotal}}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            class="text-center"
                            style="margin:20px 0 0 0;"
                            v-show="technicalServicesStatus"
                        >
                            <van-button class="booking-btn" type="info" v-on:click="goAMap">预约技术服务</van-button>
                        </div>
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
                            <!-- <a href="./assets/file/fwxy1.pdf" class="service-agreement-li"></a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="nopaySolution" v-if="checkSolution!=1">
            <div>
                <img width="100%" src="../../assets/image/nopay.png" alt />
            </div>
            <div
                class="text-center"
                style="margin:20px 0 0 0;position:absolute;bottom:10px;left:10px;right:10px;"
            >
                <van-button class="notBuy-btn" type="info">未购买该系统方案</van-button>
            </div>
        </div>
        <van-popup v-model="isShowVideo">
            <div id="showVideoImg">
                <div class="pop-title">{{videoData.name}}</div>
                <div class="text-center">
                    <img :src="videoData.imgUrl" />
                    <div
                        style="position:absolute;z-index:1;bottom:10px;left:10px;opacity:0.3;background:#000;height:60px;right:10px;"
                    ></div>
                    <div class="showVedioPlay" @click="videoPlay">
                        <van-icon class="videoPlay-icon" name="play-circle-o" />
                    </div>
                    <van-icon
                        class="popClose-icon layerVideoId"
                        name="cross"
                        @click="isShowVideo = false"
                    />
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import aiMaintainSolutionApi from "@/api/aiMaintainSolution/solution";
import ownShopMngApi from "@/api/ownShopMng/servantInfo";
import jnsApi from "@/utils/jnsApi";

export default {
    components: {
        headerOne: headerOne
    },
    data() {
        return {
            carInfo: {},
            checkResult: "",
            warrantyPeriod: "",
            maintenanceData: {
                parts: [],
                labor: [],
                resolvent: []
            },
            priceTotal: "",
            checkSolution: 1,
            videoData: {
                imgUrl: "",
                name: "",
                videoId: ""
            },
            layerVideoId: "",
            resolveSolution: {},
            technicalServicesStatus: true,
            isShowVideo: false,
            title: "" //维修方案
        };
    },

    created: function() {
        this.resolveSolution = this.$session.get("resolveSolution");
        if (this.resolveSolution && !this.resolveSolution.sourceType) {
            console.log(this.resolveSolution);
            this.technicalServicesStatus = false;
        }
    },
    mounted: function() {
        var self = this;
        window.onscroll = function() {
            var a =
                document.documentElement.scrollTop || document.body.scrollTop; //滚动条y轴上的距离
            var b =
                document.documentElement.clientHeight ||
                document.body.clientHeight; //可视区域的高度
            var c =
                document.documentElement.scrollHeight ||
                document.body.scrollHeight; //可视化的高度与溢出的距离（总高度）
            if (a + b == c) {
                // alert('已滚动到底部!')
            }
            if ((a <= b || a > b) && a >= 100) {
                self.title = "维修方案";
            } else {
                self.title = "";
            }
        };
        this.carInfo = this.$session.get("carInfo");
        var data = {
            solution_check_result_id: this.$route.query.checkResultSearchId,
            solution_result_id: this.$route.query.solutionResultId,
            brand_id: this.carInfo ? this.carInfo.carBrandId : "",
            line_id: this.carInfo ? this.carInfo.carLineId : "",
            car_cc: this.carInfo ? this.carInfo.carCc + this.carInfo.unit : "",
            car_year: this.carInfo ? this.carInfo.nianKuan : ""
        };
        aiMaintainSolutionApi.getQualitySolutionData(data).then(res => {
            if (res.code == 20000) {
                // console.log(res.data)
                var data = res.data;
                if (data) {
                    // console.log(data);
                    self.checkResult = data.check_result;
                    self.checkSolution = data.check_solution;
                    self.priceTotal = data.total_price;
                    var schemeData = data.scheme;
                    if (self.checkSolution == 1 && schemeData) {
                        // console.log(schemeData)
                        if (schemeData.warranty_period) {
                            self.warrantyPeriod = schemeData.warranty_period;
                        }
                        var maintenance_way = schemeData.maintenance_way;
                        var parts = [];
                        if (maintenance_way) {
                            if (maintenance_way.parts.length > 0) {
                                parts = parts.concat(maintenance_way.parts);
                            }
                            if (maintenance_way.consumable.length > 0) {
                                parts = parts.concat(
                                    maintenance_way.consumable
                                );
                            }
                        }
                        self.maintenanceData.parts = parts;
                        self.maintenanceData.labor = maintenance_way.labor;
                        if (data.scheme.resolvent.length > 0) {
                            self.maintenanceData.resolvent =
                                data.scheme.resolvent;
                        }
                    }
                }
            }
        });
    },
    methods: {
        solutionSubmit: function() {
            var self = this;
        },
        toolVideoImg: function(video) {
            var self = this;
            this.isShowVideo = true;
            this.videoData.imgUrl = video.img_src;
            this.videoData.name = video.name;
            this.videoData.videoId = video.video_id;
        },
        videoPlay: function() {
            let videoId = this.videoData.videoId;
            let params = {
                videoId: videoId
            };
            ownShopMngApi.getVideoPlayAuth(params).then(res => {
                if (res.code == 20000) {
                    var data = res.data;
                    if (data.playAuth) {
                        jnsApi.jumpPlay(videoId, data.playAuth);
                    } else {
                        this.$toast.fail("播放失败");
                    }
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        goAMap: function() {
            var self = this;
            if (!this.carInfo) {
                return false;
            }
            var obj = {
                vin: self.carInfo.vin,
                carBrandId: self.carInfo.carBrandId,
                carBrandName: self.carInfo.carBrandName,
                carLineId: self.carInfo.carLineId,
                carLineName: self.carInfo.carLineName,
                carModelFullName: self.carInfo.carModelFullName,
                carModelId: self.carInfo.carModelId,
                gearboxType: self.carInfo.gearboxType,
                nianKuan: self.carInfo.nianKuan,
                produceYear: self.carInfo.produceYear,
                carCc: self.carInfo.carCc,
                unit: self.carInfo.unit
            };
            console.log(obj);
            jnsApi.reservationService(obj);
        }
    }
};
</script>
<style lang='less'>
#solutionContainer {
    .van-button {
        border-radius: 10px;
        width: 100%;
        font-size: 16px;
    }
    .booking-btn {
        background-color: #46aef7;
        border: 1px solid #46aef7; /*no*/
        color: #fff;
    }
    .notBuy-btn {
        background-color: #393d49;
        border: 1px solid #393d49; /*no*/
        color: #fff;
    }
    .van-popup {
        overflow: visible;
    }
}
</style>
<style lang='less' scoped>
.jns-container {
    padding: 0 10px;
}
b {
    font-weight: bold;
}
.header-container {
    margin-top: 60px;
    font-size: 14px;
}
.quality-choice-li {
    position: relative;
    padding: 10px 30px 10px 0px;
    border-bottom: 1px solid #f2f2f2;
    line-height: 18px;
    .videoPlayPop-icon {
        font-size: 18px;
        color: #1e9fff;
    }
}
.quality-choice-li:last-child {
    border-bottom: 0;
}
.quality-choice-li i {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0px;
    bottom: 0px;
    right: 0px;
    margin: auto;
}
.inverse-bg-grey {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
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
.solution-block {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-top: 15px;
    .zb-icon {
        vertical-align: middle;
    }
}
.solution-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    overflow: hidden;
}
.priceTotal {
    display: flex;
    font-size: 16px;
}
.priceTotal > span {
    flex: 1;
    padding: 9px 8px;
}
.priceTotal .total_text {
    width: 100px;
    padding: 9px 8px;
    text-align: right;
}
.price-content {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    li {
        padding: 9px 8px;
        display: flex;
        justify-content: space-between;
        color: #666;
        min-height: 20px;
        line-height: 20px;
    }
}

#showVideoImg {
    width: 260px;
    font-size: 16px;
    position: relative;
    .pop-title {
        padding: 15px 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .text-center {
        padding: 10px;
    }
    img {
        width: 100%;
    }
    .showVedioPlay {
        position: absolute;
        z-index: 3;
        bottom: 10px;
        left: 10px;
        height: 60px;
        right: 10px;
        .videoPlay-icon {
            position: absolute;
            top: 50%;
            left: 10px;
            font-size: 36px;
            z-index: 2;
            color: #fff;
            transform: translateY(-50%);
        }
    }
    .popClose-icon {
        position: absolute;
        font-size: 20px;
        top: -11px;
        right: -8px;
        border-radius: 50%;
        z-index: 3;
        width: 32px;
        height: 32px;
        background: #ccc;
        color: #fff;
        line-height: 32px;
    }
}
</style>