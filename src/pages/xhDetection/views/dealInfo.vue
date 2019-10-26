<!--
 * @Description: 交易详情
 * @Author: xwq
 * @Date: 2019-04-16 14:19:16
 -->
<template>
    <div class="page">
        <!--头部-->
        <!-- <headerOne :title="title" :isFixed="true" :isborderBottom="true"/> -->
        <background />
        <div class="main-container">
            <div class="deal-info">
                <div class="deal-info-t">
                    <h2>账户充值</h2>
                    <p>{{amount}}</p>
                </div>
                <ul class="deal-info-b">
                    <li class="deal-info-b-list">
                        <span>过期时间</span>
                        <span>{{dealInfo.expired_time}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>充值账号</span>
                        <span>{{(dealInfo.account)}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>充值密码</span>
                        <span>{{dealInfo.coupon_pwd}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>充值面额</span>
                        <span style="font-family:Arial;">￥{{dealInfo.amount}}</span>
                    </li>
                    <li class="deal-info-b-list">
                        <span>支付方式</span>
                        <span>{{dealInfo.pay_type}}</span>
                    </li>
                </ul>
                <button class="sure" @click="sureSubmit">确认充值</button>
            </div>
        </div>
    </div>
</template>
<script>
// import headerOne from "@/components/header/headerOne";
import carOwnerApi from "@/api/carOwner/usersCenter";
import background from "@/components/background/background";
export default {
    components: {
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            captcha: "",
            amount: "",
            dealInfo: {}
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        /**
         * @Description: 初始化获取充值信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 09:25:16
         */
        init() {
            let dealInfo = this.$session.get("dealInfo");
            if (dealInfo) {
                this.dealInfo = dealInfo;
                this.captcha = dealInfo.captcha;
                this.dealInfo.amount
                    ? (this.amount = "+" + this.dealInfo.amount)
                    : "";
            }
        },
        /**
         * @Description: 充值信息确认
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 18:00:49
         */
        sureSubmit() {
            carOwnerApi.saveCardConsume(this.captcha).then(res => {
                if (res.code == 20000) {
                    // console.log(res);
                    this.$toast("充值成功!");
                    setTimeout(() => {
                        this.$router.push({
                            path: "menuIndex/personalCenter"
                        });
                    }, 1000);
                } else if (res.code == 40000) {
                    this.$toast(res.msg);
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;
        .deal-info {
            .deal-info-t {
                padding: 10px;
                text-align: center;
                font-size: 20px;
                & > :first-child {
                    padding: 10px 0;
                    color: #777777;
                }
                & > :last-child {
                    padding: 5px 0;
                }
            }

            .deal-info-b {
                padding: 0 20px;
                .deal-info-b-list {
                    display: flex;
                    padding: 5px 0;
                    font-size: 16px;
                    color: #777777;
                    & > :first-child {
                        flex: 0.6;
                    }
                    & > :last-child {
                        flex: 1.4;
                        text-align: right;
                    }
                }
            }

            .sure {
                display: block;
                border-radius: 10px;
                padding: 15px 10px;
                outline: none;
                border: 0 none;
                width: 90%;
                font-size: 20px;
                box-sizing: border-box;
                background-color: #46aef7;
                color: #fff;
                position: fixed;
                left: 0;
                right: 0;
                bottom: 30px;
                margin-left: 20px;
            }
        }
    }
}
</style>
