import request from '@/utils/request';
export default {
    // 转为维修工单
    changeRepair(params) {
        return request.post('/Bill/Undisposed/changeRepair', params);
    },
    //获取合格证信息接口
    getBIllCertificate(params) {
        return request.post('/Bill/Undisposed/getBIllCertificate', params);
    },
    //保存合格证信息接口e
    saveBillCertificate(params) {
        return request.post('/Bill/undisposed/saveBillCertificate', params);
    },
    //获取基本信息
    getBillDetail(params) {
        return request.post('/Bill/Undisposed/getBillDetail', params);
    },
    // 获取延长保修服务数据
    getExtendedWarrantyPackageList(params) {
        return request.post('/Bill/Undisposed/getExtendedWarrantyPackageList', params);
    }
};

