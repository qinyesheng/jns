import request from '@/utils/request';
export default {
    //获取公众号站点列表 旧的
    getCheckOrgList() {
        return request.post('/XhjcOwner/Org/getCheckOrgList');
    },
    //获取公众号站点列表 最新
    getOrgList(params) {
        return request.post('/XhjcOwner/Org/getOrgList', params);
    },
    //获取公众号站点列表的筛选数据 最新
    getOrgCondition(params) {
        return request.post('/XhjcOwner/Org/getOrgCondition', params);
    },
    ////获取公众号站点详情 旧的  
    getCheckOrgDetail(orgId) {
        return request.post('/XhjcOwner/Org/getCheckOrgDetail', {
            shopOpenId: orgId
        });
    },
    ////获取公众号站点详情 最新  
    getOrgDetail(params) {
        return request.post('/XhjcOwner/Org/getOrgDetail', params);
    }
};