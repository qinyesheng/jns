<!--
 * @Description: Description
 * @Author: qjy
 * @Date: 2019-04-28 10:55:45
 -->
<template>
    <div class="page">
        <div class="button-content" :class="{buttonFixed:isFixed}">
            <van-button
                native-type="button"
                type="info"
                :style="styleButton"
                size="large"
                :block="true"
                @click="buttonConfirm"
                v-show="showStatus"
                ref="buttonSelector"
            >{{title}}</van-button>
        </div>
        <van-row :class="{'bottom-fixed-hide':!isFixed}" :style="styleButtonFixed"></van-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 根据键盘弹出情况是否展示按钮
            showStatus: true,
            // 按钮样式
            styleButton: {},
            // 按钮固定样式
            styleButtonFixed: {}
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        background: {
            type: String,
            default: "#46aef7"
        },
        isFixed: {
            type: Boolean,
            default: true
        },
        textColor: {
            type: String,
            default: "#fff"
        }
    },
    created() {},
    mounted() {
        this.init();
        this.screenSizeControl();
        this.styleButtonHandle();
    },
    methods: {
        init() {
            let buttonHeight = this.$refs.buttonSelector.offsetHeight + 10;
            this.styleButtonFixed = {
                height: buttonHeight + "px"
            };
        },
        buttonConfirm() {
            this.$emit("buttonConfirm");
        },
        /**
         * @Description: 响应输入框处理
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-16 09:46:19
         */
        screenSizeControl() {
            let _this = this;
            let clientHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            window.onresize = function() {
                let nowClientHeight =
                    document.documentElement.clientHeight ||
                    document.body.clientHeight;
                let calcHeight = clientHeight - nowClientHeight;
                //键盘弹出的事件处理
                if (nowClientHeight < clientHeight && calcHeight > 100) {
                    _this.showStatus = false;
                } else {
                    //键盘收起的事件处理
                    _this.showStatus = true;
                }
            };
        },
        /**
         * @Description: 样式处理
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-16 09:46:49
         */
        styleButtonHandle() {
            this.styleButton = {
                "background-color": this.background,
                border: "1px solid" + this.background,
                color: this.textColor
            };
        }
    },
    watch: {
        /**
         * @Description:按钮样式处理
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-27 15:01:53
         */
        background(newVal, oldVal) {
            let newButtonStyle = {
                "background-color": newVal,
                border: "1px solid" + newVal
            };
            this.styleButton = { ...this.styleButton, ...newButtonStyle };
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .buttonFixed {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
    }
    /* .bottom-fixed {
        height: 60px;
    } */
    .bottom-fixed-hide {
        display: none;
    }
}
</style>
