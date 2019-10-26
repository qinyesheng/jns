<!--
 * @Description: 个人钱包
 * @Author: xwq
 * @Date: 2019-04-28 10:56:22
 -->
<template>
    <div class="page">
        <headOne
            :title="title"
            :isFixed="isFixed"
            rightText="提现"
            :class="{'sum-active':sumTakeOutStatus}"
            @onClickRight="sumTakeOut"
        />
        <background/>
        <van-notice-bar
            mode="closeable"
            background="#D6ECFB"
            color="#7DB1D4"
        >{{accountInfo.withdraw_desc}}</van-notice-bar>
        <div class="main-container">
            <van-row>
                <van-row span="24">
                    <van-row>
                        <van-row class="account-info">
                            <van-row tag="h2">账号信息</van-row>
                            <van-row type="flex">
                                <van-col class="sum-left van-hairline--right" span="12">
                                    <van-row>￥{{accountInfo.cash}}</van-row>
                                    <van-row>钱包余额</van-row>
                                </van-col>
                                <van-col class="sum-right" span="12">
                                    <van-row>￥{{accountInfo.cashback}}</van-row>
                                    <van-row>待返还</van-row>
                                </van-col>
                            </van-row>
                        </van-row>
                        <van-row class="treasure-info">
                            <van-row tag="h2">财富管理</van-row>
                            <van-cell
                                v-for="(item,key) in treasureInfoList"
                                :key="key"
                                :title="item.title"
                                is-link
                                @click="clickList(item.routerName)"
                            >
                                <van-icon slot="icon" :name="item.iconUrl"/>
                            </van-cell>
                        </van-row>
                    </van-row>
                </van-row>
            </van-row>
        </div>
        <van-popup v-model="show">
            <div class="withdraw-deposit">
                <h3>申请提现</h3>
                <ul>
                    <li>
                        <span>提现账号&nbsp;:&nbsp;</span>
                        <span>{{withdrawInfo.bankNumber}}</span>
                    </li>
                    <li>
                        <span>所属银行&nbsp;:&nbsp;</span>
                        <span>{{withdrawInfo.bankName}}</span>
                    </li>
                    <li>
                        <span>当前可提现金额&nbsp;:&nbsp;</span>
                        <span>￥{{withdrawInfo.cash}}</span>
                    </li>
                    <li class="input-sum">
                        <div>提现金额&nbsp;:&nbsp;</div>
                        <div>
                            <span>￥</span>
                            <input
                                type="number"
                                v-model="value"
                                name="example"
                                oninput="if(value.length>=8)value=value.slice(0,8)"
                                v-focus="show"
                                onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
                                style="{ime-mode:Disabled}"
                                autocomplete="off"
                                ref="input"
                            >
                        </div>
                    </li>
                </ul>
                <div class="submit-btn">
                    <van-button plain type="info" size="large" @click="cancel">取消</van-button>
                    <van-button plain type="info" size="large" @click="confirm">确定</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<script>
import headOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import personalCenterApi from "@/api/personalCenter/wallet";
import extendWarrantyApi from "@/api/extendWarranty/mineGain";
import { NoticeBar } from "vant";
export default {
    components: {
        headOne,
        [NoticeBar.name]: NoticeBar,
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: false,
            sumTakeOutStatus: false,
            withdrawStatus: 0,
            accountInfo: {
                cash: "",
                cashback: "",
                withdraw_desc: "",
                withdraw_min_amount: "",
                withdraw_max_amount: "",
                withdraw_day: ""
            },
            treasureInfoList: [
                {
                    title: "收益明细",
                    routerName: "earningsDetail",
                    iconUrl: require("../../../assets/image/returnsDetail.png")
                },
                {
                    title: "提现记录",
                    routerName: "withdrawCash",
                    iconUrl: require("../../../assets/image/TakeOutRecord.png")
                },
                {
                    title: "我的银行卡",
                    routerName: "mineBankCard",
                    iconUrl: require("../../../assets/image/bankCard.png")
                }
            ],
            withdrawInfo: {
                bankNumber: "",
                bankName: "",
                cash: "",
                withdrawalCash: ""
            },
            show: false,
            value: ""
        };
    },
    //指令定义
    directives: {
        focus: {
            //每当指令绑定到元素上时，会立即执行这个bind函数，只执行一次
            bind: function() {},
            //inserted表示元素插入到DOM中时，会执行inserted函数，只触发一次，el表示被绑定的那个原生js对象
            inserted: function(el) {
                el.focus();
            },
            //当VNode更新时会执行updated，可触发多次
            update(el, { value }) {
                if (value) {
                    el.focus();
                }
            }
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == "bindBankCard") {
            next(false);
        }
        next();
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        /**
         * @Description: 初始化-获取个人钱包数据
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:13:07
         */
        init() {
            personalCenterApi.getWalletInfo().then(res => {
                let currentDate = new Date();
                let currentDay = currentDate.getDate() + "";
                if (res.code == 20000 && res.data) {
                    let dataInfo = res.data;
                    this.accountInfo = dataInfo;
                    if (
                        dataInfo.cash > dataInfo.withdraw_min_amount &&
                        dataInfo.withdraw_day.indexOf(currentDay) > -1
                    ) {
                        this.sumTakeOutStatus = false;
                        this.withdrawStatus = 1;
                    } else {
                        this.sumTakeOutStatus = true;
                        this.withdrawStatus = 0;
                    }
                }
            });

            /**
             * @Description: 获取用户绑定银行卡信息
             * @Param:
             * @Author: xwq
             * @LastEditors: xwq
             * @LastEditTime: Do not edit
             * @return:
             * @Date: 2019-05-10 11:18:58
             */
            extendWarrantyApi.getBankInfo().then(res => {
                if (res.code == 20000 && res.data) {
                    this.$session.set("userBankInfo", res.data);
                }
            });
        },
        /**
         * @Description: 申请金额提现
         * @Param:
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:05:15
         */
        sumTakeOut() {
            let userBankInfo = this.$session.get("userBankInfo");
            if (this.withdrawStatus == 0) {
                this.$toast("当前日期不是提现日");
                return;
            } else if (this.sumTakeOutStatus) {
                this.$toast("钱包余额低于最低提现金额");
                return;
            }
            if (userBankInfo) {
                let status = userBankInfo.status;
                switch (status) {
                    case 0:
                        this.$toast("请先绑定银行卡");
                        break;
                    case 1:
                        let bankNumber = userBankInfo.bankNumber;
                        this.withdrawInfo.bankNumber =
                            bankNumber.substr(0, 4) +
                            "********" +
                            bankNumber.substr(bankNumber.length - 4, 4);
                        this.withdrawInfo.bankName = userBankInfo.bankName;
                        this.withdrawInfo.cash = this.accountInfo.cash;
                        this.show = true;
                    default:
                        break;
                }
            }
        },

        /**
         * @Description: 财富管理列表点击跳转
         * @return:
         * @Date: 2019-05-10 11:19:26
         */
        clickList(routerName) {
            this.$router.push({
                name: routerName
            });
        },

        /**
         * @Description: 弹窗取消
         * @return:
         * @Date: 2019-05-10 11:19:26
         */
        cancel() {
            this.show = false;
            this.value = "";
        },
        /**
         * @Description: 提现
         * @Param: val 要提现的金额
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:06:19
         */
        confirm() {
            let accountInfo = this.accountInfo;
            let maxAmount = +accountInfo.withdraw_max_amount;
            let minAmount = +accountInfo.withdraw_min_amount;
            let inputVal = +this.value;
            if (this.value) {
                if (this.value == 0) {
                    this.$toast("输入金额不能为0");
                    this.$refs.input.focus();
                    return;
                }
                inputVal > maxAmount
                    ? (this.$toast("每次提现金额最高为" + maxAmount + "元"),
                      this.$refs.input.focus())
                    : inputVal < minAmount
                    ? (this.$toast("每次提现金额最低为" + minAmount + "元"),
                      this.$refs.input.focus())
                    : extendWarrantyApi
                          .applyForWithdrawal(inputVal)
                          .then(res => {
                              if (res.code == 20000 && res.data) {
                                  this.accountInfo.cash = res.data.resto;
                                  this.$toast("提现成功");
                                  this.show = false;
                                  this.value = "";
                              } else {
                                  this.$toast(res.msg);
                              }
                          });
            } else {
                this.$toast("请输入要提现的金额");
            }
            setTimeout(() => {
                this.$toast.clear();
                this.$refs.input.focus();
            }, 1500);
        }
    },
    watch: {
        show: function(newValue, oldValue) {
            if (!newValue) {
                this.value = "";
            }
        }
    }
};
</script>

<style lang='less' scoped>
/deep/ .sum-active {
    .van-nav-bar__text {
        color: #ccc;
    }
}
/deep/ .van-popup {
    width: 85%;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
}

.page {
    .main-container {
        .account-info {
            margin-bottom: 15px;
            padding: 20px 10px;
            border-radius: 10px;
            background-color: #fff;
            & > h2 {
                margin-bottom: 10px;
                padding: 0 20px;
                font-size: 20px;
            }
            & > :last-child {
                padding: 10px 20px;
                .sum-left,
                .sum-right {
                    text-align: center;
                    & > * {
                        padding: 5px 0;
                    }
                    & > :frst-child {
                        color: #666;
                    }
                    & > :last-child {
                        color: #999;
                    }
                }
                /deep/ [class*="van-hairline"]::after {
                    border-right: 1px solid #ccc;
                }
            }
        }
        .treasure-info {
            margin-bottom: 15px;
            padding: 20px 10px;
            border-radius: 10px;
            background-color: #fff;
            & > h2 {
                margin-bottom: 10px;
                padding: 0 20px;
                font-size: 20px;
            }
            /deep/ .van-icon--image {
                transform: translate(0, 40%);
                padding: 0 10px;
            }
        }
    }
    .withdraw-deposit {
        min-height: 250px;
        & > h3 {
            padding: 15px 10px;
            border-bottom: 1px solid #ccc;
            font-weight: 600;
        }
        & > ul {
            padding: 10px 20px 0 20px;
            margin-bottom: 20px;

            & > li {
                padding: 10px 0;
                display: flex;
                & > :first-child {
                    color: #ccc;
                }
            }
            .input-sum {
                height: 45px;
                box-sizing: border-box;
                vertical-align: middle;
                padding: 5px 0;
                & > :first-child {
                    line-height: 35px;
                }
                & > :nth-child(2) {
                    width: 150px;
                    border: 1px solid #ccc;
                    padding: 0 5px;
                    display: flex;
                    overflow: hidden;
                    box-sizing: border-box;
                    & > span {
                        width: 20px;
                        display: inline-block;
                        line-height: 35px;
                    }
                    & > input {
                        width: 118px;
                        display: inline-block;
                        border: 0 none;
                        outline: none;
                    }
                    //去掉input框默认的箭头
                    ::-webkit-outer-spin-button,
                    input::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                }
            }
        }
        .submit-btn {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 0;
            display: flex;
            & > .van-button {
                flex: 1;
                color: #fff;
            }
            & > :first-child {
                background-color: #ccc;
            }
            & > :last-child {
                background-color: #45aff7;
            }
            .van-button--plain.van-button--info {
                border: 0 none;
            }
        }
    }
}
</style>
