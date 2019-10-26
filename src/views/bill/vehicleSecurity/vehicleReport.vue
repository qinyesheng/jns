<!--
 * @Description:  技师端全车安检报告
 * @Author: wjx
 * @Date: 2019-07-27 11:00:29
 -->
<template>
    <div class="page" v-if="ready">
        <headerOne
            title="报告详情"
            :isFixed="true"
            :backgroundStatus="true"
            :rightText="qrCodeLink?'分享':''"
            :onClickLeftStatus="true"
            @onClickLeft="back"
            @onClickRight="reportShare"
        />
        <vehicleReportTemplate
            :baseInfo="baseInfo"
            :report="report"
            :sysInfo="sysInfo"
            :scoreCondition="scoreCondition"
            :makeResult="makeResult"
            :maintainScheme="maintainScheme"
            :selectBtnName="selectBtnName"
            :adList="adList"
        ></vehicleReportTemplate>
        <div v-if="!qrCodeLink ">
            <pubButton title="生成报告" :isFixed="true" @buttonConfirm="pushCarOwner"></pubButton>
        </div>
        <div v-else>
            <qrCodeReport :isFixed="true" :qrCodeLink="qrCodeLink"></qrCodeReport>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import reportApi from "@/api/bill/report";
import vehicleReportTemplate from "@/views/report/vehicleReportTemplate";
import pubButton from "@/components/public/pubButton";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import { getCarBrandIconSrc, getUrlParams } from "@/utils/common";
import back from "@/utils/back";
let _this;
export default {
    components: {
        headerOne,
        vehicleReportTemplate,
        pubButton,
        qrCodeReport
    },
    data() {
        return {
            billId: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            selectBtnName: [], // 维修方案
            //大系统名称
            codeList: {
                bodywk: "外观内饰",
                light: "灯光系统",
                elect: "车载电脑",
                supply: "供电系统", //该系统由前端拆分
                driver: "传动系统",
                cold: "空调系统",
                engine: "发动机系统",
                chas: "底盘系统",
                brake: "制动系统"
            },
            data: {},
            sysInfo: [], // 车辆检查大系统数据
            report: {},
            baseInfo: {}, // 报告基本信息
            scoreCondition: {}, // 车况评分
            makeResult: "", // 报告诊断结果
            maintainScheme: {}, // 维修方式
            ready: false,
            leftText: "",
            adList: {} // 广告列表
        };
    },

    created() {},
    mounted() {
        _this = this;
        window.appToH5 = function() {
            _this.getReportById(_this.billId);
        };
        let query = this.$route.query;
        if (query) {
            this.billId = query.billId;
            if (this.billId) {
                this.getReportById(this.billId);
            }
        }
        back.androidPhysicalBackButtonHandle();
        if (
            getUrlParams().jnsAppStep &&
            getUrlParams().jnsAppStep == "J008_report_h5"
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
                bill_id: this.billId,
                sms: 1,
                bill_type: "J008"
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
            for (var i = 0; i < data.length; i++) {
                var maintenance = {
                    labor: [], //维修项目
                    parts: [], //配件
                    consumable: [], //耗材

                    labor_total: data[i].maintenanceTotal, //维修项目总价
                    consumable_total: data[i].suppliesTotal, //耗材总价
                    parts_total: data[i].partsTotal, //配件总价
                    total_price: data[i].total, //整个维修项目总价

                    price_ssss: data[i].referencePrice4s, //4s店价格
                    quality_desc: data[i].qualityTime //质保
                };
                //配件耗材
                for (var n = 0; n < data[i].parts.length; n++) {
                    //配件 1配件 2耗材
                    if (data[i].parts[n].partType == 1) {
                        maintenance.parts.push({
                            part_brand: data[i].parts[n].brand,
                            part_name: data[i].parts[n].name,
                            subtotal: data[i].parts[n].subtotal,
                            status: data[i].parts[n].status
                        });
                    } else {
                        maintenance.consumable.push({
                            consumable_brand: data[i].parts[n].brand,
                            consumable_name: data[i].parts[n].name,
                            subtotal: data[i].parts[n].subtotal,
                            status: data[i].parts[n].status
                        });
                    }
                }
                //维修项目
                for (var s = 0; s < data[i].maintenanceMode.length; s++) {
                    maintenance.labor.push({
                        labor_name: data[i].maintenanceMode[s].maintenanceName,
                        labor_price:
                            data[i].maintenanceMode[s].maintenancePrice,
                        status: data[i].maintenanceMode[s].status
                    });
                }
                maintenanceArr.push(maintenance);
            }
            this.report.maintenance = maintenanceArr;
            this.maintainScheme = this.report.maintenance[0];
        },
        /**
         * @Description: 根据报告bill_id获取技师端报告
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:04:53
         */
        getReportById(billId) {
            reportApi.getReportByBillId({ billId }).then(res => {
                if (res.code == 20000) {
                    this.sysInfo = res.data.reportData.sysInfo;
                    this.data = res.data;

                    this.report = res.data.reportData;
                    this.qrCodeLink = this.report.ownerReportUrl;

                    this.remakeData(this.report.subSysInfo);
                    this.remakeMaintenance(this.report.maintenance);

                    this.selectBtnName =
                        this.report.maintenance.length > 1
                            ? ["即时维修方式", "预案维修方式"]
                            : [];

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
                    // 构造车况评分数据
                    this.scoreCondition.totalScore = this.report.baseInfo.totalScore;
                    this.scoreCondition.orgName = this.report.baseInfo.orgName;
                    this.scoreCondition.techNumber = this.report.baseInfo.techNumber; //它存在则为认证技师，显示蓝色标识
                    this.scoreCondition.createUserName = this.report.baseInfo.createUserName;
                    this.scoreCondition.detectionTime = this.report.baseInfo.detectionTime;
                    this.makeResult = this.report.makeResult;
                    this.sysInfo = this.report.sysInfo;
                    this.ready = true;
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        /**
         * @Description: 改造检测与诊断项目的数据
         * @Param: subSysInfo 子项集合
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 11:21:21
         */
        remakeData(subSysInfo) {
            // 匹配检测名
            for (var i = 0; i < this.sysInfo.length; i++) {
                this.sysInfo[i].title = ""; // 标题
                this.sysInfo[i].more = false; // 是否展示
                this.sysInfo[i].faultNum = 0; // 多少项故障
                for (var j in this.codeList) {
                    if (this.sysInfo[i].code === j) {
                        this.sysInfo[i].title = this.codeList[j];
                    }
                }
            }
            let supplyArr = {
                subSysInfo: [],
                status: "e",
                code: "supply",
                title: "供电系统",
                faultNum: 0
            };
            // 重构检测子项
            this.sysInfo.forEach(sysInfo => {
                sysInfo.subSysInfo = [];
                subSysInfo.forEach(subSysInfo => {
                    if (subSysInfo.code.indexOf(sysInfo.code + "_") != -1) {
                        if (sysInfo.code == "elect") {
                            if (
                                subSysInfo.code == "elect_batteryVoltage" ||
                                subSysInfo.code == "elect_generatingVoltage" ||
                                subSysInfo.code == "elect_batteryPerf"
                            ) {
                                if (
                                    supplyArr.status == "e" &&
                                    subSysInfo.level != "e"
                                ) {
                                    supplyArr.status = subSysInfo.level;
                                } else if (
                                    subSysInfo.level != "e" &&
                                    subSysInfo.level != 1
                                ) {
                                    supplyArr.status = subSysInfo.level;
                                } else if (
                                    supplyArr.status == 0 &&
                                    subSysInfo.level != 0 &&
                                    subSysInfo.level != "e" &&
                                    subSysInfo.level != 1
                                ) {
                                    supplyArr.status = subSysInfo.level;
                                } else if (
                                    supplyArr.status == 2 &&
                                    subSysInfo.level != "e" &&
                                    subSysInfo.level != 1 &&
                                    subSysInfo.level != 0 &&
                                    subSysInfo.level != 2
                                ) {
                                    supplyArr.status = subSysInfo.level;
                                }
                                supplyArr.subSysInfo.push(subSysInfo);
                                return true;
                            }
                        }
                        sysInfo.subSysInfo.push(subSysInfo);
                    }
                });
            });
            this.sysInfo.push(supplyArr);
            // 添加故障数量
            for (var i = 0; i < this.sysInfo.length; i++) {
                for (var j = 0; j < this.sysInfo[i].subSysInfo.length; j++) {
                    if (
                        this.sysInfo[i].subSysInfo[j].level !== "1" &&
                        this.sysInfo[i].subSysInfo[j].level !== "e"
                    ) {
                        this.sysInfo[i].faultNum += 1;
                    }
                    if (this.sysInfo[i].faultNum > 0) {
                        this.sysInfo[i].more = true;
                    }
                }
            }
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
                bill_id: this.billId,
                bill_type: "J008"
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
        showQrCode() {}
    }
};
</script>
<style lang="less" scoped>
.page {
    background-color: #e3e3e3;
}
</style>
