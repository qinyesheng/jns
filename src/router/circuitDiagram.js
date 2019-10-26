const circuitDiagramEntry = () => import('@/views/circuitDiagram/entry.vue');
const selectCar = () => import('@/views/circuitDiagram/selectCar.vue');
const selectCarLine = () => import('@/views/circuitDiagram/selectCarLine.vue');
const selectCarYear = () => import('@/views/circuitDiagram/selectCarYear.vue');
const searchResult = () => import('@/views/circuitDiagram/searchResult.vue');
const resultDetails = () => import('@/views/circuitDiagram/resultDetails.vue');
export default {
    path: '/circuitDiagram',
    component: circuitDiagramEntry,
    children: [{
        path: 'selectCar',
        name: 'selectCar',
        component: selectCar,
    }, {
        path: 'selectCarLine',
        name: 'selectCarLine',
        component: selectCarLine,
    }, {
        path: 'selectCarYear',
        name: 'selectCarYear',
        component: selectCarYear,
    }, {
        path: 'searchResult',
        name: 'searchResult',
        component: searchResult,
    }, {
        path: 'resultDetails',
        name: 'resultDetails',
        component: resultDetails,
    }]
};