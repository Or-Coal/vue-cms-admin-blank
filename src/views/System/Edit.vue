<template>
    <el-card style="width: 65%">
        <template #header>
            <div class="card-header">
                <div>管理员角色</div>
                <div>
                    <el-button type="primary" plain>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        添加角色
                    </el-button>
                </div>
            </div>
        </template>
        <el-table :data="personlist" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column label="角色">
                <template #default="scope">
                    <el-tag disable-transitions>
                        {{scope.row.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="300">
                <el-row>
                    <el-button type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                    </el-button>
                    <el-button type="danger" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button icon="Setting" type="primary" plain>
                        <!-- <el-icon>
                            <Setting />
                        </el-icon> -->
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import Admin from '@/api/admin';
let personlist = ref([]);

//加载管理员列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Admin.plist();
    if (status) {
        //获取到数据，渲染数据
        personlist.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();
</script>



<style>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>