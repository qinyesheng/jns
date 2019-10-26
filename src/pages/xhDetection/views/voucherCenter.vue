<!--
 * @Description: 充值卡验证
 * @Author: xwq
 * @Date: 2019-04-15 16:04:01
 -->
<template>
    <div class="page">
        <VdialogMsg
            cancelButtonText="确认"
            confirmButtonText="重新填写"
            :warningInfoText="dialog.msg"
            @cancel="sure"
            @confirm="reset"
            @closeHandle="close"
            v-if="dialog.isShow"
        />
        <background />
        <div class="main-container">
            <div class="voucher-center">
                <div class="voucher-info">
                    <h2>充值卡密码</h2>
                    <div class="voucher-input">
                        <input
                            type="text"
                            class="input-info"
                            placeholder="请输入12位数充值密码"
                            maxlength="12"
                            v-model="inputVal"
                            @input="inputListene"
                            @focus="inputFocus"
                            @blur="inputBlur"
                            v-focus="focusStatus"
                            ref="input"
                        />
                        <transition name="van-fade">
                            <van-icon
                                name="cross"
                                class="clear"
                                v-show="clearShow"
                                @click="clearContent"
                            />
                        </transition>
                    </div>
                    <button class="submit-btn" :class="{active:inputIsVal}" @click="submitBtn">确认</button>
                    <transition name="van-fade" v-show="allowTimes==0">
                        <p class="toast" v-show="toastIsShow">每个账号一天可提交不多于{{cardTimes}}次</p>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dialogMsg from "@/components/dialog/dialogMsg";
import carOwnerApi from "@/api/carOwner/usersCenter";
import background from "@/components/background/background";
export default {
    components: {
        // headerOne,
        // xhMenu,
        VdialogMsg: dialogMsg,
        background
    },
    data() {
        return {
            // showMenuStatus: false,
            title: this.$route.meta.title,
            dialog: {
                isShow: false,
                msg: ""
            },
            inputVal: "",
            inputValFormate: "",
            inputIsVal: false,
            clearShow: false,
            focusStatus: true,
            toastIsShow: false,
            allowTimes: "",
            cardTimes: ""
        };
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function(el, { value }) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        /*  showMenu() {
            this.showMenuStatus = true;
        }, */
        /**
         * @Description: 初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:48:11
         */
        init() {
            this.allowTimes = this.$session.get("allowTimes")
                ? this.$session.get("allowTimes")
                : "";
            this.cardTimes = this.$session.get("cardTimes")
                ? this.$session.get("cardTimes")
                : "";
        },

        /**
         * @Description: 监听输入的值
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:47:46
         */
        inputListene() {
            this.inputValFormate = this.inputVal.replace(/\s/g, "");
            if (this.inputValFormate) {
                this.clearShow = true;
                this.inputIsVal = true;
                this.inputValFormate = this.inputValFormate.toUpperCase();
                if (this.inputValFormate.length === 12) {
                    this.inputValFormate = this.inputValFormate
                        .replace(/\s/g, "")
                        .replace(/(.{4})/g, "$1 ");
                    this.inputVal = this.inputValFormate;
                    this.$refs.input.blur();
                }
            } else {
                this.clearShow = false;
                this.inputIsVal = false;
            }
        },

        /**
         * @Description: 清除输入框的内容
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:47:31
         */
        clearContent() {
            this.inputVal = "";
            this.inputValFormate = "";
            this.clearShow = false;
            this.inputIsVal = false;
            this.$refs.input.focus();
        },

        /**
         * @Description: 提交卡密数据
         * @Param:  inputVal  输入的卡密值
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:41:17
         */
        submitBtn() {
            let inputVal = this.inputVal.replace(/\s/g, "");
            if (!inputVal) {
                this.dialog.msg = "卡密不能为空";
                this.dialog.isShow = true;
                return;
            } else if (inputVal.length < 12) {
                this.dialog.msg = "卡密不能少于12位";
                this.dialog.isShow = true;
                return;
            }
            if (this.allowTimes && +this.allowTimes <= 0) {
                this.inputIsVal = false;
                this.toastIsShow = true;
                setTimeout(function() {
                    this.toastIsShow = false;
                }, 5000);
                return;
            }
            carOwnerApi.getCardConsume(inputVal).then(res => {
                if (res.code == 20000 && res.data) {
                    // console.log(res);
                    this.$session.set("allowTimes", res.data.allow_times);
                    this.$session.set("dealInfo", res.data);
                    this.$router.push({
                        name: "dealInfo"
                    });
                } else if (res.code == 40000) {
                    this.dialog.msg = res.msg;
                    this.dialog.isShow = true;
                }
            });
        },
        //获得焦点
        inputFocus() {
            let val = this.inputValFormate.replace(/\s/g, "");
            val = val.toLowerCase();
            if (val) {
                this.inputVal = val;
            } else {
                this.clearShow = false;
            }
        },
        //失去焦点
        inputBlur() {
            this.inputVal = this.inputValFormate;
        },
        //关闭弹窗提示
        close() {
            this.dialog.isShow = false;
        },
        //弹窗确定按钮
        sure() {
            this.dialog.isShow = false;
            this.$refs.input.focus();
        },
        //弹窗重置按钮
        reset() {
            this.inputIsVal = false;
            this.dialog.isShow = false;
            this.inputVal = "";
            this.inputValFormate = "";
            this.$refs.input.focus();
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .voucher-center {
            .voucher-info {
                padding: 15px;
                background-color: #fff;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                & > * {
                    flex: 1;
                }
                & > h2 {
                    padding: 15px 0 20px 0;
                    font-size: 22px;
                }
                .voucher-input {
                    position: relative;
                    margin-bottom: 10px;
                    .input-info {
                        outline: none;
                        width: 100%;
                        height: 40px;
                        border: 0 none;
                        background-color: #f2f2f2;
                        border-radius: 8px;
                        padding-left: 8px;
                        box-sizing: border-box;
                        font-size: 12px;
                        letter-spacing: 3px;
                        text-align: center;
                    }
                    .clear {
                        box-sizing: border-box;
                        position: absolute;
                        right: 9px;
                        top: 12px;
                        font-size: 16px;
                    }
                }
                .submit-btn {
                    outline: none;
                    width: 100%;
                    padding: 15px 0;
                    border-radius: 10px;
                    background-color: #d1d1d1;
                    color: #fff;
                    border: 0 none;
                    font-size: 14px;
                    margin: 10px 0 15px 0;
                }
                .toast {
                    color: #ccc;
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
        .active {
            background-color: #46aef7 !important;
        }
    }
}
</style>
