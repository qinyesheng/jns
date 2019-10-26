import request from '@/utils/request';
export default {
    // 根据code获取工单报告综合评价
    getBillScoreInfo(params) {
        return request.post('/Common/BillScore/getBillScoreInfo', params);
    },
    // 根据code保存该工单报告综合评价
    saveBillScore(params) {
        return request.post('/Common/BillScore/saveBillScore', params);
    }
};