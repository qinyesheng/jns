import circuitRequest from '@/utils/circuitRequest';
export default {
    getResultDetails(id) {
        return circuitRequest.get('/circuit/getCircuit', {
            id: id
        });
    }
};