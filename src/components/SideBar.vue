<template>
    <div class="bg">
        <el-menu :collapse="menu.isCollapsed" active-text-color="#ffd04b" :defaultOpeneds="defaultOpeneds" background-color="#545c64" text-color="#fff"
            router>
            <!-- 实现每个用户侧边栏不同 -->
            <!-- <div v-for="item in menu_tree" :key="item.id">
                <el-sub-menu v-if="item.children" :index="item.id">
                    <template #title>
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="itemchildren in item.children" :index="itemchildren.path">
                        <el-icon>
                            <DocumentAdd />
                        </el-icon>
                        <span>{{itemchildren.name}}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path">
                    <el-icon>
                        <DataAnalysis />
                    </el-icon>
                    <span>{{item.name}}</span>
                </el-menu-item>
            </div> -->


            <el-menu-item index="/message/me">
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
                <el-menu-item index="/article/release">
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

            <el-menu-item index="/classify/administration">
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
                <el-menu-item index="/notice/release">
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
                <el-menu-item index="/system/menu">
                    <el-icon>
                        <SetUp />
                    </el-icon>
                    <span>菜单管理</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/account/list">
                <el-icon>
                    <Postcard />
                </el-icon>
                <span>账户设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script setup>
//     import {useMenuStore} from '@/stores/menu.js'
//     export default {
// setup(){
//     let menu = useMenuStore()
//     return {
//         menu
//     }
// }
//     }

import { useMenuStore } from '@/stores/menu.js'
import user from '@/api/user.js'
import { onMounted, ref } from 'vue'
let menu = useMenuStore()
let menu_tree = ref([])
// 默认开启的菜单
let defaultOpeneds = ([])
onMounted(async () => {
    let { status, data, msg } = await user.RoleMenu({ id: sessionStorage.id, type: 'tree' })
    if (status) {
        menu_tree.value = data
        console.log(data)
    } else {
        ElMessage.error(msg)
    }
    defaultOpeneds.valaue = ['3']
})
</script>
<style lang='less' scoped>
.bg {
    background-color: #545c64;
    min-height: calc(100vh - 60px);
    height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
