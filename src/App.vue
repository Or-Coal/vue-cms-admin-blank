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
      <RouterView />
  </el-config-provider>
</template>

<style scoped>
</style>
