<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>用户列表</div>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="name" label="昵称" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="tel" label="手机" />
            <el-table-column prop="operation" label="操作" width="200">
                <el-row>
                    <el-button type="info" plain>
                        <el-icon>
                            <DeleteFilled />
                        </el-icon>
                        禁用
                    </el-button>
                    <el-button type="danger" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref } from 'vue'
const articleList = ref([
    {
        id: 1,
        username: "小米",
        name: "黄小米",
        sex: "女",
        tel: "15879302869",
    },
    {
        id: 2,
        username: "李四",
        name: "黄渤",
        sex: "男",
        tel: "15879946869",
    },
])
</script>
