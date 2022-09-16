import axios from "axios";

//-----------文章列表
let artlist = (params) => axios.get('/article/list', { params });

//--------------标签管理
let taglist = (params) => axios.get('/tag/list', { params });


//---------------评论管理
let commentlist = (params) => axios.get('/comment/recent', { params });



export default {
    // 文章列表
    artlist,
    // 标签管理
    taglist,
    // 评论管理
    commentlist,
    // 编辑标签
    tagcompile: (id, data) => axios.put(`/tag/${id}`, data),
    // 删除标签
    tagremove: (id, params) => axios.delete(`/tag/${id}`, { params })
}