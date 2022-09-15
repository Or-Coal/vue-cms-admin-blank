<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>管理员列表</span>
            </div>
        </template>
        <el-table :data="arrlist" style="width: 100%">
            <el-table-column prop="id" label="#" width="50" />
            <el-table-column prop="username" label="用户名" width="80" />
            <el-table-column prop="fullname" label="姓名" width="100" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="tel" label="手机" width="120" />
            <el-table-column prop="email" label="邮箱" width="150" />
            <el-table-column prop="avatar" label="头像" width="70">
                <template #default="scope">
                    <el-avatar :src="scope.row.avatar" />
                </template>
            </el-table-column>
            <el-table-column prop="person" label="角色" width="130">
                <template #default="scope">
                    <el-tag type="success" disable-transitions>
                        {{scope.row.role_name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template #default="scope">
                    <el-row>
                       <el-link :href="`/#/system/listedit/${scope.row.id}`">
                        <el-button size="small" type="primary" plain>
                            <el-icon>
                                <EditPen />
                            </el-icon>
                            编辑
                        </el-button>
                       </el-link>
                        <el-button size="small" type="danger" plain @click="handleRemove({id:scope.row.id},scope.row.$index)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import admin from '@/api/admin'
const arrlist = ref([])
async function loadList() {
    let { status, msg, data, total } = await admin.adminList()
    console.log(status, msg, data, total)
    arrlist.value = data

}
// loadList()
onMounted(() => {
    loadList()
})
function handleRemove(id,i) {
    ElMessageBox.confirm('确认删除吗', '删除', {
        type: 'error', confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(async() => {
     let {status} =    await admin.listRemove(id)
     if(status){
        // 操作DOM
        arrlist.value.splice(i,1)
        // 删除成功
        ElMessage({
            type: 'success',
            message: '删除成功',
        })
     }else{
        ElMessage({
            type: 'error',
            message: '删除失败',
        })
     }
       
    })
        .catch(() => {
        })
}
// const arrlist = ref([
//     {
//         id: 1,
//         username: "admin",
//         name: "黄小米",
//         sex: "女",
//         tel: "18495029384",
//         mail: "m123456@126.com",
//         photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
//         person: "超级管理员",
//     },
//     {
//         id: 2,
//         username: "moz",
//         name: "孙红雷",
//         sex: "男",
//         tel: "19873620127",
//         mail: "r123456@126.com",
//         photo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
//         person: "管理员",
//     },
//     {
//         id: 3,
//         username: "sikly",
//         name: "鹿晗",
//         sex: "男",
//         tel: "18370163829",
//         mail: "n123456@126.com",
//         photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
//         person: "管理员",
//     },
//     {
//         id: 4,
//         username: "orz",
//         name: "黄渤",
//         sex: "男",
//         tel: "19872630135",
//         mail: "p123456@126.com",
//         photo: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
//         person: "超级管理员",
//     },
// ]);
</script>