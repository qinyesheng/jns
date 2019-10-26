/*
 * @Description: 统一请求处理
 * @Author: qjy
 * @Date: 2019-01-11 11:17:32
 */
import axios from 'axios';
import Qs from 'qs';
import jnsApi from '@/utils/jnsApi';
import {
    Toast
} from 'vant';
import {
    getToken,
    getAppStatus,
    removeToken
} from '@/utils/auth';
import {
    isWeixin
} from '@/utils/common';

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // api 的 base_url
    timeout: 5000, // request timeout
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 拦截处理请求数据
    transformRequest: [function(data) {
        data = Qs.stringify(data);
        return data;
    }],
});

const responseCode = {
    handle(callback) {
        if (isWeixin() || !getAppStatus()) {
            if (callback) {
                callback();
            }
        } else {
            setTimeout(() => {
                jnsApi.backHome();
            }, 1000);
        }
    },
    40500(msg) {
        Toast({
            type: 'fail',
            message: msg,
            duration: 1000,
        });
        this.handle();
    },
    40300(msg) {
        Toast({
            type: 'fail',
            message: msg,
            duration: 1000,
        });
        this.handle();
    },
    40600(msg) {
        Toast({
            type: 'fail',
            message: msg,
            duration: 1000,
        });
        this.handle();
    },
    40100(msg) {
        Toast({
            type: 'fail',
            message: msg,
            duration: 1000,
        });
        setTimeout(() => {
            // 登录失效清除token
            if (getToken()) {
                removeToken();
            }
            if (isWeixin()) {
                location.reload();
                return true;
            } else {
                jnsApi.jumpLogin();
            }
        }, 1000);
    },
    40400(msg) {
        Toast({
            type: 'fail',
            message: msg,
            duration: 1000,
        });
    },
    40000() {
        return true;
    },
};

// request interceptor
service.interceptors.request.use(
    config => {
        // console.log(config);
        // console.log(devServer.proxy);
        // console.log(process.env.NODE_ENV);
        // Do something before request is sent
        // if (store.getters.token) {
        //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = getToken()
        // 统一请求都有token
        if (config.data === undefined) {
            config.data = {};
        }
        config.data.token = getToken();
        return config;
    },
    error => {
        // Do something with request error
        // console.log(error) // for debug
        return Promise.reject(error).catch(reason => {
            return reason;
        });
    }
);

// response interceptor
service.interceptors.response.use(
    //   response => response,
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const res = response.data;
        if (res.code !== 20000) {
            if (responseCode[res.code]) {
                responseCode[res.code](res.msg);
            }
            return Promise.reject(res).catch(reason => {
                return reason;
            });
        } else {
            return res;
        }
    },
    error => {
        // console.log('err' + error) // for debug
        Toast({
            type: 'fail',
            message: error.message,
        });
        return Promise.reject(error).catch(reason => {
            return reason;
        });
    }
);

export default service;