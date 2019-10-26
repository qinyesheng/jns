const personalEntry = () => import('@/views/personalCenter/entry.vue');
const boughtReport = () => import('@/views/personalCenter/boughtReport.vue');
const bookingOrder = () => import('@/views/personalCenter/bookingOrder.vue');
const myWallet = () => import('@/views/personalCenter/personalWallet/myWallet.vue');
const mineBankCard = () => import('@/views/personalCenter/personalWallet/mineBankCard.vue');
const bindBankCard = () => import('@/views/personalCenter/personalWallet/bindBankCard.vue');
const selectBankCard = () => import('@/views/personalCenter/personalWallet/selectBankCard.vue');
const earningsDetail = () => import('@/views/personalCenter/personalWallet/earningsDetail.vue');
const withdrawCash = () => import('@/views/personalCenter/personalWallet/withdrawCash.vue');
const workload = () => import('@/views/personalCenter/managementSituation/workload.vue');
const personalStatistics = () => import('@/views/personalCenter/performanceStatistics/personalStatistics.vue');
const billStatistics = () => import('@/views/personalCenter/performanceStatistics/billStatistics.vue');
const dividedStatisticalDetail = () => import('@/views/personalCenter/performanceStatistics/dividedStatisticalDetail.vue');
const contactMe = () => import('@/views/personalCenter/contactMe.vue');
const trainee = () => import('@/views/personalCenter/managementSituation/trainee.vue');
export default {
    path: '/personal',
    component: personalEntry,
    children: [{
        path: 'boughtReport',
        name: 'boughtReport',
        component: boughtReport,
        meta: {
            title: '已购买报告',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'bookingOrder',
        name: 'bookingOrder',
        component: bookingOrder,
        meta: {
            title: '预订单统计',
            showTitle: false,
            keepAlive: false,
        }
    },
    {
        path: 'earningsDetail',
        name: 'earningsDetail',
        component: earningsDetail,
        meta: {
            title: '收益明细',
            showTitle: false,
            keepAlive: false,
        }
    },
    {
        path: 'withdrawCash',
        name: 'withdrawCash',
        component: withdrawCash,
        meta: {
            title: '提现记录',
            keepAlive: false,
        }
    },
    {
        path: 'myWallet',
        name: 'myWallet',
        component: myWallet,
        meta: {
            title: '个人钱包',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'mineBankCard',
        name: 'mineBankCard',
        component: mineBankCard,
        meta: {
            title: '我的银行卡',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'bindBankCard',
        name: 'bindBankCard',
        component: bindBankCard,
        meta: {
            title: '绑定银行卡',
            showTitle: true,
            keepAlive: true
        }
    },
    {
        path: 'selectBankCard',
        name: 'selectBankCard',
        component: selectBankCard,
        meta: {
            title: '选择开户行',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'workload',
        name: 'workload',
        component: workload,
        meta: {
            title: '员工绩效',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'personalStatistics',
        name: 'personalStatistics',
        component: personalStatistics,
        meta: {
            title: '个人统计',
            showTitle: false,
            keepAlive: false,
        }
    },
    {
        path: 'personalStatisticsFromApp',
        name: 'personalStatisticsFromApp',
        component: personalStatistics,
        meta: {
            title: '个人统计',
            showTitle: false,
            keepAlive: false,
        }
    },
    {
        path: 'billStatistics',
        name: 'billStatistics',
        component: billStatistics,
        meta: {
            title: '工单统计明细',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'dividedStatisticalDetail',
        name: 'dividedStatisticalDetail',
        component: dividedStatisticalDetail,
        meta: {
            title: '分成统计明细',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'contactMe',
        name: 'contactMe',
        component: contactMe,
        meta: {
            title: '联系我们',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'trainee',
        name: 'trainee',
        component: trainee,
        meta: {
            title: '学员列表',
            showTitle: true,
            keepAlive: false,
        }
    }
    ]
};