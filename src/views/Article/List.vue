<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>文章列表</span>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="cate_1st_name" label="一级分类" />
            <el-table-column prop="cate_2nd_name" label="二级分类" />
            <el-table-column label="主图">
                <template #default="scope">
                    <img :src="scope.row.main_photo" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" />
            <el-table-column label="标签">
                <template #default="scope">
                    <el-tag type="success" disable-transitions v-for="(item,index) in scope.row.tags" :key="index">{{
                    item.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="发布日期" />
            <el-table-column prop="update_time" label="更新日期" />
            <el-table-column prop="operation" label="操作" width="300">
                <el-row>
                    <el-button type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button type="success" plain>
                        <el-icon>
                            <Discount />
                        </el-icon>
                        标记
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
import { ref } from 'vue';
import Article from '@/api/article';

const articleList = ref([]);

//加载文章列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Article.artlist();
    if (status) {
        //获取到数据，渲染数据
        articleList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

</script>

<style lang="less" scoped>
    img {
        width: 100px;
    }
    </style>