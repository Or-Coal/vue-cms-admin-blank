<template>
    <div class="bg">
        <!-- el-card是一个element plus 中封装过的组件，可以直接使用 -->
        <el-card class="form-card">
            <template #header>
                <div class="card-header">
                    <span>编辑管理员</span>
                </div>
            </template>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="姓名" prop="fullname">
                    <el-input v-model="form.fullname" />
                </el-form-item>
                <el-form-item label="角色" prop="role">
                    <el-select v-model="form.role" class="m-2" placeholder="请选择权限" size="large">
                        <el-option v-for="item in personlist" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex" class="ml-4">
                        <el-radio label="男" size="large">男</el-radio>
                        <el-radio label="女" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机" prop="tel">
                    <el-input v-model="form.tel" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="头像">
                  <UploadPictures :PictorialInformation="PictorialInformation"/>
                </el-form-item>
            </el-form>
            <el-link>
                <el-button type="primary" v-on:click="handleSure(formRef)">保存修改</el-button>
            </el-link>

        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref,watchEffect,watch } from 'vue';
//注意axios函数引入位置（发送axios）（最好放上面）
import Admin from '@/api/admin';
//获取vue实例对象(跳转页面)
import { useRouter, useRoute } from 'vue-router';
// 引入封装的上传图片组件
import UploadPictures from '@/components/UploadPictures.vue'
let route = useRoute()
let { id } = route.params
let usernamecopy = ""
//角色选择：
let personlist = ref([]);
//加载管理员角色列表的函数：
let isplist = async () => {
    let { status, data } = await Admin.plist();
    if (status) {
        //获取到数据，渲染数据
        // return 一个promise对象
        return data
    }
}
// 获取管理员个人资料
let isadminInfo = async (id) => {
    let { status, data } = await Admin.adminInfo({ id })

    if (status) {
        form.value = data
        PictorialInformation.value.avatar = data.avatar
    }
}
// 获取页面数据
let isLoadlist = async () => {
let { id } = route.params
try {
    let  isplistdata = await isplist()
    personlist.value =  isplistdata
    await isadminInfo(id)
} catch (err) {
    // ElMessage.error(err)
} 
}
// 防止组件复用时页面不重新获取数据
watchEffect(async()=>{
    isLoadlist()
})

// 防止组件复用时页面不重新获取数据
// watch(()=>route.params.id,()=>{
//     isLoadlist()
// },{immediate: true})

// 提取token
let token = sessionStorage.token;
// 携带token
let headers = { Authorization: `Bearer ${token}` };
// 附加参数：
let extra = { type: 'avatar' };
// 上传之前的检查：
const handlebeforeUpload = (rawFile) => {
    //判断图片格式/^image\/(jpeg|png|jpg)$/
    let isValid = /^image\/(jpeg|png|jpg)$/.test(rawFile.type);
    if (!isValid) {
        ElMessage.error('头像必须是JPG/PNG/JPEG格式!');
        //return false 为了取消上传文件
        return false;
        //判断图片体积（大于2MB）
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('头像体积不允许超过2MB!');
        return false;
    }
    return true;
}
// 上传成功
const handleUploadSuccess = ({ status, msg, src }, uploadFile) => {
    console.log(status, msg, uploadFile);
    if (status) {
        //上传成功
        //生成图片地址
        form.value.avatar = src
        PictorialInformation.value.avatar = src
        ElMessage.success(msg);
    } else {
        //上传失败
        ElMessage.error(msg);
    }
}
// 上传失败
const handleUploadError = (error, uploadFile) => {
    // console.log(error);
    //将json对象 转换 为对象并解析出来
    let { status, msg } = JSON.parse(error.message);
    //错误通知
    ElMessage.error(msg);
}
// 表单验证
let form = ref({})
// 使用封装的上传图片的组件传入的信息
let PictorialInformation = ref({})
PictorialInformation.value = {
    action: "http://localhost:3001/upload/common/",
    headers,
    extra,
    accept: ".png,.jpg,.jpeg",
    handleUploadSuccess,
    handleUploadError,
    handlebeforeUpload,
    avatar:""
}
// 验证用户名是否已经被注册
//校验表单：
const rules = reactive({
    username: [
    { required: true, message: '请输入用户名!', trigger: 'blur' },
        { min: 3, max: 20, required: true, message: '账户长度要求在3-20之间', trigger: 'blur' }
    ],
    fullname: [
        { required: true, message: '请输入姓名!', trigger: 'blur' },
        { min: 1, max: 10, message: '姓名长度要求在1-10之间', trigger: 'blur' }
    ],
    role: [
        { required: true, message: '请选择角色!', trigger: 'change' },
    ],
    sex: [
        { required: true, message: '请选择性别!', trigger: 'change' },
    ],
    tel: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { pattern: /^1(([3,5,8]\d{9})|(4[5,7]\d{8})|(7[0,6-8]\d{8}))$/, message: '手机号码不符合规则', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/, message: '请输入邮箱', trigger: 'blur' }
    ],
});
//获取form组件实例---校验登录
const formRef = ref();
//获取router实例对象
let router = useRouter();
//保存按钮——校验
function handleSure(formEl) {
    formEl.validate(async (valid, fields) => {
        if (valid) {
            let formCopy = JSON.parse(JSON.stringify({ id, ...form.value }))
            delete formCopy.role_name
            const { status, msg, data } = await Admin.adminInfoP(formCopy)
            //校验成功
            if (status) {
                //修改成功
                ElMessage.success(msg);
                // 跳转页面
                router.push('/system/list');
            }
        } else {
            //未通过校验
            // console.log('校验失败(字段)', fields);
            //修改失败
            ElMessage.error(msg);
        }
    })
}
</script>


<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
    
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>