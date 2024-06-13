import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guide',
      name: 'guide',
      component: () => import('@/pages/Guide.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/user',
      name: 'userList',
      component: () => import('@/pages/user/Index.vue')
    },
    {
      path: '/user/new',
      name: 'userNew',
      component: () => import('@/pages/user/New.vue')
    },
    {
      path: '/user/team/:tid',
      name: 'userTeam',
      component: () => import('@/pages/user/Team.vue')
    },
    {
      path: '/post',
      name: 'postList',
      component: () => import('@/pages/post/Index.vue')
    },
    {
      path: '/group',
      name: 'groupList',
      component: () => import('@/pages/group/Index.vue')
    },
    {
      path: '/group/new',
      name: 'groupNew',
      component: () => import('@/pages/group/New.vue')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/404.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/pages/500.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length < 1) {
    next(false)
    router.push({ name: '404' })
  } else {
    next()
  }
})

export default router
