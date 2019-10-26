<!--
 * @Description: 服务费
 * @Author: qys
 * @Date: 2019-07-16 11:05:56
 -->
<template>
    <div v-if="pageShow" class="page">
        <Vbackground />
        <div class="main-container">
            <div class="order-info">
                <!-- <h1 class="order-info-h1">订单信息</h1> -->
                <van-cell class="order-info-h1" title="订单信息" value-class="default-title">
                    <template slot="default">
                        <span v-if="payInfo.paid_point!=0" @click="countermand()">取消订单</span>
                    </template>
                </van-cell>

                <van-cell
                    :title="payInfo.product_name?payInfo.product_name:'订单费用'"
                    :value="payInfo.need_price+'元'"
                    class="title-item-color"
                />
                <div v-if="payInfo.discount_info && payInfo.discount_info.length>0">
                    <van-cell
                        v-for="(item,key) in payInfo.discount_info"
                        :key="key"
                        :title="item.discount_name"
                        :value="item.discount_price+'元'"
                        class="title-item-color"
                    />
                </div>
                <van-cell
                    v-if="payInfo.paid_point"
                    title="已支付"
                    :value="payInfo.paid_point"
                    class="title-item-color"
                />

                <van-cell title="合计" :value="payInfo.price+'元'" />
            </div>
            <div class="pay-way">
                <h1 v-if="payShow" class="pay-way-h1">选择支付方式</h1>
                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell
                            v-if="payShow"
                            title-class="title-color"
                            title="余额支付"
                            clickable
                            @click="radio = 'OWNER_POINTS'"
                        >
                            <van-radio slot="right-icon" name="OWNER_POINTS" />
                        </van-cell>
                        <van-cell
                            class="title-item-color"
                            v-if="radio=='OWNER_POINTS'"
                            title="余额"
                            :value="payInfo.user_point"
                        />
                        <van-cell
                            class="title-desc-color"
                            v-if="descStatus && radio=='OWNER_POINTS'"
                            title="剩余部分将通过微信支付"
                        />
                        <div v-if="payShow" class="underline"></div>
                        <van-cell
                            title-class="title-color"
                            title="微信支付"
                            clickable
                            @click="radio = 'OWNER_WX'"
                        >
                            <van-radio slot="right-icon" name="OWNER_WX" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
            <vbutton
                title="确定"
                :isFixed="isFixed"
                @buttonConfirm="confirm"
                :disabled="radio?false:true"
            />
        </div>
    </div>
</template>
<script>
import background from "@/components/background/background";
import button from "@/components/public/pubButton";
import xhjcOwnerApi from "@/api/xhjcOwner/xhjcOwner";
import { Checkbox, Radio, RadioGroup } from "vant";
export default {
    components: {
        Vbackground: background,
        [Checkbox.name]: Checkbox,
        [Radio.name]: Radio,
        [RadioGroup.name]: RadioGroup,
        vbutton: button
    },
    data() {
        return {
            num: "", //初始值
            bill_id: "", //工单id
            isFixed: false,
            pageShow: false,
            payShow: true,
            orderInfo: {
                payVipSum: "99.00",
                total: "99.00"
            },
            descStatus: false,
            radio: "",
            payInfo: {} //支付订单信息
        };
    },
    created() {
        //console.log(this.$route.query);
        if (this.$route.query.bill_id && this.$route.query.bill_id != "") {
            this.bill_id = this.$route.query.bill_id;
            this.getPayModeInfo();
        }
        this.$nextTick(() => {
            var titleDoc = document.querySelector("title");
            // console.log(titleDoc);
            titleDoc.innerText = "信息确认";
        });
    },
    mounted() {},
    methods: {
        /**
         * @Description: 确认支付
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-22
         */
        confirm() {
            let _this = this;
            if (!this.radio) {
                this.$toast("请选择支付方式");
                return;
            }
            xhjcOwnerApi
                .carOwnerPay({
                    bill_id: this.bill_id,
                    type: this.radio
                })
                .then(res => {
                    if (res.code == 20000) {
                        this.$toast("购买成功");
                        setTimeout(function() {
                            _this.$toast.clear();
                            _this.$session.set("routerActive", 2);
                            _this.$router.replace("/menuIndex/personalCenter");
                        }, 1500);
                    } else if (res.code == 30100) {
                        _this.$session.set("routerActive", 2);
                        window.location.href = res.data.url;
                    }
                });
        },
        /**
         * @Description: 取消支付
         * @Param:
         * @Author: qys
         * @LastEditors: qys
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-22
         */
        countermand() {
            xhjcOwnerApi
                .cancelOrder({
                    bill_id: this.bill_id,
                    type: this.radio
                })
                .then(res => {
                    if (res.code == 20000) {
                        this.$toast("取消成功");
                        this.getPayModeInfo();
                    }
                });
            // this.$toast('调起原生微信支付方法');
        },
        /**
         * @Description: 获取用户支付工单信息
         * @Param: bill_id 和 token
         * @Author: qys
         * @LastEditors: qys
         * @return:
         * @Date: 2019-07-22
         */
        getPayModeInfo() {
            let _this = this;
            xhjcOwnerApi
                .getPayModeInfo({
                    bill_id: this.bill_id
                })
                .then(res => {
                    if (res.code == 20000) {
                        //判断余额不足显示提示
                        if (+res.data.user_point < +res.data.price) {
                            this.descStatus = true;
                        }
                        //判断用户余额是否有钱
                        if (res.data.user_point == 0) {
                            this.payShow = false;
                            this.radio = "OWNER_WX";
                        }
                        this.payInfo = res.data;
                        this.pageShow = true;
                        if (res.data.pay_status == 1) {
                            this.$toast("已购买");
                            setTimeout(function() {
                                _this.$toast.clear();
                                _this.$session.set("routerActive", 2);
                                _this.$router.replace(
                                    "/menuIndex/personalCenter"
                                );
                            }, 1500);
                        }
                    }
                });
        }
    }
};
</script>
<style lang="less" scoped>
/* 重复的代码抽出 */
.public-background-style {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
}
.public-h1-style {
    font-size: 20px;
    padding: 10px 0;
}
/deep/ .van-cell__title {
    flex: 2.2;
}

.page {
    .main-container {
        .order-info {
            .public-background-style;
            .order-info-h1 {
                .public-h1-style;
                padding-bottom: 15px;
            }
            .default-title {
                color: #f44;
                font-size: 14px;
            }
            .title-item-color {
                color: #969799;
            }
        }
        .pay-way {
            .public-background-style;
            .pay-way-h1 {
                .public-h1-style;
            }
            /deep/ .van-hairline--top-bottom::after {
                border-width: 0;
            }
            /deep/ .van-cell:not(:last-child)::after {
                border-bottom: 0;
            }
            .underline {
                border-bottom: 1px solid #ebedf0;
            }
            .title-color {
                font-size: 16px;
            }
            .title-item-color {
                color: #969799;
                padding: 0px 15px;
            }
            .title-desc-color {
                color: #f44;
                padding-bottom: 10px;
            }
        }
    }
}
</style>
