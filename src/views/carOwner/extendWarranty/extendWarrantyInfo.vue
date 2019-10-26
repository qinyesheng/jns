<!--
 * @Description: 车主端延长保修报告详情
 * @Author: wjx
 * @Date: 2019-09-04 14:12:49
 * tips: 本页广告因为结构特殊，写在车主端
 -->
<template>
    <div class="page" v-if="ready">
        <div class="main-container">
            <background />
            <!-- <tabLink :tabList="tabList" @tabChange="tabChanges" /> -->
            <div v-if="adList.C00009 && adList.C00009.length>0" class="bannerPic">
                <div>
                    <a
                        v-if="adList.C00009[setTimeoutVal[0]].ad_link"
                        :href="adList.C00009[setTimeoutVal[0]].ad_link"
                        target="_blank"
                        @click="addClickLog(adList.C00009[setTimeoutVal[0]],adList.C00009[0].loc_id)"
                    ></a>
                    <img class="bannerPicImg" :src="adList.C00009[setTimeoutVal[0]].pic" />
                </div>
            </div>
            <extendWarrantyInfoTemplate
                :baseInfo="baseInfo"
                :report="report"
                :makeResult="makeResult"
                :maintainScheme="maintainScheme"
            />
            <!-- 判断保单状态 -1为未支付 -->
            <div class="system" v-if="data.payStatus=='-1'">
                <div class="title">
                    <div class="t1">
                        <h4>请选择承保系统</h4>
                        <!-- <a
                            class="ourShopTitleR"
                            href="http://wanguo.com/chezhu/file/%E6%B1%BD%E8%BD%A6%E8%B4%A8%E9%87%8F%E5%BB%B6%E9%95%BF%E4%BF%9D%E4%BF%AE%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE.pdf"
                            target="_blank"
                        >服务协议</a>-->
                    </div>
                    <div class="t2">
                        <div class="left">
                            <img :src="icon" />
                        </div>
                        <div class="right">
                            <div>维修后系统质保一年</div>
                            <div>{{report.insuredSystemTips}}</div>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <div
                        v-for="(item,index) in  qualityWarranty.extended_warranty"
                        :key="index"
                        class="box"
                    >
                        <van-checkbox-group v-model="warrantyList">
                            <div v-if="item.child_system.length>0">
                                <van-row>
                                    <van-col span="16">
                                        <h5>{{item.system_name}}</h5>
                                    </van-col>
                                    <van-col
                                        v-if="!item.child_system.length>0"
                                        span="8"
                                        class="text-right"
                                    >{{item.price}} 元</van-col>
                                </van-row>
                            </div>
                            <div v-else>
                                <van-checkbox :name="item" class="list special">
                                    <h5>{{item.system_name }}</h5>
                                    <span v-if="item.price!=0">{{item.price}} 元</span>
                                </van-checkbox>
                            </div>
                            <van-checkbox
                                v-for="(items, indexs) in item.child_system"
                                :key="indexs"
                                :name="items"
                                class="list"
                            >
                                {{items.system_name }}
                                <span v-if="items.price!=0">{{items.price}} 元</span>
                            </van-checkbox>
                        </van-checkbox-group>
                    </div>
                </div>
                <!-- <div class="footer">
                    <van-row>
                        <van-col span="16">维保费用</van-col>
                        <van-col span="8" class="text-right">￥{{playPrice.toFixed(2)}}</van-col>
                    </van-row>
                </div>-->
            </div>
            <div v-else>
                <warrantyService
                    :qualityWarranty="qualityWarranty"
                    :reportType="'carOwner'"
                    :insuredSystemTips="report.insuredSystemTips"
                />
            </div>
            <div class="feeTotal">
                <h5>费用总计</h5>
                <ul class="list-content">
                    <li>
                        <van-row>
                            <van-col span="16">维修费</van-col>
                            <van-col span="8" class="text-right">
                                <span
                                    v-if="qualityWarranty.shop_price"
                                >{{qualityWarranty.shop_price}} 元</span>
                                <span v-else>-</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row>
                            <van-col span="16">服务费</van-col>
                            <van-col span="8" class="text-right">
                                <span
                                    v-if="qualityWarranty.system_total_price"
                                >{{qualityWarranty.system_total_price.toFixed(2)}} 元</span>
                                <span v-else>-</span>
                            </van-col>
                        </van-row>
                    </li>
                    <li>
                        <van-row>
                            <van-col span="16">合计</van-col>
                            <van-col span="8" class="text-right">
                                <span
                                    v-if="qualityWarranty.total_price"
                                >{{qualityWarranty.total_price.toFixed(2)}} 元</span>
                                <span v-else>-</span>
                            </van-col>
                        </van-row>
                    </li>
                </ul>
            </div>
            <div class="priceTotal">
                <span>4S店维修参考价</span>
                <div class="total_text">
                    <span>{{qualityWarranty.ssss_price}} 元</span>
                </div>
            </div>
            <pubButton
                :title="'微信支付 ￥'+playPrice.toFixed(2)"
                v-if="data.payStatus=='-1' && warrantyList.length>0"
                :isFixed="false"
                @buttonConfirm="play"
            ></pubButton>
            <pubButton
                title="查看服务协议"
                v-if="data.payStatus=='1'"
                :isFixed="false"
                @buttonConfirm="goAgreement()"
            ></pubButton>
            <div
                v-if="adList.C00010 && adList.C00010.length>0"
                class="bannerPic"
                style="padding-top:15px;"
            >
                <div>
                    <a
                        v-if="adList.C00010[setTimeoutVal[1]].ad_link"
                        :href="adList.C00010[setTimeoutVal[1]].ad_link"
                        target="_blank"
                        @click="addClickLog(adList.C00010[setTimeoutVal[1]],adList.C00010[0].loc_id)"
                    ></a>
                    <img class="bannerPicImg" :src="adList.C00010[setTimeoutVal[1]].pic" />
                </div>
            </div>

            <!-- <div class="qrCode">
            <img v-lazy="WechatPic" alt />
            <p>扫码关注小虎检车公众号</p>
            </div>-->
        </div>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
