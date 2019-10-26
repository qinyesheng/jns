<!--
 * @Description: 技师端的汽车安检报告v1版
 * @Author: your name
 * @Date: 2019-05-15 13:36:43
 * @LastEditTime: 2019-09-18 14:48:04
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page">
        <background />
        <headerOne
            title="报告详情"
            :isFixed="true"
            :backgroundStatus="true"
            :rightText="this.qrCodeLink?'分享':''"
            @onClickRight="reportShare"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
        />
        <div class="main-container">
            <carSecurityCheckReportV1
                v-if="report.baseInfo && reportReady"
                :report="report"
                :data="data"
            />
            <div class="reportNoReady" v-if="!reportReady">
                <van-icon name="todo-list-o" class="report-icon" />
                <div>报告未生成，请稍候查看</div>
            </div>
            <qrCodeReport v-if="qrCodeLink" :qrCodeLink="qrCodeLink" :isFixed="true" />
        </div>
        <pubButton title="生成报告" :isFixed="true" @buttonConfirm="pushCarOwner" v-if="payBtnShow" />
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { Icon } from "vant";
import pubButton from "@/components/public/pubButton";
import qrCodeReport from "@/components/qrCode/qrCodeReport";
import carSecurityCheckReportV1 from "@/views/report/carSecurityCheckReportV1";
import background from "@/components/background/background";
import jnsApi from "@/utils/jnsApi";
import back from "@/utils/back";
import { isEmptyObject, getCarBrandIconSrc } from "@/utils/common";
import reportApi from "@/api/bill/report";
var dataThis = ""; //为了原生回调，使用的全局数据
export default {
    components: {
        headerOne,
        qrCodeReport,
        carSecurityCheckReportV1,
        pubButton,
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            data: {},
            report: {},
            baseInfo: {},
            billId: "", //订单id，用于技师端
            qrCodeLink: "", //仅用于技师端 短链读取
            carLogoPre: "https://www.wanguoqiche.com/files/logo/",
            payBtnShow: false, // 推送车主按钮是否显示
            leftText: "",
            onClickLeftStatus: false, // 是否启用自定义返回方法
            reportReady: true
        };
    },

    created: function() {},
    mounted: function() {
        this.init();
        dataThis = this;
        window.appToH5 = function() {
            dataThis.getReportById(dataThis.billId);
        };
    },
    computed: {},
    methods: {
        /**
         * @Description: 初始化
         * @Author: linpeng
         * @Date: 2019-05-10 10:10:58
         */
        init() {
            let query = this.$route.query;
            if (query) {
                this.billId = query.billId;
                if (this.billId) {
                    this.getReportById(this.billId);
                }
                if (query.jnsAppStep && query.jnsAppStep == "J006_report") {
                    let _this = this;
                    _this.leftText = "";
                    _this.onClickLeftStatus = true;
                    jnsApi.androidCallback().cover(function() {
                        _this.back();
                    });
                } else {
                    this.leftText = "返回检测工单";
                    this.onClickLeftStatus = false;
                }
            }
        },
        /**
         * 根据报告billId获取技师端报告
         * @return {Object} 返回值描述
         * @author linpeng 2019/3/8
         */
        getReportById(billId) {
            let params = {
                billId: this.billId || ""
            };
            reportApi.getReportByBillId(params).then(res => {
                if (res.code == 20000) {
                    this.data = res.data;
                    this.report = res.data.reportData;
                    this.qrCodeLink = this.report.ownerReportUrl;
                    if (this.report.title) {
                        this.title = this.report.title;
                    }
                    if (isEmptyObject(this.report.baseInfo)) {
                        this.reportReady = false;
                    }
                    if (res.data.pushStatus == "2" && this.reportReady) {
                        // 判断能否显示推送按钮
                        this.payBtnShow = true;
                    } else {
                        this.payBtnShow = false;
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
                subtitle: this.report.baseInfo.carMemo,
                logo: getCarBrandIconSrc(this.report.baseInfo.carBrandLogo),
                bill_id: this.billId,
                sms: 1,
                bill_type: "J006"
            };
            // jnsApi.share(share);
            jnsApi.h5ToApp("share", share);
        },
        // 后退方法处理
        back() {
            jnsApi.back();
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
                bill_id: this.billId,
                bill_type: "J006"
            };
            jnsApi.h5ToApp("payOrder", params);
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
    .reportNoReady {
        background-color: #fff;
        padding: 20px 10px;
        border-radius: 4px;
        font-size: 16px;
        text-align: center;
        border: 1px solid #e6e6e6;
        .report-icon {
            font-size: 80px;
            color: #46aef7;
            margin-bottom: 20px;
        }
    }
}
</style>