import axios from "axios"

//角色
let list = (params) => axios.get('/role/list', { params });

//编辑
let edit = (id, data) => axios.put(`/role/${id}`, data);

//创建
let create = (data) => axios.post('/role', data);

//删除
let remove = (id, params) => axios.delete(`/role/${id}`, { params });

// 侧边栏菜单
let menu = (params) => axios.get('/role/menu/', { params });

export default {
    list,
    remove,
    edit,
    create,
    menu,

}
