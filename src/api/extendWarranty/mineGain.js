/*
 * @Description: 银行卡接口
 * @Author: xwq
 * @Date: 2019-05-09 10:05:43
 */
import request from '@/utils/request';
export default {
    //申请提现  
    applyForWithdrawal(val) {
        return request.post('/ExtendWarranty/MineGain/applyForWithdrawal', { applicationsAmount: val });
    },
    //获取银行卡列表信息
    getBankCardList() {
        return request.post('/ExtendWarranty/MineGain/getBankCardList');
    },
    //获取用户绑定银行卡信息
    getBankInfo() {
        return request.post('/ExtendWarranty/MineGain/getBankInfo');
    },
    //绑定银行卡
    bindingBankInfo(params) {
        return request.post('/ExtendWarranty/MineGain/bindingBankInfo', params);
    },
    // 个人中心获取个人收益明细列表
    getIncomeRecord(params) {
        return request.post('/ExtendWarranty/MineGain/getIncomeRecord', params);
    },
    // 个人中心获取个人收益明细列表
    getWithdrawDepositRecord(params) {
        return request.post('/ExtendWarranty/MineGain/getWithdrawDepositRecord', params);
    },
};
