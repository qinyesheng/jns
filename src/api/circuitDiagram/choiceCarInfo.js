import circuitRequest from '@/utils/circuitRequest';
export default {
    getCarBrandList() {
        return circuitRequest.get('/');
    },
    getCarLineList(id) {
        return circuitRequest.get('/index/getModel', {
            params: {
                c_b_id: id
            }
        });
    },
    getCarYearList(id) {
        return circuitRequest.get('/index/getVersion', {
            params: {
                c_m_id: id
            }
        });
    },
    getsearchResultList(params) {
        return circuitRequest.get('/circuit/getList', {
            params
        });
    },
    getListByYun(params) {
        return circuitRequest.get('/circuit/getListByYun', {
            params
        });
    },
    getResultDetails(id) {
        return circuitRequest.get('/circuit/getCircuit', {
            params: {
                id: id
            }
        });
    }
};