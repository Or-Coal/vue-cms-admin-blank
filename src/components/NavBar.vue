<template>
    <div class="nav-bar">
        <div class="left">
            <img src="../assets/img/common/logo.png" class="logo" alt="logo">
            <el-icon :size="20">
                <Expand />
            </el-icon>
        </div>
        <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
            :ellipsis="false">
            <el-menu-item index="1">站点设置</el-menu-item>
            <el-menu-item index="2">预览网站</el-menu-item>
            <el-sub-menu index="3">
                <template #title>黄小米</template>
                <el-menu-item index="2-1">消息通知</el-menu-item>
                <el-menu-item index="2-2">账号设置</el-menu-item>
                <el-menu-item index="2-3">退出登录</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>更多</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
        </el-menu>
    </div>

</template>
<style lang="less" scoped>
.nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
    color: white;

    .left {
        display: flex;
        align-items: center;

        .logo {
            height: 58px;
        }
    }

    .el-menu {
        border-bottom: 0;
    }
}

</style>
<script lang="ts" setup>
</script>
  