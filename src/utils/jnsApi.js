/*
 * @Description: app对接接口
 * @Author: qjy
 * @Date: 2019-01-11 11:17:32
 */
import {
    getAppStatus
} from '@/utils/auth';
export default {
    router: {},
    printLog(methodName, params, msg) {
        console.log('方法:' + methodName);
        console.log('参数:', params);
        console.log('提示:', msg);
    },
    terminalType: '',
    getTerminalType() {
        if (this.terminalType) {
            return this.terminalType;
        }
        let u = navigator.userAgent;
        let typePhone = {
            ios: u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        };
        if (!getAppStatus()) {
            this.terminalType = typePhone.ios ? 'ios' : 'android';
        } else {
            this.terminalType = getAppStatus() == 'ios' ? 'ios' : 'android';
        }
        return this.terminalType;
    },
    jsonStringify(obj) {
        for (let key in obj) {
            if (!obj[key]) {
                obj[key] = '';
            }
            obj[key] = obj[key].toString();
        }
        obj = JSON.stringify(obj);
        if (!this.androidService()) {
            obj = encodeURIComponent(obj);
        }
        // 模拟解析
        // console.log(JSON.parse(decodeURIComponent(obj)));
        return obj;
    },
    jsonParse(jsonString) {
        return JSON.parse(decodeURIComponent(jsonString));
    },
    androidService() {
        if (typeof android == 'undefined') {
            return false;
        }
        return true;
    },
    /**
     * @Description: ios执行方法总入口
     * @Param: 
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 16:16:49
     */
    ios(methodName, params) {
        let ios = 'objc://doFunc/' + methodName;
        if (params && Object.keys(params).length > 0) {
            for (let key in params) {
                ios += '/' + params[key];
            }
        }
        window.location = ios;
        this.printLog(methodName, params, '调起ios的api服务');
    },
    /**
     * @Description: android执行方法总入口
     * @Param: 
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 16:16:47
     */
    android(methodName, params) {
        if (!this.androidService()) {
            this.printLog(methodName, params, 'android的api服务需要jns-app的支持');
            return false;
        }
        // 安卓参数需要一一对应，不然调起失败
        if (params && Object.keys(params).length > 0) {
            let paramsLen = Object.keys(params).length;
            switch (paramsLen) {
                case 5:
                    android.orderlist(methodName, params[0], params[1], params[2], params[3], params[4]);
                    break;
                case 4:
                    android.orderlist(methodName, params[0], params[1], params[2], params[3]);
                    break;
                case 3:
                    android.orderlist(methodName, params[0], params[1], params[2]);
                    break;
                case 2:
                    android.orderlist(methodName, params[0], params[1]);
                    break;
                case 1:
                    android.orderlist(methodName, params[0]);
                    break;
                default:
                    this.printLog(methodName, params, '额定参数超出范围，请检查相关方法');
                    break;
            }
        } else {
            android.orderlist(methodName);
        }
        this.printLog(methodName, params, '调起android的api服务');
    },
    // 方法统一执行入口
    action(methodName, params) {
        console.log(this.getTerminalType());
        this[this.getTerminalType()](methodName, params || '');
    },
    iosH5ToApp(methodName, params, paramJSON) {
        window.location = 'objc://doFunc/h5ToApp/' + paramJSON;
        this.printLog(methodName, params, '调起ios的api服务');
    },
    androidH5ToApp(methodName, params, paramJSON) {
        if (!this.androidService()) {
            this.printLog(methodName, params, 'android的api服务需要jns-app的支持');
            return false;
        }

        android.h5ToApp(paramJSON);
        this.printLog(methodName, params, '调起android的api服务');
    },
    // 新方法执行入口
    h5ToApp(methodName, param) {
        param = param || {};
        let appStatus = this.getTerminalType();
        let params = {
            jnsAppStatus: appStatus,
            jnsAppStep: methodName,
            ...param
        };
        let paramJSON = this.jsonStringify(params);
        
        this[this.getTerminalType() + 'H5ToApp'](methodName, params, paramJSON);
    },
    /**
     * @从H5 webview返回APP
     * @author:liubf
     * @createdTime:2018-04-17
     */
    backHome() {
        let methodName = 'back';
        if (!this.androidService()) {
            methodName = 'home';
        }
        this.action(methodName);
    },

    /**
     * @原生返回方法
     * @author:qjy
     * @createdTime:2018-08-30
     */
    back() {
        this.action('back');
    },
    /**
     * @调用APP拨打电话功能
     * @author:qjy
     * @createdTime:2018-04-17
     */
    callphone(phone) {
        this.action('callphone', [phone]);
    },
    /**
     * @重新授权登录
     * @author:qjy
     * @createdTime:2018-04-17
     */
    jumpLogin() {
        let methodName = 'login';
        if (!this.androidService()) {
            methodName = 'relogin';
        }
        this.action(methodName);
    },
    /**
     * @跳APP页面
     * @author:qjy
     * @createdTime:2018-04-17
     * @type:
     * @0-返回列表  1-未处理工单  2-未完成工单  3-历史工单  4-未处理订单
     * @5-历史订单  6-二手车检测列表  7-质保单管理
     */
    jumpPage(type) {
        let typeArr = {
            0: 'orderList',
            1: 'unprocessedWorkOrder',
            2: 'unfinishedWorkOrder',
            3: 'historicalWorkOrder',
            4: 'unprocessedOrder',
            5: 'historyOrder',
            6: 'UsedCarCheck',
            7: 'InsuranceOrder'
        };
        if (!typeArr[type]) {
            this.printLog('jumpPage', typeArr, '未定义类型');
            return false;
        }
        this.action(typeArr[type]);
    },
    /**
     * @调用摄像头扫描VIN号
     * @author:liubf
     * @createdTime:2018-04-17
     * @参数 callback带两个参数  callback(vin,imgUrl)
     */
    vinScanning(callback) {
        // app调用方法
        if (!this.androidService()) {
            window.ios_vin = callback;
        } else {
            window.and_vin = callback;
        }
        this.action('vin');
    },
    /**
     * @调用分享功能
     * @author:liubf
     * @createdTime:2018-04-17
     * @o : {
     * @    shareUrl : '',   //分享url
     * @    title : '',  //分享标题
     * @    subtitle : '',   //分享副标题
     * @    logo : ''    //分享图标地址
     * @}
     */
    share(o) {
        let status = this.getTerminalType();
        let params = [];
        if (status == 'ios') {
            // params = [
            //     o.shareUrl+',',
            //     encodeURIComponent(o.title)+',',
            //     encodeURIComponent(o.subtitle)+',',
            //     o.logo,
            // ];
            window.location = 'objc://' + 'doFunc' + '/' + 'share/' + o.shareUrl + ',' + encodeURIComponent(o.title) + ',' + encodeURIComponent(o.subtitle) + ',' + o.logo;
        } else {
            params = [
                o.shareUrl,
                o.title,
                o.subtitle,
                o.logo,
            ];
            this.action('share', params);
        }
    },
    /**
     * @Description: 调用原生app播放
     * @Param: playId 播放id
     * @Param: playAuth 播放授权密钥
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 16:29:30
     */
    jumpPlay(playId, playAuth) {
        let params = [
            playId,
            encodeURIComponent(playAuth),
        ];
        this.action('alPlayer', params);
    },

    /**
     * @Description: 调用原生app展示图
     * @Param: code  菜单code码
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 16:30:23
     */
    showImg(code) {
        this.action('showImg', [code]);
    },

    /**
     * @调用原生app定位方法
     * @author:liubf
     * @createdTime:2018-12-14
     */
    getLocationInformation(callback) {
        window.longitudeAndLatitude = callback;
        this.action('getLocationInformation');
        // 模拟回调
        // longitudeAndLatitude();
    },

    /**
     * @Description: 安卓物理键返回注册
     * @Param: 
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 16:31:08
     */
    androidCallback() {
        let _this = this;
        return {
            /**
             * @Description: 覆盖andClick方法
             * @Param: callback 回调方法
             * @Author: qjy
             * @LastEditors: qjy
             * @LastEditTime: Do not edit
             * @return: 
             * @Date: 2019-03-27 16:31:56
             */
            cover(callback) {
                console.log('重新注册安卓事件');
                window.andClick = callback;
            },

            /**
             * @Description: 重置andClick方法
             * @Param: backList 返回的匹配hash参数
             * @Author: qjy
             * @LastEditors: qjy
             * @LastEditTime: Do not edit
             * @return: 
             * @Date: 2019-03-27 16:31:50
             */
            reset(backList) {
                window.andClick = function () {
                    let anClickRouterName = location.hash.split('?')[0];
                    if (backList[anClickRouterName]) {
                        console.log('App native event trigger');
                        _this.printLog('andClick', 'back', 'App native event trigger');
                        _this.action('back');
                    } else {
                        _this.printLog('andClick', 'backMethod', 'H5 custom events are triggered');
                        _this.h5Click().backMethod();
                    }
                };
                _this.printLog('andClick', '', '注册安卓物理返回键监听方法');
            }
        };
    },
    /**
     * @Description: h5Click
     * @Param: 
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 17:15:45
     */
    h5Click() {
        let _this = this;
        return {
            backMethod() {
                _this.router.back();
            },
            reset() {
                this.back = this.backMethod;
            },
            cover(callback) {
                this.back = callback;
            },
            back() {
                this.backMethod();
            }
        };
    },
    // 该方法废弃
    appToH5() {
        let _this = this;
        return {
            data: {},
            payOrder(data) {
                window.location.reload();
                _this.printLog('appToH5:payOrder', data, 'jnsAppStep callback success');
            },
            action(callback) {
                // console.log(_this.jsonStringify({
                //     'jnsAppStep': 'payOrder',
                //     'status': 'ios'
                // }));
                _this.printLog('registered:appToH5', this.data, 'registered success');
                let action = this;
                window.appToH5 = function (jsonString) {
                    action.data = _this.jsonParse(jsonString);
                    let jnsAppStep = action.data.jnsAppStep;
                    if (typeof action[jnsAppStep] !== 'function') {
                        _this.printLog('appToH5:' + jnsAppStep, action.data, 'Unknown jnsAppStep');
                        return false;
                    }
                    if (typeof callback == 'function') {
                        action[jnsAppStep] = callback;
                    }
                    action[jnsAppStep](action.data);
                };
            }
        };
    },
    /**
     * @Description: 预约技术服务
     * @Param: obj
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 17:15:53
     */
    reservationService(obj) {
        obj = this.jsonStringify(obj);
        // 模拟解析
        // console.log(JSON.parse(decodeURIComponent(obj)));
        this.action('reservationService', [obj]);
    },

    /**
     * @Description: 
     * @Param: menuName
     * @Author: qjy
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 17:16:13
     */
    solution(menuName) {
        this.action('solution', [menuName]);
    },

    /**
     * @空调未完成工单跳转到原生
     * @author:lp
     * @createdTime:2019-03-08
     */
    airConditionAi(orderData) {
        orderData = this.jsonStringify(orderData);
        // console.log(orderData);
        this.action('airConditionAi', [orderData]);
    },

    /**
     * @Description: 技术帮手-空调检测 跳转app页面
     * @Param: obj
     * @Author: lp
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return: 
     * @Date: 2019-03-27 17:15:14
     */
    airCondition(obj) {
        obj = this.jsonStringify(obj);
        this.action('airCondition', [this.jsonStringify(obj)]);
    },

    /**
     * @Description: 调用新的扫码页面
     * @Param: introduceStatus string 是否展示详情介绍  0 不展示 1 展示
     * @Param: menuCode string 菜单code
     * @Param: menuName string 菜单名称
     * @Author: qjy
     * @Date: 2019-02-19 10:25:57
     * @LastEditors: qjy
     * @LastEditTime: Do not edit
     * @return:
     */
    scanVin(menuCode, menuName, introduceStatus, callback) {
        window.vinHandle = callback;
        let params = [
            menuCode,
            introduceStatus,
            menuName
        ];
        this.action('scanVin', params);
    }
};