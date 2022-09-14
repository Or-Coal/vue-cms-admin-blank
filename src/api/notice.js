import axios from "axios";


//获取公告列表
let noticelist = (params) => axios.get('/notice/list', { params });

export default {
    noticelist,
}