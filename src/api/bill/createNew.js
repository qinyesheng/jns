import request from '@/utils/request';
export default {
    saveCreateDiagnosesBill(params) {
        return request.post('/Bill/createNew/saveCreateDiagnosesBill', params);
    },
    saveCreateBillJ007(params) {
        return request.post('/Bill/createNew/saveCreateBillJ007', params);
    },
    //获取新建工单数据
    getCreateNew(params) {
        return request.post('/Bill/CreateNew', params);
    },
    //获取故障现象信息
    getFaultPhenomenon(params) {
        return request.post('/Bill/CreateNew/getFaultPhenomenon', params);
    },
    //添加故障信息 
    addFaultPhenomenon(params) {
        return request.post('/Bill/CreateNew/addFaultPhenomenon', params);
    },
    //根据车架号拿信息
    checkRestrict(params) {
        return request.post('/Bill/CreateNew/checkRestrict', params);
    },
    //根据车架号拿信息
    checkCustomer(params) {
        return request.post('/Bill/CreateNew/checkCustomer', params);
    },
    //根据车架号拿信息
    getCarInfoByVin(params) {
        return request.post('/Bill/CreateNew/getCarInfoByVin', params);
    },
    //根据预约单获取基本信息
    getBillDetail(params) {
        return request.post('/Bill/Undisposed/getBillDetail', params);
    },
    //根据不完整的手机号 匹配推荐人
    getReferee(params) {
        return request.post('/Common/Bill/getReferee', params);
    },
    //获取工单类型价格
    getReportPriceByBillType(params) {
        return request.post('/Common/Bill/getReportPriceByBillType', params);
    },
    //新增工单类型
    addBillType(params) {
        return request.post('/Bill/CreateNew/addBillType', params);
    },
    //删除工单类型
    delBillType(params) {
        return request.post('/Bill/Undisposed/delBillType', params);
    },
    //没有预约单，开单
    saveCreateBill(params) {
        return request.post('/Bill/createNew/saveCreateBill', params);
    },
    //有预约单id 开单
    saveConsulting(params) {
        return request.post('/Bill/Undisposed/saveConsulting', params);
    },
    //根据 车架号 获取车况报告列表
    getCarConditionByVin(params) {
        return request.post('/Bill/Report/getCarConditionByVin', params);
    },
    //当前机油型号
    getNowOilList(params){
        return request.post('/Common/InitialSurveyData/getNowOilList', params);
    },
};