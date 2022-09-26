import axios from "axios";


//——获取所有分类
let list = (params) => axios.get('/category/list', { params });
//获取子集分类
let subcate = (params) => axios.get('/category/sub', { params });
//添加分类
let insert = (data) => axios.post('/category/add', data);
//删除分类
let remove = (data) => axios.post('/category/remove', data);
//编辑分类
let edit = (data) => axios.post('/category/edit', data);


export default {
    list,
    subcate,
    insert,
    remove,
    edit,

}