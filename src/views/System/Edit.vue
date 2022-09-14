<template>
    <el-card style="width: 60%">
        <template #header>
            <div class="card-header">
                <div>管理员角色</div>
                <div>
                    <el-button size="small" type="primary" plain>
                        <el-icon>
                            <Setting />
                        </el-icon>
                        添加角色
                    </el-button>
                </div>
            </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="#" width="180" />
            <el-table-column prop="classify" label="角色" width="150">
                <template #default="scope">
                    <el-tag disable-transitions>
                        {{scope.row.classify }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="240">
                <el-row>
                    <el-button size="small" type="primary" plain>
                        <el-icon>
                            <EditPen />
                        </el-icon>
                    </el-button>
                    <el-button size="small" type="danger" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button size="small" type="primary" plain>
                        <el-icon>
                            <Setting />
                        </el-icon>
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup>
const tableData = [
    {
        id: 1,
        classify: "超级管理员",
    },
    {
        id: 2,
        classify: '管理员',
    },
    {
        id: 3,
        classify: '副管理',
    },
    {
        id: 4,
        classify: '董事',
    },
]
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>