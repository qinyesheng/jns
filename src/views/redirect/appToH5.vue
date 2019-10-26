<!--
 * @Description: app调用h5页面处理
 * @Author: qjy
 * @Date: 2019-05-23 09:44:07
 -->
<template>
    <div class="page">
        <!-- <h1 style="font-size:24px;">app调用h5页面</h1> -->
    </div>
</template>
<script>
import Qs from "qs";
import { setToken, setAppStatus } from "@/utils/auth";
import { getUrlParams, isEmptyObject } from "@/utils/common";
export default {
    data() {
        return {
            query: this.$route.query,
            urlParams: getUrlParams()
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        notFound() {
            this.$router.replace("/notFound");
        },
        init() {
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: "spinner",
                message: "加载中"
            });
            let urlParams = Object.assign(this.urlParams, this.query);
            // return;
            if (isEmptyObject(urlParams)) {
                this.notFound();
                return false;
            }
            // jnsAppStep,bill_id,token,status,bill_type,jnsAppStatus
            // token
            if (urlParams.token) {
                setToken(urlParams.token);
            }
            // jnsAppStatus = status
            if (urlParams.jnsAppStatus) {
                urlParams.status = urlParams.jnsAppStatus;
            }
            // status
            if (urlParams.status) {
                setAppStatus(urlParams.status);
            }
            let jnsAppStep = urlParams.jnsAppStep;
            // jnsAppStep 检查方法是否存在
            if (!this[jnsAppStep]) {
                this.$router.replace("/notFound");
            } else {
                // 处理方法
                this.$toast.clear();
                this[jnsAppStep]();
            }
        },
        /* -------------------- 说明：如果是工单类型名称开头的 那么用下划线形式定义方法 */
        /* -------------------- 说明：参数 后面一律使用小驼峰*/
        /**
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-29 17:51:10
         */
        boughtReport() {
            // http://localhost:80/jns/index.html?token=0bc5544d351384b6c74ba6e47037fcc7&status=ios&jnsAppStep=boughtReport#/appToH5
            this.$router.replace("/personal/boughtReport");
        },
        /**
         * @Description: 个人中心-个人统计
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-29 17:51:10
         */
        workingStatistics() {
            let params = {
                id: this.urlParams.userId
            };
            this.$router.replace(
                "/personal/personalStatisticsFromApp?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: 个人中心-个人钱包
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-29 17:51:10
         */
        myWallet() {
            this.$router.replace("/personal/myWallet");
        },
        /**
         * @Description: 个人中心-员工工作量
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-29 17:51:10
         */
        employeeWorkload() {
            this.$router.replace("/personal/workload");
        },
        /**
         * @Description: 个人中心-预订单统计
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-29 17:51:13
         */
        bookingOrder() {
            this.$router.replace("/personal/bookingOrder");
        },
        /**
         * @Description: h5其他项目调起深度诊断报告详情方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:37:52
         */
        J005_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/depthDiagnosisReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起深度诊断报告详情方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:38:17
         */
        J005_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/depthDiagnosisReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起深度诊断列表方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:38:45
         */
        J005_list() {
            let params = {
                token: this.urlParams.token,
                status: this.urlParams.status,
                menuId: 1
            };
            location.replace(
                process.env.VUE_APP_WEB_DOCDEV_URL +
                    "/detection/index.html?" +
                    Qs.stringify(params) +
                    "#/Check"
            );
        },
        /**
         * @Description:app统一调起汽车安检列表方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 14:01:34
         */
        J006_list() {
            let params = {
                token: this.urlParams.token,
                status: this.urlParams.status,
                menuId: 3,
                specialVal: "J002"
            };
            location.replace(
                process.env.VUE_APP_WEB_DOCDEV_URL +
                    "/detection/index.html?" +
                    Qs.stringify(params) +
                    "&#/Check"
            );
        },

        /**
         * @Description: h5其他项目调起二手车检测报告详情方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:37:52
         */
        E002_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/usedCarDetectionReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起二手车检测报告详情方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:38:17
         */
        E002_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/usedCarDetectionReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起二手车检测列表方法
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:38:45
         */
        E002_list() {
            this.J005_list();
        },
        /**
         * @Description: app统一调起AI空调检测报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-15 16:11:06
         */
        airConditionerDetectionReport() {
            let params = {
                order_id: this.urlParams.orderId
            };
            this.$router.replace(
                "/aiSolution/airConditionerReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: h5其他项目调起汽车安检报告详情方法
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-17 11:37:52
         */
        J006_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/carSecurityCheckReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起汽车安检报告详情方法
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-17 11:38:17
         */
        J006_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/carSecurityCheckReport?" + Qs.stringify(params)
            );
        },

        /**
         * @Description: h5其他项目调起二手车评估报告详情方法
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-22 11:37:52
         */
        E003_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/usedCarAssessReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起二手车评估报告详情方法
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-22 11:38:17
         */
        E003_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/usedCarAssessReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起检测工单列表方法
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-22 11:38:45
         */
        E003_list() {
            this.J005_list();
        },
        /**
         * @Description: (捕车)app统一调起二手车评估的检测报告
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-22 11:38:45
         */
        E003_buche_detection_report() {
            let params = {
                billId: this.urlParams.bill_id,
                bucheToken: this.urlParams.bucheToken,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/usedCarAssessDetectionReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起尾气AI诊断报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-06 18:04:58
         */
        J007_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/tailAiDiagnosisReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起尾气AI诊断列表方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-10 15:04:58
         */
        J007_list() {
            this.J005_list();
        },
        /**
         * @Description: H5其他项目调起AI尾气诊断报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-10 15:04:58
         */
        J007_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/tailAiDiagnosisReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: app统一调起全车安检报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 10:35:51
         */
        J008_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace("/bill/vehicleReport?" + Qs.stringify(params));
        },
        /**
         * @Description: H5其他项目调起全车安检报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 10:37:41
         */

        J008_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace("/bill/vehicleReport?" + Qs.stringify(params));
        },
        /**
         * @Description: app统一调起全车安检列表方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 10:38:55
         */

        J008_list() {
            this.J006_list();
        },
        /**
         * @Description: app统一调起AI空调检测报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:41:27
         */

        J009_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/aiSolution/airConditionerReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description:H5其他项目调起AI空调诊断报告方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:45:12
         */

        J009_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/aiSolution/airConditionerReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description:app统一调起AI空调诊断列表方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:46:06
         */

        J009_list() {
            this.J006_list();
        },
        /**
         * @Description: app统一调起延保报告方法
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:41:27
         */

        Y002_report() {
            let params = {
                billId: this.urlParams.bill_id,
                jnsAppStep: this.urlParams.jnsAppStep
            };
            this.$router.replace(
                "/bill/extendWarrantyInfo?" + Qs.stringify(params)
            );
        },
        /**
         * @Description:H5其他项目调起延保报告方法
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:45:12
         */

        Y002_report_h5() {
            let params = {
                billId: this.urlParams.bill_id
            };
            this.$router.replace(
                "/bill/extendWarrantyInfo?" + Qs.stringify(params)
            );
        },
        /**
         * @Description:app统一调起延保报告列表方法
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 13:46:06
         */

        Y002_list() {
            let params = {
                token: this.urlParams.token,
                status: this.urlParams.status,
                menuId: 2
            };
            location.replace(
                process.env.VUE_APP_WEB_DOCDEV_URL +
                    "/detection/index.html?" +
                    Qs.stringify(params) +
                    "&#/Warranty"
            );
        },
        /**
         * @Description:app统一跳转到学员列表页面
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-10-24
         */
        personalTrainee() {
            let params = {
                token: this.urlParams.token,
                status: this.urlParams.status,
            };
            this.$router.replace("/personal/trainee?" + Qs.stringify(params));
        }
    }
};
</script>


