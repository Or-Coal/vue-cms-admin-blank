<template>
    <div class="bg">
        <el-card class="box-card form-card">
            <template #header>
                <div class="card-header">
                    <span>登录</span>
                </div>
            </template>
            <el-form :model="form" :rules="rules" label-width="40px" ref="formRef">
                <el-form-item label="账号" prop="username" label-width="50px">
                    <el-input v-model="form.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="50px">
                    <el-input show-password v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#626aef" :dark="isDark" v-on:click="handleSubmit(formRef)">登录</el-button>
                </el-form-item>
                <el-row class="row-bg" justify="space-between">
                    <el-col :span="5">
                        <el-link href="/#/Register" type="success">注册账号</el-link>
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
import {login} from '@/api/admin.js'
import { useRouter } from 'vue-router'
const form = reactive({
    username: '',
    password: ''
})
// 获取form组件实例
let formRef = ref()
const rules = reactive({
    username: [
        { required: true, message: '请输入账号!', trigger: 'blur' },
        { min: 3, max: 20, message: '账户长度要求在3-20之间', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码!', trigger: 'blur' },
        { pattern: /\d{3,}/, message: '密码长度要求至少3位数字', trigger: 'blur' }
    ],

})
// 拿到小router 实例对象
const router = useRouter()
// 登录
function handleSubmit(formEl) {
    formEl.validate(async valid => {
        if (valid) {
            let { status, msg,data } = await login({ ...form })
            if (status) {
                // 缓存数据
                sessionStorage.id = data.id
                sessionStorage.role = data.role
                sessionStorage.token = data.token
                // 登录成功弹窗
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                // 跳转页面
                router.push('/admin')
            } else {
                // 登陆失败弹窗
                ElMessage({
                    message: msg,
                    type: 'warning',
                })
            }
        }
    })
}
</script>

<style lang='less' scoped>
.bg {
    position: relative;
    min-height: 100vh;
    background: url(../assets/img/login/bg.jpg) top center;
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
