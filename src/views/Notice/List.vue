<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公告列表</span>
            </div>
        </template>
        <el-table :data="NoticeData" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="date" label="发布日期" />
            <el-table-column prop="update" label="更新日期" />
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
const NoticeData = [
    {
        id: 1,
        title: '登黄鹤楼',
        date: '2016-05-03',
        update: '2018-04-17',
    },
    {
        id: 2,
        title: '岳阳楼记',
        date: '2016-05-02',
        update: '2019-06-08',
    },
]
</script>