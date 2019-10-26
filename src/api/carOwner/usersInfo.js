import request from '@/utils/request';
export default {
    getBaseInfo() {
        return request.post('CarOwner/UsersInfo/getBaseInfo');
    }

};