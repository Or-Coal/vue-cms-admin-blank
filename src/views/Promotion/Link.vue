<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>友情链接</div>
                <div>
                    <el-button icon="CirclePlus" type="primary" plain>添加链接</el-button>
                </div>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" width="100" />
            <el-table-column prop="title" label="链接标题" />
            <el-table-column prop="url" label="网站地址" />
            <el-table-column prop="create_time" label="添加日期" />
            <el-table-column prop="operation" label="操作" #default="scope">
                <el-row>
                    <el-button type="primary" plain @click="handleOpenDialog(scope.row,scope.$index)">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        编辑
                    </el-button>
                    <el-button type="danger" plain @click="handleRemove(scope.row.id,scope.$index)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 编辑按钮 dialog 弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑友情链接">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="链接标题" prop="title" status-icon label-width="80px">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="链接地址" prop="url" status-icon label-width="80px">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="添加日期" prop="create_time" status-icon label-width="80px">
                <el-input v-model="form.create_time" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancle">取消</el-button>
                <el-button type="primary" @click="handleEdit(formRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Popularize from '@/api/popularize'
let articleList = ref([])

//加载友情链接列表的函数：
async function loadList() {
    let { status, msg, data, total } = await Popularize.list();
    // console.log(data);
    if (status) {
        //获取到数据，渲染数据
        articleList.value = data;
        // console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

//删除友情链接：
function handleRemove(id, i) {
    ElMessageBox.confirm(
        '此操作将永久删除该链接，是否继续?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //发送ajax，删除链接
            let { status, msg } = await Popularize.removelink(id);
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //操作DOM
                articleList.value.splice(i, 1);
            } else {
                //删除失败
                ElMessage.error(msg);
            }
        })
        .catch(() => {
            //取消按钮
            ElMessage('取消成功！');
        })
}

//编辑按钮
let form = ref({});
let dialogVisible = ref(false);
//存一下更改的标签的位置
let current = ref(0);
//（编辑按钮）点击事件---打开弹窗
let handleOpenDialog = (data, i) => {
    //浅拷贝，还原表单
    form.value = { ...data };
    // console.log({ ...data });
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
    title: [
        { required: true, message: '请输入标题!', trigger: 'blur' },
        { min: 1, message: '标签长度要求多于一个字', trigger: 'blur' }
    ],
    url: [
        { required: true, message: '请输入地址!', trigger: 'blur' },
    ],
    create_time: [
        { required: true, message: '请输入创建时间!', trigger: 'blur' },
    ],
});
let handleEdit = (formEl) => {
    //表单验证
    formEl.validate(async (valid) => {
        if (valid) {
            let { status, msg } = await Popularize.editlink(form.value.id, { ...form.value });
            // console.log(form.value.id, { ...form.value });
            if (status) {
                //操作DOM
                articleList.value[current.value] = { ...form.value };
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

</script>




<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>