import axios from "axios";

//-----------文章列表
let artlist = (params) => axios.get('/article/list', { params });

//--------------标签管理
let taglist = (params) => axios.get('/tag/list', { params });


//---------------评论管理
let commentlist = (params) => axios.get('/comment/recent', { params });

//创建标签
let createtag = (data) => axios.post('/tag/', data);
//删除文章
let remove = (data) => axios.post('/article/remove', data);
//获取指定id文章
let info = (params) => axios.get('/article/detail', { params });
//编辑指定文章
let edit = (data) => axios.post('/article/edit', data);
//给指定文章标记标签
let articletag = (data) => axios.post('/article/tag', data);
//删除标签
let removetag = (id, params) => axios.delete(`/tag/${id}`, { params });
//编辑标签
let edittag = (id, data) => axios.put(`/tag/${id}`, data);
export default {
    edit,
    info,
    remove,
    createtag,
    // 文章列表
    artlist,
    // 标签管理
    taglist,
    // 评论管理
    commentlist,
    // 编辑标签
    tagcompile: (id, data) => axios.put(`/tag/${id}`, data),
    // 删除标签
    tagremove: (id, params) => axios.delete(`/tag/${id}`, { params }),
    //给指定文章标记标签
    articletag,
    removetag,
    edittag
}