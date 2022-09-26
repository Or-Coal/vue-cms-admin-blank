import axios from "axios";

//获取用户列表
let userlist = (params) => axios.get('/user/list', { params });
//删除管理员账户
let remove = (data) => axios.post('/user/remove', data);

export default {
    userlist,
    remove

}