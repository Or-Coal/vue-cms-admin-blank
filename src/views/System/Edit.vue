<template>
    <el-card style="width: 65%">
        <template #header>
            <div class="card-header">
                <div>管理员角色</div>
                <div>
                    <el-button type="primary" plain>
                        <el-icon m-3>
                            <CirclePlus />
                        </el-icon>
                        添加角色
                    </el-button>
                </div>
            </div>
        </template>
        <el-table :data="personlist" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column label="角色">
                <template #default="scope">
                    <el-tag disable-transitions>
                        {{scope.row.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="300" #default="scope">
                <el-row>
                    <el-button type="primary" plain @click="handleOpenDialog(scope.row,scope.$index)"
                        :disabled="scope.row.id===1">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                    </el-button>
                    <el-button type="danger" plain @click="handleRemove(scope.row.id,scope.$index)"
                        :disabled="scope.row.id===1">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </el-button>
                    <el-button icon="Setting" type="primary" plain @click="handleMenu(scope.row.id,scope.$index)">
                        <!-- <el-icon>
                            <Setting />
                        </el-icon> -->
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 编辑按钮 dialog 弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑角色">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="链接标题" prop="name" status-icon label-width="80px">
                <el-input v-model="form.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancle">取消</el-button>
                <el-button type="primary" @click="handleEdit(formRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
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
import { ref, reactive, onMounted, watch } from 'vue';
import Admin from '@/api/admin';
let personlist = ref([]);
//加载管理员角色列表的函数：

async function loadList() {
    let { status, msg, data, total } = await Admin.plist();
    console.log(data)
    if (status) {
        //获取到数据，渲染数据
        personlist.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();
// 为角色配置菜单
onMounted(async () => {

})

//编辑按钮
let form = ref({});
let dialogVisible = ref(false);
//存一下更改的标签的位置
let current = ref(0);
//（编辑按钮）点击事件---打开弹窗
let handleOpenDialog = (data, i) => {
    //浅拷贝，还原表单
    form.value = { ...data };
    console.log({ ...data });
    // 记录当前行索引
    current.value = i;
    dialogVisible.value = true;
}
//点击 编辑框中 取消标签按钮
function handleCancle() {
    dialogVisible.value = false;
}
//点击保存，验证表单，关闭弹窗
//获取form组件实例---校验登录
let formRef = ref();
//表单验证：
const rules = reactive({
    name: [
        { required: true, message: '请输入名称!', trigger: 'blur' },
    ],
});
let handleEdit = (formEl) => {
    //表单验证
    formEl.validate(async (valid) => {
        if (valid) {
            let { status, msg } = await Admin.pedit(form.value.id, { ...form.value });
            // console.log(form.value.id, { ...form.value });
            if (status) {
                //操作DOM
                personlist.value[current.value] = { ...form.value };
                //关闭窗口
                dialogVisible.value = false;
                // 提示成功
                ElMessage.success(msg);
            } else {
                // 提示错误
                ElMessage.error(msg);
            }
        }
    })
}

//删除按钮
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '确认删除此文章嘛?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    ).then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Admin.premove(id, { ...form.value });  // id: id  简化为  id
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                personlist.value.splice(i, 1);
            } else {
                ElMessage.error("删除失败！");
            }
        })
        // .catch(() => {
        //     //删除失败
        //     ElMessage.error("取消删除");
        // })
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

// 
let isvisibility = ref('hidden')
// 拿到tree对象
const treeRef = ref()

// 设置的点击事件
let handleMenu = async (id, index) => {

    isId.value = id
    let { data: datas, } = await Admin.RoleMenu({ id: 1, type: "tree" });
    data.value = [{ id: 1, name: '全部菜单', children: datas }]
    let { data: dataunfold, } = await Admin.RoleMenu({ id: 1, type: "flat" });
    dataunfold.forEach((item) => {
        unfoldarr.value.push(item.id)
    })

    // isvisibility.value = 'visible'
    menuside.value = !menuside.value
}
let savemenu = async()=>{
    menuside.value = false
    console.log(treeRef.value.getCheckedKeys(true))
let {status,msg}=await Admin.GroleMenu({id:isId.value,menus:treeRef.value.getCheckedKeys(true)})
if(status){
    ElMessage.success(msg);
     isId.value= 0
}else{
    ElMessage.error(msg);
}
}
</script>



<style>
.card-header {
    display: flex;
    justify-content: space-between;
}

.menuside {
    position: fixed;
    right: 0;
    height: 100%;
    width: 300px;
    margin: 0;
    padding: 0;

}
</style>