import jnsApi from "@/utils/jnsApi";
import guestApi from "@/api/carOwner/guest";
import extendWarrantyInfoTemplate from "@/views/report/extendWarrantyInfoTemplate";
import { getCarBrandIconSrc, getUrlParams } from "@/utils/common";
import pubButton from "@/components/public/pubButton";
import background from "@/components/background/background";
import warrantyService from "@/components/report/warrantyService";
import tabLink from "@/components/tab/tabLink";
import reportApi from "@/api/common/report";
export default {
    components: {
        extendWarrantyInfoTemplate,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        pubButton,
        background,
        warrantyService,
        tabLink
    },
    data() {
        return {
            icon: require("@image/zb.png"),
            code: "", //用于车主端
            qrCodeLink: "", //仅用于技师端 短链读取
            data: {},
            report: {},
            baseInfo: {}, // 报告基本信息
            makeResult: "", // 报告诊断结果
            maintainScheme: {}, // 维修方式
            ready: false,
            leftText: "",
            warrantyList: [], // 选中的保修项
            // 质保方案
            qualityWarranty: {},
            totalPrice: {
                // 费用总计
                maintainPrice: "", // 维修费
                servicePrice: "", // 服务费
                referencePrice4s: "" //维修费
            },
            playPrice: 0, //支付价格
            tabList: [], //tabs导航配置
            adList: {},
            adData: {
                loc_id: ["C00009", "C00010"], //广告位ID
                code: ""
            },
            adMark: 0,
            setTimeoutVal: []
        };
    },

    created() {},
    mounted() {
        let query = this.$route.query;
        if (query) {
            this.code = query.code;
            if (this.code) {
                this.getExtendWarrantyDetail(this.code);
            }
        }
    },
    methods: {
        vinEncode(vinStr) {
            return (
                vinStr.substring(0, 4) +
                "*****" +
                vinStr.substring(vinStr.length - 4)
            );
        },
        /**
         * @Description: 改造维方式的数据
         * @Param: data
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 11:21:21
         */
        remakeMaintenance(data) {
            var maintenanceArr = [];
            var maintenance = {
                labor: [], //维修项目
                parts: [], //配件
                consumable: [], //耗材
                labor_total: data.maintenanceTotal, //维修项目总价
                consumable_total: data.suppliesTotal, //耗材总价
                parts_total: data.partsTotal, //配件总价
                total_price: data.total, //整个维修项目总价

                // price_ssss: data.referencePrice4s, //4s店价格
                quality_desc: DataTransfer.qualityTime //质保
            };
            //配件耗材
            for (var n = 0; n < data.parts.length; n++) {
                //配件 1配件 2耗材
                if (data.parts[n].partType == 1) {
                    maintenance.parts.push({
                        part_brand: data.parts[n].brand,
                        part_name: data.parts[n].name,
                        subtotal: data.parts[n].subtotal,
                        status: data.parts[n].status
                    });
                } else {
                    maintenance.consumable.push({
                        consumable_brand: data.parts[n].brand,
                        consumable_name: data.parts[n].name,
                        subtotal: data.parts[n].subtotal,
                        status: data.parts[n].status
                    });
                }
            }
            //维修项目
            for (var s = 0; s < data.maintenanceMode.length; s++) {
                maintenance.labor.push({
                    labor_name: data.maintenanceMode[s].maintenanceName,
                    labor_price: data.maintenanceMode[s].maintenancePrice,
                    status: data.maintenanceMode[s].status
                });
            }
            maintenanceArr.push(maintenance);
            this.report.maintenance = maintenanceArr;
            this.maintainScheme = this.report.maintenance[0];
        },
        /**
         * @Description: 改造保修服务数据
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-06 11:08:48
         */
        remakeWarrantyData(data) {
            var qualityWarranty = {
                extended_warranty: [],
                system_total_price: data.systemTotalPrice,
                shop_price: data.shopPrice,
                ssss_price: data.SSSSPrice,
                total_price: data.totalPrice
            };
            for (var i = 0; i < data.systemList.length; i++) {
                if (data.systemList[i]) {
                    var status = data.systemList[i].status == "1" ? "1" : "0"; //是否选择（1为已选择，2为未选择）	0-未选(默认)，1-选中本身
                    var child_system = [];
                    qualityWarranty.extended_warranty.push({
                        system_id:
                            data.systemList[i].maintenancePackageListRelationId,
                        check: status,
                        price: data.systemList[i].price,
                        guide_price: "0",
                        system_name: data.systemList[i].pidSystemName,
                        child_system: child_system
                    });

                    for (
                        var j = 0;
                        j < data.systemList[i].childSystemList.length;
                        j++
                    ) {
                        if (data.systemList[i].childSystemList[j]) {
                            var status2 =
                                data.systemList[i].childSystemList[j].status ==
                                "1"
                                    ? "1"
                                    : "0"; //是否选择（1为已选择，2为未选择）	0-未选(默认)，1-选中本身
                            child_system.push({
                                system_id:
                                    data.systemList[i].childSystemList[j]
                                        .maintenancePackageListRelationId,
                                check: status2,
                                price:
                                    data.systemList[i].childSystemList[j].price,
                                guide_price: "0",
                                system_name:
                                    data.systemList[i].childSystemList[j]
                                        .maintenanceSystemName
                            });
                        }
                    }
                }
            }
            this.qualityWarranty = qualityWarranty;
            this.traverseSelectedItem();
        },
        /**
         * @Description: 遍历或许选中的保修项
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-06 17:49:00
         */
        traverseSelectedItem() {
            var data = this.qualityWarranty.extended_warranty;
            for (var i = 0; i < data.length; i++) {
                if (data[i].check == "1") {
                    this.warrantyList.push(data[i]);
                }
                for (var j = 0; j < data[i].child_system.length; j++) {
                    if (data[i].child_system[j].check == "1") {
                        this.warrantyList.push(data[i].child_system[j]);
                    }
                }
            }
            this.playPrice = Number(this.qualityWarranty.shop_price);
        },

        /**
         * @Description: 获取历史工单详情
         * @Param: code
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 14:06:48
         */
        getExtendWarrantyDetail(code) {
            guestApi.getExtendWarrantyDetail({ code }).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    this.report = res.data.reportData;
                    this.remakeMaintenance(this.report.maintenance);
                    this.remakeWarrantyData(this.data);
                    this.getCheckResult();
                    if (this.report.baseInfo.pic) {
                        this.report.baseInfo.pic = this.report.baseInfo.pic.split(
                            ","
                        );
                    }
                    // 构造基础信息数据
                    this.baseInfo = this.report.baseInfo;
                    this.baseInfo.vin = this.report.baseInfo.carVinNo;
                    this.baseInfo.car_icon = this.report.baseInfo.carBrandLogo;
                    this.baseInfo.car_model_full_name = this.report.baseInfo.carMemo;
                    // 车主端需要隐藏车架号
                    this.baseInfo.vin = this.vinEncode(this.baseInfo.carVinNo);
                    this.totalPrice.maintainPrice = this.report.maintenance[0].total_price; //维修费用
                    // this.totalPrice.referencePrice4s = this.report.referencePrice4s; // 4S维修参考价
                    this.remakeTabList();
                    this.adData.code = this.data.reportCode;
                    this.getAdList();
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 重构诊断结果
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 14:46:26
         */
        getCheckResult() {
            this.report.subSysInfo.forEach(item => {
                if (item.code == "cold_temperature" && item.detectionResult) {
                    this.makeResult += item.detectionResult + "<br>";
                    return true;
                }
                if (item.level != "e" && item.level != "1") {
                    this.makeResult += item.detectionResult + "<br>";
                }
            });
        },
        /**
         * @Description: 获取质保方案
         * @Param: code
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 16:00:18
         */
        getQualityWarrantyScheme(code) {
            undisposedApi.getQualityWarrantyScheme({ billId }).then(res => {
                if (res.code == 20000) {
                    var qualityWarranty = res.data.quality_warranty;
                    for (var i = 0; i < qualityWarranty.length; i++) {
                        if (
                            qualityWarranty[i].code ==
                            "maintenance_system_protection"
                        ) {
                            this.warrantyScheme = qualityWarranty[i];
                            this.totalPrice.servicePrice =
                                qualityWarranty[i].price;
                        }
                    }
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },

        /**
         * @Description: 微信支付
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-04 19:10:24
         */
        play() {
            var relationList = [];
            for (var i = 0; i < this.warrantyList.length; i++) {
                relationList.push(this.warrantyList[i].system_id);
            }
            var params = {
                blockPolicyCode: this.data.blockPolicyCode,
                relation_id_list: relationList
            };
            guestApi.updateExtendWarrantyPrice(params).then(res => {
                if (res.code == 20000) {
                    this.extendWarrantyPay();
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        //跳转服务协议
        goAgreement() {
            window.location.href =
                process.env.VUE_APP_WEB_OWNER_URL +
                "/warranty_details.html?code=" +
                this.code;
        },
        extendWarrantyPay() {
            var price = this.playPrice;
            var params = {
                blockPolicyCode: this.data.blockPolicyCode,
                price: price.toFixed(2)
            };
            guestApi.extendWarrantyPay(params).then(res => {
                if (res.code == 30100) {
                    window.location.href = res.data.url;
                } else if (res.code == 20000) {
                    this.getExtendWarrantyDetail(this.code);
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 重构导航列表
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-12 17:18:11
         */
        remakeTabList() {
            if (this.report.baseInfo) {
                var data = {
                    name: "基本信息",
                    id: "reportBaseInfo"
                };
                this.tabList.push(data);
            }
            if (this.makeResult) {
                var data = {
                    name: "诊断结果",
                    id: "reportResultList"
                };
                this.tabList.push(data);
            }
            if (this.report.maintenance) {
                var data = {
                    name: "维修项目",
                    id: "reportMaintainScheme"
                };
                this.tabList.push(data);
            }
        },
        /**
         * @Description: tab标签事件
         * @Param: id
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-12 17:44:10
         */
        tabChanges(id) {
            this.$nextTick(() => {
                var dom = document.querySelector("#" + id).offsetTop - 50;
                window.scrollTo(0, dom);
            });
        },
        /**
         * @Description: 获取广告信息列表
         * @Param: loc_id(广告位ID) , report_code(报告code)
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-13 17:23:42
         */
        getAdList() {
            if (this.adMark == this.adData.loc_id.length) {
                this.ready = true;
                console.log("adList:", this.adList);
                var arr = Object.keys(this.adList);
                for (var i = 0; i < arr.length; i++) {
                    var num = 0;
                    this.setTimeoutVal.push(num); // 根据广告位置的数量，初始化一个数，用来变化图片
                }
                if (this.adList && arr.length > 0) {
                    this.setTimeoutFun1();
                    this.setTimeoutFun2();
                }
                return;
            }
            let params = {
                loc_id: this.adData.loc_id[this.adMark],
                report_code: this.adData.code
            };
            reportApi.getAdList(params).then(res => {
                if (res.code == 20000) {
                    this.adList[this.adData.loc_id[this.adMark]] =
                        res.data.list;
                    this.adMark += 1;
                    this.getAdList();
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        //切换图片
        setTimeoutFun1() {
            setTimeout(() => {
                if (this.setTimeoutVal[0] != this.adList.C00009.length - 1) {
                    this.$set(this.setTimeoutVal, 0, this.setTimeoutVal[0] + 1);
                } else {
                    this.$set(this.setTimeoutVal, 0, 0);
                }
                this.setTimeoutFun1();
            }, 2000);
        },
        setTimeoutFun2() {
            setTimeout(() => {
                if (this.setTimeoutVal[1] != this.adList.C00010.length - 1) {
                    this.$set(this.setTimeoutVal, 1, this.setTimeoutVal[1] + 1);
                } else {
                    this.$set(this.setTimeoutVal, 1, 0);
                }
                this.setTimeoutFun2();
            }, 2000);
        },
        /**
         * @Description: 记录广告点击事件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-13 18:17:40
         */
        addClickLog(item, loc_id) {
            let params = {
                ad_id: item.loc_id,
                ad_position_id: loc_id,
                report_id: this.adData.code
            };
            reportApi.addClickLog(params).then(res => {
                if (res.code == 20000) {
                    console.log("添加广告点击成");
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    },
    watch: {
        warrantyList: {
            handler(newValue, oldValue) {
                this.playPrice = Number(this.qualityWarranty.shop_price);
                var price = 0;
                for (var i = 0; i < newValue.length; i++) {
                    price += Number(newValue[i].price);
                }
                this.qualityWarranty.system_total_price = price;
                this.playPrice += price;
                this.qualityWarranty.total_price = this.playPrice;
            },
            deep: true
        }
    }
};
</script>
<style lang="less" scoped>
.system {
    color: #666;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    /deep/.van-checkbox__label {
        flex-grow: 1;
        color: #666;
        span {
            float: right;
        }
    }
    .title {
        .t1 {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            color: #000;
            h4 {
                padding: 10px 0 0 0px;
                margin-bottom: 10px;
                font-weight: bold;
                font-size: 20px;
            }
            a {
                flex-grow: 1;
                text-align: right;
                color: #ccc;
                letter-spacing: 1px;
            }
        }
        .t2 {
            color: #666;
            padding: 10px 0;
            display: flex;
            align-items: center;
            .left {
                padding-right: 10px;
                img {
                    width: 22px;
                    height: 23px;
                }
            }
            .right {
                line-height: 24px;
                div:nth-child(2) {
                    color: #e23b43;
                }
            }
        }
    }
    .content {
        // border-bottom: 1px solid #ccc;
        h5 {
            font-size: 17px;
            color: #595959;
            font-weight: bold;
            padding-left: 30px;
        }
        .box {
            // margin-bottom: 15px;
        }
        .special {
            /deep/.van-checkbox__label {
                position: relative;
            }
            h5 {
                padding-left: 0;
            }
            span {
                top: 0px;
                position: absolute;
                right: 0px;
            }
        }
    }
    .footer {
        padding: 10px 0;
    }
    .list {
        padding: 9px 8px;
        display: flex;
    }
}
.feeTotal {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    h5 {
        padding: 10px 8px;
        font-size: 17px;
        color: #595959;
        font-weight: bold !important;
    }
    .list-content {
        display: flex;
        flex-direction: column;
        li {
            padding: 9px 8px;
            color: #666;
            min-height: 20px;
            line-height: 20px;
            .text-right {
                text-align: right;
            }
        }
    }
}
.priceTotal {
    background: #fff;
    padding: 10px;
    color: #666;
    display: flex;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 15px;
    & > span {
        flex: 1;
        padding: 9px 8px;
    }
    .total_text {
        width: 100px;
        padding: 9px 8px;
        text-align: right;
    }
}
.text-right {
    text-align: right;
}
.bannerPic {
    position: relative;
    .bannerPicImg {
        width: 100%;
    }
    a {
        width: 100%;
        height: 100%;
        z-index: 1;
        position: absolute;
    }
}
</style>
