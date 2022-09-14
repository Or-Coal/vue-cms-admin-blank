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
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,

    },
    {
      path: '/article',
      name: 'Article',
      component: Layout,
      children: [
        {
          path: 'list',
          name:'ArticleList',
          component: () => import('@/views/Article/List.vue'),
        },
        {
          path: 'comment',
          name:'ArticleComment',
          component: () => import('@/views/Article/Comment.vue'),
        },
        {
          path: 'tag',
          name:'ArticleTag',
          component: () => import('@/views/Article/Tag.vue'),
        },
      ]
    },
    {
      path: '/system',
      name: 'System',
      component: Layout,
      children: [
        {
          path: 'list',
          name:'SystemList',
          component: () => import('@/views/System/List.vue'),
        },
        {
          path: 'edit',
          name:'SystemEdit',
          component: () => import('@/views/System/Edit.vue'),
        },
        
      ]
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Layout,
      children: [
        {
          path: 'list',
          name:'NoticeList',
          component: () => import('@/views/Notice/List.vue'),
        },
      ]
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: Layout,
      children: [
        {
          path: 'link',
          name:'PromotionLink',
          component: () => import('@/views/Promotion/Link.vue'),
        },
        {
          path: 'slideshow',
          name:'PromotionSlideshow',
          component: () => import('@/views/Promotion/Slideshow.vue'),
        },
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: Layout,
      children: [
        {
          path: 'list',
          name:'UserList',
          component: () => import('@/views/User/List.vue'),
        },
      ]
    },
  ]

})

export default router
