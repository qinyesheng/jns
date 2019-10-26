
import request from '@/utils/request';
export default {
    //小虎检车车主端保存预约订单
    addBooking(data) {
        return request.post('XhjcOwner/XhjcOwner/addBooking', data);
    },
    getReportList(data) {
        return request.post('XhjcOwner/XhjcOwner/getReportList', data);
    },
    //小虎检测车主端获取订单列表接口
    getBookingList(data) {
        return request.post('XhjcOwner/XhjcOwner/getBookingList', data);
    },
    //车主端获取订单详情接口
    getBookingInfoById(billId) {
        return request.post('XhjcOwner/XhjcOwner/getBookingInfoById', {
            bill_id: billId
        });
    },
    cancelBookingById(data) {
        return request.post('XhjcOwner/XhjcOwner/cancelBookingById', data);
    },
    //获取用户支付的工单信息
    getPayModeInfo(data) {
        return request.post('CarOwner/PointsDeal/getPayModeInfo', data);
    },
    //用户取消支付
    cancelOrder(data) {
        return request.post('CarOwner/PointsDeal/cancelOrder', data);
    },
    //用户选择支付
    carOwnerPay(data) {
        return request.post('CarOwner/PointsDeal/carOwnerPay', data);
    },
    //广告投放统计
    getAdStatistics(data) {
        return request.post('CarOwner/UsersCenter/getAdStatistics', data);
    },
};