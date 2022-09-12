import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      alias: '/',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    // 一级地址
    {
path:'/admin',
name:'Admin',
component:Layout,

    },
    {
      path: '/article',
      name: 'Article',
      component: Layout,
      children: [
        {
          path: 'list',
          component: () => import('@/views/Article/List.vue'),
        },
        {
          path: 'release',
          component: () => import('@/views/Article/Release.vue'),
        },
      ]
    },
  ]

})

export default router
