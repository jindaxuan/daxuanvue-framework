import axios from 'axios';
import router from '../router';
import {
    Message
} from 'view-design';
import {
    // eslint-disable-next-line no-unused-vars
    loginOut,
} from 'api/user'
let urlArry = window.location.origin.split(':');
let baseURL = `${urlArry[0]}:${urlArry[1]}`
localStorage.setItem('baseURL', baseURL)

const $axios = axios.create({
    // 设置超时时间
    timeout: 60000,
    baseURL: 'http://paas.ruhrtec.cn'
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
$axios.interceptors.request.use(async config => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        // 页面静止不动token过期自动调用登出接口
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
$axios.interceptors.response.use(response => {
    if (response.headers['content-type'] === 'image/jpeg') {
        let url = window.URL.createObjectURL(response.data);
        return Promise.resolve(url);
    } else {
        const responseCode = response.status;
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (responseCode === 200 && (response.data.code === 200 || response.data.status === 'success')) {
            return Promise.resolve(response.data);
        } else {
            Message.error({
                background: true,
                content: response.data.message
            })
            return Promise.reject(response.data);
        }
    }

}, error => {
    // 服务器返回不是 2 开头的情况，会进入这个回调
    const responseCode = error.response ? error.response.status : '';
    switch (responseCode) {
        // 401：未登录
        case 401:
            // 跳转登录页
            router.replace('/login')
            localStorage.removeItem('token')
            break;
        case 411:
            // 跳转登录页
            router.replace('/login')
            localStorage.removeItem('token')
            break;
        case 403:
            // 弹出错误信息
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            // setTimeout(() => {
            // 	router.replace({
            // 		path: '/login',
            // 		query: {
            // 			redirect: router.currentRoute.fullPath
            // 		}
            // 	});
            // }, 1000);
            break;
            // 404请求不存在
        case 404:
            // Message({
            // 	message: '网络请求不存在',
            // 	type: 'error'
            // });
            break;
            // 其他错误，直接抛出错误提示
            case 2010:
            Message.error({
                background: true,
                content: error.response && error.response.data ? error.response.data.hint : '系统错误',
                closable: true,
                duration: 0
            })
            break;
            // 其他错误，直接抛出错误提示
        default:
            // Message({
            // 	message: error.response.data.error_msg,
            // 	type: 'error'
            // });
    }
    let content = error.response && error.response.data ? error.response.data.message : '系统错误'
    if(responseCode !== 2010 && content !== sessionStorage.getItem('errorTxt')){
        Message.error({
            background: true,
            content: error.response && error.response.data ? error.response.data.message : '系统错误'
        })
        sessionStorage.setItem('errorTxt', content)
        setTimeout(() => {
            sessionStorage.setItem('errorTxt', '')
        },2000)
    }
    return Promise.reject();
});

export default $axios;