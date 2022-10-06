<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>发布公告</span>
            </div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="置顶" prop="is_sticky">
                <el-switch v-model="form.is_sticky" width="50px" active-value="1" inactive-value="0" inline-prompt
                    active-text="置顶" inactive-text="正常" />
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <!-- <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.content"
                        :defaultConfig="editorConfig" @onCreated="handleCreated" />
                </div> -->
                <EditorModule v-model:data="data" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRelease(formRef)">发布公告</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>


<script setup>
import Notice from '@/api/notice';
// 引入 css
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive } from 'vue';
//获取vue实例对象(跳转页面)
import { useRouter } from 'vue-router';
// 引入封装的富文本编辑框
import EditorModule from '@/components/EditorModule.vue'
//获取router实例对象
let router = useRouter();
// //提取token
// let token = sessionStorage.token;
// let headers = { Authorization: `Bearer ${token}` };
// 传入到富文本编辑器的数据
//表单
const form = reactive({
    title: '',
    is_sticky: '0',
    content: '',
});
const editorConfig = {
    placeholder: '请输入内容...',
    MENU_CONF: {},
};
//上传图片
editorConfig.MENU_CONF['uploadImage'] = {
    fieldName: 'file',
    server: 'http://localhost:3001/upload/editor/',
    // 自定义增加 http  header
    headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
    },
}
const data = ref({form,editorConfig})
//表单验证：
//获取form组件实例---校验登录
const formRef = ref();
//校验表单：
const rules = reactive({
    content: [
        { required: true, message: '请输入内容！', trigger: 'blur' },
    ],
    title: [
        { required: true, message: '请输入标题!', trigger: 'blur' },
        { min: 1, max: 50, message: '标题长度要求在1-50之间！', trigger: 'blur' }
    ],
    is_sticky: [
        { required: true }
    ],
});

//发布按钮：
let handleRelease = (formEl) => {
    formEl.validate(async (valid, fields) => {
        //校验成功
        if (valid) {
            const { status, msg } = await Notice.release({ ...form });
            if (status) {
                //修改成功
                ElMessage.success(msg);
                // 跳转页面
                router.push('/notice/list');
            } else {
                ElMessage.error(msg);
            }
        } else {
            //未通过校验
            console.log('校验失败(字段)', fields);
            //注册失败
            ElMessage.error("校验未通过，发布公告失败！");
        }
    })
}

</script>
