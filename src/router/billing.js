const billingEntry = () => import('@/views/billing/entry.vue');
const carModelInfo = () => import('@/views/billing/carModelInfo.vue');
const carBodyCheckMenuIndex = () => import('@/views/billing/carBodyCheckMenuIndex.vue');
const customerInfo = () => import('@/views/billing/customerInfo.vue');
const serviceType = () => import('@/views/billing/serviceType.vue');
export default {
    path: '/billing',
    component: billingEntry,
    children: [
        {
            path: 'carModelInfo',
            name: 'carModelInfo',
            component: carModelInfo,
            meta: {
                title: '车型详情',
            },

        },
        {
            path: 'carBodyCheckMenuIndex',
            name: 'carBodyCheckMenuIndex',
            component: carBodyCheckMenuIndex,
            meta: {
                title: '车体检查',
            }
        },
        
        {
            path: 'serviceType',
            name: 'serviceType',
            component: serviceType,
            meta: {
                title: '设置工单任务',
            },
        },
        {
            path: 'customerInfo',
            name: 'customerInfo',
            component: customerInfo,
            meta: {
                title: '客户信息',
            }
        }
    ]
};