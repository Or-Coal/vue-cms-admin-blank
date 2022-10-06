<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>公告列表</span>
            </div>
        </template>
        <el-table :data="noticeList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="create_time" label="发布日期" />
            <el-table-column prop="update_time" label="更新日期" />
            <el-table-column prop="operation" #default="scope" label="操作" width="300">
                <el-row>
                    <el-space>
                        <el-link :href="`/#/notice/listedit/${scope.row.id}`">
                            <el-button type="primary" plain>
                                <el-icon>
                                    <EditPen />
                                </el-icon>
                                编辑
                            </el-button>
                        </el-link>
                        <el-button type="success" plain prop="is_sticky"
                            @click="handleTop(scope.row.id,scope.row.is_sticky,scope.$index,scope.row)">
                            <el-icon>
                                <Top />
                            </el-icon>
                            {{scope.row.is_sticky?"取消顶置":"顶置"}}
                        </el-button>
                    </el-space>
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
</template>

<script setup>
import { reactive, ref } from 'vue';
import Notice from '@/api/notice';

let noticeList = ref([]);

//加载管理员列表的函数：
async function loadList() {
    let { status, msg, data, total } = await Notice.noticelist();
    console.log(data);
    if (status) {
        //获取到数据，渲染数据
        noticeList.value = data;
        // console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();

//顶置按钮
//初值
// let is_top = ref(0);
// let is_sticky = is_top.value;
// console.log(is_sticky);

function handleTop(id, is_sticky, index, scope) {

    ElMessageBox.confirm(
        '此操作将顶置该公告，是否继续?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再(取消）顶置DOM
            //1:
            noticeList.value.forEach((item) => {
                if (item.id == id) {
                    item.is_sticky = !item.is_sticky
                }
            })
            if (is_sticky) {
                //取消顶置
                is_sticky = 0;
                console.log(is_sticky);
                let { status, msg } = await Notice.top({ id, is_sticky });
                if (status) {
                    //顶置成功
                    ElMessage.success(msg);
                    //2:赋值//更改文字： 取消顶置--->顶置
                    is_sticky = 0;
                    //操作DOM-----取消顶置DOM
                    noticeList.value.unshift(noticeList.value[index]);
                    noticeList.value.splice(index + 1, 1);
                } else {
                    //取消顶置失败
                    ElMessage.error(msg);
                };
            } else {
                is_sticky = 1;
                console.log(is_sticky);
                let { status, msg } = await Notice.top({ id, is_sticky });
                if (status) {
                    //顶置成功
                    ElMessage.success(msg);
                    //2:赋值更改文字： 顶置--->取消顶置
                    is_sticky = 1;
                    //操作DOM-----顶置DOM
                    noticeList.value.unshift(noticeList.value[index]);
                    noticeList.value.splice(index + 1, 1);
                } else {
                    //顶置失败
                    ElMessage.error(msg);
                };
            }
        })
        .catch(() => {
            //取消按钮
            ElMessage('（取消）顶置失败!');
        })
}

//删除按钮
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '此操作将永久删除该公告，是否继续?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Notice.remove({ id });  // id: id  简化为  id
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                noticeList.value.splice(i, 1);
            } else {
                //删除失败
                ElMessage.error(msg);
            }
            //2:

        })
        .catch(() => {
            //取消按钮
            ElMessage('取消成功！');
        })
}

</script>