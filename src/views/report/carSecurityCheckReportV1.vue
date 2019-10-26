<!--
 * @Description: 汽车安检报告模板，根据传进来的数据进行页面渲染
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-14 11:23:03
 * @LastEditTime: 2019-05-29 15:06:36
 -->
<template>
    <div class="usedCarDetection page">
        <div class="inverse-bg-grey"></div>
        <div class="main-container">
            <div class="solution">
                <div class="tips" v-if="pointMsgShow">
                    <span class="text">{{data.orgPointsStatusMsg}}</span>
                    <van-icon name="close" class="closeIcon" @click="pointMsgShow = false"/>
                </div>
                <div class="tips" v-if="openMsgShow">
                    <span class="text">{{data.pushSmsStatusMsg}}</span>
                    <van-icon name="close" class="closeIcon" @click="openMsgShow = false"/>
                </div>
                <div class="head-icon">
                    <h3>{{report.shopName}}</h3>
                    <h2>{{report.reportTitle}}</h2>
                </div>
                <div class="carInfo report-block">
                    <div
                        class="banner"
                        v-if="report.baseInfo.picList&&report.baseInfo.picList.length"
                    >
                        <van-swipe :autoplay="3000" :show-indicators="false" :height="bannerHeight">
                            <van-swipe-item
                                v-for="(image, index) in report.baseInfo.picList"
                                :key="index"
                            >
                                <img
                                    v-lazy="image"
                                    width="100%"
                                    @click="enlargeImage(report.baseInfo.picList, index)"
                                >
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <div class="carInfo-top">
                        <img
                            class="car-icon"
                            v-lazy="carLogoPre + report.baseInfo.carBrandLogo +'.jpg'"
                            v-if="report.baseInfo.carBrandLogo"
                        >
                        <span class="carName">{{report.baseInfo.carMemo}}</span>
                    </div>
                    <ul class="carInfo-bottom">
                        <li>
                            <span class="item-name">车架号（VIN码）</span>
                            <span class="item-data">{{report.baseInfo.carVinNo}}</span>
                        </li>
                        <li>
                            <span class="item-name">公里数</span>
                            <span class="item-data">{{report.baseInfo.miles | mileTurn}}</span>
                        </li>
                    </ul>
                </div>
                <div class="report-score report-block">
                    <div class="content">
                        <div class="leftside">
                            <div class="score-detail">{{report.baseInfo.totalScore}}</div>
                            <div class="score-text">{{report.baseInfo.totalScore | scoreTurn}}</div>
                            <div class="score-label">车况评分</div>
                        </div>
                        <div class="rightside">
                            <div class="shop-name">{{report.baseInfo.createShopName}}</div>
                            <div class="create-username">
                                <span class="prove" v-if="report.baseInfo.techNumber">认证检测师</span>
                                <span>{{report.baseInfo.createUserName}}</span>
                            </div>
                            <div class="create-time">{{report.baseInfo.detectionTime}}</div>
                        </div>
                    </div>
                    <div class="score-footer">根据已检测项目的检测结果计算健康状态</div>
                </div>
                <div>
                    <div class="report-block" v-if="makeResultList.length">
                        <h4>
                            <b>诊断结果</b>
                        </h4>
                        <div class="make-result">
                            <van-cell
                                v-for="(value, key) in makeResultList"
                                :key="key"
                                :value="value"
                            />
                        </div>
                    </div>
                    <div class="report-block system-list-block">
                        <div class="system-list" v-if="systemList.length">
                            <div>
                                <h4>
                                    <b>检测与诊断项目</b>
                                </h4>
                                <div
                                    v-for="(item, index) in systemList"
                                    :key="index"
                                    class="system-list-item"
                                >
                                    <div class="list-title">
                                        <div class="list-status">
                                            <h5>{{bigSytemCode[item.code]}}</h5>
                                            <span
                                                class="list-status-detail"
                                                :style="{color:item.status != '1' && item.status != 'e'?'#f2bc4e':''}"
                                            >{{item.status | systemStatusTurn}}</span>
                                        </div>
                                        <div
                                            class="arrow-btn"
                                            v-if="showList.includes(item.code)"
                                            @click="showListChange(item.code)"
                                        >
                                            <span>收起</span>
                                            <i class="arrow">
                                                <img src="../../assets/image/arrow-up.png">
                                            </i>
                                        </div>
                                        <div
                                            class="arrow-btn"
                                            v-else
                                            @click="showListChange(item.code)"
                                        >
                                            <span>详情</span>
                                            <i class="arrow">
                                                <img src="../../assets/image/arrow-down.png">
                                            </i>
                                        </div>
                                    </div>
                                    <div class="overall" v-show="showList.includes(item.code)">
                                        <div class="overall-title">
                                            整体情况
                                            <span
                                                class="faultnum"
                                                v-if="item.faultNumber"
                                            >{{item.faultNumber}}项故障</span>
                                        </div>
                                        <div class="overall-content" v-if="item.status == 'e'">未检测</div>
                                        <div class="overall-content" v-else>{{item.promptDesc}}</div>
                                    </div>
                                    <ul v-show="showList.includes(item.code) && item.status != 'e'">
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div class="name">
                                                <span class="text">{{subItem.itemName}}</span>
                                                <span
                                                    class="level level0"
                                                    v-if="subItem.level == '0'"
                                                >轻微</span>
                                                <span
                                                    class="level level2"
                                                    v-if="subItem.level == '2'"
                                                >中度</span>
                                                <span
                                                    class="level level3"
                                                    v-if="subItem.level == '3'"
                                                >严重</span>
                                            </div>
                                            <div
                                                class="result"
                                                v-if="subItem.detectionResult || subItem.result"
                                            >
                                                <span class="label result-label">检测结果</span>
                                                <span
                                                    class="text"
                                                    v-if="subItem.level == '1'"
                                                >{{subItem.result}}</span>
                                                <span
                                                    class="text"
                                                    v-if="subItem.level == '0' || subItem.level == '2' || subItem.level == '3'"
                                                >{{subItem.detectionResult}}</span>
                                            </div>
                                            <div class="result" v-if="subItem.riskForecast">
                                                <div class="label airesult-label">AI诊断结果</div>
                                                <span class="text">{{subItem.riskForecast}}</span>
                                            </div>
                                            <div
                                                class="jnsRead"
                                                v-if="subItem.jnsExplanationList && subItem.jnsExplanationList.length"
                                            >
                                                <span class="label">JNS解读</span>
                                                <div
                                                    class="jnsRead-list"
                                                    v-if="subItem.jnsExplanationList.length == 1"
                                                >
                                                    <a
                                                        v-for="(jnsItem, index) of subItem.jnsExplanationList"
                                                        :key="index"
                                                        :href="jnsItem.url"
                                                        class="text"
                                                    >{{jnsItem.title}}</a>
                                                </div>
                                                <div class="jnsRead-list" v-else>
                                                    <a
                                                        v-for="(jnsItem, index) of subItem.jnsExplanationList"
                                                        :key="index"
                                                        :href="jnsItem.url"
                                                        class="text"
                                                    >{{index+1+'.'+jnsItem.title}}</a>
                                                </div>
                                            </div>
                                            <div
                                                class="result-photo"
                                                v-if="subItem.imgList && subItem.imgList.length"
                                            >
                                                <img
                                                    v-for="(item, index) of subItem.imgList"
                                                    :key="index"
                                                    v-lazy="item"
                                                    @click="enlargeImage(subItem.imgList, index)"
                                                >
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="report-block" v-if="report.maintenance.length">
                        <div
                            v-if="maintainScheme.parts.length || maintainScheme.maintenanceMode.length"
                        >
                            <h4>
                                <b>维修方式</b>
                            </h4>
                            <div class="selectBtn" v-if="report.maintenance.length > 1">
                                <div
                                    class="btn"
                                    :class="activeIndex == index? 'active' : ''"
                                    v-for="(item, index) of report.maintenance"
                                    :key="index"
                                    @click="selectMaintainScheme(index)"
                                >{{index == 0? '即时维修方式':'预案维修方式'}}</div>
                            </div>
                            <!-- 单方案样式 -->
                            <div
                                class="selectBtn selectBtnOnly"
                                v-if="report.maintenance.length == 1"
                            >
                                <div class="btn active">{{hasLevel3? '即时维修方式':'预案维修方式'}}</div>
                            </div>
                            <div class="solution-parts">
                                <div v-if="maintainScheme.parts.length">
                                    <div class="list-titlt">
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="11" class="main-title">配件耗材</van-col>
                                            <van-col span="7" v-if="brandTitleShow">品牌</van-col>
                                            <van-col span="7" class="text-right">价格(元)</van-col>
                                        </van-row>
                                    </div>
                                    <ul class="content-list">
                                        <li
                                            v-for="(item, key) in maintainScheme.parts"
                                            :key="item.name+key"
                                        >
                                            <van-row type="flex" justify="space-between">
                                                <van-col span="10">{{item.name}}</van-col>
                                                <van-col span="8">{{item.brand}}</van-col>
                                                <van-col span="4" class="text-right">
                                                    <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                                </van-col>
                                            </van-row>
                                        </li>
                                        <li>
                                            <van-row type="flex" justify="space-between">
                                                <van-col span="10">合计</van-col>
                                                <van-col span="8"></van-col>
                                                <van-col span="6" class="text-right">
                                                    <span>{{maintainScheme.total}}</span>
                                                </van-col>
                                            </van-row>
                                        </li>
                                    </ul>
                                </div>
                                <div v-if="maintainScheme.maintenanceMode.length">
                                    <div class="list-titlt">
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="11" class="main-title">维修项目</van-col>
                                            <van-col span="8" class="text-right">计划工时(小时)</van-col>
                                        </van-row>
                                    </div>
                                    <ul class="content-list">
                                        <li
                                            v-for="(item, key3) in maintainScheme.maintenanceMode"
                                            :key="key3"
                                        >
                                            <van-row type="flex" justify="space-between">
                                                <van-col span="14">{{item.maintenanceName}}</van-col>
                                                <van-col span="4" class="text-right">
                                                    <span>{{item.maintenanceTime>0?item.maintenanceTime:'-'}}</span>
                                                </van-col>
                                            </van-row>
                                        </li>
                                        <li>
                                            <van-row type="flex" justify="space-between">
                                                <van-col span="14">合计</van-col>
                                                <van-col span="4" class="text-right">
                                                    <span>{{maintainScheme.maintenanceTimeTotal}}</span>
                                                </van-col>
                                            </van-row>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="statement">
                            <h3>声明</h3>
                            <ul>
                                <li>本报告内容最终解释权归：{{report.shopName}}所有</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import { ImagePreview, Swipe, SwipeItem } from "vant";
