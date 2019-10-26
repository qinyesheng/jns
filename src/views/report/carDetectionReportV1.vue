<!--
 * @Description: 汽车检测报告模板，根据传进来的数据进行页面渲染
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-07-02 15:23:03
 -->
<template>
    <div class="page">
        <div class="inverse-bg-grey"></div>
        <div class="main-container report-container">
            <div class="solution">
                <div class="tips" v-if="pointMsgShow">
                    <span class="text">{{data.orgPointsStatusMsg}}</span>
                    <van-icon name="close" class="closeIcon" @click="pointMsgShow = false" />
                </div>
                <div class="tips" v-if="openMsgShow">
                    <span class="text">{{data.pushSmsStatusMsg}}</span>
                    <van-icon name="close" class="closeIcon" @click="openMsgShow = false" />
                </div>
                <div class="report-block shopInfo" v-if="report.baseInfo">
                    <div class="shop-name">{{report.baseInfo.orgName}}</div>
                    <div class="shop-address" @click="openMap">
                        <van-icon name="location" />
                        <span class="text">详细地址</span>
                    </div>
                    <div class="shop-staff">
                        <span class="staff-name">{{report.baseInfo.createUserName}}</span>
                        <span class="staff-icon">{{staffName}}</span>
                        <span class="staff-time">{{report.baseInfo.detectionTime}}</span>
                    </div>
                </div>
                <div class="carInfo report-block" v-show="report.baseInfo">
                    <div class="carInfo-top">
                        <img
                            class="car-icon"
                            v-lazy="carLogoPre + report.baseInfo.carBrandLogo +'.jpg'"
                            v-if="report.baseInfo.carBrandLogo"
                        />
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
                <div v-if="!ownerNoPay">
                    <div class="report-block">
                        <div class="warn-list" v-if="unusualListStatus">
                            <h4>
                                <b>异常项</b>
                            </h4>
                            <div>
                                <div
                                    v-for="(item, index) in unusualList"
                                    :key="index"
                                    v-if="item.subList.length > 0"
                                >
                                    <div class="list-title">
                                        <img src="../../assets/image/warn.png" class="title-icon" />
                                        <h5>{{bigSytemCode[item.code]}}</h5>
                                    </div>
                                    <ul class="price-content">
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div class="text-left">{{subItem.itemName}}</div>
                                            <div class="text-right">
                                                <span>{{subItem.detectionResult}}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="success-list" v-if="normalListStatus">
                            <h4>
                                <b>正常项</b>
                                <div
                                    class="arrow-btn"
                                    v-if="normalListShow"
                                    @click="normalListShow = !normalListShow"
                                >
                                    <span>收起</span>
                                    <i class="arrow">
                                        <img src="../../assets/image/arrow-up.png" />
                                    </i>
                                </div>
                                <div
                                    class="arrow-btn"
                                    v-else
                                    @click="normalListShow = !normalListShow"
                                >
                                    <span>详情</span>
                                    <i class="arrow">
                                        <img src="../../assets/image/arrow-down.png" />
                                    </i>
                                </div>
                            </h4>
                            <div v-if="normalList.length !== 0 && normalListShow">
                                <div
                                    v-for="(item, index) in normalList"
                                    :key="index"
                                    v-if="item.subList.length > 0"
                                >
                                    <div class="list-title">
                                        <img
                                            src="../../assets/image/success.png"
                                            class="title-icon"
                                        />
                                        <h5>{{bigSytemCode[item.code]}}</h5>
                                    </div>
                                    <ul class="price-content">
                                        <li v-for="(subItem, index) in item.subList" :key="index">
                                            <div>{{subItem.itemName}}</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="report-block" v-if="report.makeResult">
                        <h4>
                            <div class="grid-demo grid-demo-bg1 text-left">
                                <b>诊断结果与维修方式</b>
                            </div>
                        </h4>
                        <h4>检测与诊断结果</h4>
                        <div class="make-result">
                            <van-cell
                                v-for="(value, key) in report.makeResultList"
                                :key="key"
                                :value="value"
                                v-if="value !== ''"
                            />
                            <!--    <div class="prove">
                                <img src="../../assets/image/question.png">
                                <span>诊断结果由JNS提供技术支持</span>
                            </div>-->
                        </div>
                        <div class="solution-parts" v-if="report.maintenance.length > 0">
                            <h4>维修方式</h4>
                            <div v-if="report.maintenance[0].parts.length > 0">
                                <h5>
                                    <span>配件耗材</span>
                                    <span>价格</span>
                                </h5>
                                <ul class="price-content">
                                    <li
                                        v-for="(item, key) in report.maintenance[0].parts"
                                        :key="item.name+key"
                                    >
                                        <div>{{item.name}}</div>
                                        <div class="text-right">
                                            <span>{{item.subtotal > 0? item.subtotal+' 元':'-'}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="report.maintenance[0].maintenanceMode.length>0">
                                <h5>
                                    <span>维修项目</span>
                                    <span>工时费</span>
                                </h5>
                                <ul class="price-content">
                                    <li
                                        v-for="(item, key3) in report.maintenance[0].maintenanceMode"
                                        :key="key3"
                                    >
                                        <div>{{item.maintenanceName}}</div>
                                        <div class="text-right">
                                            <span>{{item.maintenancePrice>0?item.maintenancePrice+' 元':'-'}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="priceTotal" v-if="report.maintenance.length > 0">
                            <span>费用总计</span>
                            <div class="total_text">
                                <span>{{report.maintenance[0].total}} 元</span>
                            </div>
                        </div>
                    </div>
                    <div
                        class="report-block"
                        v-if="report.maintenance.length > 0 && report.maintenance[0].referencePrice4s && report.maintenance[0].referencePrice4s !== '0.00'"
                    >
                        <div class="priceTotal">
                            <span>4S店维修参考价</span>
                            <div class="total_text">
                                <span>{{report.maintenance[0].referencePrice4s}} 元</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="text-info text-align">报告展示效果由JNS提供技术支持</p>
        </div>
    </div>
</template>
<script>
import jnsApi from "@/utils/jnsApi";
export default {
    data() {
        return {
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            maintenance: false,
            normalList: [], // 正常项列表
            unusualList: [], // 异常项列表
            normalListStatus: false, // 正常项列表是否显示状态
            unusualListStatus: false, // 异常项列表是否显示状态
            normalListShow: false, // 正常列表默认收起
            pointMsgShow: false, // 机构虚拟点数功能状态描述 是否显示
            openMsgShow: false, // 推送短信功能状态描述 是否显示
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
            staffName: "检测师"
        };
    },
    props: ["report", "ownerNoPay", "data"],
    components: {},
    filters: {
        mileTurn(val) {
            if (!val) {
                return "";
            }
            val = parseInt(val);
            if (val > 10000) {
                val = (val / 10000).toFixed(2) + "万";
            }
            return val.toString() + "公里";
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
        reportHandle() {
            // 技师身份处理
            if (this.report.baseInfo.orgSort == "6") {
                this.staffName = "认证技师";
            }
            // 检测结果处理
            if (this.report.makeResult) {
                this.report.makeResultList = this.report.makeResult.split(
                    "<br>"
                );
            } else {
                this.report.makeResultList = [];
            }
            // 异常项和正常项分拣
            for (let item of this.report.sysInfo) {
                item.subList = [];
            }
            let newSystem = {
                code: "supply",
                subList: []
            };
            this.report.sysInfo.push(newSystem); // 新增供电系统
            for (let item of this.report.subSysInfo) {
                let map = {
                    elect_batteryVoltage: "supply_batteryVoltage",
                    elect_generatingVoltage: "supply_generatingVoltage",
                    elect_batteryPerf: "supply_batteryPerf"
                };
                if (
                    item.code == "elect_batteryVoltage" ||
                    item.code == "elect_generatingVoltage" ||
                    item.code == "elect_batteryPerf"
                ) {
                    item.code = map[item.code]; // 新增供电系统的子系统
                }
            }

            this.normalList = JSON.parse(JSON.stringify(this.report.sysInfo));
            for (let item of this.normalList) {
                for (let subItem of this.report.subSysInfo) {
                    if (
                        subItem.code.startsWith(item.code) &&
                        subItem.level == "1"
                    ) {
                        this.normalListStatus = true;

                        // 生成正常项列表
                        item.subList.push(subItem);
                    }
                }
            }
            this.unusualList = JSON.parse(JSON.stringify(this.report.sysInfo));
            for (let item of this.unusualList) {
                for (let subItem of this.report.subSysInfo) {
                    if (
                        subItem.code.startsWith(item.code) &&
                        subItem.level != "1" &&
                        subItem.level != "e"
                    ) {
                        this.unusualListStatus = true;
                        // 生成异常常项列表
                        item.subList.push(subItem);
                    }
                }
            }
            // console.log(this.unusualList);
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
         * @Description: 跳转到地图界面
         * @Author: linpeng
         * @Date: 2019-03-21 13:37:56
         */
        openMap() {
            if (this.report.baseInfo.orgLng && this.report.baseInfo.orgLng) {
                this.$router.push({
                    name: "carDetectionMap",
                    query: {
                        lng: this.report.baseInfo.orgLng,
                        lat: this.report.baseInfo.orgLat
                    }
                });
            }
        }
    }
};
</script>
<style lang='less' scoped>
.report-container {
    padding: 0;
}
.main-container {
    width: 100%;
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
        padding: 0px 10px;
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
        border-bottom: 1px solid #ccc;
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
        .price-content {
            .text-left {
                max-width: 40%;
            }
            .text-right {
                max-width: 50%;
            }
        }
        .price-content:last-child {
            border-bottom: none;
        }
    }
    .success-list {
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
        .price-content:last-child {
            border-bottom: none;
        }
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
.text-info {
    padding: 10px 20px;
    text-align: center;
    color: #46aef7;
}
</style>