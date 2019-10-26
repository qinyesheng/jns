import request from '@/utils/request';
export default {
    wxLogin() {
        let data = {
            vtrId: '92842e5e0a2ab9bdc291e1998e7d33bf'
        };
        return request.post('/CarOwner/Guest/wxLogin', data);
    },
    wxuserInfo(data) {
        data = {
            vtrId: '92842e5e0a2ab9bdc291e1998e7d33bf',
            ...data,
        };
        return request.post('/CarOwner/Guest/wxuserInfo', data);
    },
    //获取车辆信息页面的数据
    getCarInfoByVin(params) {
        return request.post('/CarOwner/Guest/getCarInfoByVin', params);
    },
    //获取品牌车系的数据
    getCarBrandList() {
        return request.post('/CarOwner/Guest/getCarBrandList');
    },
    //获取车系的数据
    getCarLineList(id) {
        return request.post('/CarOwner/Guest/getCarLineList', {
            brandId: id
        });
    },
    //获取延保报告详情接口
    getExtendWarrantyDetail(code) {
        return request.post('/CarOwner/Guest/getExtendWarrantyDetail', code);
    },
    //新延保更新选择的系统，总价
    updateExtendWarrantyPrice(params) {
        return request.post('/CarOwner/Guest/updateExtendWarrantyPrice', params);
    },
    //新延保支付接口
    extendWarrantyPay(params) {
        return request.post('/CarOwner/Guest/extendWarrantyPay', params);
    },
    //技师端获取车系
    billCarBrandList(params){
        return request.post('/Bill/CreateNew/getCarBrandList', params);
    },
    //技师端获取车型 
    billCarLineList(params){
        return request.post('/Bill/CreateNew/getCarLineList', params);
    },
};
