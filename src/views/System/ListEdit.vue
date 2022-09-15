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
                <el-form-item label="角色" prop="username">
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
                <el-form-item label="邮箱" prop="tel">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="头像" prop="tel">
                    <el-upload class="avatar-uploader" action="http://localhost:3001/upload/common/" :headers="headers"
                        :data="extra" :show-file-list="false" accept=".png,.jpg,.jpeg" :on-success="handleUploadSuccess"
                        :on-error="handleUploadError" :before-upload="handlebeforeUpload">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-link>
                <el-button type="primary">保存修改</el-button>
            </el-link>

        </el-card>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
//注意axios函数引入位置（发送axios）（最好放上面）
import Admin from '@/api/admin';
//获取vue实例对象(跳转页面)
import { useRouter,useRoute} from 'vue-router';

let route = useRoute()
let {id} = route.params
// 获取管理员个人资料
let isLoadlist = async ()=>{
    let {status,data} = await Admin.adminInfo({id})
    if(status){
form.value = data
imageUrl.value = data.avatar
    }
}
isLoadlist(id)
//提取token
let token = sessionStorage.token;
let headers = { Authorization: `Bearer ${token}` };
//附加参数：
let extra = { type: 'avatar' };

//上传之前的检查：
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
//上传成功
const handleUploadSuccess = ({ status, msg ,src}, uploadFile) => {
    console.log(status, msg, uploadFile);
    if (status) {
        //上传成功
        //生成图片地址
        form.value.avatar = src
        ElMessage.success(msg);
    } else {
        //上传失败
        ElMessage.error(msg);
    }
}
//上传失败
const handleUploadError = (error, uploadFile) => {
    // console.log(error);
    //将json对象 转换 为对象并解析出来
    let { status, msg } = JSON.parse(error.message);
    //错误通知
    ElMessage.error(msg);
}


//角色选择：
let personlist = ref([]);
//加载管理员角色列表的函数：
async function loadList() {
    let { status, msg, data, total } = await Admin.plist();
    if (status) {
        //获取到数据，渲染数据
        personlist.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();


let form = ref({
    //性别：
    sex: '男',
    value:'',
})
//获取form组件实例---校验登录
const formRef = ref();

// 验证用户名是否已经被注册
const validatePass3 = async (rule, value, callback) => {
    // console.log(rule, value, callback);
    if (value === '') {
        callback(new Error('请输入用户名!!!'));
        return;
    }
    let { msg, status } = await Admin.checkUsername({ username: form.username });
    console.log(msg, status);
    if (!status) {
        callback(new Error('用户已被注册!'));
        return;
    }
    // 全部通过校验
    callback();
}

//校验表单：
const rules = reactive({
    username: [
        // { required: true, message: '请输入账号!', trigger: 'blur' },
        { validator: validatePass3, trigger: 'blur' },
        { min: 3, max: 20, required: true, message: '账户长度要求在3-20之间', trigger: 'blur' }
    ],
    fullname: [
        { required: true, message: '请输入姓名!', trigger: 'blur' },
        { min: 1, max: 10, message: '姓名长度要求在1-10之间', trigger: 'blur' }
    ],
    sex: [
        { required: true, message: '请选择性别!', trigger: 'change' },
    ],
    tel: [
        { required: true, message: '请输入手机号码!', trigger: 'blur' },
        { pattern: /^1(34[0-8]|705|(3[5-9]|5[0127-9]|8[23478]|78)\d)\d{7}$/, message: '手机号码不符合规则！', trigger: 'blur' }
    ],
});

//获取router实例对象
let router = useRouter();
//保存按钮——校验
function handleSure(formEl) {
    formEl.validate(async (valid, fields) => {
        // console.log(valid);
        const { status, msg, data } = await Admin.register({ username: form.username, password: form.password, fullname: form.fullname, sex: form.sex, tel: form.tel })
        //校验成功
        console.log(status, msg, data);
        if (valid) {
            if (status) {
                // 缓存数据
                sessionStorage.id = data.id
                sessionStorage.role = data.role
                sessionStorage.token = data.token
                //注册成功
                ElMessage.success(msg);
                // 跳转页面
                router.push('/admin/list');
            }
        } else {
            //未通过校验
            // console.log('校验失败(字段)', fields);
            //注册失败
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