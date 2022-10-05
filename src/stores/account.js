import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import Admin from '@/api/admin';
export const useAccountStore = defineStore('account',()=>{
// state -- 当前账户
let profile = ref({})
 //action---加载账户资料
 let loadProfile = async (id) => {
    try {
        let { status, msg, data } = await Admin.adminInfo({ id });
        if (status) {
            profile.value = { ...data };
        }
    } catch (error) {
    }}

    
    return {
        profile,
        loadProfile,
    }
 
},{ persist: true,})