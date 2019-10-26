/*
 * @Description: 全局公共配置文件设置
 * @Author: qjy
 * @Date: 2019-01-03 13:59:03
 */
import Cookies from 'js-cookie';

const TokenKey = 'H5jnsToken';
const appKey = 'H5appStatus';
const urlParamsKey = 'H5urlParams';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    // 单位为天
    return Cookies.set(TokenKey, token, {
        expires: 0.2
    });
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getAppStatus() {
    return Cookies.get(appKey);
}

export function setAppStatus(appStatus) {
    return Cookies.set(appKey, appStatus);
}

export function removeAppStatus() {
    return Cookies.remove(appKey);
}

export function getUrlParamsCache() {
    if (Cookies.get(urlParamsKey)) {
        return JSON.parse(Cookies.get(urlParamsKey));
    }
}

export function setUrlParamsCache(params) {
    return Cookies.set(urlParamsKey, JSON.stringify(params));
}

export function removeUrlParamsCache() {
    return Cookies.remove(urlParamsKey);
}