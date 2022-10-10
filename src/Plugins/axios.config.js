import axios from 'axios'
import router from '@/router'
// 默认发送请求的地址
axios.defaults.baseURL = 'http://127.0.0.1:3001';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送之前请求token
    var token = sessionStorage.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // 请求错误做点什么
    // return Promise.reject(error);
});




// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么:抽取data中的数据，返回给下一步 
    return response.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // return Promise.reject(error);
    let { response: { status } ,config:{url}} = error
    //消息提示
    switch (status) {
        case 401: ElNotification.error({
            title: `错误${status}`,
            message: '登陆的token过期或者无效请重新登录',
        });
            // 获取当前页面路径
            let { fullPath } = router.currentRoute.value
            // 重定向到登陆页面，附带redirect参数
            router.replace({ name: 'Login', query: { redirect: fullPath } })
            break;
        case 403: ElNotification.error({
            title: `错误${status}`,
            message: '登陆的token过期或者无效请重新登录',
        });
        break;
        case 404: ElNotification.error({
            title: `错误${status}`,
            message: `API接口:${url},地址不存在`,
        });
        break;
        case 500: ElNotification.error({
            title: `错误${status}`,
            message: `API接口:${url}错误,请检查Network,再联系后台`,
        });
        break;
    }

});