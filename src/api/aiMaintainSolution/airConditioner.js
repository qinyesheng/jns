import request from '@/utils/request';
export default {

    // 根据order_id订单ID获取AI空调检测报告接口 
    getReportById(params) {
        return request.post('/AiMaintainSolution/AirConditioner/getAirConditionerReport', params);
    },
    // 获取空调检测工单列表
    getAirConditionerList(params) {
        return request.post('/AiMaintainSolution/AirConditioner/getAirConditionerList', params);
    }
};