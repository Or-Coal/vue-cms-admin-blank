<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>评论列表</div>
            </div>
        </template>
        <el-table :data="commentList" style="width: 100%">
            <el-table-column prop="id" label="#" width="100" />
            <el-table-column prop="article_title" label="文章标题" />
            <el-table-column prop="user_nickname" label="用户" />
            <el-table-column prop="content" label="留言内容" />
            <el-table-column prop="create_time" label="留言日期" />
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
import { ref } from 'vue';
import Article from '@/api/article';

const commentList = ref([]);

//加载评论列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Article.commentlist();
    if (status) {
        //获取到数据，渲染数据
        commentList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}

//方法一：setup（推荐）
loadList();

</script>
