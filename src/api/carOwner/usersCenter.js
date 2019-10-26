import request from '@/utils/request';
export default {
    /* 获取充值中心信息 */
    getRechargeCenter() {
        return request.post('CarOwner/UsersCenter/getRechargeCenter');
    },
    /* 获取车主消费记录明细列表 */
    getDealList(data) {
        return request.post('CarOwner/UsersCenter/getDealList', data);
    },
    /* 获取车主消费信息详情 */
    getDealInfo(id) {
        return request.post('CarOwner/UsersCenter/getDealInfo', { deal_detail_id: id });
    },
    /* 获取充值卡密码信息 */
    getCardConsume(val) {
        return request.post('/CarOwner/UsersCenter/getCardConsume', { coupon_pwd: val });
    },
    /* 充值卡密码消费确认 */
    saveCardConsume(val) {
        return request.post('/CarOwner/UsersCenter/saveCardConsume', { captcha: val });
    },
    /* 根据手机号获取验证码接口 */
    getBindMobileSms(data) {
        return request.post('/CarOwner/UsersCenter/getBindMobileSms', data);
    },
    /* 通过校验验证码绑定手机号接口 */
    editCustomerBindMobile(data) {
        return request.post('/CarOwner/UsersCenter/editCustomerBindMobile', data);
    },
    /* 获取分成统计首页接口 */
    getDividedStatistics() {
        return request.post('/CarOwner/UsersCenter/getDividedStatistics');
    },
    /* 获取明细列表接口 */
    getDividedList(data) {
        return request.post('/CarOwner/UsersCenter/getDividedList', data);
    },
};