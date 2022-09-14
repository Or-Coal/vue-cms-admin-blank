import axios from 'axios'
export function login(data) { return axios.post('/admin/login', data) };

export default {
    // 登录
    // login(data) { return axios.post('/admin/login', data) }
    login: (data) => axios.post('/admin/login', data),
    // 注册
    register: (data) => axios.post('/admin/register', data),
    // 检测用户名是否可用
    checkUsername: (data) => axios.post('/admin/check/username', data)

}