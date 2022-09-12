<template>
    <div class="bg">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <Clock />
                </el-icon>
                <span>信息面板</span>
            </template>
        </el-sub-menu>

        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <Document />
                </el-icon>
                <span>文章管理</span>
            </template>
            <el-menu-item index="2-1">
                <el-icon>
                    <DocumentAdd />
                </el-icon>
                <span>发布文章</span>
            </el-menu-item>
            <el-menu-item index="2-2">
                <el-icon>
                    <Memo />
                </el-icon>
                <span>文章列表</span>
            </el-menu-item>
            <el-menu-item index="2-3">
                <el-icon>
                    <Discount />
                </el-icon>
                <span>标签管理</span>
            </el-menu-item>
            <el-menu-item index="2-3">
                <el-icon>
                    <ChatLineSquare />
                </el-icon>
                <span>评论管理</span>
            </el-menu-item>
        </el-sub-menu>

        <el-menu-item index="3">
            <el-icon>
                <DataAnalysis />
            </el-icon>
            <span>分类管理</span>
        </el-menu-item>

        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <DataBoard />
                </el-icon>
                <span>公告管理</span>
            </template>
            <el-menu-item index="4-1">
                <el-icon>
                    <Calendar />
                </el-icon>
                <span>发布公告</span>
            </el-menu-item>
            <el-menu-item index="4-2">
                <el-icon>
                    <DataAnalysis />
                </el-icon>
                <span>公告列表</span>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="5">
            <template #title>
                <el-icon>
                    <OfficeBuilding />
                </el-icon>
                <span>用户管理</span>
            </template>
            <el-menu-item index="5-1">
                <el-icon>
                    <User />
                </el-icon>
                <span>用户列表</span>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="6">
            <template #title>
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>推广管理</span>
            </template>
            <el-menu-item index="6-1">
                <el-icon>
                    <Picture />
                </el-icon>
                <span>轮播图管理</span>
            </el-menu-item>
            <el-menu-item index="6-2">
                <el-icon>
                    <Link />
                </el-icon>
                <span>友情链接</span>
            </el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="7">
            <template #title>
                <el-icon>
                    <setting />
                </el-icon>
                <span>系统管理</span>
            </template>
            <el-menu-item index="7-1">
                <el-icon>
                    <Medal />
                </el-icon>
                <span>管理员管理</span>
            </el-menu-item>
            <el-menu-item index="7-2">
                <el-icon>
                    <TurnOff />
                </el-icon>
                <span>权限角色</span>
            </el-menu-item>
            <el-menu-item index="7-3">
                <el-icon>
                    <SetUp />
                </el-icon>
                <span>菜单管理</span>
            </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="8">
            <el-icon>
                <Postcard />
            </el-icon>
            <span>账户设置</span>
        </el-menu-item>
    </el-menu>
    </div>
</template>
<script>
</script>
<style lang='less' scoped>
.bg {
    background-color: #545c64;
    min-height: calc(100vh - 60px);
}
</style>
