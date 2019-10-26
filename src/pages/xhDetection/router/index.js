
import Vue from 'vue';
import Router from 'vue-router';
import orgMap from '../views/orgMap.vue';

const notFound = () => import('@/views/notFound/notFound.vue');
const index = () => import('../views/index.vue');
const agreement = () => import('../views/agreement.vue');
// const orgMap = () => import('../views/orgMap.vue');
// const orgMap = () => import('../views/orgMap.vue');
const orgInfo = () => import('../views/orgInfo.vue');
const bookingFinished = () => import('../views/bookingFinished.vue');
const order = () => import('../views/order.vue');
const orderDetail = () => import('../views/orderDetail.vue');
const author = () => import('../views/author.vue');
const menuIndex = () => import('../views/menuIndex.vue');
const personalCenter = () => import('../views/personalCenter.vue');
const voucherDesc = () => import('../views/voucherDesc.vue');
const sumVoucher = () => import('../views/sumVoucher.vue');
const voucherCenter = () => import('../views/voucherCenter.vue');
const dealInfo = () => import('../views/dealInfo.vue');
const consumeInfo = () => import('../views/consumeInfo.vue');
const consumeDealInfo = () => import('../views/consumeDealInfo.vue');
const fixedPay = () => import('../views/fixedPay.vue');
const orderPay = () => import('../views/orderPay.vue');
const bindPhone = () => import('../views/bindPhone.vue');
const dividedStatistical = () => import('../views/dividedStatistical.vue');
const adStatistical = () => import('../views/adStatistical.vue');
const dividedDetail = () => import('../views/dividedDetail.vue');

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/author',
        name: 'author',
        component: author,
        meta: {
            title: '微信授权',
            // keepAlive: true
        }
    },
    {
        path: '/',
        name: '/',
        component: index,
        meta: {
            title: '小虎检车',
            showTitle: true,
            keepAlive: true
        }
    }, {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
            title: '小虎检车',
            showTitle: true,
            keepAlive: true
        }
    }, {
        path: '/agreement',
        name: 'agreement',
        component: agreement,
        meta: {
            title: '服务协议',
            showTitle: true,
            keepAlive: true
        }
    }, {
        path: '/orgInfo',
        name: 'orgInfo',
        component: orgInfo,
        meta: {
            title: '站点详情',
            showTitle: true,
        }
    }, {
        path: '/bookingFinished',
        name: 'bookingFinished',
        component: bookingFinished,
        meta: {
            title: '预约',
            showTitle: true,
        }
    }, {
        path: '/orderDetail/:billId',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
            title: '订单详情',
            showTitle: true,
        }
    },
    {
        path: '/menuIndex',
        name: 'menuIndex',
        component: menuIndex,
        meta: {
            title: '菜单页',
            showTitle: true,
            // keepAlive: true
        },
        children: [{
            path: 'orgMap',
            name: 'orgMap',
            component: orgMap,
            meta: {
                title: '预约检车',
                showTitle: true,
                // keepAlive: true
            }
        },
        {
            path: 'order',
            name: 'order',
            component: order,
            meta: {
                title: '检测报告',
                showTitle: true,
                // keepAlive: false
            }
        },
        {
            path: 'personalCenter',
            name: 'personalCenter',
            component: personalCenter,
            meta: {
                title: '个人中心',
                showTitle: true,
                // keepAlive: false
            }
        }
        ]
    },
    {
        path: '/sumVoucher',
        name: 'sumVoucher',
        component: sumVoucher,
        meta: {
            title: '余额充值',
            showTitle: true,
        }
    },
    {
        path: '/voucherCenter',
        name: 'voucherCenter',
        component: voucherCenter,
        meta: {
            title: '充值卡验证',
            showTitle: true,
        }
    },
    {
        path: '/dealInfo',
        name: 'dealInfo',
        component: dealInfo,
        meta: {
            title: '交易明细',
            showTitle: true,
        }
    },
    {
        path: '/consumeInfo',
        name: 'consumeInfo',
        component: consumeInfo,
        meta: {
            title: '消费记录',
            showTitle: true,
            keepAlive: true
        }
    },
    {
        path: '/bindPhone',
        name: 'bindPhone',
        component: bindPhone,
        meta: {
            title: '绑定手机号',
            showTitle: true,
        }
    },
    {
        path: '/dividedStatistical',
        name: 'dividedStatistical',
        component: dividedStatistical,
        meta: {
            title: '分成统计',
            showTitle: true,
        },

    },
    {
        path: '/adStatistical',
        name: 'adStatistical',
        component: adStatistical,
        meta: {
            title: '广告投放统计',
            showTitle: true,
        }
    },

    {
        path: '/dividedDetail',
        name: 'dividedDetail',
        component: dividedDetail,
        meta: {
            title: '分成明细',
            showTitle: true,
        },
    },

    {
        path: '/consumeDealInfo',
        name: 'consumeDealInfo',
        component: consumeDealInfo,
        meta: {
            title: '交易详情',
            showTitle: true,
        }
    },
    {
        path: '/voucherDesc',
        name: 'voucherDesc',
        component: voucherDesc,
        meta: {
            title: '充值说明',
            showTitle: true,
        }
    },
    {
        path: '/fixedPay',
        name: 'fixedPay',
        component: fixedPay,
        meta: {
            title: '账户充值',
            showTitle: true,
        }
    },
    {
        path: '/orderPay',
        name: 'orderPay',
        component: orderPay,
        meta: {
            title: '服务费',
            showTitle: true,
        }
    },
    {
        path: '*',
        name: notFound,
        component: notFound,
    },
    ]
});