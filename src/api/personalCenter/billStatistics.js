import request from '@/utils/request';
export default {
    //工单统计列表
    getBillStatisticsList(params) {
        return request.post('/PersonalCenter/BillStatistics/getBillStatisticsList', params);
    },
    //获取工单统计明细列表筛选条件
    getSortRuleInfo(params) {
        return request.post('/PersonalCenter/BillStatistics/getSortRuleInfo', params);
    },
    //获取机构所有员工工作量月统计
    getStaffStatistics(params) {
        return request.post('/PersonalCenter/BillStatistics/getAllStaff', params);
    },
    //获取个人统计信息
    getStaff(params) {
        return request.post('/PersonalCenter/BillStatistics/getStaff', params);
    },
    //获取分成统计明细列表  
    getDividedStatisticsList(params) {
        return request.post('/PersonalCenter/BillStatistics/getDividedStatisticsList', params);
    },
    //获取工单分成统计明细列表筛选条件  
    getSearchCondition(params) {
        return request.post('/PersonalCenter/BillStatistics/getSearchCondition', params);
    },
    //获取工单分成统计明细列表筛选条件  
    getStudentList(params) {
        return request.post('/Common/Student/getStudentList', params);
    },
};