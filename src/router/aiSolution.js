const aiSolutionEntry = () => import('@/views/aiSolution/entry.vue');
const airConditionerOrder = () => import('@/views/aiSolution/airConditioner/airConditionerOrder.vue');
const airConditionerReport = () => import('@/views/aiSolution/airConditioner/airConditionerReport.vue');
export default {
    path: '/aiSolution',
    component: aiSolutionEntry,
    children: [{
        path: 'airConditionerOrder',
        name: 'airConditionerOrder',
        component: airConditionerOrder,
        meta: {
            title: '空调工单',
            showTitle: true,
            keepAlive: false,
        }
    }, 
    {
        path: 'airConditionerReport',
        name: 'airConditionerReport',
        component: airConditionerReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    }]
};