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
        <el-table :data="tagList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="name" label="标签名称" />
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
import { ref } from 'vue';
import Article from '@/api/article';


const tagList = ref([]);

//加载管理员列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Article.taglist();
    if (status) {
        //获取到数据，渲染数据
        tagList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}

//方法一：setup（推荐）
loadList();

</script>


<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>