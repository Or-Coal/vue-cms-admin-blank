import axios from "axios";

//获取用户列表
let userlist = (params) => axios.get('/user/list', { params });


export default {
    userlist,
   
}