import request from '@/utils/request';
export default {
    // 获取深度诊断故障现象列表接口
    getFaultCode(params) {
        return request.post('/Helper/DepthDiagnosis/index', params);
    },
    // 根据故障现象获取诊断费用
    getSystemQuote(params) {
        return request.post('/Helper/DepthDiagnosis/getSystemQuote', params);
    },
};