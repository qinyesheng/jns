import request from '@/utils/request';
export default {
    getHotBrand() {
        return request.post('/UsedCarDealer/UsedCarDealer/index');
    },
    getShopList(params) {
        return request.post('/UsedCarDealer/UsedCarDealer/getDealerList',params);
    }
};