<template>
    <div class="bg">
        <!-- el-card是一个element plus 中封装过的组件，可以直接使用 -->
        <el-card class="form-card">
            <template #header>
                <div class="card-header">
                    <span>账户设置</span>
                </div>
            </template>
            <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="姓名" prop="fullname">
                    <el-input v-model="form.fullname" />
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
                <!-- <el-form-item label="头像" prop="avatar">
                    <el-upload class="avatar-uploader" action="http://localhost:3001/upload/common/" :headers="headers"
                        :data="extra" :show-file-list="false" accept=".png,.jpg,.jpeg" :on-success="handleUploadSuccess"
                        :on-error="handleUploadError" :before-upload="handlebeforeUpload">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item> -->
                <el-form-item>
                    <UploadPictures :PictorialInformation="PictorialInformation" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleKeep(formRef)">修改资料</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script setup>
import { reactive, ref, onMounted } from 'vue';
//注意axios函数引入位置（发送axios）（最好放上面）
import Admin from '@/api/admin';
import popularize from '@/api/popularize';
//获取vue实例对象(跳转页面)
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { storeToRefs } from 'pinia';
// 引入封装的上传图片组件
import UploadPictures from '@/components/UploadPictures.vue'
//form对象 整个表单
let form = ref({});
let id = sessionStorage.id
//初始化
let account = useAccountStore();
//浅拷贝---还原表单——此处不需要storeToRefs———失去响应性(浅拷贝：保证不点修改不动数据)
form.value = { ...account.profile };
let { profile } = storeToRefs(account)
//加载管理员个人信息
// onMounted(async()=>{
//     let { status, data } =await Admin.adminInfo({ id });
//     if (status) {
//        form.value = data
//     }
// })
//头像：
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
const handleUploadSuccess = ({ status, msg, src }, uploadFile) => {
    // console.log(status, msg, uploadFile);
    if (status) {
        //上传成功
        //生成图片地址
        form.value.avatar = src;
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
}


//获取form组件实例---校验登录
const formRef = ref();

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
    sex: [
        { required: true, message: '请选择性别!', trigger: 'change' },
    ],
    tel: [
        { required: true, message: '请输入手机号码!', trigger: 'blur' },
        { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '手机号码不符合规则！', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱号!', trigger: 'blur' },
        { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址！', trigger: 'blur' }
    ],
    avatar: [
        { required: true }
    ]
});

//获取router实例对象
let router = useRouter();
//保存按钮——校验
function handleKeep(formEl) {
    formEl.validate(async (valid, fields) => {
        //校验成功
        if (valid) {
            console.log(account)
            const { status, msg } = await popularize.adminaccount(form.value);
            // 更新pinia中保存的管理员信息
            await account.loadProfile(sessionStorage.id)
            if (status) {
                //修改成功
                ElMessage.success(msg);
                // 跳转页面
                router.push('/system/list');
            } else {
                ElMessage.error(msg);
            }
        } else {
            //未通过校验
            console.log('校验失败(字段)', fields);
            //注册失败
            ElMessage.error("校验未通过，保存修改失败！");
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