import axios from "axios";


//获取公告列表
let noticelist = (params) => axios.get('/notice/list', { params });

//编辑公告  /notice/edit
let edit = (data) => axios.post('/notice/edit', data);

//获取指定ID的公告详情
let info = (params) => axios.get('/notice/detail', { params });

//顶置公告 /notice/stick
let top = (data) => axios.post('/notice/stick', data);

//删除公告
let remove = (data) => axios.post('/notice/remove', data);

//发布公告 /notice/release
let release = (data) => axios.post('/notice/release', data);


export default {
    noticelist,
    edit,
    info,
    top,
    remove,
    release,
}