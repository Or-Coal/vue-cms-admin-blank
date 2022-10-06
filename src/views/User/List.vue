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
            <el-table-column prop="operation" label="操作" width="200" #default="scope">
                <el-row>
                    <el-button type="info" plain @click="handleopen(scope.row.id,scope.row.usable)">
                        <el-icon>
                            <DeleteFilled />
                        </el-icon>
                        {{scope.row.usable?'禁用':'启用'}}
                    </el-button>
                    <el-button type="danger" plain @click="handleRemove(scope.row.id,scope.$index)">
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

//加载用户列表的函数：

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

//禁用。启用。 按钮
function handleopen(id, usable) {
    ElMessageBox.confirm(
        '此操作将禁用/启用该公告，是否继续?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再修改页面DOM文字
            //1:
            if (usable) {
                let { status, msg } = await Userlist.use({ id, usable });
                if (status) {
                    //成功
                    ElMessage.success(msg);
                    //2:赋值//更改文字： 禁用—————>启用
                    usable = 0;
                } else {
                    //操作失败
                    ElMessage.error(msg);
                };
            } else {
                let { status, msg } = await Userlist.use({ id, usable });
                if (status) {
                    //成功
                    ElMessage.success(msg);
                    //2:赋值更改文字： 启用—————>禁用
                    usable = 1;
                } else {
                    //顶置失败
                    ElMessage.error(msg);
                };
            }
        })
        .catch(() => {
            //取消按钮
            ElMessage('操作失败!');
        })
}

//删除按钮：
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '确认删除此用户嘛?',
        '确认删除',
        {
            type: 'warning',
            cancelButtonText: '取消删除',
            confirmButtonText: '确认删除'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Userlist.remove({ id });  // id: id  简化为  id
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                userList.value.splice(i, 1);
            } else {
                //删除失败
                ElMessage.error(msg);
            }
            //2:

        })
        .catch(() => {
            //取消按钮
            ElMessage('取消成功！');
        })
}

</script>