import { bannerHeightHandle } from "@/utils/common";
export default {
    filters: {
        // 公里数
        mileTurn(val) {
            if (!val) {
                return "";
            }
            val = parseInt(val);
            if (val > 10000) {
                val = (val / 10000).toFixed(2) + "万";
                return val.toString();
            } else {
                return val.toString() + "公里";
            }
        },
        // 分数转评价
        scoreTurn(val) {
            if (!val) {
                return "";
            }
            if (val < 35) {
                return "车况极差";
            } else if (val >= 35 && val < 60) {
                return "车况较差";
            } else if (val >= 60 && val < 85) {
                return "车况良好";
            } else if (val >= 85) {
                return "车况优良";
            }
        },
        // 状态转评价
        systemStatusTurn(val) {
            if (!val) {
                return "";
            }
            if (val == "e") {
                return "未检测";
            } else if (val == "1") {
                return "正常";
            } else {
                return "异常";
            }
        }
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem
    },
    data() {
        return {
            bannerHeight: bannerHeightHandle(),
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            systemList: [],
            brandTitleShow: false, // 配件耗材品牌标题是否显示
            maintainScheme: {
                parts: [],
                maintenanceMode: []
            }, // 当前维修方案
            makeResultList: [],
            bigSytemCode: {
                // 大系统名称
                bodywk: "外观内饰",
                light: "灯光系统",
                elect: "车载电脑",
                supply: "供电系统", // 该系统由前端从elect中拆分 'elect_batteryVoltage'、'elect_generatingVoltage'、'elect_batteryPerf'
                driver: "传动系统",
                cold: "空调系统",
                engine: "发动机系统",
                chas: "底盘系统",
                brake: "制动系统"
            },
            showList: [], // 展开列表的大系统
            activeIndex: 0, // 默认选中第一种方案
            pointMsgShow: false, // 机构虚拟点数功能状态描述 是否显示
            openMsgShow: false, // 推送短信功能状态描述 是否显示
            hasLevel3: false // 是否存在严重项
        };
    },
    props: {
        report: {
            type: Object,
            default() {
                return {};
            }
        },
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    created: function() {},
    mounted: function() {
        if (this.data) {
            this.msgHandle();
        }
        this.reportHandle();
    },
    methods: {
        msgHandle() {
            // 顶部提醒
            this.pointMsgShow = this.data.orgPointsStatusMsg ? true : false;
            this.openMsgShow = this.data.pushSmsStatusMsg ? true : false;
        },
        // 选择方案，默认第一个
        selectMaintainScheme(index) {
            if (!this.report.maintenance.length) {
                return;
            }
            this.activeIndex = index;
            this.maintainScheme = this.report.maintenance[index];
        },
        reportHandle() {
            if (this.report.baseInfo.pic.length) {
                this.report.baseInfo.picList = this.report.baseInfo.pic.split(
                    ","
                );
            }
            // 检测结果处理
            if (this.report.makeResult) {
                let makeResultList = this.report.makeResult.split("<br>");
                for (let i = 0; i < makeResultList.length; i++) {
                    if (makeResultList[i]) {
                        this.makeResultList.push(
                            `${i + 1}.${makeResultList[i]}`
                        );
                    }
                }
            }
            this.selectMaintainScheme(0); // 默认选第一种方案
            // 标题显示处理
            let parts = this.maintainScheme.parts || [];
            for (let i = 0; i < parts.length; i++) {
                // 有品牌数据则显示品牌标题
                if (parts[i].brand) {
                    this.brandTitleShow = true;
                    break;
                }
            }
            // 将大系统和子系统合成二维数组
            this.systemList = this.report.sysInfo;
            for (let item of this.systemList) {
                item.faultNumber = 0;
                item.subList = [];
                if (
                    item.status == "0" ||
                    item.status == "2" ||
                    item.status == "3"
                ) {
                    this.showList.push(item.code);
                }
                for (let subItem of this.report.subSysInfo) {
                    if (
                        subItem.code.startsWith(item.code) &&
                        subItem.level !== "e"
                    ) {
                        item.subList.push(subItem);
                        // 计算故障数目
                        if (subItem.level !== "1" && subItem.level !== "e") {
                            item.faultNumber++;
                        }
                        // 是否存在严重项
                        if (subItem.level == "3") {
                            this.hasLevel3 = true;
                        }
                    }
                }
            }
            // 分数特殊情况处理：96分以上并且诊断结果为空时，评100分
            if (
                this.report.baseInfo.totalScore >= 96 &&
                !this.makeResultList.length
            ) {
                this.report.baseInfo.totalScore = 100;
            }
        },
        /**
         * @Description: 放大缩略图
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
        // 控制大系统列表显示隐藏
        showListChange(code) {
            let i = this.showList.indexOf(code);
            if (i == -1) {
                this.showList.push(code);
            } else {
                this.showList.splice(i, 1);
            }
        }
    }
};
</script>
<style lang='less'>
.van-image-preview__image {
    max-height: 65%;
}
.van-overlay,
.van-image-preview__overlay {
    background-color: rgba(0, 0, 0, 0.7);
}
</style>
<style lang='less' scoped>
.main-container {
    padding: 0;
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
    .head-icon {
        margin-top: 5px;
        margin-bottom: 15px;
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
        h2 {
            margin-top: 8px;
            letter-spacing: 2px;
            font-weight: bold;
        }
        h3 {
            font-size: 16px;
        }
        img {
            width: 100%;
        }
    }
    .shopInfo {
        display: flex;
        flex-direction: column;
        .shop-name {
            font-size: 19px;
            font-weight: bold;
            margin-top: 5px;
            margin-bottom: 12px;
        }
        .shop-address {
            color: #46b2fc;
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-bottom: 12px;
            .text {
                margin-left: 2px;
            }
        }
        .shop-staff {
            color: #666;
            .staff-icon {
                color: #fff;
                background-color: #46b2fc;
                padding: 1px 4px;
                border-radius: 2px;
                font-size: 12px;
                margin-left: 5px;
                margin-right: 14px;
            }
            .staff-time {
                font-size: 12px;
            }
        }
    }
    .tips {
        width: calc(100% - 20px);
        padding: 6px 10px;
        background: #ff344a;
        color: #fff;
        margin-bottom: 1px;
        position: relative;
        line-height: 120%;
        .text {
            display: inline-block;
            word-wrap: break-word;
            word-break: normal;
            width: 92%;
        }
        .closeIcon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
    .carInfo {
        display: flex;
        flex-direction: column;
        .banner {
            margin-bottom: 8px;
            img {
                max-width: 100%;
            }
        }
        .carInfo-top {
            display: -webkit-box;
            padding-bottom: 10px;
            border-bottom: 1px solid #efefef;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 16px;
            text-overflow: ellipsis;
            overflow: hidden;
            .car-icon {
                vertical-align: middle;
                height: 32px;
                margin-top: 2px;
                margin-bottom: 4px;
            }
            .carName {
                font-weight: bold;
                margin-left: 5px;
                margin-top: 5px;
            }
        }
        .carInfo-bottom {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            li {
                display: flex;
                padding: 8px 0px;
                justify-content: space-between;
                .item-name {
                    color: #666;
                }
                .item-data {
                    color: #bdbdbd;
                }
            }
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
.tips {
    width: calc(100% - 20px);
    padding: 6px 10px;
    background: #ff344a;
    color: #fff;
    margin-bottom: 1px;
    position: relative;
    line-height: 120%;
    .text {
        display: inline-block;
        word-wrap: break-word;
        word-break: normal;
        width: 92%;
    }
    .closeIcon {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
}
.report-block {
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
        .arrow-btn {
            display: flex;
            font-size: 14px;
            align-items: center;
            color: #999;
            .arrow {
                img {
                    margin-left: 2px;
                    width: 24px;
                    height: auto;
                }
            }
        }
    }
    h5 {
        margin-left: 8px;
        margin-right: 8px;
        font-size: 17px;
        font-weight: bold;
        color: #666;
        display: flex;
        justify-content: space-between;
    }
    .list-titlt {
        padding: 10px 0 0 8px;
        margin-bottom: 10px;
        font-size: 16px;
        color: #666;
        .main-title {
            font-size: 17px;
            font-weight: bold;
            color: #333;
        }
        .text-right {
            text-align: right;
        }
    }
    .statement {
        margin-top: 10px;
        color: #666;
        margin-left: 8px;
        h3 {
            font-size: 18px;
            margin-bottom: 6px;
        }
        ul {
            li {
                font-size: 15px;
                line-height: 1.1;
                margin-bottom: 5px;
                color: #999;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }
    .selectBtn {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
        margin-bottom: 5px;
        .btn {
            padding: 10px;
            color: #46aef7;
            font-size: 16px;
            border: 1px solid #46aef7;
            border-radius: 8px;
            width: 40%;
            text-align: center;
            margin-right: 6px;
            &:last-child {
                margin-right: 0;
            }
        }
        .active {
            color: #fff;
            background: #46aef7;
        }
    }
    .selectBtnOnly {
        justify-content: flex-start;
    }
    .system-list {
        h4 {
            margin-left: 20px;
        }
        .system-list-item {
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: 10px;
            &:last-child {
                border: 0;
                margin-bottom: 0;
            }
            .list-title {
                margin: 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .title-icon {
                    width: 18px;
                    height: auto;
                    margin-left: 8px;
                }
                h5 {
                    margin-left: 10px;
                    color: #000;
                }
                .list-status {
                    display: flex;
                    flex-direction: column;
                    .list-status-detail {
                        margin-top: 10px;
                        margin-left: 10px;
                        margin-bottom: 12px;
                        font-size: 16px;
                        color: #999;
                    }
                }
                .arrow-btn {
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    color: #999;
                    .arrow {
                        img {
                            width: 24px;
                        }
                    }
                }
            }
            .overall {
                display: flex;
                flex-direction: column;
                margin: 0 20px;
                margin-bottom: 10px;
                .overall-title {
                    font-size: 15px;
                    color: #666;
                    font-weight: bold;
                    margin-bottom: 6px;
                    display: flex;
                    .faultnum {
                        padding: 0px 3px;
                        color: #f4a253;
                        border: 1px solid #f4a253;
                        font-size: 12px;
                        border-radius: 2px;
                        margin-left: 5px;
                        height: 13px;
                        line-height: 15px;
                    }
                }
                .overall-content {
                    font-size: 15px;
                    color: #999;
                    line-height: 1.2;
                }
            }
            ul {
                display: flex;
                flex-direction: column;
                margin: 0 20px;
                padding-top: 10px;
                border-top: 1px solid #e6e6e6;
                li {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 8px;
                    .name {
                        margin-bottom: 12px;
                        display: flex;
                        .text {
                            font-size: 15px;
                            color: #666;
                            font-weight: bold;
                        }
                        .level {
                            margin-left: 10px;
                            padding: 0 4px;
                            font-size: 12px;
                            border-radius: 2px;
                            height: 13px;
                            line-height: 15px;
                        }
                        .level0 {
                            color: #f9bc2d;
                            border: 1px solid #f9bc2d;
                        }
                        .level2 {
                            color: #ff9f3e;
                            border: 1px solid #ff9f3e;
                        }
                        .level3 {
                            color: #fb3537;
                            border: 1px solid #fb3537;
                        }
                    }
                    .result {
                        margin-bottom: 10px;
                        display: flex;
                        .label {
                            color: #fff;
                            padding: 0 4px;
                            background: #8ed5b4;
                            border-radius: 3px;
                            margin-right: 10px;
                            min-width: 74px;
                            line-height: 26px;
                            height: 26px;
                            text-align: center;
                            font-size: 14px;
                        }
                        .result-label {
                            background: #8ed5b4;
                        }
                        .airesult-label {
                            background: #a1d6fa;
                        }
                        .text {
                            font-size: 14px;
                            color: #999;
                            line-height: 26px;
                        }
                    }
                    .jnsRead {
                        margin-bottom: 12px;
                        display: flex;
                        .label {
                            color: #fff;
                            padding: 0 4px;
                            background: #cadcf3;
                            border-radius: 4px;
                            margin-right: 10px;
                            min-width: 74px;
                            line-height: 18px;
                            max-height: 18px;
                            text-align: center;
                        }
                        .jnsRead-list {
                            display: flex;
                            flex-direction: column;
                            .text {
                                width: fit-content;
                                font-size: 15px;
                                color: #5daef1;
                                line-height: 1.2;
                                text-decoration: underline;
                                &:link {
                                    color: #5daef1;
                                }
                            }
                        }
                    }
                    .result-photo {
                        margin-bottom: 10px;
                        img {
                            width: 50px;
                            height: 50px;
                            border-radius: 4px;
                            margin-right: 10px;
                        }
                    }
                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.system-list-block {
    padding-left: 0;
    padding-right: 0;
}
.solution-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    z-index: 10;
    overflow: hidden;
}
.report-score {
    display: flex;
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
    .content {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: 8px;
        .leftside {
            width: 30%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 6px;
            .score-detail {
                font-size: 50px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .score-text {
                font-size: 14px;
                font-weight: bold;
                margin-bottom: 6px;
            }
            .score-label {
                font-size: 12px;
                color: #999;
            }
        }
        .rightside {
            max-width: 60%;
            margin-right: 10px;
            flex: auto;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            color: #999;
            .shop-name {
                margin-bottom: 8px;
                text-align: right;
                line-height: 1.1;
            }
            .create-username {
                margin-bottom: 8px;
                .prove {
                    font-size: 12px;
                    color: #fff;
                    padding: 1px 4px;
                    background: #4f9cd3;
                    border-radius: 2px;
                    margin-right: 5px;
                }
            }
        }
    }
    .score-footer {
        padding-top: 8px;
        text-align: center;
        color: #a7a7a7;
        font-size: 12px;
        letter-spacing: 2px;
    }
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
    min-width: 100px;
    padding: 9px 8px;
    text-align: right;
}
.content-list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    li {
        padding: 9px 8px;
        color: #666;
        min-height: 20px;
        line-height: 20px;
        font-size: 15px;
        .text-right {
            text-align: right;
        }
    }
}
</style>