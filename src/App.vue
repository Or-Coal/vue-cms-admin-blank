<script>
import { RouterView } from 'vue-router'
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
export default defineComponent({
  components: {
    ElConfigProvider,
    RouterView
  },
  setup() {
    return {
    }
  },
})
</script>

<template>
    <el-config-provider>
      <!-- 一级路由挂载点 -->
      <RouterView />
  </el-config-provider>
</template>

<style scoped>
</style>
