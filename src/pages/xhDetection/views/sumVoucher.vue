<!--
 * @Description: 余额充值
 * @Author: xwq
 * @Date: 2019-04-16 14:19:16
 -->
<template>
    <div class="page">
        <background />
        <div class="main-container" v-if="isShow">
            <div>
                <ul class="sum-voucher-info">
                    <li class="sum-voucher-info-t">
                        <h3>充值账号信息</h3>
                        <span>{{nickName}}</span>
                    </li>
                    <li class="sum-voucher-info-c" v-show="sumSelectShow">
                        <h3>选择充值金额</h3>
                        <ul class="select-sum">
                            <li
                                :class="{active:activeKey===key}"
                                v-for="(item,key) in selectSum"
                                :key="key"
                                @click="sumClick(key)"
                            >{{item}}</li>
                        </ul>
                    </li>
                    <li class="use-voucher-car" @click="useVoucherCar">
                        <span>使用充值卡</span>
                        <van-icon name="arrow" />
                    </li>
                </ul>
            </div>
        </div>
        <!-- <xhMenu v-model="showMenuStatus"></xhMenu> -->
    </div>
</template>
<script>
import carOwnerApi from "@/api/carOwner/usersCenter";
import background from "@/components/background/background";
export default {
    components: {
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            showMenuStatus: false,
            nickName: "",
            voucherDescInfo: false,
            selectSum: [
                "50元=50点",
                "100元=100点",
                "500元=500点",
                "800元=800点"
            ],
            activeKey: "",
            sumSelectShow: false,
            isShow: false
        };
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        showMenu() {
            this.showMenuStatus = true;
        },

        /**
         * @Description: 获取车主基础信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:56:24
         */
        init() {
            carOwnerApi.getRechargeCenter().then(res => {
                if (res.code == 20000 && res.data) {
                    // console.log(res);
                    this.nickName = "用户昵称: " + res.data.nickname;
                    this.$session.set(
                        "allowTimes",
                        res.data.allow_times ? res.data.allow_times : ""
                    );
                    this.$session.set(
                        "cardTimes",
                        res.data.card_times ? res.data.card_times : ""
                    );
                    this.isShow = true;
                }
            });
        },
        //充值
        useVoucherCar() {
            this.$router.push({
                name: "voucherCenter"
            });
        },
        //金额选择
        sumClick(key) {
            this.activeKey = key;
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .sum-voucher-info {
            li {
                margin-bottom: 10px;
            }
            .sum-voucher-info-t {
                background-color: #fff;
                border-radius: 10px;
                padding: 15px;
                & :first-child {
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                & :last-child {
                    font-size: 14px;
                    font-weight: 600;
                }
            }
            .sum-voucher-info-c {
                background-color: #fff;
                border-radius: 10px;
                padding: 15px;
                & :first-child {
                    font-size: 20px;
                    margin-bottom: 10px;
                }
                .select-sum {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    & > li {
                        padding: 10px 10px;
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        font-size: 16px;
                        box-sizing: border-box;
                        width: 48%;
                        text-align: center;
                        color: #959595;
                    }
                    & > li:nth-child(1) {
                        margin-bottom: 10px;
                    }
                    & > li:nth-child(1) {
                        margin-bottom: 10px;
                    }
                }
            }
            .use-voucher-car {
                background-color: #fff;
                padding: 15px;
                font-size: 16px;
                display: flex;
                border-radius: 10px;
                & > span {
                    display: block;
                    flex: 1;
                }
            }
        }
        .active {
            background-color: #46aef7;
            color: #fff !important;
            border: 0 none !important;
        }
    }
}
</style>
