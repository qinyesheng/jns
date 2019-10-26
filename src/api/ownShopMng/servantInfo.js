import request from '@/utils/request';
export default {
    getVideoPlayAuth(params) {
        return request.post('/OwnShopMng/ServantInfo/getVideoPlayAuth', params);
    },
};