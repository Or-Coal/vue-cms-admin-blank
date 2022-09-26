<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span>编辑文章</span>
            </div>
        </template>
        <el-form ref="formRef" :rules="rules" :model="form">
            <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="描述" prop="description">
                <el-input v-model="form.description" :rows="2" type="textarea" placeholder="" />
            </el-form-item>
            <el-form-item label="分类" prop="classify">
                <el-space>
                    <el-select prop="cate_1st" v-model="value" class="m-2" placeholder="Select">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                    <el-select prop="cate_2nd" v-model="value" class="m-2" placeholder="Select">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-space>
            </el-form-item>
            <el-form-item label="主图" prop="main_photo">
                <el-upload v-model="form.main_photo" action="#" list-type="picture-card" :auto-upload="false">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="form.main_photo" alt="" />
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <div style="border: 1px solid #ccc">
                    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
                    <Editor style="height: 500px; overflow-y: hidden;" v-model="form.content"
                        :defaultConfig="editorConfig" @onCreated="handleCreated" />
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleRelease(formRef)">发布文章</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>


<script setup>
import Article from '@/api/article';
// 引入 css
import '@wangeditor/editor/dist/css/style.css';
import { ref, reactive } from 'vue';
import { onBeforeUnmount, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
//获取vue实例对象(跳转页面)
import { useRouter, useRoute } from 'vue-router';
//获取router实例对象
let router = useRouter();

//还原表单
//1、获取两级分类：

//2、form对象 整个表单
let form = ref({});
//获取对象
let route = useRoute();
//解构参数
let { id } = route.params;
let loadInfo = async (id) => {
    let { status, data } = await Article.info({ id });
    if (status) {
        console.log(data);
        form.value = data;
    }
}
loadInfo(id);


//富文本编辑框:
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// //提取token
// let token = sessionStorage.token;
// let headers = { Authorization: `Bearer ${token}` };
const toolbarConfig = {};
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
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
});
// 记录 editor 实例，重要！
const handleCreated = (editor) => {
    editorRef.value = editor
};

//关联选择器
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
]

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
    description: [
        { required: true }
    ],
    // classify: [
    //     { required: true }
    // ],
    main_photo: [
        { required: true }
    ]
});

//发布按钮：
let handleRelease = (formEl) => {
    formEl.validate(async (valid, fields) => {
        //校验成功
        if (valid) {
            console.log({ ...form.value })
            const { status, msg } = await Article.edit({ ...form.value });
            if (status) {
                //修改成功
                ElMessage.success(msg);
                // 跳转页面
                router.push('/article/list');
            } else {
                ElMessage.error(msg);
            }
        } else {
            //未通过校验
            console.log('校验失败(字段)', fields);
            //注册失败
            ElMessage.error("校验未通过，保存修改失败！");
        }
    })
}

</script>
