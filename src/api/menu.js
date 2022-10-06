import axios from "axios";

//获取所有分类
let list = (params) => axios.get('/menu/all', { params });
//获取子集菜单
let chlidren = (params) => axios.get('/menu/sub', { params });
//添加菜单
let add = (data) => axios.post('/menu', data);
//删除菜单
let remove = (id, params) => axios.delete(`/menu/${id}`, { params });
//更新（编辑）菜单
let edit = (id, data) => axios.put(`/menu/${id}`, data);

export default {
    list,
    chlidren,
    add,
    remove,
    edit,
}