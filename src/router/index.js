import Vue from 'vue';
import Router from 'vue-router';
import carOwnerRouter from '@/router/carOwner';
import aiSolutionRouter from '@/router/aiSolution';
import billRouter from '@/router/bill';
import personalRouter from '@/router/personalCenter';
import billing from '@/router/billing';
// import usedCarRouter from '@/router/usedCar';
// import resolveSolutionRouter from './resolveSolution';
// import circuitDiagramRouter from '@/router/circuitDiagram';
Vue.use(Router);
export default new Router({
    routes: [{
        path: '*',
        name: 'notFound',
        component: () => import('@/views/notFound/notFound.vue'),
        meta: {
            title: '404'
        }
    }, {
        path: '/appToH5',
        name: 'appToH5',
        component: () => import('@/views/redirect/appToH5.vue'),
        meta: {
            title: '原生调用H5组件'
        }
    }, {
        path: '/ownerReport',
        name: 'ownerReport',
        component: () => import('@/views/redirect/ownerReport.vue'),
        meta: {
            title: '车主报告H5组件'
        }
    }, {
        path: '/dynamicRedirect',
        name: 'dynamicRedirect',
        meta: {
            title: '重定向处理'
        },
        redirect: to => {
            const {
                query
            } = to;
            return {
                path: query.toPath,
                query: query
            };
        }
    },
        // usedCarRouter,
        // resolveSolutionRouter,
        // circuitDiagramRouter,
        carOwnerRouter,
        aiSolutionRouter,
        billRouter,
        personalRouter,
        billing
    ]
});