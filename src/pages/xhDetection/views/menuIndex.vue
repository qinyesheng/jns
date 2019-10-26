<!--
 * @Description: 首页菜单
 * @Author: xwq
 * @Date: 2019-04-24 16:08:13
 -->
<template>
    <div class="page">
        <!--  <VorgMap v-if="active===0" />
        <Vorder v-if="active===1" />
        <VpersonalCenter v-if="active===2" />-->
        <div class="content">
            <router-view></router-view>
        </div>
        <div class="main-container">
            <van-tabbar v-model="active" active-color="#E14732" @change="tabarClick">
                <van-tabbar-item
                    v-for="(item,key) in menueList"
                    :key="key"
                    :icon="item.iconName"
                >{{item.title}}</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vant";
export default {
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    name: "menuIndex",
    data() {
        return {
            active: 0,
            menueList: [
                {
                    routerName: "orgMap",
                    title: "预约检车",
                    iconName: "underway-o",
                    active: 0
                },
                {
                    routerName: "order",
                    title: "检测报告",
                    iconName: "orders-o",
                    active: 1
                },
                {
                    routerName: "personalCenter",
                    title: "个人中心",
                    iconName: "user-circle-o",
                    active: 2
                }
            ]
        };
    },
    beforeRouteEnter(to, from, next) {
        // console.log(to, from);
        switch (to.name) {
            case "orgMap":
                next(vm => {
                    vm.active = 0;
                    vm.$session.set("routerActive", 0);
                });
                break;
            case "order":
                next(vm => {
                    vm.active = 1;
                    vm.$session.set("orderActive", 1);
                    vm.$session.set("routerActive", 1);
                });
                break;
            case "personalCenter":
                next(vm => {
                    vm.active = 2;
                    vm.$session.set("routerActive", 2);
                });
                break;
            /*  case "menuIndex":
                next(vm => {
                    let orderActive = vm.$route.query.orderActive;
                    if (orderActive) {
                        vm.active = 1;
                        vm.$session.set("orderActive", +orderActive);
                        vm.$router.push({
                            path: "order"
                        });
                    }
                }); */
            default:
                break;
        }
    },
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        /**
         * @Description: 初始化操作
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-05-08 18:11:56
         */
        init() {
            let query = this.$route.query;
            if (query.orderActive) {
                this.$session.set("orderActive", query.orderActive);
            }
            if (query.personalActive) {
                let routerActive = +query.personalActive;
                this.active = routerActive;
                for (let i = 0; i < this.menueList.length; i++) {
                    if (routerActive == this.menueList[i].active) {
                        this.$router.push({
                            path: this.menueList[i]["routerName"]
                        });
                        this.$session.set(
                            "routerActive",
                            this.menueList[i].active
                        );
                        break;
                    }
                }
            } else if (query.routerName) {
                let routerName = query.routerName;
                if (routerName) {
                    for (let i = 0; i < this.menueList.length; i++) {
                        if (routerName == this.menueList[i].routerName) {
                            this.active = this.menueList[i].active;
                            this.$router.push({
                                path: this.menueList[i]["routerName"]
                            });
                            this.$session.set(
                                "routerActive",
                                this.menueList[i].active
                            );
                            break;
                        }
                    }
                }
            } else {
            }
        },

        routerLinks(active) {
            if (active == 0) {
                this.active = active;
                this.$router.push({
                    path: "orgMap"
                });
            } else if (active == 1) {
                this.active = active;
                this.$router.push({
                    path: "order"
                });
            } else if (active == 2) {
                this.active = active;
                this.$router.push({
                    path: "personalCenter"
                });
            }

            this.$session.set("routerActive", active);
        },

        /**
         * @Description: tab切换
         * @Param:
         * @Author: xwq
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         * @Date: 2019-09-29 09:19:13
         */
        tabarClick(active) {
            this.routerLinks(active);
        }
    }
};
</script>
<style lang="less" scoped>
.page {
    .fixed-bottom {
        height: 55px;
    }
    .main-container {
        padding: 0;
    }
}
</style>