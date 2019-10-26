<!--
 * @Description: 绑定银行卡
 * @Author: xwq
 * @Date: 2019-04-28 14:57:58
 -->
<template>
    <div class="page">
        <headOne :title="title" :isFixed="isFixed" :backgroundStatus="backgroundStatus"/>
        <div class="main-container">
            <h1>绑定银行卡</h1>
            <van-cell-group class="bank-info">
                <h3>开户姓名</h3>
                <van-field
                    v-model="bankCardInfo.userName"
                    center
                    clearable
                    :border="inputBorder"
                    placeholder="开户姓名"
                ></van-field>
                <h3>银行卡卡号</h3>
                <van-field
                    v-model="bankCardInfo.bankNumber"
                    center
                    clearable
                    :border="inputBorder"
                    maxlength="24"
                    placeholder="银行卡卡号"
                ></van-field>
                <h3>开户行</h3>
                <van-field
                    class="select-bank"
                    v-model="bankCardInfo.bankName"
                    center
                    readonly
                    :border="inputBorder"
                    placeholder="选择开户行"
                    @click="selectBank"
                >
                    <van-icon slot="right-icon" name="arrow"/>
                </van-field>
                <h3>开户网点</h3>
                <van-field
                    v-model="bankCardInfo.bankAddress"
                    center
                    clearable
                    :border="inputBorder"
                    placeholder="开户网点"
                ></van-field>
                <van-button type="info" size="large" @click="bindBankCard">添加</van-button>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import headOne from "@/components/header/headerOne";
import extendWarrantyApi from "@/api/extendWarranty/mineGain";
import { Field } from "vant";
export default {
    components: {
        headOne,
        [Field.name]: Field
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: false,
            inputBorder: false,
            backgroundStatus: false,
            bankCardInfo: {
                userName: "",
                bankNumber: "",
                bankName: "",
                bankAddress: "",
                bankId: ""
            }
        };
    },
    activated() {
        let selectBankInfo = this.$session.get("selectBankInfo");
        if (selectBankInfo) {
            this.bankCardInfo.bankId = selectBankInfo.id;
            this.bankCardInfo.bankName = selectBankInfo.name;
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == "mineBankCard") {
            for (let key in this.bankCardInfo) {
                if (key != "userName") {
                    this.bankCardInfo[key] = "";
                }
                this.$session.remove("selectBankInfo");
            }
            next();
        }
        next();
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        /**
         * @Description: 初始化
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:17:19
         */
        init() {
            let userBankInfo = this.$session.get("userBankInfo");
            for (let key in this.bankCardInfo) {
                this.bankCardInfo[key] = "";
            }
            if (userBankInfo) {
                this.bankCardInfo.userName = userBankInfo.username;
            }
        },

        /**
         * @Description: 选择开户行
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:17:19
         */
        selectBank() {
            this.$router.push({
                name: "selectBankCard"
            });
        },

        /**
         * @Description: 匹配未填项
         * @Author: xwq
         * @return:
         * @Date: 2019-05-10 11:17:19
         */
        bankListInfo(val) {
            switch (val) {
                case "username":
                    this.$toast("请输入开户姓名");
                    break;
                case "bankNumber":
                    this.$toast("请输入银行卡卡号");
                    break;
                case "bankId":
                    this.$toast("请选择开户行");
                    break;
                case "beneficiaryBank":
                    this.$toast("请选输入开户网点");
                default:
                    break;
            }
        },

        /**
         * @Description: 添加银行卡按钮
         * @Param: data  用户相关信息
         * @Param: username  用户名
         * @Param: bankNumber  银行卡卡号
         * @Param: bankId  开户行ID
         * @Param: beneficiaryBank  开户行
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-10 11:14:43
         */
        bindBankCard() {
            let data = {
                username: this.bankCardInfo.userName,
                bankNumber: this.bankCardInfo.bankNumber,
                bankId: this.bankCardInfo.bankId,
                beneficiaryBank: this.bankCardInfo.bankAddress
            };
            for (let i in data) {
                if (!data[i]) {
                    this.bankListInfo(i);
                    return;
                }
            }
            extendWarrantyApi.bindingBankInfo(data).then(res => {
                if (res.code == 20000) {
                    this.$toast("银行卡添加成功");
                    this.$session.remove("selectBankInfo");
                    this.$router.push({
                        name: "myWallet"
                    });
                    for (let i in this.bankCardInfo) {
                        this.bankCardInfo[i] = "";
                    }
                } else if (res.code == 40000) {
                    this.$toast(res.msg);
                }
                setTimeout(() => {
                    this.$toast.clear();
                }, 1500);
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        > h1 {
            padding: 10px 0;
            font-size: 20px;
            font-weight: bold;
        }
        /deep/ .van-cell--center {
            background-color: #f2f2f2;
            border-radius: 10px;
        }
        /deep/ .van-hairline--top-bottom::after {
            border-width: 0;
            z-index: -1;
        }
        /deep/ .van-button {
            margin-top: 50px;
            border-radius: 10px;
        }
        .select-bank {
            background-color: rgba(242, 242, 242, 0.2);
        }
        .bank-info {
            & > h3 {
                padding: 10px 0;
            }
        }
    }
}
</style>
