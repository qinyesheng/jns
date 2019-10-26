<!--
 * @Description: 我的银行卡
 * @Author: xwq
 * @Date: 2019-04-28 14:57:58
 -->
<template>
    <div class="page">
        <headOne
            :title="title"
            :isFixed="isFixed"
            :rightText="rightText"
            @onClickRight="unbindBankCard"
        />
        <VdialogMsg
            v-if="isShow"
            cancelButtonText="取消"
            confirmButtonText="确定解绑"
            warningInfoText="是否解除银行卡绑定"
            @closeHandle="closeHandle"
            @confirm="confirmHandle"
            @cancel="cancelHandle"
        />
        <background/>
        <div class="main-container">
            <div v-if="!isBindBankCard">
                <div class="top-img text-center">
                    <img v-lazy="imgUrl">
                    <p>绑定银行卡轻松提现</p>
                </div>
                <div class="bind-bank-btn">
                    <van-button type="info" size="large" @click="bindBankCard">绑定银行卡</van-button>
                </div>
            </div>
            <ul class="card-info" v-if="isBindBankCard">
                <li>
                    <div>
                        <img v-lazy="bankCardInfo.logo">
                    </div>
                    <div>
                        <h3>{{bankCardInfo.bankName}}</h3>
                        <p>{{bankCardInfo.bankNumber | bankCardFormate}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import headOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import dialogMsg from "@/components/dialog/dialogMsg";
import personalCenterApi from "@/api/personalCenter/wallet";
export default {
    components: {
        headOne,
        VdialogMsg: dialogMsg,
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: false,
            rightText: "",
            isBindBankCard: false,
            bankCardInfo: {
                bankName: "",
                bankNumber: "",
                logo: ""
            },
            isShow: false,
            imgUrl: require("../../../assets/image/bindBankCard.png")
        };
    },
    created() {},
    mounted() {
        this.getBankInfo();
    },

    methods: {
        /**
         * @Description: 获取绑定银行卡页面数据
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-09 10:15:23
         */
        getBankInfo() {
            let userBankInfo = this.$session.get("userBankInfo");
            if (userBankInfo) {
                let status = userBankInfo.status;
                for (let key in this.bankCardInfo) {
                    if (userBankInfo[key]) {
                        this.bankCardInfo[key] = userBankInfo[key];
                    }
                }
                if (status) {
                    switch (status) {
                        case 0:
                            this.isBindBankCard = false;
                            this.rightText = "";
                            break;
                        case 1:
                            this.isBindBankCard = true;
                            this.rightText = "解绑";
                            break;
                        default:
                            break;
                    }
                }
            }
        },

        /**
         * @Description: 解绑银行卡
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:21:07
         */
        unbindBankCard() {
            this.isShow = true;
        },

        /**
         * @Description: 绑定银行卡
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:21:07
         */
        bindBankCard() {
            this.$router.push({
                name: "bindBankCard"
            });
        },

        /**
         * @Description: 弹窗关闭
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:21:07
         */
        closeHandle() {
            this.isShow = false;
        },

        /**
         * @Description: 弹窗取消
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:21:07
         */
        cancelHandle() {
            this.isShow = false;
        },

        /**
         * @Description: 解绑银行卡
         * @Param: bank_number  解绑的银行卡卡号
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-09 10:15:56
         */
        confirmHandle() {
            this.isShow = false;
            personalCenterApi
                .unbindBankCard(this.bankCardInfo.bankNumber)
                .then(res => {
                    if (res.code == 20000) {
                        this.$toast("解绑成功");
                        this.isShow = false;
                        this.isBindBankCard = false;
                        this.rightText = "";
                        this.$session.remove("userBankInfo");
                    } else if (res.code == 40000) {
                        this.isShow = false;
                        this.$toast(res.msg);
                    }
                    setTimeout(() => {
                        this.$toast.clear();
                    }, 1500);
                });
        }
    },
    filters: {
        bankCardFormate(value) {
            let res = value
                .replace(/(.{4})/g, "****")
                .replace(/(.{4})/g, "$1 ");
            res = res.substr(0, res.length - 5) + value.slice(-4);
            return res;
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .top-img {
            padding: 20px 50px;
            margin-bottom: 20px;
            & > img {
                display: block;
                width: 100px;
                height: auto;
                margin: 0 auto;
            }
            & > p {
                padding: 10px;
                font-size: 18px;
                color: #ccc;
            }
        }
        .bind-bank-btn {
            padding: 0 40px;
            /deep/ .van-button {
                border-radius: 10px;
            }
        }
        .card-info {
            & > li {
                box-sizing: border-box;
                border-radius: 10px;
                padding: 10px 0 10px 20px;
                // background-color: #46aff7;
                background: linear-gradient(to right, #75c4f9 10%, #46aff7 40%);
                display: flex;
                color: #fff;
                & > :nth-child(1) {
                    padding-top: 10px;
                    margin-right: 20px;
                    > img {
                        display: inline-block;
                    }
                }
                & > :nth-child(2) {
                    padding-top: 15px;
                    > h3 {
                        margin-bottom: 40px;
                        font-size: 18px;
                    }
                    > p {
                        letter-spacing: 1px;
                        font-size: 18px;
                    }
                }
            }
        }
    }
}
</style>
