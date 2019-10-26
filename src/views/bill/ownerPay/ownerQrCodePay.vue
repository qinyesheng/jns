<!--
 * @Description: 车主二维码支付
 * @Author: xwq
 * @Date: 2019-07-22 19:56:36
 -->
<template>
    <div class="page">
        <headerOne
            :isFixed="true"
            :backgroundStatus="true"
            :title="title"
            rightText="微信分享"
            @onClickRight="weChatShare"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
        />
        <div class="main-container">
            <qrCode :qrCodeLink="qrCodeLink" @payment="payment(1)" buttonTtile="车主已支付" />
        </div>
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import { Checkbox, CheckboxGroup } from "vant";
import qrCode from "@/components/qrCode/qrCode";
import jnsApi from "@/utils/jnsApi";
import PointsDealApi from "@/api/PointsDeal/PointsDeal";
import undisposedApi from "@/api/bill/undisposed";
import backApi from "@/utils/back";
import { getCarBrandIconSrc } from "@/utils/common";
import { setTimeout } from "timers";
export default {
    components: {
        headerOne,
        qrCode,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup
    },
    data() {
        return {
            title: this.$route.meta.title,
            onClickLeftStatus: true,
            qrCodeLink: "",
            billId: "",
            buyType: "",
            data: {
                shareUrl: "",
                bill_type: "",
                title: "",
                subtitle: "",
                logo: "",
                bill_id: "",
                platforms: ["WechatSession"] //显示分享平台 Sms 短信、 WechatSession 微信、 WechatTimeLine  微信朋友圈、  QQ QQ聊天、  Qzone  qq空间
            }
        };
    },
    created() {
        this.billId = this.$route.query.bill_id;
        this.qrCodeLink =
            process.env.VUE_APP_WEB_QRCODE_URL +
            "/xhDetection.html?#/orderPay?bill_id=" +
            this.billId;
    },
    mounted() {
        backApi.androidPhysicalBackButtonHandle();
        this.init();
    },
    methods: {
        /**
         * @Description: 初始化
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-23 16:51:07
         */
        init() {
            this.data.shareUrl = this.qrCodeLink;
            undisposedApi.getBillDetail({ billId: this.billId }).then(res => {
                if (res.code == 20000) {
                    let baseInfo = res.data.baseInfo;
                    this.data.title = baseInfo.carModelFullName;
                    this.data.bill_type = res.data.billType;
                    this.data.bill_id = this.billId;
                    this.data.logo = getCarBrandIconSrc(baseInfo.carBrandLogo);
                    this.buyType = res.data.billType == "J005" ? 5 : 3;
                    this.payment();
                }
            });
        },
        /**
         * @Description: 返回
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-22 20:31:54
         */
        back() {
            backApi.handle();
        },
        /**
         * @Description: 车主分享
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-22 20:31:41
         */
        weChatShare() {
            jnsApi.h5ToApp("share", this.data);
        },
        /**
         * @Description: 车主已支付
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-22 20:31:29
         */
        payment(val) {
            val = val ? val : 0;
            let _this = this;
            let data = {
                bill_id: this.billId,
                buy_type: this.buyType
            };
            PointsDealApi.getPayModeInfo(data).then(res => {
                if (res.code == 20000) {
                    this.data.subtitle = res.data.product_name
                        ? res.data.product_name
                        : "";
                    if (res.data.pay_status == 1) {
                        this.$toast("车主已购买");
                        setTimeout(() => {
                            _this.$toast.clear();
                            jnsApi.h5ToApp("detail", {
                                bill_type: _this.data.bill_type,
                                bill_id: _this.billId
                            });
                        }, 1500);
                    } else if (res.data.pay_status == 0 && val == 1) {
                        this.$toast("车主未购买");
                    }
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        user-select: none;
    }
}
</style>
