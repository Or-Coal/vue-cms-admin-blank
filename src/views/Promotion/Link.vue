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
            <el-table-column prop="linkname" label="链接标题" />
            <el-table-column prop="address" label="网站地址" />
            <el-table-column prop="date" label="添加日期" />
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
import { ref } from 'vue'
const articleList = ref([
    {
        id: 1,
        linkname: "百度",
        address: 'https://www.baidu.com',
        date: "2022-06-08  12:43:35",
    },
    {
        id: 2,
        linkname: "京东",
        address: 'https://www.jingdong.com',
        date: "2022-06-08  12:43:35",
    },
])
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>