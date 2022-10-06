import axios from "axios";
//获取所有分类
export {
    categorylist
}
let categorylist = (params)=>axios.get('/category/list',{params})
export default {
    categorylist
}