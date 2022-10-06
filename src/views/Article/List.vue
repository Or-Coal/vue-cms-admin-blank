<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>文章列表</span>
            </div>
        </template>
        <el-table :data="articleList" style="width: 100%">
            <el-table-column prop="id" label="#" />
            <el-table-column prop="cate_1st_name" label="一级分类" />
            <el-table-column prop="cate_2nd_name" label="二级分类" />
            <el-table-column label="主图">
                <template #default="scope">
                    <img :src="scope.row.main_photo" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" />
            <el-table-column label="标签">
                <template #default="scope">
                    <el-tag type="success" disable-transitions v-for="(item,index) in scope.row.tags" :key="index">{{
                    item.name }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="发布日期" />
            <el-table-column prop="update_time" label="更新日期" />
            <el-table-column prop="operation" label="操作" width="300" #default="scope">
                <el-row>
                    <el-space>
                        <el-link :href="`/#/article/listedit/${scope.row.id}`">
                            <el-button type="primary" plain @click="handcompile(scope.row.id,scope.$index)">
                                <el-icon>
                                    <EditPen />
                                </el-icon>
                                编辑
                            </el-button>
                        </el-link>
                        <el-button type="success" plain @click="handletag(scope.row.id,scope.$index)">
                            <el-icon>
                                <Discount />
                            </el-icon>
                            标记
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
    <!-- 标记按钮 dialog 弹窗 -->
    <el-dialog v-model="dialogVisible" title="标记文章">
        <el-form :model="input">
            <el-form-item status-icon label-width="10px">
                <el-row class="row-bg" justify="space-between">
                    <el-col :span="12">
                        <span>您可以添加多个标签：</span>
                    </el-col>
                    <el-col :span="12">
                        <el-space>
                            <el-row class="row-bg" justify="space-between">
                                <el-col :span="15">
                                    <el-input class="w-30 m-20" placeholder="Pick a date">
                                        <template #suffix>
                                            <el-icon class="el-input__icon">
                                                <search />
                                            </el-icon>
                                        </template>
                                    </el-input>
                                </el-col>
                                <el-col :span="1">
                                    <el-button icon="CirclePlus" type="success" plain>添加标签</el-button>
                                </el-col>
                            </el-row>
                        </el-space>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="标签名称" status-icon label-width="80px">
                <el-input style="height:40px">
                    <template #prefix>
                        <el-space>
                            <el-tag v-for="(item,index) in inputcopy[tagid].tags" :key="item.id" class="mx-1"
                                :disable-transitions="true"  @click="handleCanceltag(item,item.id,index)"
                                type="success" plain>
                                {{item.name}}
                            </el-tag>
                        </el-space>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item status-icon label-width="10px">
                <el-space>
                    <el-tag v-for="item in tagList" @click="handldeadd(item,item.id)" :key="item.id" class="ml-4"
                        type="success" effect="light">
                        {{ item.name }}
                    </el-tag>
                </el-space>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancle">取消</el-button>
                <el-button type="primary" @click="handleEdit(articleid)">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import Article from '@/api/article';
import { useRouter, useRoute } from 'vue-router'
const articleList = ref([]);

//加载文章列表的函数：
//方法一：setup
async function loadList() {
    let { status, msg, data, total } = await Article.artlist();
    if (status) {
        //获取到数据，渲染数据
        articleList.value = data;
        console.log(data);
    } else {
        //获取失败
        ElMessage.error(msg);
    }
}
loadList();
//方法三：onMounted（没有参数的话，就使用onMounted方法）【有参数---watchEffect】
// onMounted(async () => {
//     let { status, msg, data, total } = await Article.taglist();
//     if (status) {
//         //获取到数据，渲染数据       
//         tagList.value = data;
//         // console.log(data);
//     } else {
//         //获取失败
//         ElMessage.error(msg);
//     }
// })
const router = useRouter()
// 编辑按钮
//  /article/listedit 
// let handcompile = ()=>{
//     router.push('/article/listedit')
// }
//标记按钮：
//弹窗
let tagid = ref([]);
let dialogVisible = ref(false);
//点击打开弹窗---获取详情---还原表单
//存一下文章id（在标签弹窗保存时使用）
let articleid = ref([]);
let input = ref([]);
let inputcopy = ref([]);
let handletag = (i, id) => {
    // console.log(i);
    // console.log(id);
    input.value = articleList.value;
    inputcopy.value = JSON.parse(JSON.stringify(articleList.value))
    dialogVisible.value = true;
    tagid.value = id;
    // console.log(tagid.value);
    articleid.value = i;
}
//获取标签类型——————标签列表
let tagList = ref([]);
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
//弹窗中input中标签的取消事件:bug:点击叉号没反应，点击标签才有反应
let handleCanceltag = (i, id, index) => {
    // console.log(i);
    // console.log(id);
    // console.log(input.value[tagid.value].tags);
    // console.log(index);
    inputcopy.value[tagid.value].tags.splice(index, 1);
}
//弹窗中---下面所有标签的点击事件
let current = "";
let handldeadd = (item, id) => {
    // console.log(item);
    // console.log(id);
    let ishave = '';
    current = inputcopy.value[tagid.value].tags;
    // console.log(current);
    //已经存在的标签不需要再添加
    for (var thing = 0; thing < current.length; thing++) {
        // console.log(current[thing]);
        delete current[thing].article_id;
        // console.log(current[thing]);
        ishave = true
        for(let i= 0;i<current.length;i++){
            if(current[i].name == item.name){
                ishave = false
            }
        }

    }
    console.log(current);
    if (!ishave) {
        return;
    } else {
        current.push(item);
    }
}
//弹窗中的取消按钮：
function handleCancle() {
    dialogVisible.value = false;
}
//弹窗中的保存按钮------：
function handleEdit(cid) {
    console.log(cid);
    let currenttags = [];
    for (var thing = 0; thing < input.value[tagid.value].tags.length; thing++) {
        let { id } = input.value[tagid.value].tags[thing];
        currenttags.push(id);
        console.log(id);
        console.log(currenttags);
    }
    // console.log({ ...input.value[tagid.value].tags });
    // console.log({ ...input.value[tagid.value].tags.id });
    let { status, msg, data } = Article.articletag({ id:cid, tags:currenttags });
    console.log(status);//status没有定义
    // if (status) {
    //     //更新DOM
    //     current_node.value.data = { ...edit_form.value };
    //     //关闭dialog弹窗
    dialogVisible.value = false;
    // }
}


//删除按钮：
function handleRemove(id, i) {
    //弹出确认删除框---confirm(传三个参数，用不到的可以不传)
    ElMessageBox.confirm(
        '确认删除此文章嘛?',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认'
        }
    )
        .then(async () => {
            //确认按钮——1：发送ajax给后台—---2：等ajax成功后再删除DOM【不传id的话，后台报错500】
            //1:
            let { status, msg } = await Article.remove({ id });  // id: id  简化为  id
            if (status) {
                //删除成功
                ElMessage.success(msg);
                //2:
                articleList.value.splice(i, 1);
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

//编辑按钮：跳转页面了 【点击——出现弹框——还原表单——修改数据——保存数据】




</script>

<style lang="less" scoped>
img {
    width: 100px;
}
</style>