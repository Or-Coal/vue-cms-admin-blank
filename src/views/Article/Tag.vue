<template>
	<el-card class="box-card">
		<template #header>
			<div class="header">
				<span>标签列表</span>
				<el-button plain type="primary" icon="circle-plus">
					添加标签
				</el-button>
			</div>
		</template>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="name" label="标签名称">
			</el-table-column>
			<el-table-column label="操作" width="210">
				<template #default="scope">
					<el-button @click="handleOpenDialog(scope.row,scope.$index)" icon="edit" type="primary" plain>
						编辑
					</el-button>
					<el-button icon="delete" type="danger" plain>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
	<!-- 编辑dialog -->
	<el-dialog v-model="dialogVisible" title="编辑标签">
		<el-form ref="formRef" :rules="rules" :model="form" status-icon label-width="80px">
			<el-form-item label="标签名称" prop="name">
				<el-input v-model="form.name" />
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
import { ref, reactive, onMounted } from 'vue';
import Tag from '@/api/article';

let tableData = ref([]);

// 加载列表
onMounted(async () => {
	let { status, msg, data } = await Tag.taglist();
	if (status) {
		tableData.value = data;
	}
});

const dialogVisible = ref(false);

let form = ref({ name: '' });
// 缓存当前行的索引
let current = ref(0);

// 打开编辑dialog
let handleOpenDialog = (data, i) => {
	// 浅拷贝，还原表单
	form.value = { ...data };
	// 记录当前行索引
	current.value = i;
	// 显示dialog
	dialogVisible.value = true;
}

// 获取form组件实例对象
let formRef = ref();
// 表单验证规则
const rules = reactive({
	name: [
		{ required: true, message: '请输入标签名称！', trigger: 'blur' },
		{ min: 1, max: 30, message: '标签长度要求1-30个字符之间', trigger: 'blur' },
	],
});
// 编辑标签
let handleEdit = (formEl) => {
	// 表单验证
	formEl.validate(async (valid) => {
		if (valid) {
			let { status, msg } = await Tag.tagcompile(form.value.id, { ...form.value });
			if (status) {
				// 操作DOM
				tableData.value[current.value] = { ...form.value };
				// 关闭dialog
				dialogVisible.value = false;
				// 提示成功
				ElMessage.success(msg);
			} else {
				// 提示错误
				ElMessage.error(msg);
			}
		}
	});
}
</script>

<style lang="less" scoped>
.box-card {
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
