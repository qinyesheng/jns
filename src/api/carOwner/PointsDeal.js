import request from '@/utils/request';
export default {
    //39元支付请求
    pointsRecharge() {
        return request.post('/CarOwner/PointsDeal/pointsRecharge');
    },

};