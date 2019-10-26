<!--
 * @Description: 车主端全车安检报告
 * @Author: wjx
 * @Date: 2019-07-31 14:30:13
 -->
 
<template>
    <div class="page" v-if="ready">
        <background />
        <vehicleReportTemplate
            :baseInfo="baseInfo"
            :report="report"
            :sysInfo="sysInfo"
            :scoreCondition="scoreCondition"
            :makeResult="makeResult"
            :maintainScheme="maintainScheme"
            :selectBtnName="selectBtnName"
            :adList="adList"
            :adData="adData"
        ></vehicleReportTemplate>
        <div class="qrCode">
            <!-- <qrCode
                :titleStatus="false"
                :buttonStatus="false"
                qrCodeLink="http://www.wanguoqiche.com/jns/xhDetection.html#/"
            ></qrCode>-->
            <img v-lazy="WechatPic" alt />
            <p>扫码关注小虎检车公众号</p>
        </div>
    </div>
</template>
<script>
import reportApi from "@/api/common/report";
import vehicleReportTemplate from "@/views/report/vehicleReportTemplate";
import qrCode from "@/components/qrCode/qrCode";
import background from "@/components/background/background";
export default {
    data() {
        return {
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
            qrCodeLink: "",
            code: "", //报告code
            ready: false,
            WechatPic: require("@image/Wechat.jpg"),
            adList: {},
            adData: {
                loc_id: ["C00002", "C00005", "C00006"], //广告位ID ， C00001-小虎安检报告顶部,C00002-全车安检报告顶部
                code: ""
            },
            adMark: 0
        };
    },
    components: {
        vehicleReportTemplate,
        qrCode,
        background
    },
    created() {
        let query = this.$route.query;
        if (query) {
            this.code = query.code;
            if (this.code) {
                this.adData.code = this.code;
                this.getReportById(this.code);
                this.getAdList();
            }
        }
    },
    mounted() {},
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
         * @Description: 根据报告code获取车主端报告
         * @Param:
         * @Author: wjx
         * @LastEditors: wjx
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 16:04:53
         */
        getReportById(code) {
            reportApi.getWholeCarReport({ code }).then(res => {
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
                    // 车主端需要隐藏车架号
                    this.baseInfo.vin = this.vinEncode(this.baseInfo.carVinNo);
                    // 构造车况评分数据
                    this.scoreCondition.totalScore = this.report.baseInfo.totalScore;
                    this.scoreCondition.orgName = this.report.baseInfo.orgName;
                    this.scoreCondition.techNumber = this.report.baseInfo.techNumber; //它存在则为认证技师，显示蓝色标识
                    this.scoreCondition.createUserName = this.report.baseInfo.createUserName;
                    this.scoreCondition.detectionTime = this.report.baseInfo.detectionTime;
                    this.makeResult = this.report.makeResult;
                    this.sysInfo = this.report.sysInfo;
                    // this.ready = true;
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
        }
    }
};
</script>
<style lang="less" scoped>
.qrCode {
    text-align: center;
    img {
        width: 64%;
    }
    p {
        color: #999999;
        padding: 10px;
    }
}
</style>
