/*
 * @Description: 图片上传
 * @Author: xwq
 * @Date: 2019-09-03 11:07:21
 * @LastEditTime: 2019-09-09 17:59:07
 */
import request from './request';
import { getToken } from './auth';
import { Toast } from 'vant';

function uploadImg(file) {
    if (!file) {
        Toast('缺少file参数');
        return;
    }
    let requestUrl = '/Bill/CreateNew/uploadFile';
    let params = new FormData();
    params.append('file', file);
    params.append('token', getToken());

    return request.post(requestUrl, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (data) {
            return data;
        }],
    }).then(res => {
        if (res.code == 20000) {
            // console.log(res, '***');
            /*  Toast(res.msg);
             setTimeout(() => {
                 Toast.clear();
             }, 1000); */
            return (res.data);
        } else {
            Toast(res.msg);
        }
    });
}

export default uploadImg;