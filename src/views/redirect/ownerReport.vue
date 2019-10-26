<!--
 * @Description: 车主报告页面处理
 * @Author: qjy
 * @Date: 2019-05-23 09:44:07
 -->
 <template>
    <div class="page">
        <!-- <h1 style="font-size:24px;">车主报告页面处理</h1> -->
    </div>
</template>
<script>
import Qs from "qs";
import { setToken, setAppStatus } from "@/utils/auth";
import { getUrlParams, isEmptyObject } from "@/utils/common";
export default {
    data() {
        return {
            urlParams: getUrlParams()
        };
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        notFound() {
            this.$router.replace("/notFound");
        },
        /**
         * @:Description 处理车主报告地址
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:35:30
         */
        init() {
            this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: "spinner",
                message: "加载中"
            });
            let urlParams = this.urlParams;
            if (isEmptyObject(urlParams) || !this[urlParams.billType]) {
                this.notFound();
                return false;
            }
            this.$toast.clear();
            // code,billType
            this[urlParams.billType]();
        },
        /**
         * @Description: 车主二手车检车工单报告
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-04-23 11:38:17
         */
        E002() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/usedCarDetectionReportV1?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: 车主汽车安检报告
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-17 11:38:17
         */
        J006() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/carSecurityCheckReportV1?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: 车主二手车评估报告
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-22 11:38:17
         */
        E003() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/usedCarAssessReportV1?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: ai尾气诊断报告
         * @Param:
         * @Author: lp
         * @LastEditors: lp
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-06-10 11:38:17
         */
        J007() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/tailAiDiagnosisReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: 全车安检报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-30 10:44:08
         */
        J008() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/vehicleReport?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: AI空调检测报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 10:48:44
         */

        J009() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/airConditionerReportV1?" + Qs.stringify(params)
            );
        },
        /**
         * @Description: AI空调检测报告
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-19 10:48:44
         */

        Y002() {
            let params = {
                code: this.urlParams.code,
                billType: this.urlParams.billType
            };
            this.$router.replace(
                "/carOwner/extendWarrantyInfo?" + Qs.stringify(params)
            );
        }
    }
};
</script>


