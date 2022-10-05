import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/Plugins/axios.config.js'
const app = createApp(App)
const pinia = createPinia()
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
