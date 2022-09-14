<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>友情链接</div>
                <div>
                    <el-button icon="CirclePlus" type="primary" plain>添加链接</el-button>
                </div>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" width="100" />
            <el-table-column prop="title" label="链接标题" />
            <el-table-column prop="url" label="网站地址" />
            <el-table-column prop="create_time" label="添加日期" />
            <el-table-column prop="operation" label="操作">
                <el-row>
                    <el-button type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
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
import Popularize from '@/api/popularize'
let articleList = ref([])

//加载友情链接列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Popularize.list();
    console.log(data);
    if (status) {
        //获取到数据，渲染数据
        articleList.value = data;
        // console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();
</script>


<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>