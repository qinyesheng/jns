<!--
 * @Description: 个人中心_联系我们
 * @Author: xwq
 * @Date: 2019-07-08 09:50:04
 -->

<template>
    <div class="page">
        <Vheader
            :title="title"
            :isFixed="isFixed"
            :onClickLeftStatus="onClickLeftStatus"
            @onClickLeft="backClick"
        />
        <Vbackground />
        <div class="main-container">
            <van-row class="list-info margin-bottom" v-for="(item,key) in listInfo" :key="key">
                <van-col span="24" class="area-contact">{{item.areaName}}</van-col>
                <van-col span="24">
                    <van-row type="flex" gutter="10">
                        <van-col>{{item.name}}</van-col>
                        <van-col offset="1">{{item.phone | phoneFormate}}</van-col>
                        <van-col class="image-icon" offset="1">
                            <img v-lazy="item.iconUrl" @click="callPhone(item)" />
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import header from "@/components/header/headerOne";
import background from "@/components/background/background";
import jnsApi from "@/utils/jnsApi";
import backApi from "@/utils/back";
import { Dialog } from "vant";
export default {
    components: {
        Vheader: header,
        Vbackground: background
    },
    data() {
        return {
            title: this.$route.meta.title,
            isFixed: true,
            onClickLeftStatus: true,
            listInfo: [
                {
                    areaName: "华东地区联系人",
                    name: "陈先生",
                    phone: "13166239469",
                    iconUrl: require("@image/cellphoneUCD.png")
                },
                {
                    areaName: "华南地区联系人",
                    name: "赖先生",
                    phone: "13632466827",
                    iconUrl: require("@image/cellphoneUCD.png")
                },
                {
                    areaName: "华北地区联系人",
                    name: "刘先生",
                    phone: "18985132752",
                    iconUrl: require("@image/cellphoneUCD.png")
                },
                {
                    areaName: "西南地区联系人",
                    name: "杜先生",
                    phone: "13790403287",
                    iconUrl: require("@image/cellphoneUCD.png")
                }
            ]
        };
    },
    created() {},
    mounted() {
        backApi.androidPhysicalBackButtonHandle();
    },
    methods: {
        /**
         * @Description:拨打电话
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-08 11:17:03
         */

        callPhone(val) {
            jnsApi.callphone(val.phone);
        },

        /**
         * @Description: 原生返回方法
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-07-08 11:31:15
         */
        backClick() {
            jnsApi.back();
        }
    },
    filters: {
        phoneFormate(val) {
            return (
                val.substr(0, 3) +
                "-" +
                val.substr(3, 4) +
                "-" +
                val.substr(7, 4)
            );
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .main-container {
        .list-info {
            background-color: #fff;
            border-radius: 5px;
            padding: 10px;
        }
        .area-contact {
            font-size: 20px;
            padding: 10px 0 20px 0;
        }
        .image-icon {
            img {
                display: inline-block;
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>
