// import VConsole from 'vconsole';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import vueWebStorage from 'vue-web-storage';
import {
    getToken,
    setToken,
    setUrlParamsCache
} from '@/utils/auth';
import {
    getUrlParams,
} from '@/utils/common';
import flexible from 'amfe-flexible';
import {
    Toast,
    Row,
    Col,
    Cell,
    CellGroup,
    Button,
    Popup,
    Lazyload,
    Icon,
    Dialog,
} from 'vant';
// import style
import 'vant/lib/icon/local.css';
import '@/assets/css/reset.css';
import './assets/css/style.css';

Vue.use(flexible).use(Toast).use(Row).use(Col).use(Cell).use(CellGroup).use(Button).use(Popup).use(Lazyload).use(Icon).use(Dialog).use({
    routes: router,
    defaultRouteUrl: '/'
});
// 使用vue存储插件
Vue.use(vueWebStorage, {
    prefix: 'buche', // default `app_`
    drivers: ['session', 'local'], // 生成Vue.$localStorage以及Vue.$sessionStorage
});
Vue.prototype.$local = Vue.$localStorage; // 原型链加方法
Vue.prototype.$session = Vue.$sessionStorage;
if (process.env.NODE_ENV !== 'production') {
    console.log(process.env);
}

router.beforeEach((to, from, next) => {
    const {
        path,
        query,
    } = to;
    if (path == '/notFound') {
        next();
        return;
    }
    if (!sessionStorage.getItem("bucheToken") && query.toPath != '/author') {
        query.toPath = '/author';
        query.nextPath = path;
        if (query.toPath == path) {
            router.replace('/notFound');
            next();
        } else {
            router.replace({
                path: query.toPath,
                query: query,
            });
            next();
        }
    } else {
        next();
    }
});

new Vue({
    router,
    render: h => h(App),
    created() {
        let urlParams = getUrlParams();
        if (urlParams) {
            // console.log(urlParams);
            if (urlParams.token) {
                setToken(urlParams.token);
            }
            setUrlParamsCache(urlParams);
        }
    },
}).$mount('#app');