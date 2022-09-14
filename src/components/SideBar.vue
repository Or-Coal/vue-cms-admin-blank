<template>
    <div class="bg">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" router>

            <el-menu-item index="1">
                <el-icon>
                    <DataAnalysis />
                </el-icon>
                <span>信息面板</span>
            </el-menu-item>

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
                <el-menu-item index="/article/list">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>文章列表</span>
                </el-menu-item>
                <el-menu-item index="/article/tag">
                    <el-icon>
                        <Discount />
                    </el-icon>
                    <span>标签管理</span>
                </el-menu-item>
                <el-menu-item index="/article/comment">
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
                <el-menu-item :route="{name:'NoticeList'}" index="4-2">
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
                <el-menu-item index="/user/list">
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
                <el-menu-item index="/promotion/slideshow">
                    <el-icon>
                        <Picture />
                    </el-icon>
                    <span>轮播图管理</span>
                </el-menu-item>
                <el-menu-item index="/promotion/link">
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
                <el-menu-item index="/system/list">
                    <el-icon>
                        <Medal />
                    </el-icon>
                    <span>管理员管理</span>
                </el-menu-item>
                <el-menu-item index="/system/edit">
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
    height: 100%;
}
</style>
