const billEntry = () => import('@/views/bill/entry.vue');
const carDetectionReport = () => import('@/views/bill/carDetection/carDetectionReport.vue');
const map = () => import('@/components/map/map.vue');
const changeCar = () => import('@/components/carInfo/changeCar.vue');
const depthDiagnosisInfo = () => import('@/views/bill/depthDiagnosis/depthDiagnosisInfo.vue');
const searchFaultCode = () => import('@/views/bill/depthDiagnosis/searchFaultCode.vue');
const depthDiagnosisReport = () => import('@/views/bill/depthDiagnosis/report.vue');
const tailAiDiagnosisReport = () => import('@/views/bill/tailAiDiagnosis/report.vue');
const tailPost = () => import('@/views/bill/tailAiDiagnosis/tailPost.vue');
const usedCarDetectionReport = () => import('@/views/bill/usedCarDetection/usedCarDetectionReport.vue');
const usedCarAssessDetectionReport = () => import('@/views/bill/usedCarAssess/usedCarAssessDetectionReport.vue');
const carSecurityCheckReport = () => import('@/views/bill/carSecurityCheck/carSecurityCheckReport.vue');
const usedCarAssessReport = () => import('@/views/bill/usedCarAssess/usedCarAssessReport.vue');
const tailAiDiagnosisInfo = () => import('@/views/bill/tailAiDiagnosis/tailAiDiagnosisInfo.vue');
const ownerQrCodePay = () => import('@/views/bill/ownerPay/ownerQrCodePay.vue');
const vehicleReport = () => import('@/views/bill/vehicleSecurity/vehicleReport.vue');
const extendWarrantyInfo = () => import('@/views/bill/extendWarranty/extendWarrantyInfo.vue');
export default {
    path: '/bill',
    component: billEntry,
    children: [{
        path: 'carDetectionReport',
        name: 'carDetectionReport',
        component: carDetectionReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'carDetectionMap',
        name: 'carDetectionMap',
        component: map,
        meta: {
            title: '详细地址',
            showTitle: false,
        }
    },
    {
        path: 'changeCar',
        name: 'changeCar',
        component: changeCar,
        meta: {
            title: '车辆信息',
            routerToName: 'depthDiagnosisInfo',
        }
    },
    {
        path: 'resolveChangeCar',
        name: 'resolveChangeCar',
        component: changeCar,
        meta: {
            title: '车辆信息',
            routerToName: 'carKmInput',
        }
    },
    {
        path: 'searchFaultCode',
        name: 'searchFaultCode',
        component: searchFaultCode,
        meta: {
            title: '深度诊断',
            showTitle: true,
        }
    },
    {
        path: 'depthDiagnosisInfo',
        name: 'depthDiagnosisInfo',
        component: depthDiagnosisInfo,
        meta: {
            title: '深度诊断',
            showTitle: true,
            keepAlive: true
        }
    },
    {
        path: 'depthDiagnosisReport',
        name: 'depthDiagnosisReport',
        component: depthDiagnosisReport,
        meta: {
            title: '报告详情',
            showTitle: true,
        }
    },
    {
        path: 'usedCarDetectionReport',
        name: 'usedCarDetectionReport',
        component: usedCarDetectionReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'carSecurityCheckReport',
        name: 'carSecurityCheckReport',
        component: carSecurityCheckReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'usedCarAssessReport',
        name: 'usedCarAssessReport',
        component: usedCarAssessReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'usedCarAssessDetectionReport',
        name: 'usedCarAssessDetectionReport',
        component: usedCarAssessDetectionReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'tailAiDiagnosisReport',
        name: 'tailAiDiagnosisReport',
        component: tailAiDiagnosisReport,
        meta: {
            title: '报告详情',
            showTitle: true,
            keepAlive: false,
        }
    },
    {
        path: 'tailChangeCar',
        name: 'tailChangeCar',
        component: changeCar,
        meta: {
            title: '车辆信息',
            routerToName: 'tailAiDiagnosisInfo',
        }
    },
    {
        path: 'tailAiDiagnosisInfo',
        name: 'tailAiDiagnosisInfo',
        component: tailAiDiagnosisInfo,
        meta: {
            title: '行驶里程',
        }
    },
    {
        path: 'tailPost',
        name: 'tailPost',
        component: tailPost,
        meta: {
            title: '提交合格证',
        }
    },
    {
        path: 'ownerQrCodePay',
        name: 'ownerQrCodePay',
        component: ownerQrCodePay,
        meta: {
            title: '车主付款',
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
    }
    ]
};