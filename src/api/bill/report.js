import request from '@/utils/request';
export default {
    // 获取工单详情接口
    getBillDetail(billId) {
        return request.post('/Bill/Report/getReportByJ005', {
            billId: billId,
        });
    },
    // 根据工单id获取二手车检测报告
    getReportByBillIdV2(billId) {
        return request.post('/Bill/Report/getReportByBillIdV2', {
            billId: billId,
        });
    },
    // 根据工单id获取二手车评估报告
    getReportByBillIdV3(billId) {
        return request.post('/Bill/Report/getReportByBillIdV3', {
            bill_id: billId,
        });
    },
    // 根据billid订单ID获取全车检测报告接口 J004/J008
    getReportByBillId(params) {
        return request.post('/Bill/Report/getReportByBillId', params);
    },
    // // 根据billid订单ID获取全车检测报告广告信息
    // getAdvertising(params) {
    //     return request.post('/Bill/Report/getReportByBillId', params);
    // },

};