import Vue from 'vue';
import Router from 'vue-router';

const notFound = () => import('@/views/notFound/notFound.vue');
const author = () => import('../views/author.vue');
const carInfo = () => import('../views/carInfo.vue');

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/author',
        name: 'author',
        component: author,
        meta: {
            title: '微信授权',
        }
    },
    {
        path: '/carInfo',
        name: 'carInfo',
        component: carInfo,
    },
    {
        path: '*',
        name: notFound,
        component: notFound,
    },
    ]
});