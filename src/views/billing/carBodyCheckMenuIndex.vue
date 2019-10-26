<!--
 * @Description: 开单_车体检查首页
 * @Author: xwq
 * @Date: 2019-08-23 10:31:53
 * @LastEditTime: 2019-09-17 18:01:04
 -->
<template>
    <div class="page" v-show="isShow">
        <background />
        <headerOne
            :isFixed="true"
            :backgroundStatus="true"
            @onClickLeft="back"
            :onClickLeftStatus="onClickLeftStatus"
            :title="title"
        />
        <div class="header-tabbar">
            <van-tabbar v-model="active" active-color="#7AC4F9" :fixed="false" @change="tabarClick">
                <van-tabbar-item v-for="(item,key) in menueList" :key="key">{{item.title}}</van-tabbar-item>
            </van-tabbar>
        </div>
        <div class="header-fixed-style"></div>
        <van-notice-bar
            mode="closeable"
            :scrollable="false"
            background="#666666"
            color="#fff"
            v-if="active==0"
            @close="close"
        >
            <p slot="default" class="notice-bar-text">
                点击
                <i class="circle"></i>标记车辆外观情况
            </p>
        </van-notice-bar>
        <div class="main-container">
            <carBodyCheck v-if="active==0" />
            <panelMessage v-if="active==1" />
            <faultDescription v-if="active==2" />
            <carCondition v-show="active==3" :reportList="reportList" />
        </div>
        <pubButton title="下一步" @buttonConfirm="nextPage" :isFixed="true" />
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import billApi from "@/api/bill/createNew";
import { getUrlParams } from "@/utils/common";
import carBodyCheck from "@/views/billing/carBodyCheck.vue";
import panelMessage from "@/views/billing/panelMessage";
import faultDescription from "@/views/billing/faultDescription";
import carCondition from "@/views/billing/carCondition";
import pubButton from "@/components/public/pubButton";
import background from "@/components/background/background";
import { Tabbar, TabbarItem, NoticeBar } from "vant";
export default {
    components: {
        headerOne,
        pubButton,
        background,
        carBodyCheck,
        panelMessage,
        faultDescription,
        carCondition,
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [NoticeBar.name]: NoticeBar
    },
    data() {
        return {
            isShow: false,
            title: this.$route.meta.title,
            onClickLeftStatus: true,
            active: 0,
            menueList: [
                {
                    routerName: "carBodyCheck",
                    title: "车体检查",
                    iconName: "",
                    active: 0
                },
                {
                    routerName: "panelMessage",
                    title: "仪表信息",
                    iconName: "",
                    active: 1
                },
                {
                    routerName: "faultDescription",
                    title: "故障描述",
                    iconName: "",
                    active: 2
                },
                {
                    routerName: "carCondition",
                    title: "车况报告",
                    iconName: "",
                    active: 3
                }
            ],
            noticeStatus: true,
            reportList: [], //车况数据
            vin: "" //车架号
        };
    },
    created() {
        this.vin = getUrlParams().vin;
        this.getCarConditionByVin();
    },
    mounted() {},
    methods: {
        getCarConditionByVin() {
            billApi.getCarConditionByVin({ vin: this.vin }).then(res => {
                if (
                    res.code == 20000 &&
                    res.data &&
                    res.data.list &&
                    res.data.list.length > 0
                ) {
                    this.reportList = res.data.list;
                } else {
                    this.menueList.splice(this.menueList.length - 1, 1);
                }
                this.$local.set("vin", this.vin);
                this.isShow = true;
            });
        },
        //返回
        back() {
            this.$router.back();
        },
        /**
         * @Description: 菜单切换
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-23 10:54:03
         */

        tabarClick(index) {
            if (index == 0) {
                this.noticeStatus = true;
            }
        },
        /**
         * @Description:下一步
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-08-31 16:11:40
         */

        nextPage() {
            this.$router.push({
                name: "serviceType"
            });
        },
        close() {
            this.noticeStatus = false;
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    /deep/ .page .buttonFixed[data-v-cc74d80e] {
        padding: 0;
        z-index: 99;
    }
    .header-tabbar {
        position: fixed;
        top: 46px;
        width: 100%;
        z-index: 999;
        /deep/ .van-tabbar {
            height: 50px;
        }
        /deep/ .van-tabbar-item {
            font-size: 16px;
        }
    }
    /deep/ .van-notice-bar__content {
        position: relative;
    }
    .notice-bar-text {
        text-align: center;
        .circle {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("../../assets/image/billing/dian_icon.png")
                no-repeat;
            background-size: 16px 16px;
            margin: 0 3px;
            vertical-align: middle;
        }
    }
    .main-container {
    }
    .header-fixed-style {
        margin-top: 50px;
    }
}
</style>