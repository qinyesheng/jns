<!--
 * @Description: 技师端的汽车检测报告v1版
 * @Author: linpeng
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-07 10:15:39
 * @LastEditTime: 2019-09-18 14:47:53
 -->
<template>
    <div class="page">
        <headerOne
            :backgroundStatus="true"
            :rightText="rightText"
            @onClickRight="reportShare"
            title="报告详情"
            :isFixed="true"
        />
        <div class="main-container">
            <!-- <h4 class="report-title">{{report.title}}</h4> -->
            <carDetectionReportV1 v-if="report.baseInfo" :report="report" :data="data" />
            <qrCodeReport v-if="qrCodeLink" :qrCodeLink="qrCodeLink" />
        </div>
        <div class="btn" @click="pushCarOwner" v-if="payBtnShow">
            <div class="report-btn" :class="this.data.orgPointsStatusMsg?'disabled':''">生成报告</div>
            <div class="pad"></div>
        </div>
        <div class="btn" @click="turnRepairOrder" v-if="repairBtnShow">
            <div class="report-btn">转化维修工单</div>
            <div class="pad"></div>
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import jnsApi from "@/utils/jnsApi";
import billApi from "@/api/bill/report";
import billUndisposedApi from "@/api/bill/undisposed";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import carDetectionReportV1 from "@/views/report/carDetectionReportV1";
import { getUrlParams } from "@/utils/common";
var dataThis = ""; //为了原生回调，使用的全局数据

export default {
    components: {
        headerOne,
        qrCodeReport,
        carDetectionReportV1
    },
    data() {
        return {
            data: {},
            report: {},
            baseInfo: {},
            makeResult: [], // 诊断结果
            quality_time: "", // 质保时长：默认0,单位月,前端处理：>12个月要转为x年x个月
            quality_km: "", // 质保公里数
            total_price: "", // 方案总价
            bill_id: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            hederTitle: "",
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            repairBtnShow: false, // 转化工单按钮是否显示
            payBtnShow: false // 推送车主按钮是否显示
        };
    },

    created: function() {},
    mounted: function() {
        this.bill_id = this.$route.query.billId;
        if (!this.bill_id) {
            this.$toast.fail("缺少billId");
        }
        this.getReportById(this.bill_id);
        this.hederTitle = this.$router.history.current.meta.title;

        dataThis = this;
        window.appToH5 = function() {
            dataThis.getReportById(dataThis.billId);
        };
    },
    computed: {
        rightText() {
            if (this.qrCodeLink) {
                return "分享";
            } else {
                return "";
            }
        }
    },
    methods: {
        /**
         * 根据报告bill_id获取技师端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getReportById(bill_id) {
            let params = {
                billId: this.bill_id || ""
            };
            billApi.getReportByBillId(params).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    this.report = res.data.reportData;
                    this.baseInfo = this.report.baseInfo;
                    this.qrCodeLink = this.report.ownerReportUrl;

                    if (res.data.pushStatus == "2") {
                        // 判断能否显示推送按钮
                        this.payBtnShow = true;
                    } else {
                        this.payBtnShow = false;
                    }
                    if (
                        res.data.pushStatus == "1" &&
                        !this.report.newBillId &&
                        this.report.maintenance.length > 0
                    ) {
                        // 判断能否显示转化工单按钮
                        // 出现条件：已推送未转化且具有维修方案
                        this.repairBtnShow = true;
                    } else {
                        this.repairBtnShow = false;
                    }
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        },
        reportShare() {
            let share = {
                shareUrl: this.qrCodeLink,
                title: this.report.title,
                subtitle: this.baseInfo.carMemo,
                logo: this.carLogoPre + this.baseInfo.carBrandLogo + ".jpg",
                bill_id: this.bill_id,
                sms: 1,
                bill_type: "J004"
            };
            // jnsApi.share(share);
            jnsApi.h5ToApp("share", share);
        },
        /**
         * @Description: 推送车主调用原生方法
         * @Author: linpeng
         * @Date: 2019-03-22 09:14:50
         */
        pushCarOwner() {
            if (this.data.orgPointsStatusMsg) {
                // 站点禁用推送
                return;
            }
            let params = {
                bill_id: this.bill_id,
                bill_type: "J004"
            };
            jnsApi.h5ToApp("payOrder", params);
        },
        /**
         * @Description: 转化维修工单
         * @Author: linpeng
         * @Date: 2019-03-22 09:46:45
         */
        turnRepairOrder() {
            let params = {
                billId: this.bill_id || ""
            };
            billUndisposedApi.changeRepair(params).then(res => {
                if (res.code == 20000) {
                    this.repairBtnShow = false;
                    this.$toast.success("提交成功");
                } else {
                    this.$toast.fail(res.msg);
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.main-container {
    .report-title {
        font-size: 28px;
        font-weight: 500;
        text-align: center;
        background: none;
        padding-bottom: 20px;
    }
}
.btn {
    .report-btn {
        box-sizing: border-box;
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 15px;
        color: #fff;
        background-color: #46aef7;
        text-align: center;
        border-radius: 2px;
        font-size: 16px;
        height: 46px;
    }
    .pad {
        height: 46px;
    }
    .disabled {
        background-color: #d2d2d2;
    }
}
</style>