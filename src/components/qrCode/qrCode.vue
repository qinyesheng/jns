<template>
    <div class="page">
        <div class="main-container">
            <div class="pay-qrCode-info" v-show="show">
                <h1 class="title" v-if="titleStatus">收款二维码</h1>
                <canvas id="qrCodeCanvas" class="qr-code-canvas" @click="qrCodeClick"></canvas>
            </div>
            <van-popup
                v-model="popShow"
                class="qr-code-canvas-popup"
                :lazy-render="false"
                @click-overlay="clickOverlay"
            >
                <canvas id="qrCodeClick" class="qr-code-canvas-pop"></canvas>
            </van-popup>
            <pubButton v-if="buttonStatus" :title="buttonTtile" @buttonConfirm="payment" />
        </div>
    </div>
</template>
<script>
import QRCode from "qrcode";
import pubButton from "@/components/public/pubButton";
import { getClientWidth } from "@/utils/common";
export default {
    name: "qrCode",
    components: {
        pubButton
    },
    data() {
        return {
            show: true,
            popShow: false
        };
    },
    props: {
        qrCodeLink: {
            type: String,
            default: ""
        },
        buttonTtile: {
            type: String,
            default: "查看二维码"
        },
        titleStatus: {
            type: Boolean,
            default: true
        },
        buttonStatus: {
            type: Boolean,
            default: true
        }
    },
    created() {},
    mounted() {
        let clientWidth = getClientWidth();
        this.useQrcode("qrCodeCanvas", { width: 180, margin: 1 });
        this.useQrcode("qrCodeClick", { width: clientWidth, margin: 1 });
    },
    methods: {
        useQrcode(idNmame, option) {
            const _this = this;
            const canvas = document.getElementById(idNmame);
            QRCode.toCanvas(canvas, _this.qrCodeLink || "", option, function(
                error
            ) {
                if (error) console.error(error);
            });
        },
        /**
         * @Description: 车主已支付按钮
         * @Param:
         * @Author: qjy
         * @LastEditors: qjy
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-16 09:46:49
         */
        payment() {
            this.$emit("payment");
        },
        /**
         * @Description: 二维码查看
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-23 10:46:38
         */
        qrCodeClick() {
            this.show = false;
            this.popShow = true;
        },
        /**
         * @Description: 关闭弹层
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-23 10:53:43
         */

        clickOverlay() {
            this.show = true;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        /deep/ .van-overlay {
            background-color: #fff;
        }
        .pay-qrCode-info {
            text-align: center;
            .title {
                font-size: 20px;
                padding: 15px 0;
                margin-bottom: 20px;
                text-align: left;
                font-weight: bold;
            }
        }
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

