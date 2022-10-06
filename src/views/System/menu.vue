<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>菜单权限</span>
            </div>
        </template>
        <!-- 树形组件 -->
        <el-tree :data="treeDate" :props="defaultProps" default-expand-all>
            <!-- scope 解构 { node, data }  -->
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <div class="action">
                        <el-button icon="edit" @click.stop="openEditDialog(node,data)" :disabled="data.id===1"
                            type="primary" link size="small">
                            编辑</el-button>
                        <el-button icon="CirclePlus" @click.stop="openInsertDialog(node,data)" type="primary" link
                            size="small">添加</el-button>
                        <el-button icon="delete" @click.stop="handleRemove(node,data)" :disabled="data.id===1"
                            type="primary" link size="small">
                            删除</el-button>
                        <span class="text">显示序号：</span>
                        <el-button class="buttonnumber" type="primary" plain>{{data.menu_order}}</el-button>
                    </div>
                </span>
            </template>
        </el-tree>
    </el-card>

    <!-- 编辑按钮 dialog 弹窗 -->
    <el-dialog v-model="edit_dialog_visible" title="添加节点">
        <el-form ref="edit_form_ref" :rules="rules" :model="edit_form">
            <el-form-item label="分类名称" prop="name" status-icon label-width="80px">
                <el-input v-model="edit_form.name"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="edit_dialog_visible = false">取消</el-button>
                <el-button type="primary" @click="handleEdit(edit_form_ref)">添加</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加按钮 dialog 弹窗 -->
    <el-dialog v-model="insert_dialog_visible" title="添加节点">
        <el-form ref="insert_form_ref" :rules="rules" :model="insert_form">
            <el-form-item label="分类名称" prop="name" status-icon label-width="80px">
                <el-input v-model="insert_form.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="insert_dialog_visible = false">取消</el-button>
                <el-button type="primary" @click="handleAdd(insert_form_ref)">添加</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import Menu from '@/api/menu';

//树形结构数据
let treeDate = ref([]);
//指定属性对应关系
const defaultProps = {
    label: 'name',
}

onMounted(async () => {
    let { status, msg, data } = await Menu.list({ type: 'tree' });
    console.log(data);
    // console.log(data[0]);
    if (status) {
        treeDate.value = data;
        // console.log(treeDate.value);
    }
})

//表单验证规则
let rules = reactive({
    name: [
        { required: true, message: '请输入正确的分类名称！', trigger: 'blur' }
    ]
})

//存数据
let current_data = ref({});
let current_node = ref({});

//编辑按钮：
//获取Form组件实例
let edit_form_ref = ref();
//编辑   dialog状态
let edit_dialog_visible = ref(false);
//编辑   Model
let edit_form = ref({ name: '' });
//打开编辑  dialog
let openEditDialog = (node, data) => {
    //还原表单
    // console.log(data);
    edit_dialog_visible.value = true;
    edit_form.value = { ...data };
    current_data.value = data;
    current_node.value = node;
    // console.log(data);
    // console.log(node);
}
//编辑的保存按钮
let handleEdit = (formEl) => {
    formEl.validate(async (valid) => {
        if (valid) {
            let { status, msg, data } = await Menu.edit(edit_form.value.id, { ...edit_form.value });
            if (status) {
                //编辑成功
                // console.log(data);
                //更新DOM
                current_node.value.data = { ...edit_form.value };
                //关闭dialog弹窗
                edit_dialog_visible.value = false;
            } else {
                console.log("aaa");
            }
        }
    });
}

//添加按钮：
//获取Form组件实例
let insert_form_ref = ref();
//添加  dialog状态
let insert_dialog_visible = ref(false);
//添加  Model
let insert_form = reactive({ name: '' });
//打开添加  dialog
let openInsertDialog = (node, data) => {
    insert_dialog_visible.value = true;
    current_data.value = data;
    current_node.value = node;
    console.log(data);
    console.log(node);
}
//添加的保存按钮
let handleAdd = (formEl) => {
    formEl.validate(async (valid) => {
        if (valid) {
            let { status, msg, data } = await Menu.add({ ...insert_form, component: current_data.value.component, pId: current_data.value.id, path: current_data.value.path, menu_order: current_data.value.menu_order });
            if (status) {
                const newChild = { ...data, ...insert_form, childern: [] };
                if (!current_data.value.childern) {
                    current_data.value.childern = [];
                }
                current_data.value.childern.push(newChild);
                treeDate.value = [...treeDate.value];
                //关闭dialog弹窗
                insert_dialog_visible.value = false;
            }
        }
    });
}

//删除按钮：
let handleRemove = (node, data) => {
    ElMessageBox.confirm('此操作将永久删除该分类，确定删除嘛？', { type: 'warning' })
        .then(async () => {
            let { status, msg } = await Menu.remove({ id: data.id });
            if (status) {
                //删除成功，操作DOM
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex((d) => d.id === data.id);
                children.splice(index, 1);
                treeDate.value = [...treeDate.value]
                //消息提示
                ElMessage.success(msg);
            } else {
                //删除失败
                ElMessage.error(msg);
            }
        })
}


</script>


<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.text {
    padding-left: 5px;
    font-size: smaller;
}

.buttonnumber {
    height: 17px;
    font-size: 8px;
}
</style>