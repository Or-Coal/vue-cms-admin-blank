import axios from 'axios'
// 默认发送请求的地址
axios.defaults.baseURL = 'http://localhost:3001';

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
    return Promise.reject(error);
});