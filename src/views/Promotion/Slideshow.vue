<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>轮播图管理</span>
            </div>
        </template>
        <el-table :data="SlideShowList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="title" label="链接标题" />
            <el-table-column label="轮播图片">
                <template #default="scope">
                    <img :src="scope.row.picture" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="url" label="跳转地址" />
            <el-table-column prop="target" label="跳转方式" />
            <el-table-column label="排序数字">
                <template #default="scope">
                    <el-tag type="success" disable-transitions>{{scope.row.slide_order}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="添加日期" />
            <el-table-column prop="operation" #default="scope" label="操作" width="200">
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
    <el-dialog v-model="dialogVisible" width="60%" title="编辑轮播图">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="链接标题" prop="title ">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="轮播图片" prop="picture">
                <el-upload list-type="picture-card" :auto-upload="false" :headers="headers">
                    <img v-if="form.picture" :src="form.picture" class="picture" />
                    <el-icon v-else>
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="跳转地址" prop="url">
                <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item label="跳转方式" prop="target">
                <el-radio-group v-model="form.target" class="ml-4">
                    <el-radio label="_blank" size="large">新窗口跳转</el-radio>
                    <el-radio label="_self" size="large">本窗口跳转</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="显示顺序" prop="slide_order">
                <el-input v-model="form.slide_order" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEdit(formRef)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Popularize from '@/api/popularize';
//获取vue实例对象(跳转页面)
import { useRouter } from 'vue-router';
//
import { useRoute } from 'vue-router';
//form对象 整个表单
let form = ref({});

let SlideShowList = ref([]);

//加载轮播图列表：
async function loadList() {
    let { status, msg, data } = await Popularize.pic();
    if (status) {
        // console.log(data);
        //获取到数据，渲染数据
        SlideShowList.value = data;
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

//删除按钮：
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '确认删除此轮播图?',
        '确认删除',
        {
            type: 'warning',
            cancelButtonText: '取消删除',
            confirmButtonText: '确认删除'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Popularize.premove({ id });  // id: id  简化为  id
            console.log(status)
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                SlideShowList.value.splice(i, 1);
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

//编辑:弹出dialog 弹窗
let dialogVisible = ref(false);
//存一下更改的标签的位置
let current = ref(0);
//点击编辑按钮，弹出dialog 弹窗
let handleOpenDialog = (data, i) => {
    //浅拷贝，还原表单
    // console.log(data);
    form.value = { ...data };
    // 记录当前行索引
    current.value = i;
    dialogVisible.value = true;
}
//轮播图
//提取token
let token = sessionStorage.token;
let headers = { Authorization: `Bearer ${token}` };
//附加参数：
let extra = { type: 'picture' };
const rules = reactive({
    title: [
        { required: true, message: '请输入链接标题!', trigger: 'blur' },
        { min: 1, max: 10, message: '标题长度要求在1-10之间', trigger: 'blur' }
    ],
    url: [
        { required: true }
    ],
    target: [
        { required: true, trigger: 'change' },
    ],
    slide_order: [
        { required: true }
    ],
    picture: [
        { required: true }
    ]
});
//获取form组件实例---保存
const formRef = ref();

//获取router实例对象
let router = useRouter();
//弹出框里的保存按钮
function handleEdit(formEl) {
    formEl.validate(async (valid, fields) => {
        console.log(valid);
        console.log({ ...form.value });
        //校验成功
        if (valid) {
            const { status, msg } = await Popularize.keep({ ...form.value });
            console.log(status, msg);
            if (status) {
                //修改成功
                ElMessage.success(msg);
                //操作DOM
                SlideShowList.value[current.value] = { ...form.value };
                //关闭弹窗
                dialogVisible.value = false;
                // 跳转页面
                router.push('/promotion/slideshow');
            } else {
                ElMessage.error(msg);
            }
        } else {
            //未通过校验
            console.log('校验失败(字段)', fields);
            //保存失败
            ElMessage.error("校验未通过，保存修改失败！");
        }
    })
}



</script>

<style lang="less" scoped>
img {
    width: 150px;
}
</style>