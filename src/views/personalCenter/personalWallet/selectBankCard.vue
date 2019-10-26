<!--
 * @Description: 选择开户行
 * @Author: xwq
 * @Date: 2019-04-28 14:57:58
 -->
<template>
    <div class="page">
        <headOne :title="title" :isFixed="isFixed"/>
        <background/>
        <van-row tag="ul" class="main-container">
            <van-row
                tag="li"
                class="bank-list"
                type="flex"
                v-for="(item,key) in bankInfo"
                :key="key"
                @click.native="selectCard(item)"
            >
                <van-col span="4">
                    <img v-lazy="item.logo">
                </van-col>
                <van-col span="16" offset="1">{{item.name}}</van-col>
            </van-row>
        </van-row>
    </div>
</template>
<script>
import headOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import extendWarrantyApi from "@/api/extendWarranty/mineGain";
export default {
    components: {
        headOne,
        background
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: false,
            bankInfo: []
        };
    },
    created() {},
    mounted() {
        this.getBankCardList();
    },
    methods: {
        /**
         * @Description: 获取绑定银行卡页面数据
         * @Param:
         * @Author: xwq
         * @Date: 2019-05-10 11:22:33
         */
        getBankCardList() {
            extendWarrantyApi.getBankCardList().then(res => {
                if (res.code == 20000) {
                    let bankList = res.data.bankList;
                    if (bankList) {
                        for (let item of bankList) {
                            this.bankInfo.push(item);
                        }
                    }
                }
            });
        },

        /**
         * @Description: 选择银行
         * @Param:
         * @Author: xwq
         * @Date: 2019-05-10 11:23:57
         */
        selectCard(item) {
            this.$session.set("selectBankInfo", item);
            this.$router.back();
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        .bank-list {
            margin-bottom: 15px;
            border-radius: 20px;
            padding: 5px 20px;
            background-color: #fff;
            /deep/ :nth-child(1) {
                text-align: center;
                vertical-align: middle;
                line-height: 64px;
                & > img {
                    display: inline-block;
                    width: 35px;
                    height: auto;
                }
            }
            /deep/ :nth-child(2) {
                font-size: 16px;
                line-height: 64px;
            }
        }
    }
}
</style>
