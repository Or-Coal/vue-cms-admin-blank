import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/Layout.vue'
// router:路由实例对象
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      alias: '/',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,
      meta: { requiresAuth: true }
    },
    {
      path: '/article',
      name: 'Article',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: 'ArticleList',
      meta: { requiresAuth: false },

          component: () => import('@/views/Article/List.vue'),
        },
        {
          path: 'comment',
          name: 'ArticleComment',
          component: () => import('@/views/Article/Comment.vue'),
        },
        {
          path: 'tag',
          name: 'ArticleTag',
          component: () => import('@/views/Article/Tag.vue'),
        },
        {
          path: 'listedit',
          name: 'ArticleListEdit',
          component: () => import('@/views/Article/ListEdit.vue'),
        },
        {
          path: 'release',
          name: 'ArticleRelease',
          component: () => import('@/views/Article/Release.vue'),
        },
      ]
    },
    {
      path: '/system',
      name: 'System',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: 'SystemList',
          component: () => import('@/views/System/List.vue'),
        },
        {
          path: 'edit',
          name: 'SystemEdit',
          component: () => import('@/views/System/Edit.vue'),
        },
        {
          path: 'listedit/:id',
          name: 'SystemListEdit',
          component: () => import('@/views/System/ListEdit.vue'),
        },

      ]
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: 'NoticeList',
          component: () => import('@/views/Notice/List.vue'),
        },
        {
          path: 'listedit',
          name: 'NoticeListEdit',
          component: () => import('@/views/Notice/ListEdit.vue'),
        },
        {
          path: 'release',
          name: 'NoticeRelease',
          component: () => import('@/views/Notice/Release.vue'),
        },
      ]
    },
    {
      path: '/promotion',
      name: 'Promotion',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'link',
          name: 'PromotionLink',
          component: () => import('@/views/Promotion/Link.vue'),
        },
        {
          path: 'slideshow',
          name: 'PromotionSlideshow',
          component: () => import('@/views/Promotion/Slideshow.vue'),
        },
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: 'UserList',
          component: () => import('@/views/User/List.vue'),
        },
      ]
    },
    {
      path: '/account',
      name: 'Account',
      component: Layout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          name: 'AccountList',
          component: () => import('@/views/Account/List.vue'),
        }

      ]
    }
  ]

})
// 全局前置守卫
router.beforeEach((to, from) => {
  console.log('to', to)
  console.log(from)
  // 判断跳转的页面是否需要已登录的状态
  // if(to.name === 'Login'||to.name === 'Register'){
  //   return true
  //  }
  //路由元信息：判断是否需要登录验证
  if (!to.meta.requiresAuth) {
    return true;
  }

  let token = sessionStorage.token;
  if (token) {
    return true

  } else {
    console.log(to.fullPath)
    return { name: 'Login', query: { redirect: to.fullPath } };

  }
})
//全局前置守卫
// router.beforeEach((to, from) => {

//   //判断是否 to 登录页 或者 注册页（放行——————return true）
//   if (to.name === "Login" || to.name === "Register") {
//     return true;
//   }
//   //提取 token 进行校验————进行判断
//   let token = sessionStorage.token;
//   if (token) {
//     //token 存在————放行

//   } else {
//     //token 不存在
//     //返回 false 取消导航（白屏————不合理）
//     //  return false;
//     //将用户 重定向 到 登录页面  
//     return { name: 'Login', query: { redirect: to.fullPath } };
//   }})

export default router
