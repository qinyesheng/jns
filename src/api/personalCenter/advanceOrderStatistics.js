import request from '@/utils/request';
export default {
    //获取预订单统计页面的列表
    getAdvanceOrderIndex(params) {
        return request.post('/PersonalCenter/AdvanceOrderStatistics/index', params);
    },
    //获取某日期范围的预订单统计金额接口
    getAdvanceOrderAmount(params) {
        return request.post('/PersonalCenter/AdvanceOrderStatistics/getAdvanceOrderAmount', params);
    },
    //获取某日期范围的预订单统计工单数接口
    getAdvanceOrderNum(params) {
        return request.post('/PersonalCenter/AdvanceOrderStatistics/getAdvanceOrderNum', params);
    }
};