import request from '@/utils/request';
export default {
    getSaveCarData(params) {
        return request.post('/AiMaintainSolution/Solution/saveCarData', params);
    },
    //获取检测结果的数据
    getCheckResultList(params) {
        return request.post('/AiMaintainSolution/Solution/getCheckResultList', params);
    },
    getQualitySolutionList(params) {
        return request.post('/AiMaintainSolution/Solution/getQualitySolutionList', params);
    },
    getQualitySolutionData(params) {
        return request.post('/AiMaintainSolution/Solution/getQualitySolutionData', params);
    },
};
