<template>
    <el-upload class="avatar-uploader" :action="form.action" :headers="form.headers" :data="form.extra"
        :show-file-list="false" :accept="form.accept" :on-success="form.handleUploadSuccess"
        :on-error="form.handleUploadError" :before-upload="form.handlebeforeUpload">
        <img v-if="form.avatar" :src="form.avatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<script setup>
import { ref, defineProps } from 'vue'
const props = defineProps(['PictorialInformation'])
console.log(props.pictorial_information)
const form = ref({})
form.value = props.pictorial_information

</script>