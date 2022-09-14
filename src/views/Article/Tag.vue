<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>标签列表</div>
                <div>
                    <el-button icon="CirclePlus" type="primary" plain>添加标签</el-button>
                </div>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="tagname" label="标签名称" />
            <el-table-column prop="operation" label="操作" width="200">
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
        tagname: "web前端",
    },
    {
        id: 2,
        tagname: "后端",
    },
    {
        id: 3,
        tagname: "测试",
    },
    {
        id: 4,
        tagname: "数据",
    },

])
</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>