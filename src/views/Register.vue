<template>
    <div class="bg">
        <el-card class="box-card form-card">
            <template #header>
                <div class="card-header">
                    <span>立即注册</span>
                </div>
            </template>
            <el-form :model="form" label-width="80px" :rules="rules" ref="formRef">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input show-password v-model="form.password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="password_affirm">
                    <el-input show-password v-model="form.password_affirm" />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="男" />
                        <el-radio label="女" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" />
                </el-form-item>
                <el-form-item>
                    <el-checkbox label="同意本站用户协议" name="type" v-model="form.type" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#626aef" :disabled="!form.type" v-on:click="registerfun">注册</el-button>
                </el-form-item>
                <el-row class="row-bg" justify="space-between">
                    <el-col :span="5">
                        <el-link href="/#/Login" type="success">登录账户</el-link>
                    </el-col>
                    <el-col :span="4.5">
                        <el-link type="warning">忘记密码</el-link>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import admin from '@/api/admin.js'
import { useRouter } from 'vue-router'
const form = reactive({
    username: '',
    password: '',
    password_affirm: '',
    name: '',
    sex: '男',
    phone: '',
    type: false
})
let formRef = ref()
const validatePass = (rule, value, callback) => {
    console.log(rule, value, callback)
    // 非空校验
    if (value === '') {
        callback(new Error('请输入密码'))
        return
    }
    // 有效性校验
    let isValid = /\d{3,}/.test(value)
    if (!isValid) {
        callback(new Error('密码长度至少为3位数字'))
        return
    }
    // 校验确认密码框
    if (form.password_affirm) {
        formRef.value?.validateField('password_affirm', () => null)
        callback()
    }
}

const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
        return
    }
    // 两次密码不一致
    if (value !== form.password) {
        callback(new Error('两次密码输入不一致'))
        return
    }
    // 全部通过校验
    callback()
}
// 验证用户名是否已经被注册
const validatePass3 = async (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
        return
    }
    const { status } = await admin.checkUsername({ username: form.username })
    if (!status) {
        callback(new Error('用户已被注册'))
        return
    }
    console.log('aaa')
    // 全部通过校验
    callback()
}
// 拿到小router 实例对象
const router = useRouter()
// 注册
function registerfun() {
    formRef.value.validate(async valid => {
        console.log("aaa")

        if (!valid) {
            ElMessage('请先填写您的信息')
            return
        } else {
            const { status, msg, data } = await admin.register({ username: form.username, password: form.password, fullname: form.name, sex: form.sex, tel: form.phone })
            if (status) {

                // 缓存数据
                sessionStorage.id = data.id
                sessionStorage.role = data.role
                sessionStorage.token = data.token
                // 注册成功弹窗
                ElMessage({
                    message: msg,
                    type: 'success',
                })
                // 跳转页面
                router.push('/admin')
            } else {
                // 注册失败弹窗
                ElMessage({
                    message: msg,
                    type: 'warning',
                })
            }
        }



    })
}
const rules = reactive({
    username: [

        { required: true },
        { validator: validatePass3, trigger: 'blur' }
    ],
    password: [
        { required: true },
        { validator: validatePass, trigger: 'blur' }
    ],
    password_affirm:
        [
            { required: true },
            { validator: validatePass2, trigger: 'blur' }],
    name: [
        { required: true, message: '请输入账号!', trigger: 'blur' },
        { min: 3, max: 20, message: '账户长度要求在3-20之间', trigger: 'blur' }
    ],
    sex: [{
        required: true,
        message: '请选择性别',
        trigger: 'change',
    }],
    phone: [{ required: true, message: '请输入您的手机号码!', trigger: 'blur' },
    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }]
})
</script>
<style lang='less' scoped>
.bg {
    position: relative;
    min-height: 100vh;
    background: url(../assets/img/register/bg.jpg) top center;
    background-size: cover;

    .form-card {
        position: absolute;
        top: 50%;
        right: 30px;
        width: 360px;
        transform: translateY(-50%)
    }
}
</style>
