<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>标签列表</div>
                <div>
                    <el-button icon="CirclePlus" type="primary" plain>添加标签</el-button>
                </div>
            </div>
        </template>
        <el-table :data="tagList" :model="form" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="name" label="标签名称" />
            <el-table-column prop="operation" label="操作" width="200" #default="scope">
                <el-row>
                    <el-button @click="handleOpenDialog(scope.row,scope.$index)" type="primary" plain>
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
    <el-dialog v-model="dialogVisible" title="编辑标签">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="标签名称" prop="name" status-icon label-width="80px">
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Article from '@/api/article';
//列表
let tagList = ref([]);

//加载标签列表的函数：-------------------------------------------
//方法一：setup（推荐）
// async function loadList() {
//     let { status, msg, data, total } = await Article.taglist();
//     if (status) {
//         //获取到数据，渲染数据
//         tagList.value = data;
//         console.log(data);
//     } else {
//         //获取失败
//         ElMessage.error(msg);
//     }
// }
// loadList();
//方法三：onMounted（没有参数的话，就使用onMounted方法）【有参数---watchEffect】
onMounted(async () => {
    let { status, msg, data, total } = await Article.taglist();
    if (status) {
        //获取到数据，渲染数据       
        tagList.value = data;
        // console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
})

//编辑按钮：-----------------------------------------------------
let form = ref({ name: '' });
// <!-- 编辑dialog 弹窗 -->
//存一下更改的标签的位置
let current = ref(0);
let dialogVisible = ref(false);
//（编辑按钮）点击事件---打开弹窗
let handleOpenDialog = (data, i) => {
    //浅拷贝，还原表单
    form.value = { ...data };
    // console.log({ ...data });
    // 记录当前行索引
    current.value = i;
    dialogVisible.value = true;
}
//点击 编辑框中 保存标签按钮
//获取form组件实例---校验登录
let formRef = ref();
//表单验证：
const rules = reactive({
    name: [
        { required: true, message: '请输入标签!', trigger: 'blur' },
        { min: 1, message: '标签长度要求多于一个字', trigger: 'blur' }
    ],
});
let handleEdit = (formEl) => {
    //表单验证
    formEl.validate(async (valid) => {
        if (valid) {
            let { status, msg } = await Article.edittag(form.value.id, { ...form.value });
            if (status) {
                //操作DOM
                tagList.value[current.value] = { ...form.value };
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
//点击 编辑框中 取消标签按钮
function handleCancle() {
    dialogVisible.value = false;
}

//删除按钮：----------------------------------------------------
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '此操作将永久删除该标签，是否继续?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Article.removetag(id, { ...form.value });  // id: id  简化为  id
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                tagList.value.splice(i, 1);
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

</script>


<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
}
</style>