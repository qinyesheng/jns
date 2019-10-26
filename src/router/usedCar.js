const usedCarEntry = () => import('@/views/usedCarDealers/entry.vue');
const usedCar = () => import('@/views/usedCarDealers/usedCar.vue');
const selectCar = () => import('@/views/usedCarDealers/selectCar.vue');
const dealerDetails = () => import('@/views/usedCarDealers/dealerDetails.vue');
export default {
    // 二手车商：usedCar, dealerDetails, selectCar
    path: '/usedCar',
    component: usedCarEntry,
    children: [{
        path: '/index',
        name: 'usedCar',
        component: usedCar,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: 'dealerDetails/:dealer_id',
        name: 'dealerDetails',
        component: dealerDetails,
    },
    {
        path: 'selectCar',
        name: 'usedCarSelectCar',
        component: selectCar,
    },
    ]

};