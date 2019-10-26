<template>
    <div class="page">
        <img class="bg" v-lazy="bgSrc" :alt="bgSrc" />
        <div class="main-container">
            <img class="tiger-logo" v-lazy="logoSrc" alt />
            <van-row class="tiger-logo-content">
                <van-col span="24" class="tiger-logo-title">修车养车先检测</van-col>
                <van-col span="24" class="tiger-logo-title">防宰防坑防忽悠</van-col>
            </van-row>
            <van-row class="appointment">
                <van-col span="24" class="appointment-checkbox-block">
                    <van-checkbox
                        v-model="agreeCheckbox"
                        checked-color="#e14732"
                        class="appointment-checkbox"
                    ></van-checkbox>
                    <span class="appointment-checkbox-span">
                        <router-link to="agreement">同意服务协议</router-link>
                    </span>
                </van-col>
                <van-col span="24" class="appointment-button">
                    <van-button
                        class="appointment-confirm"
                        size="normal"
                        :block="true"
                        round
                        type="danger"
                        @click="appointmentConfim"
                    >预约检车</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import { Checkbox, CheckboxGroup } from "vant";
export default {
    components: {
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
    },
    data() {
        return {
            bgSrc: require("@/pages/xhDetection/assets/image/xh_bg_index.png"),
            logoSrc: require("@/pages/xhDetection/assets/image/tiger.png"),
            agreeCheckbox: false
        };
    },
    created() {},
    mounted() {},
    activated() {
        this.init();
    },
    methods: {
        init() {
            let agreementDeal = this.$local.get("agreementDeal");
            if (agreementDeal) {
                this.agreeCheckbox = true;
            }
        },
        agreeCheckboxChange() {
            if (this.agreeCheckbox) {
                this.agreeCheckbox = false;
            } else {
                this.agreeCheckbox = true;
            }
        },
        appointmentConfim() {
            if (this.agreeCheckbox === false) {
                this.$dialog
                    .alert({
                        message: "请仔细阅读并同意服务协议"
                    })
                    .then(() => {});
                return false;
            }
            this.$local.set("agreementDeal", true);
            this.$router.replace({
                path: "menuIndex/orgMap"
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .bg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -999;
    }
    .main-container {
        text-align: center;
        .tiger-logo {
            padding-top: 40px;
            width: 150px;
        }
        .tiger-logo-content {
            padding-top: 10px;
            .tiger-logo-title {
                font-size: 24px;
                color: #e14732;
                padding-top: 10px;
            }
        }
        .appointment {
            position: fixed;
            left: 20px;
            right: 20px;
            bottom: 40px;
            text-align: center;
            .appointment-checkbox-block {
                .appointment-checkbox {
                    display: inline;
                    padding: 0px 10px 0px 0px;
                    margin-left: -5px;
                }
                .appointment-checkbox-span {
                    text-decoration: underline;
                }
            }
            .appointment-button {
                padding-top: 10px;
            }
            .appointment-confirm {
                width: 150px;
                margin: 0 auto;
            }
            .van-button--danger {
                background-color: #e14732;
                border: 0.02667rem solid #e14732;
            }
        }
    }
}
</style>
