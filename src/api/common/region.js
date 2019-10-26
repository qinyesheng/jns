import request from '@/utils/request';
export default {
    // 获取省市城市区域数据
    getAreaList(id) {
        return request.post('/Common/Region/getAreaList', { id });
    },
};