/*
 * @Description: 个人中心-钱包接口
 * @Author: xwq
 * @Date: 2019-05-09 10:50:24
 */
import request from '@/utils/request';
export default {
    // 获取个人钱包数据
    getWalletInfo() {
        return request.post('/PersonalCenter/Wallet/index');
    },
    //解绑银行卡
    unbindBankCard(bankNumber) {
        return request.post('/PersonalCenter/Wallet/unbindBankCard', {
            bank_number: bankNumber
        });
    },

};