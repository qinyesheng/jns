import request from '@/utils/request';
export default {
    getUserInfo() {
        return request.post('/Servant/CommonServant/userInfo');
    },
};