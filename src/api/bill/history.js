import request from '@/utils/request';
export default {
    // 获取历史工单详情接口
    getHistoryBillDetail(billId) {
        return request.post('/Bill/History/getBillDetail', billId);
    }
};