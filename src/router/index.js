import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  // 코드 홈페이지 무럭이
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  // 관리자
  {
    path: '/login',
    name: 'adminlogin',
    component: () => import('@/views/admin/AdminloginPage.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminPage.vue')
  },
  // 유저
  {
    path: '/mooluck',
    name: 'mooluck',
    component: () => import('@/views/user/MooluckPage.vue')
  },
  {
    path: '/interaction',
    name: 'interaction',
    component: () => import('@/views/user/MooluckInteractionPage.vue')
  },
  // 404 페이지 라우트
  {
    path: '/:pathMatch(.*)*', // 모든 일치하지 않는 경로
    name: 'NotFound',
    component: NotFoundPage
  }
]

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
