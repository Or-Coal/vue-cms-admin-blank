<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>用户列表</div>
            </div>
        </template>
        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="username" label="用户名" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="tel" label="手机" />
            <el-table-column prop="operation" label="操作" width="200">
                <el-row>
                    <el-button type="info" plain>
                        <el-icon>
                            <DeleteFilled />
                        </el-icon>
                        禁用
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
import Userlist from '@/api/user';

let userList = ref([]);

//加载管理员列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Userlist.userlist();
    if (status) {
        //获取到数据，渲染数据
        userList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

</script>
