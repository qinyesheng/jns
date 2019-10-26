import request from '@/utils/request';
export default {
    getDealerDetail(params) {
        return request.post('/UsedCarDealer/UsedCarDealer/getDealerDetail', params);
    },
};