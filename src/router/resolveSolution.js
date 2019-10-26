const entrySolution = () => import('@/views/resolveSolution/entry.vue');
const vin = () => import('@/views/resolveSolution/vin.vue');
const changeCar = () => import('@/components/carInfo/changeCar.vue');
const carKmInput = () => import('@/views/resolveSolution/carKmInput.vue');
const checkResultSearch = () => import('@/views/resolveSolution/checkResultSearch.vue');
const solutionIndex = () => import('@/views/resolveSolution/solutionIndex.vue');
const qualityAssurancePlan = () => import('@/views/resolveSolution/qualityAssurancePlan.vue');
const solution = () => import('@/views/resolveSolution/solution.vue');
const agreement = () => import('@/views/resolveSolution/agreement.vue');
export default {
    path: '/resolveSolution',
    component: entrySolution,
    children: [{
        path: 'vin',
        name: 'vin',
        component: vin,
        keepAlive: true,
    },
    {
        path: 'changeCar',
        name: 'changeCar',
        component: changeCar,
        meta: {
            title: '车辆信息',
            routerToName: 'carKmInput',
            // keepAlive: true,
        }
    },
    {
        path: 'checkResultSearch',
        name: 'checkResultSearch',
        component: checkResultSearch,
    },
    {
        path: 'carKmInput',
        name: 'carKmInput',
        component: carKmInput,
        meta: {
            title: '行驶里程',
        }
    },
    {
        path: '/index',
        name: 'solutionIndex',
        component: solutionIndex,
        meta: {
            keepAlive: true,
            title: '智能维修'
        },
    }, {
        path: 'qualityAssurancePlan',
        name: 'qualityAssurancePlan',
        component: qualityAssurancePlan,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: 'solution',
        name: 'solution',
        component: solution,
        meta: {
            keepAlive: true,
        },
    },
    {
        path: 'agreement/:agreementId',
        name: 'agreement',
        component: agreement,
    },
    ]
};