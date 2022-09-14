<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公告列表</span>
            </div>
        </template>
        <el-table :data="noticeList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="title" label="标题" />
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
                            <Top />
                        </el-icon>
                        顶置
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
import Notice from '@/api/notice';

let noticeList = ref([]);

//加载管理员列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Notice.noticelist();
    if (status) {
        //获取到数据，渲染数据
        noticeList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

</script>