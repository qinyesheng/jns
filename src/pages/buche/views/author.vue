<!--
 * @Description: 捕车微信授权
 * @Author: your name
 * @Date: 2019-06-18 16:46:15
 * @LastEditTime: 2019-06-20 16:52:44
 * @LastEditors: Please set LastEditors
 -->

<template>
    <div class="page"></div>
</template>
<script>
import Qs from "qs";
import usedCarApi from "@/api/buche/buche";
import { getToken, setToken } from "@/utils/auth";
import { isEmptyObject, getUrlParams } from "@/utils/common";
export default {
    data() {
        return {
            query: this.$route.query,
            urlParams: getUrlParams(),
            wechatScope: {
                base: "snsapi_base", // snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid）
                userinfo: "snsapi_userinfo" // snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
            },
            loading: true
        };
    },
    components: {},
    created() {
        this.init();
    },
    mounted() {},
    methods: {
        notFound() {
            this.$router.replace("/notFound");
        },
        init() {
            let query = Qs.parse(this.query);
            if (
                isEmptyObject(query) ||
                !query.nextPath ||
                query.nextPath == "/notFound"
            ) {
                this.notFound();
                return false;
            }
            // 微信授权回来处理
            let urlParams = this.urlParams;
            let appId = "wxfbb75c42dfde4244";
            if (!isEmptyObject(urlParams) && urlParams.code && appId) {
                // 微信授权回来的处理
                usedCarApi
                    .usedCar({
                        reqAct: "getToken",
                        code: urlParams.code
                    })
                    .then(res => {
                        if (res.retCode == "0") {
                            sessionStorage.setItem("bucheToken",res.result.retToken);
                            this.$router.replace({
                                path: query.nextPath,
                                query: query
                            });
                        } else {
                            this.$toast.fail(res.retMsg);
                            this.notFound();
                        }
                    });
            } else {
                this.loading = this.$toast.loading({
                    duration: 0, // 持续展示 toast
                    forbidClick: true, // 禁用背景点击
                    loadingType: "spinner",
                    message: "微信授权中"
                });
                this.wechatLoginAuth(appId);
            }
        },
        wechatLoginAuth(appId) {
            let wechatScopeType = this.wechatScope.userinfo;
            let redirectUri = location.href;
            let data = {
                ext1: "ext1",
                ext2: "ext2"
            };
            let authUrl = this.getAuthUrl(
                appId,
                redirectUri,
                wechatScopeType,
                data
            );
            this.loading.clear();
            location.replace(authUrl);
        },
        getAuthUrl(appId, redirect_uri, scope, data) {
            let params = {
                appid: appId,
                redirect_uri: redirect_uri,
                response_type: "code",
                scope: scope,
                state: 1
            };
            let paramsString = Qs.stringify(params) + "#wechat_redirect";
            let url =
                "http://open.weixin.qq.com/connect/oauth2/authorize?" +
                paramsString;
            return url;
        }
    }
};
</script>