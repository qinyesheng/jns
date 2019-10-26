<!--
 * @Description: 自定义弹窗slot组件
 * @Author: xwq
 * @Date: 2019-08-30 11:26:45
 * @LastEditTime: 2019-08-31 11:24:52
 -->
<template>
    <div class="page">
        <van-dialog
            v-model="isShow"
            :title="title"
            show-cancel-button
            :cancel-button-text="cancelButtonText"
            :cancel-button-color="cancelButtonColor"
            :confirm-button-text="confirmButtonText"
            :confirm-button-color="confirmButtonColor"
            :before-close="beforeClose"
            @confirm="confirm"
            @cancel="cancel"
            :style="styleObject"
        >
            <template slot="default">
                <slot name="dialogValue"></slot>
            </template>
        </van-dialog>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        cancelButtonText: {
            type: String,
            default: "取消"
        },
        confirmButtonText: {
            type: String,
            default: "确定"
        },
        show: {
            type: Boolean
        },
        cancelButtonColor: String,
        confirmButtonColor: String,
        title: String
    },
    data() {
        return {
            isShow: false,
            styleObject: {} //改变弹窗的定位高度
        };
    },
    created() {},
    mounted() {},
    methods: {
        /**
         * @Description: 弹窗确定按钮
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-30 11:37:47
         */
        confirm() {
            this.$emit("confirm");
        },
        /**
         * @Description: 弹窗取消按钮
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-30 11:37:59
         */
        cancel() {
            this.$emit("cancel");
        },
        beforeClose(action, done) {
            // console.log(action);
            if (action == "cancel") {
                this.isShow = this.show;
                done();
            }
            if (action == "confirm") {
                done(!this.show);
                if (this.show && this.getTerminalType() == "ios") {
                    this.styleObject = {
                        top: "50%"
                    };
                }
            }
        },
        /**
         * @Description: 获取系统类型
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-31 10:23:05
         */
        getTerminalType() {
            let appStatus = "";
            let u = navigator.userAgent;
            let typePhone = {
                ios: u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
                android: u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 // android终端
            };

            appStatus = typePhone.ios ? "ios" : "android";

            return appStatus;
        }
    },
    watch: {
        show(newVal, oldVal) {
            // console.log("newVal", newVal);
            if (newVal) {
                this.isShow = newVal;
                if (this.getTerminalType() == "ios") {
                    this.styleObject = {
                        top: "35%"
                    };
                } else {
                    this.styleObject = {
                        top: "50%"
                    };
                }
            } else {
                this.isShow = newVal;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.page {
}
</style>