const carOwnerEntry = () => import('@/views/carOwner/entry.vue');
const report = () => import('@/views/carOwner/airConditioner/reportV1.vue');
const carDetectionReportV1 = () => import('@/views/carOwner/carDetection/reportV1.vue');
const depthDiagnosisReportV1 = () => import('@/views/carOwner/depthDiagnosis/reportV1.vue');
const tailAiDiagnosisReport = () => import('@/views/carOwner/tailAiDiagnosis/report.vue');
const payMode = () => import('@/views/carOwner/depthDiagnosis/payMode.vue');
const author = () => import('@/views/carOwner/depthDiagnosis/author.vue');
const usedCarDetectionReportV1 = () => import('@/views/carOwner/usedCarDetection/reportV1.vue');
const carSecurityCheckReportV1 = () => import('@/views/carOwner/carSecurityCheck/reportV1.vue');
const usedCarAssessReportV1 = () => import('@/views/carOwner/usedCarAssess/reportV1.vue');
const vehicleReport = () => import('@/views/carOwner/vehicleSecurity/vehicleReport.vue');
const extendWarrantyInfo = () => import('@/views/carOwner/extendWarranty/extendWarrantyInfo.vue');
const ratePage = () => import('@/views/report/ratePage.vue');
export default {
    path: '/carOwner',
    component: carOwnerEntry,
    children: [{
        path: 'airConditionerReportV1',
        name: 'airConditionerReportV1',
        component: report,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'carDetectionReportV1',
        name: 'carDetectionReportV1',
        component: carDetectionReportV1,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'depthDiagnosisReportV1',
        name: 'depthDiagnosisReportV1',
        component: depthDiagnosisReportV1,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'tailAiDiagnosisReport',
        name: 'tailAiDiagnosisReport',
        component: tailAiDiagnosisReport,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'usedCarDetectionReportV1',
        name: 'usedCarDetectionReportV1',
        component: usedCarDetectionReportV1,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'carSecurityCheckReportV1',
        name: 'carSecurityCheckReportV1',
        component: carSecurityCheckReportV1,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'usedCarAssessReportV1',
        name: 'usedCarAssessReportV1',
        component: usedCarAssessReportV1,
        meta: {
            title: '加载中',
            showTitle: false,
        }
    },
    {
        path: 'payMode',
        name: 'payMode',
        component: payMode,
        meta: {
            title: '选择支付方式',
        }
    },
    {
        path: 'author',
        name: 'author',
        component: author,
        meta: {
            title: '微信授权',
        }
    },
    {
        path: 'vehicleReport',
        name: 'vehicleReport',
        component: vehicleReport,
        meta: {
            title: '全车安检报告',
        }
    },
    {
        path: 'extendWarrantyInfo',
        name: 'extendWarrantyInfo',
        component: extendWarrantyInfo,
        meta: {
            title: '报告详情',
        }
    },
    {
        path: 'ratePage',
        name: 'ratePage',
        component: ratePage,
        meta: {
            title: '综合评价',
        }
    }

    ]
};