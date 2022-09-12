<template>
    <el-container>
        <el-header>
            <NavBar />
        </el-header>
        <el-container>
            <el-aside width="200px">
                <SideBar />
            </el-aside>
            <el-main>
                <RouterView />
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script setup>
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
</script>
<style lang='less' scoped>
.el-header {
     padding: 0;
     height: 58px;
 }
</style>
