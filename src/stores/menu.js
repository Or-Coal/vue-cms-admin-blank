import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
export const useMenuStore = defineStore('menu',()=>{
    let isCollapsed = ref(false)
    //折叠菜单
    let toggle = ()=>{
        isCollapsed.value = !isCollapsed.value
    }
    
    //getters
    let icon = computed(() => isCollapsed.value ? 'Expand' : 'Fold')
    return {isCollapsed,toggle,icon}
})