import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      alias:'/',
      name: 'Login',
      component: () => import('@/views/Login.vue')

    }
  ]
})

export default router
