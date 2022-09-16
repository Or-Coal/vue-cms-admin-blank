import axios from "axios";
// 友情链接列表：
//获取友情链接列表
let list = (params) => axios.get('/link/list', { params });
// 轮播图列表：
//获取轮播图管理列表
let pic = (params) => axios.get('/slide/list', { params });
export default {
    list,
    pic,
}