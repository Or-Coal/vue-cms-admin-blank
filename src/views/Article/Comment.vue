<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <div>评论列表</div>
            </div>
        </template>
        <el-table :data="commentList" style="width: 100%">
            <el-table-column prop="id" label="#" width="100" />
            <el-table-column prop="article_title" label="文章标题" />
            <el-table-column prop="user_nickname" label="用户" />
            <el-table-column prop="content" label="评论内容" />
            <el-table-column prop="create_time" label="评论日期" />
            <el-table-column prop="reply" label="回复" />
            <el-table-column prop="operation" label="操作" #default="scope">
                <el-row>
                    <el-button type="primary" plain @click="Reply(scope.row.id)">
                        <el-icon>
                            <DeleteFilled />
                        </el-icon>
                        回复
                    </el-button>
                    <el-button type="danger" plain>
                        <el-icon>
                            <Delete />
                        </el-icon>
                        隐藏
                    </el-button>
                </el-row>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 回复弹窗 -->
    <el-dialog v-model="dialogVisible" title="回复评论">
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="评论内容" status-icon label-width="80px">
                <el-input v-model="form.content" :disabled="true" />
            </el-form-item>
            <el-form-item label="回复内容" prop="reply" status-icon label-width="80px">
                <el-input v-model="form.reply" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancle">取消</el-button>
                <el-button type="primary" @click="handleReply(formRef)">回复</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import Article from '@/api/article';
import Comment from '@/api/comment';

const commentList = ref([]);
//加载评论列表的函数：
async function loadList() {
    let { status, msg, data, total } = await Article.commentlist();
    if (status) {
        //获取到数据，渲染数据
        commentList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
//方法一：setup（推荐）
loadList();

//建一个弹窗表单，并校验规则
let form = ref({ reply: '' });
const rules = ref({
    reply: [
        { required: true, message: '请输入回复内容！', trigger: 'blur' },
    ],
})
//点击回复按钮：还原弹窗内容
//留存id，回复按钮发送axios时使用
let currentid = ref([]);
let dialogVisible = ref(false);
async function Reply(id) {
    console.log(id);
    currentid.value = id;
    let { status, msg, data } = await Comment.comment({ id });
    // console.log(status);
    // console.log(msg);
    // console.log(data);
    form.value = data;
    console.log(form.value);
    dialogVisible.value = true;
}
//弹窗中的取消按钮：
function handleCancle() {
    dialogVisible.value = false;
}
//弹窗中 确定回复内容的按钮
let formRef = ref([]);
let handleReply = (formEl) => {
    formEl.validate(async (valid, fields) => {
        //校验成功
        if (valid) {
            let { status, msg, data } = await Comment.reply({ ...form.value });
            console.log(form.value);
            if (status) {
                //修改成功--修改内容--关闭弹窗
                ElMessage.success(msg);
                form.value[currentid.value] = { ...form.value };
                dialogVisible.value = false;
            } else {
                ElMessage.error(msg);
                dialogVisible.value = false;
            }
        } else {
            //未通过校验
            console.log('校验失败(字段)', fields);
            //注册失败
            ElMessage.error("校验未通过，回复失败！");
        }
    })
}

</script>
