import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import axios from 'axios';


const routes = [
  // 홈 페이지
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
    component: () => import('@/views/admin/AdminPage.vue'),
    meta: { requiresAuth: true } // 인증이 필요한 라우트
  },
  {
    path: '/signup',
    name: 'adminsignup',
    component: () => import('@/views/admin/AdminSignupPage.vue')
  },
  // 유저
  {
    path: '/mooluck',
    name: 'mooluck',
    component: () => import('@/views/user/MooluckPage.vue'),
    meta: { requiresAuth: true } // 인증이 필요한 라우트
  },

  // 404 페이지 라우트
  {
    path: '/:pathMatch(.*)*', // 모든 일치하지 않는 경로
    name: 'NotFound',
    component: NotFoundPage
  }
];

// 라우터 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem('elder_token');
//   if (to.meta.requiresAuth) {
//     if (!token) {
//       console.log('토큰 없음: 접근 불가');
//       alert('로그인이 필요합니다.');
//       return next('/');
//     }

//     try {
//       const response = await axios.post('http://localhost:8080/auth/validate', { token });
//       if (response.data.valid) {
//         console.log('토큰 유효: 접근 허용');
//         next();
//       } else {
//         console.log('토큰 유효하지 않음: 접근 불가');
//         alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
//         localStorage.removeItem('elder_token');
//         return next('/');
//       }
//     } catch (error) {
//       console.error('토큰 검증 중 오류:', error);
//       alert('로그인 상태를 확인할 수 없습니다.');
//       localStorage.removeItem('elder_token');
//       return next('/');
//     }
//   } else {
//     next(); // 인증이 필요 없는 페이지는 그대로 이동
//   }
// });


export default router;
