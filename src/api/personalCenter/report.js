import request from '@/utils/request';
export default {
    // 个人中心获取已购买报告列表
    getReportList(params) {
        return request.post('/PersonalCenter/Report/getReportList', params);
    },
};