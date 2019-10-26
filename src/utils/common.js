/*
 * @Description: 全局公共js
 * @Author: qjy
 * @Date: 2019-02-19 09:11:06
 */
/**
 * @Description: 获取全部地址栏参数
 * @Param: 
 * @Author: qjy
 * @Date: 2019-02-19 09:15:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-08 10:40:50
 * @return: 
 */
export function getUrlParams() {
    let reg = new RegExp('(^|&)*=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    let query = {};
    if (r) {
        r = unescape(decodeURIComponent(r.input));
        r = r.split('&');
        if (r.length > 0) {
            query = {};
            for (let i = 0; i < r.length; i++) {
                r[i] = r[i].split('=');
                query[r[i][0]] = r[i][1];
            }
        }
    }
    return query;
}

/**
 * @Description: 拼接menuIcon完整的资源路径
 * @Param: 图标名称
 * @Author: lp
 * @Date: 2019-03-01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-03-01 11:18:28
 * @return: 
 */
export function getMenuIconSrc(iconName) {
    return process.env.VUE_APP_JNSMENUICON_URL + '/' + iconName;
}

/**
 * @Description: 获取车品牌icon地址
 * @Param: 图标名称 
 * @Author: qjy
 * @LastEditors: qjy
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-03-15 13:59:34
 */
export function getCarBrandIconSrc(iconName) {
    return 'https://www.wanguoqiche.com/files/logo/' + iconName + '.jpg';
}


/*
 *计算两个经纬度直线距离，返回数组[距离,单位]
 */

/**
 * @Description: 根据两点的经纬度获取距离
 * @Param: startP [lng,lat] 起始位置
 * @Param: endP [lng,lat] 终点位置
 * @Author: qjy
 * @LastEditors: qjy
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-04-01 10:30:13
 */
export function getLineDistance(startP, endP) {
    let Lat1 = startP[1] * Math.PI / 180.0;
    let Lat2 = endP[1] * Math.PI / 180.0;

    let a = Lat1 - Lat2;
    let b = startP[0] * Math.PI / 180.0 - endP[0] * Math.PI / 180.0;

    let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378137.0;
    s = Math.round(s * 10000) / 10000.0;
    let km = {
        num: '',
        unit: '',
        desc: '',
    };
    // km.num = s > 1000 ? parseInt(parseInt(s) / 100) / 10 : parseInt(s);
    km.num = s > 1000 ? (s / 1000).toFixed(2) : s.toFixed(2);
    km.unit = s > 1000 ? 'km' : 'm';
    km.num =
        (km.num + '').substr(-1) == 0
            ? (+km.num).toFixed(1)
            : km.num;
    km.desc = km.num + km.unit;
    return km;
}

/**
 * @Description: 复制对象方法（js复制对象会读取内存的对象数据，当对象数据变化时，赋值的变量也会跟着变化，此方法可以深度copy该对象）
 * @Param: 
 * @Author: qjy
 * @LastEditors: qjy
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-04-13 13:38:12
 */
export function copyObject(data) {
    return JSON.parse(JSON.stringify(data));
}

/**
 * @Description: 需要进行防抖处理的方法
 * @Param: fun 方法
 * @Param: delay 延迟时间
 * @Author: lp
 * @LastEditors: lp
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-04-17 15:39:13
 */
export function debounce(fun, delay) {
    return function (value) {
        if (!value) {
            return false;
        }
        clearTimeout(fun.id);
        fun.id = setTimeout(() => {
            fun(value);
        }, delay);
    };
}


/**
 * @Description: 判断是否是微信内打开
 * @Param: 
 * @Author: qjy
 * @LastEditors: qjy
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-04-23 14:20:14
 */
export function isWeixin() {
    let ua = navigator.userAgent.toLowerCase();
    let isWeixin = ua.indexOf('micromessenger') != -1;
    return isWeixin;
}

/**
 * @Description: 轮播图片高度处理
 * @Param: 
 * @Author: lp
 * @LastEditors: lp
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-05-11 11:23:14
 */
export function bannerHeightHandle() {
    let clientHeight =
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    return parseInt(Math.ceil(clientHeight * 0.37).toFixed(0));
}
/**
 * @Description: 获取屏幕的宽度
 * @Param: 
 * @Author: xwq
 * @LastEditors: xwq
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-07-30 10:16:38
 */
export function getClientWidth() {
    let clientWidth =
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    return parseInt(Math.floor(clientWidth * 0.9));
}

/**
 * @Description: 日期对象转格式 例如获取2019-04格式 dateFormat(date, "yyyy-MM") 
 * @Param: 
 * @Author: lp
 * @LastEditors: lp
 * @LastEditTime: Do not edit
 * @return: 
 * @Date: 2019-05-05 10:26:14
 */
export function dateFormat(time, format) {
    let t = new Date(time);
    let tf = function (i) {
        return (i < 10 ? '0' : '') + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
            case 'MM':
                return tf(t.getMonth() + 1);
            case 'mm':
                return tf(t.getMinutes());
            case 'dd':
                return tf(t.getDate());
            case 'HH':
                return tf(t.getHours());
            case 'ss':
                return tf(t.getSeconds());
        }
    });
}

/**
 * @Description: 判断数组或对象是否为空 
 * @Param: data array|object 数组或对象
 * @Author: qjy
 * @LastEditors: qjy
 * @LastEditTime: Do not edit
 * @return: boolean
 * @Date: 2019-05-20 15:19:07
 */
export function isEmptyObject(data) {
    let len = Object.keys(data).length;
    if (len > 0) {
        return false;
    }
    return true;
}