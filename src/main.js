import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
//图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia())
app.use(router)
app.mount('#app')
