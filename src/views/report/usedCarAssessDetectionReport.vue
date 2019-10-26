<!--
 * @Description: buche_二手车检测报告v2版 模板
 * @Author: xwq
 * @Date: 2019-05-24 15:31:24
 -->
<template>
    <div class="usedCarDetection page">
        <div class="main-container report-container">
            <div class="solution">
                <div class="head-icon">
                    <img src="@image/report_head_usedCar.png" @click.prevent />
                </div>
                <div class="banner-base-info">
                    <!-- 报告轮播图 -->
                    <VreportBanner :baseInfoPic="report.base_info.pic" />
                    <!-- <slot name="reportBanner"></slot> -->
                    <!-- 报告基本信息 -->
                    <VreportBaseInfo :baseInfo="report.base_info" />
                    <!-- <slot name="reportBaseInfo"></slot> -->
                </div>
                <div>
                    <!-- 报告诊断结果 -->
                    <VreportResultList :makeResult="report.check_result_info.make_result" />
                    <!-- <slot name="makeResult"></slot> -->
                    <!-- 报告事故检测模块 -->
                    <VaccidentDetection :accidentDetectionInfo="report" />
                    <!-- <slot name="accidentDetection"></slot> -->
                    <div
                        class="report-block"
                        v-if="unusualList.length || normalList.length || unDetectionList.length"
                    >
                        <h4>
                            <b>标准化项目检测</b>
                        </h4>
                        <p class="noAbnorma" v-if="!(unusualList.length)&&!noAbnormalStatus">未发现异常项目</p>
                        <div class="warn-list" v-if="unusualList.length">
                            <div>
                                <div
                                    v-for="(item, index) in unusualList"
                                    :key="index"
                                    class="warn-list-item"
                                >
                                    <div class="list-title">
                                        <img
                                            src="@image/warn.png"
                                            class="title-icon"
                                            @click.prevent
                                        />
                                        <h5>{{item.name}}</h5>
                                    </div>
                                    <ul>
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div class="name">
                                                <span class="text">{{subItem.name}}</span>
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
                                            <div class="result" v-if="subItem.detection_result">
                                                <span class="label result-label">检测结果</span>
                                                <span class="text">{{subItem.detection_result}}</span>
                                            </div>
                                            <div class="result" v-if="subItem.ai_result">
                                                <div class="label airesult-label">AI诊断结果</div>
                                                <span class="text">{{subItem.ai_result}}</span>
                                            </div>
                                            <div
                                                class="result-photo"
                                                v-if="subItem.img_list && subItem.img_list.length"
                                            >
                                                <img
                                                    v-for="(item, index) of subItem.img_list"
                                                    :key="index"
                                                    v-lazy="item"
                                                    @click="enlargeImage(subItem.img_list, index)"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div v-show="normalAndUnDetection.normalListShow">
                            <div class="success-list" v-if="normalList.length">
                                <div
                                    v-for="(item, index) in normalList"
                                    :key="index"
                                    class="success-list-item"
                                >
                                    <div class="list-title">
                                        <img
                                            src="@image/success.png"
                                            class="title-icon"
                                            @click.prevent
                                        />
                                        <h5>{{item.name}}</h5>
                                    </div>
                                    <ul class="content-list">
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div>{{subItem.name}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="unknow-list" v-if="unDetectionList.length">
                                <div
                                    v-for="(item, index) in unDetectionList"
                                    :key="index"
                                    class="unknow-list-item"
                                >
                                    <div class="list-title">
                                        <img
                                            src="@image/unDetection.png"
                                            class="title-icon"
                                            @click.prevent
                                        />
                                        <h5>{{item.name}}&nbsp;&nbsp;(未检测)</h5>
                                    </div>
                                    <ul class="content-list">
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div>{{subItem.name}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p
                            class="aroow-bottom"
                            @click="normalArrowClick(normalAndUnDetection.normalListShow)"
                        >
                            <span
                                :class="[normalAndUnDetection.normalListShow?'arrow-up':'arrow-down']"
                            >{{normalAndUnDetection.arrowTitle}}</span>
                        </p>
                    </div>
                    <div
                        class="report-block"
                        v-if="report.maintain_scheme.length && payStatus=='2'&&(maintainScheme.parts.length || maintainScheme.consumable.length || maintainScheme.labor.length)"
                    >
                        <h4>
                            <b>维修方式</b>
                        </h4>
                        <div class="solution-parts">
                            <div
                                v-if="maintainScheme.parts.length || maintainScheme.consumable.length"
                            >
                                <div class="list-titlt">
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="11" class="main-title">配件耗材</van-col>
                                        <van-col span="5" v-if="brandTitleShow">品牌</van-col>
                                        <van-col span="7" class="text-right">参考价格(元)</van-col>
                                    </van-row>
                                </div>
                                <ul class="content-list">
                                    <li
                                        v-for="(item, key) in maintainScheme.parts"
                                        :key="item.part_name+key"
                                    >
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="10">{{item.part_name}}</van-col>
                                            <van-col span="8">{{item.part_brand}}</van-col>
                                            <van-col span="4" class="text-right">
                                                <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                            </van-col>
                                        </van-row>
                                    </li>
                                    <li
                                        v-for="(item, key) in maintainScheme.consumable"
                                        :key="item.consumable_name+key"
                                    >
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="10">{{item.consumable_name}}</van-col>
                                            <van-col span="8">{{item.consumable_brand}}</van-col>
                                            <van-col span="4" class="text-right">
                                                <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                            </van-col>
                                        </van-row>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="maintainScheme.labor.length">
                                <div class="list-titlt">
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="11" class="main-title">维修项目</van-col>
                                        <van-col span="8" class="text-right">参考工时费(元)</van-col>
                                    </van-row>
                                </div>
                                <ul class="content-list">
                                    <li v-for="(item, key3) in maintainScheme.labor" :key="key3">
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="14">{{item.labor_name}}</van-col>
                                            <van-col span="4" class="text-right">
                                                <span>{{item.labor_price>0?item.labor_price:'-'}}</span>
                                            </van-col>
                                        </van-row>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="giftList.length > 0">
                                <div class="list-titlt">
                                    <van-row type="flex" justify="space-between">
                                        <van-col span="11" class="main-title">赠送</van-col>
                                        <van-col span="7" class="text-right">原价(元)</van-col>
                                    </van-row>
                                </div>
                                <ul class="content-list">
                                    <li v-for="(item, key) in giftList" :key="item.name+key">
                                        <van-row type="flex" justify="space-between">
                                            <van-col span="10">{{item.name}}</van-col>
                                            <van-col span="8">{{item.brand}}</van-col>
                                            <van-col span="4" class="text-right">
                                                <span>{{item.subtotal>0?item.subtotal:'-'}}</span>
                                            </van-col>
                                        </van-row>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="zb" v-if="maintainScheme.quality_desc">
                            <img src="@image/zb.png" class="zb-icon" @click.prevent />
                            <span>{{maintainScheme.quality_desc}}</span>
                        </div>
                        <div class="priceTotal">
                            <span>费用总计</span>
                            <div class="total_text">
                                <span>{{maintainScheme.total_price}} 元</span>
                            </div>
                        </div>
                        <div
                            class="priceTotal"
                            v-if="maintainScheme.price_ssss && maintainScheme.price_ssss !== '0.00'"
                        >
                            <span>4S店维修参考价</span>
                            <div class="total_text">
                                <span>{{maintainScheme.price_ssss}} 元</span>
                            </div>
                        </div>
                        <!-- </div> -->
                    </div>

                    <pubButton
                        v-if="payStatus=='1'"
                        :isFixed="isFixed"
                        title="维修方案查询"
                        @buttonConfirm="payClick"
                    />
                </div>
            </div>
            <statement />
        </div>
        <pubButton
            v-if="isWechat&&payStatus=='2'"
            :isFixed="bcDownBtStatus"
            title="请下载安装捕车APP查询更多信息"
            @buttonConfirm="bcDownBtClick"
        />
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
import { ImagePreview, Swipe, SwipeItem } from "vant";
import { bannerHeightHandle, getCarBrandIconSrc } from "@/utils/common";
import pubButton from "@/components/public/pubButton";
import accidentDetection from "@/components/report/accidentDetection";
import reportBanner from "@/components/report/reportBanner";
import reportBaseInfo from "@/components/report/underlineRule/reportBaseInfo";
import reportResultList from "@/components/report/reportResultList";
import statement from "@/components/report/statement";
export default {
    props: {
        report: {
            type: Object
        },
        payStatus: {
            type: String
        },
        isWechat: {
            type: Boolean
        },
        reportdata: {
            type: Object
        }
    },
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        pubButton,
        VaccidentDetection: accidentDetection,
        VreportResultList: reportResultList,
        VreportBaseInfo: reportBaseInfo,
        VreportBanner: reportBanner,
        statement
    },
    data() {
        return {
            bannerHeight: bannerHeightHandle(),
            // carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            carLogoPre: "",
            maintenance: false,
            normalList: [], // 正常项列表
            unusualList: [], // 异常项列表
            unDetectionList: [], // 未检测项列表
            giftList: [], // 赠送项列表
            // normalListShow: false, // 正常列表默认收起
            // unDetectionListShow: false, // 未检测项列表默认收起
            normalAndUnDetection: {
                normalListShow: false,
                arrowTitle: "点击查看完整项目"
            },
            noAbnormalStatus: false, //标准化项目检测_异常项为空时的显示状态
            brandTitleShow: false, // 配件耗材品牌标题是否显示
            maintainScheme: {
                parts: [],
                consumable: [],
                labor: []
            }, // 当前维修方案
            makeResultList: [],
            bill_id: "",
            isFixed: false,
            bcDownBtStatus: true
        };
    },
    created: function() {
        this.carLogoPre = getCarBrandIconSrc(
            this.reportdata.base_info.car_icon
        );
    },
    mounted: function() {
        this.reportHandle();
    },

    methods: {
        // 选择方案，默认第一个
        selectMaintainScheme(index) {
            if (!this.reportdata.maintain_scheme.length) {
                return;
            }
            this.maintainScheme = this.reportdata.maintain_scheme[index];
            // 不存在字段则转为空数组
            if (!this.maintainScheme.parts) {
                this.maintainScheme.parts = [];
            }
            if (!this.maintainScheme.consumable) {
                this.maintainScheme.consumable = [];
            }
            if (!this.maintainScheme.labor) {
                this.maintainScheme.labor = [];
            }
        },
        reportHandle() {
            // 检测结果处理
            if (this.reportdata.check_result_info.make_result) {
                this.makeResultList = this.reportdata.check_result_info.make_result.split(
                    "<br>"
                );
                for (let i = 0; i < this.makeResultList.length; i++) {
                    if (this.makeResultList[i] == "") {
                        this.makeResultList.splice(i, 1);
                    }
                }
            } else {
                this.makeResultList = [];
            }
            this.selectMaintainScheme(0); // 默认选第一种方案
            // 赠送处理
            let parts = this.maintainScheme.parts || [];
            let consumable = this.maintainScheme.consumable || [];
            let labor = this.maintainScheme.labor || [];
            for (let i = 0; i < parts.length; i++) {
                let item = parts[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.part_name,
                        brand: item.part_brand,
                        subtotal: item.subtotal
                    };
                    this.giftList.push(newItem);
                    parts.splice(i, 1);
                    i--;
                }
                // 有品牌数据则显示品牌标题
                if (!this.brandTitleShow) {
                    if (item.part_brand) {
                        this.brandTitleShow = true;
                    }
                }
            }
            for (let i = 0; i < consumable.length; i++) {
                let item = consumable[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.consumable_name,
                        brand: item.consumable_brand,
                        subtotal: item.subtotal
                    };
                    this.giftList.push(newItem);
                    consumable.splice(i, 1);
                    i--;
                }
                // 有品牌数据则显示品牌标题
                if (!this.brandTitleShow) {
                    if (item.consumable_brand) {
                        this.brandTitleShow = true;
                    }
                }
            }
            for (let i = 0; i < labor.length; i++) {
                let item = labor[i];
                if (item.status == 2) {
                    let newItem = {
                        name: item.labor_name,
                        subtotal: item.labor_price
                    };
                    this.giftList.push(newItem);
                    labor.splice(i, 1);
                    i--;
                }
            }
            // 异常项、正常项和未检测项分拣
            for (let item of this.reportdata.system_list) {
                item.subList = [];
            }
            this.normalList = JSON.parse(
                JSON.stringify(this.reportdata.system_list)
            );
            for (let item of this.normalList) {
                for (let subItem of this.reportdata.subsystem_list) {
                    if (
                        subItem.system_code.startsWith(item.code) &&
                        subItem.level == "1"
                    ) {
                        // 生成正常项列表
                        item.subList.push(subItem);
                    }
                }
            }
            this.unusualList = JSON.parse(
                JSON.stringify(this.reportdata.system_list)
            );
            for (let item of this.unusualList) {
                for (let subItem of this.reportdata.subsystem_list) {
                    // level: 0-轻微 1-正常 2-中度 3-严重 e-未检测
                    if (
                        subItem.system_code.startsWith(item.code) &&
                        subItem.level != "1" &&
                        subItem.level != "e"
                    ) {
                        // 生成异常项列表
                        item.subList.push(subItem);
                    }
                }
            }
            this.unDetectionList = JSON.parse(
                JSON.stringify(this.reportdata.system_list)
            );
            for (let item of this.unDetectionList) {
                for (let subItem of this.reportdata.subsystem_list) {
                    if (
                        subItem.system_code.startsWith(item.code) &&
                        subItem.level == "e"
                    ) {
                        // 生成未检测项列表
                        item.subList.push(subItem);
                    }
                }
            }
            this.removeParentItem(); // 三个列表统一处理：若子项数组为空，则将此父项移除
        },
        removeParentItem() {
            for (let i = 0; i < this.normalList.length; i++) {
                let item = this.normalList[i];
                if (item.subList.length == 0) {
                    this.normalList.splice(i, 1);
                    i--;
                }
            }
            for (let i = 0; i < this.unusualList.length; i++) {
                let item = this.unusualList[i];
                if (item.subList.length == 0) {
                    this.unusualList.splice(i, 1);
                    i--;
                }
            }
            for (let i = 0; i < this.unDetectionList.length; i++) {
                let item = this.unDetectionList[i];
                if (item.subList.length == 0) {
                    this.unDetectionList.splice(i, 1);
                    i--;
                }
            }
        },
        handleQualityKm(quality_km) {
            if (!quality_km) {
                return "";
            }
            quality_km = parseInt(quality_km);
            if (quality_km > 10000) {
                quality_km = (quality_km / 10000).toFixed(1) + "万";
                // if (quality_km.slice(-1) == 0) {
                //     // quality_km = parseInt(quality_km) + "万";
                // }
            }
            return quality_km.toString() + "公里";
        },
        moonTurnYear(value) {
            if (!value) {
                return "";
            }
            let year = parseInt(value / 12);
            let moon = value % 12;
            let yearStr = "";
            let moonStr = "";
            if (year > 0) {
                yearStr = year + "年";
            }
            if (moon > 0) {
                moonStr = moon + "个月";
            }
            return yearStr + moonStr;
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
        /**
         * @Description: 购买维修方式 h5ToApp
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-24 16:10:57
         */
        payClick() {
            this.$emit("payReport");
        },
        /**
         * @Description:跳转下载捕车App连接
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-18 14:15:16
         */

        bcDownBtClick() {
            this.$emit("bcDownLoad");
        },
        /**
         * @Description:非异常项目显示/隐藏
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-25 17:57:07
         *
         */

        normalArrowClick(arrowStatus) {
            this.normalAndUnDetection.normalListShow = !this
                .normalAndUnDetection.normalListShow;
            if (this.normalAndUnDetection.normalListShow) {
                this.normalAndUnDetection.arrowTitle = "收起非异常项目";
                this.noAbnormalStatus = true;
            } else {
                this.normalAndUnDetection.arrowTitle = "点击查看完整项目";
                this.noAbnormalStatus = false;
            }
        }
    },
    filters: {
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
.report-container {
    padding: 0;
}
.main-container {
    width: 100%;
    .head-icon {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 0px 10px;
        img {
            width: 100%;
        }
    }
    .banner-base-info {
        background: #fff;
        border-radius: 5px;
        margin-bottom: 15px;
        .carInfo {
            padding: 10px;
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
    .aroow-bottom {
        padding: 10px;
        text-align: center;
        color: #c9c8c8;
        // border-bottom: 1px solid #ccc;
        margin-bottom: 10px;
        .arrow-up::after {
            display: inline-block;
            content: " ";
            border-left: 6px solid transparent;
            border-top: 10px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 10px solid #000;
            position: relative;
            right: -10px;
        }
        .arrow-down::after {
            display: inline-block;
            content: " ";
            border-left: 6px solid transparent;
            border-top: 10px solid #000;
            border-right: 6px solid transparent;
            border-bottom: 10px solid transparent;
            position: relative;
            top: 10px;
            right: -10px;
        }
    }
    .noAbnorma {
        padding: 10px;
        color: #b1aeae;
    }
}

/* .inverse-bg-grey {
    background: #f2f2f2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: -1;
} */
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
    .zb {
        padding-left: 10px;
        font-size: 16px;
        color: #898989;
        line-height: 30px;
        height: 30px;
    }
    .zb-icon {
        vertical-align: middle;
        margin-right: 5px;
        height: 24px;
    }

    .warn-list {
        .warn-list-item {
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: 10px;
            &:last-child {
                border: 0;
                margin-bottom: 0;
            }
            .list-title {
                display: flex;
                align-items: center;
                .title-icon {
                    width: 18px;
                    height: auto;
                    margin-left: 8px;
                }
                h5 {
                    margin-left: 4px;
                    color: #000;
                }
            }
            ul {
                display: flex;
                flex-direction: column;
                margin-left: 10px;
                li {
                    display: flex;
                    flex-direction: column;
                    margin-top: 12px;
                    .name {
                        display: flex;
                        align-items: center;
                        margin-bottom: 12px;
                        .text {
                            font-size: 16px;
                            color: #666;
                            font-weight: bold;
                        }
                        .level {
                            margin-left: 10px;
                            padding: 1px 4px;
                            font-size: 14px;
                            border-radius: 2px;
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
                        margin-bottom: 12px;
                        display: flex;
                        .label {
                            color: #fff;
                            padding: 2px 4px;
                            background: #8ed5b4;
                            border-radius: 4px;
                            margin-right: 10px;
                            min-width: 95px;
                            line-height: 18px;
                            max-height: 18px;
                            text-align: center;
                        }
                        .result-label {
                            background: #8ed5b4;
                            margin-right: 14px;
                        }
                        .airesult-label {
                            background: #a1d6fa;
                        }
                        .text {
                            font-size: 15px;
                            color: #bdbdbd;
                            line-height: 1.1;
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
                }
            }
        }
    }
    .success-list {
        .success-list-item {
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: 10px;
            .list-title {
                display: flex;
                align-items: center;
                .title-icon {
                    width: 18px;
                    height: auto;
                    margin-left: 8px;
                }
                h5 {
                    margin-left: 4px;
                    color: #000;
                }
            }
            .content-list:last-child {
                margin-bottom: 0;
                border-bottom: none;
            }
        }
    }
    .unknow-list {
        .unknow-list-item {
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: 10px;
            .list-title {
                display: flex;
                align-items: center;
                .title-icon {
                    width: 18px;
                    height: auto;
                    margin-left: 8px;
                }
                h5 {
                    margin-left: 4px;
                    color: #000;
                }
            }
        }
        .content-list:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
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
/* .statement {
    margin: 10px 0;
    color: #666;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    h3 {
        font-size: 18px;
        margin-bottom: 6px;
        font-weight: bold;
    }
    ul {
        li {
            font-size: 15px;
            line-height: 1.1;
            margin-bottom: 5px;
            line-height: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
} */
</style>