import request from '@/utils/request';
export default {
    // C端获取深度诊断报告
    getDepthDiagnosisReport(params) {
        return request.post('/Common/Report/getDepthDiagnosisReport', params);
    },
    // 根据报告code获取AI空调检测报告接口
    getAirConditionerReport(params) {
        return request.post('/Common/Report/getAirConditionerReport', params);
    },
    // 根据报告code和version获取全车检测报告接口
    // version报告版本号： 3-全车v3版（工单类型J001），4-全车v4版（工单类型J002），5-专项检测（J003），6-汽车检测（J004）， 7-汽车安检（J006）, 8-全车安检（J008）
    getWholeCarReport(params) {
        return request.post('/Common/Report/getWholeCarReport', params);
    },
    // C端获取二手车诊断报告
    getReportV2(code) {
        return request.post('/Common/Report/getReportV2', {
            code
        });
    },
    // C端获取二手车评估报告
    getReportV3(code) {
        return request.post('/Common/Report/getReportV3', {
            code
        });
    },
    // C端 根据广告位id和机构id，获取广告信息列表
    getAdList(params) {
        return request.post('/Adv/AdvUltimate/getReportAdList', params);
    },
    // 记录广告点击事件
    addClickLog(params) {
        return request.post('/Event/AdLog/addClickLog', params);
    }
};