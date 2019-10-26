// import Vconsole from 'vconsole';
import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import vueWebStorage from 'vue-web-storage';
import {
    setToken,
    setAppStatus,
    setUrlParamsCache
} from '@/utils/auth';
import {
    getUrlParams
} from '@/utils/common';
import flexible from 'amfe-flexible';
import {
    Toast,
    Cell,
    CellGroup,
    Button,
    Popup,
    Tab,
    Tabs,
    Lazyload,
    Icon,
    Row,
    Col,
    Dialog
} from 'vant';
import jnsApi from '@/utils/jnsApi';
import back from '@/utils/back';
import('@css/reset.css');
import('@css/style.css');
import('vant/lib/icon/local.css');
Vue.use(flexible).use(Toast).use(Cell).use(CellGroup).use(Button).use(Popup).use(Lazyload, {
    error: require('@image/errorImg.png')
}).use(Icon).use(Row).use(Col).use(Tab).use(Tabs).use(Dialog).use({
    routes: router,
    defaultRouteUrl: '/'
});
// const vConsole = new Vconsole();
// Vue.use(vConsole);
// 使用vue存储插件
Vue.use(vueWebStorage, {
    prefix: 'jnsApp', // default `app_`
    drivers: ['session', 'local'], // 生成Vue.$localStorage以及Vue.$sessionStorage
});
Vue.prototype.$local = Vue.$localStorage; // 原型链加方法
Vue.prototype.$session = Vue.$sessionStorage;
if (process.env.NODE_ENV !== 'production') {
    console.log(process.env);
}
jnsApi.router = router;
router.beforeEach((to, from, next) => {
    back.androidPhysicalBackButtonHandle();
    next();
});

new Vue({
    router,
    render: h => h(App),
    created() {
        window.appToH5Registered = jnsApi.appToH5();
        window.appToH5Registered.action();
        this.init();
    },
    mounted() { },
    watch: {
        $route() {
            if (this.$route.meta.showTitle === true) {
                document.title = this.$route.meta.title;
            }
        }
    },
    methods: {
        init() {
            let urlParams = getUrlParams();
            if (urlParams) {
                if (urlParams.token) {
                    setToken(urlParams.token);
                }
                let appStatus = urlParams.status;
                if (!appStatus) {
                    appStatus = jnsApi.getTerminalType();
                }
                setAppStatus(appStatus);
                setUrlParamsCache(urlParams);
            }
            // document.title = 'jns';
        },
    }

}).$mount('#app');