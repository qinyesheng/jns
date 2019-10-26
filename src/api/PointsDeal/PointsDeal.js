import request from '@/utils/request';
export default {
    //获取支付信息确认页面详情接口
    getPayModeInfo(params) {
        return request.post('/PointsDeal/PointsDeal/getPayModeInfo', params);
    },
};
