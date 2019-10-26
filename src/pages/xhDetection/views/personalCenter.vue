<!--
 * @Description: 个人中心
 * @Author: xwq
 * @Date: 2019-04-16 14:19:16
 -->
<template>
    <div class="page">
        <div class="main-container">
            <div class="personal-center-head">
                <div class="personal-center-top">
                    <h1 class="balance">账户余额</h1>
                    <p class="sum">{{dealPoints}}</p>
                </div>
            </div>
            <van-cell-group v-for="(item,key) in voucherCenterList" :key="key">
                <van-cell
                    v-if="item.isShow"
                    :title="item.title"
                    :value="item.value"
                    :is-link="item.isLink"
                    @click="listClick(item,item.isLink)"
                />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import carOwnerApi from "@/api/carOwner/usersInfo";
export default {
    name: "personalCenter",
    data() {
        return {
            title: this.$route.meta.title,
            dealPoints: "",
            voucherCenterList: [
                {
                    title: "账户充值",
                    routerName: "sumVoucher",
                    isLink: true,
                    value: "",
                    isShow: true
                },
                {
                    title: "消费明细",
                    routerName: "consumeInfo",
                    isLink: true,
                    value: "",
                    isShow: true
                },
                {
                    title: "绑定手机号",
                    routerName: "bindPhone",
                    isLink: true,
                    value: "未绑定",
                    isShow: true
                },
                {
                    title: "分成统计",
                    routerName: "dividedStatistical",
                    isLink: true,
                    value: "",
                    isShow: true
                },
                {
                    title: "​广告投放统计",
                    routerName: "adStatistical",
                    isLink: true,
                    value: "",
                    isShow: true
                },
                {
                    title: "用户协议",
                    routerName: "agreement",
                    isLink: true,
                    value: "",
                    isShow: true
                }
            ]
        };
    },
    //路由离开时的处理
    beforeRouteLeave(to, from, next) {
        // console.log("leave", to, from);
        if (to.path == "/dealInfo") {
            next(false);
        } else {
            next();
        }
    },
    created() {},
    mounted() {
        this.getBaseInfo();
    },
    methods: {
        /**
         * @Description: 获取车主基础信息
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 17:58:52
         */
        getBaseInfo() {
            carOwnerApi.getBaseInfo().then(res => {
                if (res.code == 20000) {
                    this.dealPoints = res.data.points;
                    this.voucherCenterList[2].value =
                        res.data.phone != "" ? res.data.phone : "未绑定";
                    this.voucherCenterList[2].isLink =
                        res.data.phone != "" ? false : true;
                    this.voucherCenterList[3].isShow =
                        res.data.divided_statistics == 0 ? false : true;
                    this.voucherCenterList[4].isShow =
                        res.data.ad_statistics == 0 ? false : true;
                }
            });
        },
        //充值中心列表跳转
        listClick(item, linkStatus) {
            if (!linkStatus) return;
            this.$router.push({
                name: item.routerName
            });
        }
    }
};
</script>
<style lang='less' scoped>
.page {
    .main-container {
        padding: 0;
        .personal-center-head {
            width: 100%;
            min-height: 150px;
            max-height: auto;
            background: url("../assets/image/personalCenter.png") no-repeat;
            background-position: center bottom;
            background-size: cover;
            background-origin: content-box;
            box-sizing: border-box;
            position: relative;
            .personal-center-top {
                width: 100%;
                padding: 30px 20px 0 20px;
                color: #fff;
                box-sizing: border-box;
                position: absolute;
                left: 0;
                bottom: 10px;
            }

            .balance {
                font-size: 20px;
                padding: 10px 0 0 0;
                color: #bfd9fc;
            }

            .sum {
                font-size: 24px;
                padding: 10px 0;
                height: 50px;
                box-sizing: border-box;
                line-height: 30px;
            }
        }
    }
}
</style>
