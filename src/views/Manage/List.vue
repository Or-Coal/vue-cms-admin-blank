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
            <el-table-column prop="name" label="姓名" width="100" />
            <el-table-column prop="sex" label="性别" width="60" />
            <el-table-column prop="tel" label="手机" width="120" />
            <el-table-column prop="mail" label="邮箱" width="150" />
            <el-table-column prop="photo" label="头像" width="70">
                <template #default="scope">
                    <img width="40" :src="scope.row.photo" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="person" label="角色" width="130">
                <template #default="scope">
                    <el-tag type="success" disable-transitions>
                        {{scope.row.person }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <el-row>
                    <el-button size="small" type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" plain>
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
const arrlist = ref([
    {
        id: 1,
        username: "admin",
        name: "黄小米",
        sex: "女",
        tel: "18495029384",
        mail: "m123456@126.com",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        person: "超级管理员",
    },
    {
        id: 2,
        username: "moz",
        name: "孙红雷",
        sex: "男",
        tel: "19873620127",
        mail: "r123456@126.com",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        person: "管理员",
    },
    {
        id: 3,
        username: "sikly",
        name: "鹿晗",
        sex: "男",
        tel: "18370163829",
        mail: "n123456@126.com",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        person: "管理员",
    },
    {
        id: 4,
        username: "orz",
        name: "黄渤",
        sex: "男",
        tel: "19872630135",
        mail: "p123456@126.com",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        person: "超级管理员",
    },
]);
</script>