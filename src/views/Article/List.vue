<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>文章列表</span>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" width="50" />
            <el-table-column prop="classify_one" label="一级分类" width="80" />
            <el-table-column prop="classify_two" label="二级分类" width="100" />
            <el-table-column prop="photo" label="主图" width="130"> <template #default="scope">
                    <img :src="scope.row.photo" alt="">
                </template></el-table-column>
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="tag" label="标签" width="130"><template #default="scope">
                    <el-tag type="success" disable-transitions v-for="(item,index) in scope.row.tag" :key="index">{{
                    item }}
                    </el-tag>
                </template></el-table-column>
            <el-table-column prop="issue_time" label="发布日期" width="100" />
            <el-table-column prop="update_time" label="更新日期" width="100" />
            <el-table-column prop="operation" label="操作">
                <el-row>
                    <el-button size="small" type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button size="small" type="success" plain>
                        <el-icon>
                            <Discount />
                        </el-icon>
                        标记
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
<style lang="less" scoped>
img {
    width: 100px;
    height: 80px;
}
</style>
<script setup>
import { ref } from 'vue'
const articleList = ref([{
    id: 1, classify_one: "科技", classify_two: "人工智能", photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-03-27 00:06:04'
}, {
    id: 1, classify_one: "娱乐", classify_two: "人工智能", photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-03-28 00:06:04'
},
{
    id: 1, classify_one: "科技", classify_two: "人工智能", photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-03-29 00:06:04'
},
{
    id: 1, classify_one: "娱乐", classify_two: "人工智能", photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-03-30 00:06:04'
},
{
    id: 1, classify_one: "信息", classify_two: "人工智能", photo: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile02.16sucai.com%2Fd%2Ffile%2F2014%2F0729%2Fdb3d552a2af85765b98fc79a6db222b0.jpg&refer=http%3A%2F%2Ffile02.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1665582275&t=30b6c626af31e279b139d93b6e32743d',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-04-17 00:06:04'
},
{
    id: 1, classify_one: "技术", classify_two: "人工智能", photo: 'https://img2.baidu.com/it/u=3735799021,1953155234&fm=253&fmt=auto&app=138&f=JPEG?w=485&h=730',
    title: '超大的字号、艳俗的色彩、他的设计风格怎么这么秀', issue_time: '2022-03-27 00:06:04', update_time: '2022-10-1 00:06:04', tag: ['web前端', '后台编程']
}])
</script>