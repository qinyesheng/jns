<template>
    <div class="page">
        <div class="main-container">
            <div class="button-content" :class="{buttonFixed:isFixed}">
                <van-button
                    native-type="button"
                    type="info"
                    size="large"
                    :block="true"
                    @click="postConfirm"
                    ref="buttonSelector"
                    :disabled="disabledStatus"
                    :class="PostClassName"
                    v-if="(isPost=='0'||isPost=='2')"
                >提交合格证</van-button>
                <van-button
                    native-type="button"
                    type="info"
                    size="large"
                    :block="true"
                    @click="qrCodeView"
                    ref="buttonSelector"
                    :class="isPost?'qrCodeBtn':'vanBtn'"
                >查看二维码</van-button>
            </div>
            <van-row :class="{'bottom-fixed-hide':!isFixed}" :style="styleButtonFixed"></van-row>

            <van-popup v-model="show" class="qr-code-canvas-popup" :lazy-render="false">
                <canvas id="qrCodeCanvas" class="qr-code-canvas" v-show="show==true"></canvas>
            </van-popup>
        </div>
    </div>
</template>
<script>
import QRCode from "qrcode";
export default {
    name: "qrCodeReport",
    data() {
        return {
            show: false,
            PostClassName: "", //:class="(isPost==0||isPost==2)?'postBtn':'vanBtn'"
            // 固定底部悬浮按钮默认样式
            styleButtonFixed: {
                height: "20px"
            },
            disabledStatus: false
        };
    },
    props: {
        qrCodeLink: {
            type: String,
            default: ""
        },
        isFixed: {
            type: Boolean,
            default: false
        },
        isPost: {
            type: String,
            default: false
        }
    },
    mounted() {
        this.useQrcode();
        if (this.isPost == "0") {
            this.PostClassName = "postBtn";
            this.disabledStatus = false;
        } else if (this.isPost == "2") {
            this.PostClassName = "postBtn1";
            this.disabledStatus = true;
        } else {
            this.PostClassName = "";
        }
    },
    methods: {
        qrCodeView() {
            // console.log("qrCodeView");
            if (this.show) {
                this.show = false;
            } else {
                this.show = true;
            }
        },
        useQrcode() {
            const _this = this;
            const canvas = document.getElementById("qrCodeCanvas");
            // console.log(canvas);
            // console.log(_this.qrCodeLink);
            // With promises
            QRCode.toCanvas(
                canvas,
                _this.qrCodeLink || "",
                { width: 180, margin: 1 },
                function(error) {
                    if (error) console.error(error);
                    // console.log("QRCode success!");
                }
            );
        },
        /**
         * @Description: 提交合格证
         * @Author: linpeng
         * @Date: 2019-06-25 14:29:24
         */
        postConfirm() {
            this.$emit("postConfirm");
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .button-content {
        display: flex;
        .vanBtn {
            background: #46aef7;
            border: 1px solid #46aef7;
            // width: 100% !important;
        }
        .postBtn1 {
            width: 60%;
            background: #d0d0d1;
            border: 1px solid #d0d0d1;
            border-right: none;
            opacity: 1;
        }
        .postBtn {
            width: 60%;
            background: #d0d0d1;
            border: 1px solid #d0d0d1;
            border-right: none;
            opacity: 1;
        }
        .postBtn {
            // width: 60%;
            background: #46aef7;
            border: 1px solid #46aef7;
            border-right: none;
            flex: 1.6;
        }
        .qrCodeBtn {
            // width: 40%;
            background: #89cdfe;
            border: 1px solid #89cdfe;
            border-left: none;
            flex: 1;
        }
    }
    .buttonFixed {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .bottom-fixed {
        height: 60px;
    }
    .bottom-fixed-hide {
        display: none;
    }
}
.qr-code {
    width: 240px;
    height: 240px;
}
.qr-code-canvas-popup {
    overflow: hidden;
}
</style>

