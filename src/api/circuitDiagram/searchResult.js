import circuitRequest from '@/utils/circuitRequest';
export default {
    getsearchResultList(params) {
        return circuitRequest.get('/circuit/getList', params);
    },
    getListByYun(params) {
        return circuitRequest.get('/circuit/getListByYun', params);
    }
};