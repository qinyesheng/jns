<!--
 * @Description: 智能诊断九宫格
 * @Author: lp
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 10:07:48
 * @LastEditTime: 2019-09-18 14:52:33
 -->

<template>
    <div id="solutionListContainer">
        <background />
        <headerOne :title="$route.meta.title" :isFixed="true" />
        <introduce @showFlow="showFlow" />
        <menuList @indexMenuClick="indexMenuClick" :list="menuList" />
    </div>
</template>
<script>
import headerOne from "@/components/header/headerOne";
import background from "@/components/background/background";
import introduce from "@/components/introduce/introduce";
import menuList from "@/components/menuList/menuList.vue";
import servantApi from "@/api/servant/commonServant";
import jnsApi from "@/utils/jnsApi";
import { getUrlParamsCache } from "@/utils/auth";
import { getMenuIconSrc } from "@/utils/common";
export default {
    components: {
        headerOne,
        background,
        introduce,
        menuList
    },
    data: function() {
        return {
            menuCode: "menu_solution",
            menuList: [],
            h5Code: {
                bill_type_W001: {
                    path: "/vin",
                    query: {
                        sourceType: "jns"
                    }
                }
            }
        };
    },

    created: function() {},
    mounted: function() {
        this.solutionIndexMenu();
    },
    methods: {
        /**
         * @Description: 列表跳转的方法
         * @Param: code   每条数据对应的code值
         * @Param: status 菜单开启的状态1-ture  0-false
         * @Param: msg    是否有权限的信息提示
         * @Author: xwq
         * @Date: 2018-12-26 15:03:17
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */
        indexMenuClick(item) {
            let _this = this;
            if (item.status == 1) {
                if (_this.h5Code[item.code]) {
                    _this.$session.set("resolveSolution", {
                        sourceType: _this.h5Code[item.code].query.sourceType
                    });
                    jnsApi.scanVin(item.code, item.title, 0, function(vin) {
                        _this.$session.set("carVin", vin);
                        _this.$router.push({
                            path: "resolveChangeCar",
                            query: {
                                menuCode: item.code,
                                menuTitle: item.title,
                                isShow: 0,
                                sourceType: "jnsApp"
                            }
                        });
                    });
                    // _this.$router.push({
                    //     path: _this.h5Code[item.code].path,
                    //     query: _this.h5Code[item.code].query
                    // });
                } else {
                    jnsApi.solution(item.code);
                }
            } else {
                let content = item.msg ? item.msg : "无权操作，请联系管理员";
                this.$toast.fail(content);
            }
        },
        showFlow() {
            jnsApi.showImg(this.menuCode);
        },
        solutionIndexMenu() {
            let urlParamsCache = getUrlParamsCache();
            if (urlParamsCache) {
                let menuName = urlParamsCache.menuName;
                if (menuName) {
                    this.title = menuName;
                }

                let menuCode = urlParamsCache.menuCode;
                if (menuCode) {
                    this.menuCode = menuCode;
                }
            }
            // 判断是否登录
            servantApi.getUserInfo().then(res => {
                if (res.code == 20000) {
                    var data = res.data;
                    var indexMenu = data.indexMenu;
                    if (indexMenu && indexMenu.length > 0) {
                        for (var i = 0; i < indexMenu.length; i++) {
                            if (indexMenu[i].code == this.menuCode) {
                                var menuList = indexMenu[i].menuList;
                                for (var k = 0; k < menuList.length; k++) {
                                    menuList[k].iconName = getMenuIconSrc(
                                        menuList[k].iconName
                                    );
                                }
                                indexMenu[i].menuList = menuList;
                                this.menuList = indexMenu[i].menuList;
                            }
                        }
                    }
                    // console.log(this.menuList);
                }
            });
        }
    }
};
</script>
<style lang='less' scoped>
</style>