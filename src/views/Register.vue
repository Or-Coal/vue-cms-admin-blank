<template>
    <div class="bg">
        <el-card class="box-card form-card">
            <template #header>
                <div class="card-header">
                    <span>立即注册</span>
                </div>
            </template>
            <el-form :model="form" label-width="40px">
                <el-form-item label="账号">
                    <el-input v-model="form.name" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input show-password v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#626aef" :dark="isDark">注册</el-button>
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
import { reactive } from 'vue'
const form = reactive({
    name: '',
    password: ''
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
