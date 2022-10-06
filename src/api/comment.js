import axios from "axios";


//获取指定id的评论详情
let comment = (params) => axios.get('/comment/detail', { params });
//回复评论：
let reply = (data) => axios.post('/comment/reply', data);



export default {
    reply,
    comment,
}