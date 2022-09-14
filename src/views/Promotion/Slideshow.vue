<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>轮播图管理</span>
            </div>
        </template>
        <el-table :data="SlideShowList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="title" label="链接标题" />
            <el-table-column label="轮播图片">
                <template #default="scope">
                    <img :src="scope.row.picture" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="url" label="跳转地址" />
            <el-table-column prop="target" label="跳转方式" />
            <el-table-column label="排序数字">
                <template #default="scope">
                    <el-tag type="success" disable-transitions>{{scope.row.slide_order}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="添加日期" />
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
import Popularize from '@/api/popularize';

let SlideShowList = ref([]);

//加载轮播图列表：
async function loadList() {
    let { status, msg, data } = await Popularize.pic();
    if (status) {
        console.log(data);
        //获取到数据，渲染数据
        SlideShowList.value = data;
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