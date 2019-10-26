import request from '@/utils/request';
export default {
    // C端获取二手车评估检测报告
    getUsedCarAssessReport(params) {
        return request.post('/Common/BuChe/getUsedCarAssessReport', params);
    },
};