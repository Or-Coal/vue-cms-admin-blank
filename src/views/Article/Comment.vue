<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>评论列表</div>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" width="100"/>
            <el-table-column prop="title" label="文章标题" />
            <el-table-column prop="username" label="用户" />
            <el-table-column prop="content" label="留言内容" />
            <el-table-column prop="date" label="留言日期" />
            <el-table-column prop="operation" label="操作">
                <el-row>
                    <el-button type="primary" plain>
                        <el-icon>
                            <DeleteFilled />
                        </el-icon>
                        回复
                    </el-button>
                    <el-button type="danger" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                        隐藏
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
        title:"世界那么大，我先去看看!",
        username: "黄小米",
        content: "lalalala啦啦啦啦阿啦",
        date: "2011-10-10 12:32:59",
    },
    {
        id: 2,
        title:"世界那么大，我想去看看!",
        username: "黄大米",
        content: "l啊啊啊啊啊啊啊啊啊啊",
        date: "2011-10-17 12:32:59",
    },
])
</script>
