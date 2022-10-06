<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="props.data.form.content" :defaultConfig="props.data.editorConfig"
            @onCreated="handleCreated" />
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted ,defineProps} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
const props = defineProps(['data'])
console.log( props.data)
//富文本编辑框:
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// //提取token
// let token = sessionStorage.token;
// let headers = { Authorization: `Bearer ${token}` };
const toolbarConfig = {};

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

</script>    
<style lang='less' scoped>

</style>
