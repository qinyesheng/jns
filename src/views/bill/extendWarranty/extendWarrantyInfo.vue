<!--
 * @Description: 技师端延长保修报告详情
 * @Author: wjx
 * @Date: 2019-09-02 11:07:41
 -->
<template>
    <div class="page" v-if="ready">
        <background />
        <headerOne
            :title="$route.meta.title"
            :isFixed="true"
            :backgroundStatus="true"
            :leftText="leftText"
            :rightText="qrCodeLink?'分享':''"
            :onClickLeftStatus="true"
            @onClickLeft="back"
            @onClickRight="reportShare"
        />
        <tabLink :tabList="tabList" @tabChange="tabChanges" :flexTop="45" />
        <div class="main-container">
            <extendWarrantyInfoTemplate
                :baseInfo="baseInfo"
                :report="report"
                :makeResult="makeResult"
                :maintainScheme="maintainScheme"
            ></extendWarrantyInfoTemplate>
            <warrantyService :qualityWarranty="qualityWarranty" :reportType="reportType" />
            <div class="feeTotal" id="test1">
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
                                >{{qualityWarranty.system_total_price}} 元</span>
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
                                >{{qualityWarranty.total_price}} 元</span>
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
            <div v-if="!qrCodeLink ">
                <pubButton title="生成报告" :isFixed="true" @buttonConfirm="pushCarOwner"></pubButton>
            </div>
            <div v-else>
                <qrCodeReport :isFixed="true" :qrCodeLink="qrCodeLink"></qrCodeReport>
            </div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
// import historyApi from "@/api/bill/history";
import undisposedApi from "@/api/bill/undisposed";
import extendWarrantyInfoTemplate from "@/views/report/extendWarrantyInfoTemplate";
import pubButton from "@/components/public/pubButton";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import { getCarBrandIconSrc, getUrlParams } from "@/utils/common";
import back from "@/utils/back";
import background from "@/components/background/background";
import warrantyService from "@/components/report/warrantyService";
import tabLink from "@/components/tab/tabLink";
let _this;
export default {
    components: {
        headerOne,
        extendWarrantyInfoTemplate,
        pubButton,
        qrCodeReport,
        background,
        warrantyService,
        tabLink
    },
    data() {
        return {
            bill_id: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            data: {},
            report: {},
            baseInfo: {}, // 报告基本信息
            makeResult: "", // 报告诊断结果
            maintainScheme: {}, // 维修方式
            ready: false,
            leftText: "",
            // 质保方案
            qualityWarranty: {},
            totalPrice: {
                // 费用总计
                maintainPrice: "", // 维修费
                servicePrice: "", // 服务费
                referencePrice4s: ""
            },
            reportType: "bill", //报告类型、bill 技师端 、carOwner 车主端
            tabList: [] //tabs导航配置
        };
    },

    created() {},
    mounted() {
        _this = this;
        window.appToH5 = function() {
            _this.getHistoryBillDetail(_this.bill_id);
            _this.getExtendedWarrantyPackageList(_this.bill_id);
        };
        let query = getUrlParams();
        if (query) {
            this.bill_id = query.bill_id;
            if (this.bill_id) {
                this.getHistoryBillDetail(this.bill_id);
                this.getExtendedWarrantyPackageList(this.bill_id);
            }
        }
        back.androidPhysicalBackButtonHandle();
        if (
            getUrlParams().jnsAppStep &&
            getUrlParams().jnsAppStep == "Y002_report_h5"
        ) {
            this.leftText = "返回检测工单";
        } else {
            this.leftText = "";
        }
    },
    methods: {
        /**
         * @Description: 分享
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 15:15:52
         */
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.car_model_full_name,
                logo: getCarBrandIconSrc(this.baseInfo.car_icon),
                bill_id: this.bill_id,
                sms: 1,
                bill_type: "Y002"
            };
            // jnsApi.share(share);
            jnsApi.h5ToApp("share", share);
        },
        /**
         * @Description: 后退事件
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 15:15:49
         */
        back() {
            if (this.leftText != "") {
                this.$router.back();
            } else {
                jnsApi.back();
            }
        },
        /**
         * @Description: 改造维方式的数据
         * @Param:
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
         * @Description: 获取历史工单详情
         * @Param: bill_id
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 14:06:48
         */
        getHistoryBillDetail(bill_id) {
            undisposedApi.getBillDetail({ billId: bill_id }).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;

                    this.report = res.data.reportData;
                    this.qrCodeLink = res.data.warrantyOwnerSmsUrl
                        ? res.data.warrantyOwnerSmsUrl
                        : "";

                    this.remakeMaintenance(this.report.maintenance);
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
                    this.totalPrice.maintainPrice = this.report.maintenance[0].total_price; //维修费用
                    // this.totalPrice.referencePrice4s = this.report.referencePrice4s; // 4S维修参考价

                    this.remakeTabList();
                    this.ready = true;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 推送车主调用原生方法
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 13:59:00
         */
        pushCarOwner() {
            let params = {
                bill_id: this.bill_id,
                bill_type: "Y002"
            };
            jnsApi.h5ToApp("payOrder", params);
        },
        /**
         * @Description: 展示二维码
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-31 18:14:11
         */
        showQrCode() {},
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
         * @Description: 获取延长保修服务数据
         * @Param: bill_id
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-03 16:00:18
         */
        getExtendedWarrantyPackageList(bill_id) {
            undisposedApi
                .getExtendedWarrantyPackageList({ bill_id })
                .then(res => {
                    if (res.code == 20000) {
                        this.qualityWarranty = res.data;
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
            if (this.data.baseInfo) {
                var data = {
                    name: "基本信息",
                    id: "reportBaseInfo"
                };
                this.tabList.push(data);
            }
            if (this.data.checkResultArr) {
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
                var dom = document.querySelector("#" + id).offsetTop - 100;
                window.scrollTo(0, dom);
            });
        }
    }
};
</script>
<style lang="less" scoped>
.feeTotal {
    background: #fff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
    h5 {
        font-weight: bold;
        color: #595959;
        padding: 10px 8px;
        font-size: 17px;
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
</style>
