import axios from "axios";
// 友情链接列表：
//获取友情链接列表
let list = (params) => axios.get('/link/list', { params });
//删除友情链接
let removelink = (id, params) => axios.delete(`/link/${id}`, { params });
//编辑友情链接
let editlink = (id, data) => axios.put(`/link/${id}`, data);


// 轮播图列表：
//获取轮播图管理列表
let pic = (params) => axios.get('/slide/list', { params });
//删除管理员账户
let premove = (data) => axios.post('/slide/remove', data);
//编辑按钮后————保存修改
let keep = (data) => axios.post('/slide/edit', data);
// 修改本账号信息
let adminaccount = (data) => axios.post('/admin/account', data);
export default {
    //一一一一一一一一友情链接列表：
    list,
    removelink,
    editlink,
    adminaccount,
    //----------------轮播图列表：
    pic,
    premove,
    keep,

}