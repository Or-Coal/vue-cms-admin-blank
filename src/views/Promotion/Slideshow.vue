<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>轮播图管理</span>
            </div>
        </template>
        <el-table :data="SlideShowList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="linkname" label="链接标题" />
            <el-table-column prop="photo" label="轮播图片">
                <template #default="scope">
                    <img :src="scope.row.photo" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="address" label="跳转地址" />
            <el-table-column prop="way" label="跳转方式" />
            <el-table-column prop="number" label="排序数字">
                <template #default="scope">
                    <el-tag type="success" disable-transitions>{{scope.row.number}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="addtime" label="添加日期" />
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
<style lang="less" scoped>
img {
    width: 100px;
    height: 80px;
}
</style>
<script setup>
import { ref } from 'vue'
const SlideShowList = ref([
    {
        id: 1,
        linkname: "window之家",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        address: "https://www.baidi.com",
        way: "_blank",
        number: "1",
        addtime: '2022-03-27 00:06:04',
    },
    {
        id: 2,
        linkname: "window2之家",
        photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
        address: "https://www.lalala.com",
        way: "_white",
        number: "2",
        addtime: '2022-03-27 12:06:04',
    },
])
</script>