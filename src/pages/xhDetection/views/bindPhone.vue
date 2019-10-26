<!--
 * @Description: 手机号绑定
 * @Author: xwq
 * @Date: 2019-08-01 11:17:10
 * @LastEditTime: 2019-10-12 15:14:01
 -->
<template>
    <div class="page">
        <div class="main-container">
            <h1 class="bind-phone-title">{{title}}</h1>
            <div class="input-phone">
                <van-field
                    v-model="phoneValue"
                    type="number"
                    maxlength="11"
                    center
                    clearable
                    placeholder="点击输入"
                    :error-message="errorMessage"
                    @input="inputHandle"
                    @blur="blurHandle"
                    @clear="clear"
                />
                <transition name="van-fade">
                    <p class="msg-error" v-if="errorMsgStatus">{{errorMsg}}</p>
                </transition>
            </div>
            <div class="send-msm">
                <van-cell-group>
                    <transition name="van-fade">
                        <van-field
                            v-model="msmValue"
                            type="number"
                            maxlength="6"
                            center
                            clearable
                            placeholder="输入验证码"
                            :error-message="errorMessage"
                            @input="msmInputHandle"
                        >
                            <van-button
                                v-if="!slotLabel"
                                slot="button"
                                size="small"
                                type="info"
                                @click="getMsmCode"
                            >获取验证码</van-button>

                            <van-button v-if="slotLabel" slot="button" size="small" type="info">
                                <i class="label-text label-left-text">{{countDownTime}}</i>
                                <i class="label-text label-right-text">后重发</i>
                            </van-button>
                        </van-field>
                    </transition>
                </van-cell-group>
            </div>
            <Vbutton
                title="确定"
                :isFixed="false"
                @buttonConfirm="buttonConfirm"
                :background="backgroundColor"
            />
        </div>
    </div>
</template>
<script>
import button from "@/components/public/pubButton";
import carOwnerApi from "@/api/carOwner/usersCenter";
import { Field } from "vant";
export default {
    components: {
        Vbutton: button,
        [Field.name]: Field
    },
    data() {
        return {
            title: this.$route.meta.title,
            errorMessage: "",
            phoneValue: "",
            msmValue: "",
            msmStatus: false,
            errorMsg: "",
            errorMsgStatus: false,
            backgroundColor: "#91d6fb",
            countDownTime: null,
            slotLabel: false,
            buttonStatus: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        //errorMsg提示
        errorMsgHint(errorMsgStatus, msgValue) {
            this.errorMsg = msgValue;
            this.errorMsgStatus = errorMsgStatus;
        },
        /**
         * @Description: 手机号输入
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 18:17:13
         */
        inputHandle() {
            let phoneLength = this.phoneValue.length;
            if (phoneLength == 11 || phoneLength == 0) {
                this.errorMsgHint(false, "");
            }
        },
        /**
         * @Description: 手机号输入_失去焦点
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 09:38:48
         */
        blurHandle() {
            let phoneLength = this.phoneValue.length;
            if (phoneLength == "") {
                this.errorMsgHint(true, "手机号不能为空");
                return false;
            } else if (phoneLength != 11) {
                this.errorMsgHint(true, "手机号格式不正确");
                return false;
            }
            return true;
        },
        /**
         * @Description: 手机号输入_一键清空
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 09:39:04
         */
        clear() {
            this.errorMsgHint(false, "");
        },
        /**
         * @Description: 请求验证码
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 09:36:57
         */
        getMsmCode() {
            if (!this.blurHandle()) return;
            carOwnerApi
                .getBindMobileSms({ mobile: this.phoneValue })
                .then(res => {
                    if (res.code == 20000) {
                        this.msmInputHandle();
                        this.buttonStatus = true;
                        this.$toast(res.msg);
                        this.countDownHandle(61);
                        setTimeout(() => {
                            this.$toast.clear();
                            this.slotLabel = true;
                        }, 1000);
                    } else {
                        this.buttonStatus = false;
                        this.errorMsgHint(true, res.msg);
                    }
                });
        },
        /**
         * @Description: 倒计时计算
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 15:55:08
         */
        countDownHandle(time) {
            let timer;
            let _this = this;
            clearInterval(timer);
            timer = setInterval(() => {
                time--;
                if (time === 0) {
                    window.clearInterval(timer);
                    _this.slotLabel = false;
                }
                _this.countDownTime = time + "S";
            }, 1000);
            /* 监听组件销毁前，移除定时器 */
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
            });
        },
        /**
         * @Description: 手机验证码输入
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 09:32:01
         */
        msmInputHandle() {
            // if (!this.blurHandle() || this.slotLabel==false) return;
            if (
                this.slotLabel == false ||
                this.phoneValue.length != 11 ||
                this.msmValue.length != 6
            ) {
                this.backgroundColor = "#91d6fb";
            } else {
                this.backgroundColor = "#46aef7";
            }
        },
        /**
         * @Description:校验手机号
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-26 15:36:53
         */

        buttonConfirm() {
            if (!this.buttonStatus || this.msmValue.length == 0) return;
            let data = {
                mobile: this.phoneValue,
                verify_code: this.msmValue
            };
            carOwnerApi.editCustomerBindMobile(data).then(res => {
                if (res.code == 20000) {
                    this.$toast(res.msg);
                    setTimeout(() => {
                        this.$toast.clear();
                        this.$router.replace({
                            name: "personalCenter"
                        });
                    }, 1500);
                } else {
                    this.$toast(res.msg);
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        .bind-phone-title {
            padding: 15px 0;
            font-size: 20px;
        }
        .input-phone {
            margin-bottom: 15px;
            /deep/ .van-cell__value {
                background-color: #f2f2f2;
                padding: 8px;
                box-sizing: border-box;
                background: #ddd;
            }
            /deep/ .van-cell--center {
                padding: 0;
            }
            .msg-error {
                padding: 10px;
                color: #f44;
            }
            /deep/ .van-field__body {
                background: #ddd;
            }
        }
        .send-msm {
            margin-bottom: 40px;
            /deep/ .van-hairline--top-bottom::after {
                border: 0 none;
            }
            /deep/ .van-field__body {
                background: #ddd;
            }
            /deep/ .van-cell__value {
                background-color: #f2f2f2;
                padding: 0px;
                box-sizing: border-box;
            }
            /deep/ .van-cell--center {
                padding: 0;
            }
            /deep/ .van-field__control {
                padding-left: 10px;
            }
            /deep/ .van-button--info {
                background-color: rgb(70, 174, 247);
                width: 100px;
                height: 40px;
                border: 0 none;
                padding: 0;
                .label-text {
                    font-style: normal;
                }
                .label-left-text {
                    font-size: 14px;
                    color: #f00;
                }
                .label-right-text {
                    color: #fff;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>
