<template>
    <div class="content">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>管理员角色</span>
                    <el-button @click="handleOpen('添加角色')" icon="Plus" type="primary">添加角色</el-button>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="#" width="" />
                <el-table-column prop="name" label="分类" />

                <el-table-column fixed="right" label="操作" width="270">
                    <template #default="scope">
                        <el-space>
                            <el-button @click="handleOpen('编辑角色', scope.row, scope.$index)" icon="EditPen"
                                type="primary">编辑</el-button>

                            <el-button icon="Delete" type="danger" @click.stop="handleRemove(scope.row.id, scope.$index)">
                                删除
                            </el-button>
                            <el-button icon="Setting" type="success" @click.stop="handleMenu(scope.row.id, scope.$index)">
                                权限
                            </el-button>
                        </el-space>


                    </template>
                </el-table-column>
            </el-table>

        </el-card>
        <!-- 编辑/添加 -->
        <el-dialog v-model="dialogVisible" :title='titleName'>
            <el-form ref="formRef" :model="titleData" :rules="rules" status-icon label-width="80px">
                <el-form-item label="标签名称" prop="name">
                    <el-input v-model="titleData.name" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(formRef)">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <!-- 弹出侧边栏菜单 -->
    <!-- :style="{'visibility':isvisibility}" -->
    <el-dialog v-model="menuside" title="设置角色菜单" class="menuside" :modal="false" append-to-body>
        <el-tree ref="treeRef" :data="data" show-checkbox node-key="id" :default-expanded-keys="unfoldarr"
            :default-checked-keys="checkedarr" :props="defaultProps" />
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="menuside = false">取消</el-button>
                <el-button type="primary" @click="savemenu">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup>
import { ref, onMounted, reactive,watch} from 'vue';
import Roles from "@/api/roles";
import Admin from '@/api/admin';
import Menu from '@/api/menu';


let tableData = ref([])
onMounted(async () => {
    let { status, msg, total, data } = await Roles.list();
    if (status) {
        tableData.value = data
    }
})

let dialogVisible = ref(false)
let titleName = ref()
let titleData = ref({ name: '' })
let current = ref(0);

let handleOpen = (title, data, i) => {
    titleName.value = title
    // if (title == '编辑角色') {
    titleData.value = { ...data };
    // }
    dialogVisible.value = true
}
//添加角色
//添加表单验证
const validateName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入角色名'));
        return;
    }
    if (!(value.length >= 1 && value.length <= 30)) {
        callback(new Error('角色长度要求1-30个字符之间3个字符'));
        return;
    }
    if (titleName.value == '添加角色') {

        tableData.value.forEach((item) => {
            if (value === item.name) {
                callback(new Error('已经存在此角色'));
                return;
            }
        })
    }

    callback();
}
const rules = reactive({
    name: [{ validator: validateName, required: true, trigger: 'blur' },],
});
// 弹窗确定
let formRef = ref()
let handleSubmit = (formEl) => {
    formEl.validate(async (valid) => {
        if (valid) {
            if (titleName.value == '编辑标签') {
                let { status, msg } = await Roles.edit(titleData.value.id, { ...titleData.value });
                if (status) {
                    //修改成功，操作DMO
                    //current.value索引值
                    tableData.value[current.value] = { ...titleData.value }
                    //关闭
                    dialogVisible.value = false;
                    //提示
                    ElMessage.success(msg)

                } else {
                    //提示错误
                    ElMessage.error(msg)
                }
                return
            }
            let { status, msg, data } = await Roles.create({ name: titleData.value.name });
            if (status) {
                //添加
                // loadList();
                dialogVisible.value = false;
                tableData.value.push({ id: data.id, name: titleData.value.name })
                // titleData.value = ''
                ElMessage.success(msg)
            } else {
                //提示错误
                ElMessage.error(msg)
            }
        }
    })
}
// 删除
let handleRemove = (id, i) => {
    ElMessageBox.confirm('确认删除此角色吗？', '确认',
        {
            type: 'error',
            cancelButtonText: '取消',
            confirmButtonText: '删除'
        })
        .then(async () => {
            //确定
            let { status, msg } = await Roles.remove(id, { id });
            if (status) {
                //操作DMO
                tableData.value.splice(i, 1);
                //提示
                ElMessage.success(msg);
            } else {
                //提示
                ElMessage.error(msg)
            }
        })
        .catch(() => {
            //取消
            ElMessage('取消成功')
        })

}
//设置按钮——————tree树
const defaultProps = {
    children: 'children',
    label: 'name',
}
// 弹出框状态
let menuside = ref(false)
// 存储角色菜单
let data = ref([])
// 默认展开的数组
let unfoldarr = ref([])
// 默认选中的数组
let checkedarr = ref([])
let isId = ref(0)
watch(isId, async (news, old) => {
    checkedarr.value = []
    let arr = []
    let { data: datame, } = await Admin.RoleMenu({ id: news, type: "flat" });
    for (let i = 0; i < datame.length; i++) {
        let ischeck = false
        for (let j = 0; j < datame.length; j++) {
            if (datame[i].id === datame[j].pId) {
                ischeck = true
            }
        }
        if (!ischeck) {
            arr.push(datame[i].id)
        }
    }
    checkedarr.value = arr

})


// 拿到tree对象
const treeRef = ref()

// 设置的点击事件
let handleMenu = async (id, index) => {

    isId.value = id
    // loadMenuList()
    // let { data: datas, } = await Admin.RoleMenu({ id, type: "tree" });
      let { data:datatal } = await Menu.list({ type: 'tree' })
data.value = datatal
    // data.value = [{ id: 1, name: '全部菜单', children: datas }]
    let { data: dataunfold, } = await Admin.RoleMenu({ id, type: "flat" });
    dataunfold.forEach((item) => {
        unfoldarr.value.push(item.id)
    })
console.log(data.value)
    // isvisibility.value = 'visible'
    menuside.value = !menuside.value
}
let savemenu = async () => {
    menuside.value = false
    // 获取当前选中的node节点（包含半选中父级节点）
    let checked_nodes = treeRef.value.getCheckedNodes(false, true);
    // 转化为id数组
    let checked_keys = checked_nodes.map((menu) => menu.id);
    // console.log(treeRef)
    let {status,msg}=await Admin.GroleMenu({id:isId.value,menus:checked_keys})


    if(status){
        ElMessage.success(msg);
         isId.value= 0
    }else{
        ElMessage.error(msg);
    }
}
</script>
<style lang="less" scoped>
.menuside {
    position: fixed;
    right: 0;
    height: 100%;
    width: 300px;
    margin: 0;
    padding: 0;

}</style>