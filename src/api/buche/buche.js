import request from '@/utils/bc_request';
import { getToken } from '@/utils/auth';
export default {
    // 捕车微信页根据code获取token
    // 帮买车辆基本信息
    // 根据工单id和token进行 车辆基本信息支付  维修方式购买支付
    usedCar(params) {
        params.token = sessionStorage.getItem("bucheToken");
        params.accId = 'h5';
        return request.post('/api/usedCar/pay', { reqData: JSON.stringify(params) });
    },
};