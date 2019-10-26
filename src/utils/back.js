/*
 * @Description: 后退统一处理
 * @Author: qjy
 * @Date: 2019-02-20 10:58:06
 */
import jnsApi from '@/utils/jnsApi';
export default {
    backList: {
        // 首页
        '#/': true,
        // 预订单统计
        '#/personal/bookingOrder': true,
        // 个人统计
        '#/personal/personalStatisticsFromApp': true,
        // 解决方案填写车架号
        '#/resolveSolution/vin': true,
        // 解决方案首页
        '#/resolveSolution/index': true,
        // 二手车商首页
        '#/usedCar/index': true,
        // 汽车检测报告
        '#/bill/carDetectionReport': true,
        // 已购买报告
        '#/personal/boughtReport': true,
        // 我的钱包
        '#/personal/myWallet': true,
        // 员工工作量
        '#/personal/workload': true,
        //联系我们
        '#/personal/contactMe': true,
        //二维码支付
        '#/bill/ownerQrCodePay': true,
        // 全车安检报告
        '#/bill/vehicleReport': true
    },
    handle() {
        let routerName = location.hash.split('?')[0];
        let backList = this.backList;
        if (backList[routerName] === true) {
            jnsApi.back();
        } else {
            jnsApi.h5Click().back();
        }
    },
    // 安卓物理后退键处理
    androidPhysicalBackButtonHandle() {
        // console.log(this.backList);
        jnsApi.androidCallback().reset(this.backList);
    },
};