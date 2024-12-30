// logout.js
import { useRouter } from 'vue-router';

export function logout() {
  localStorage.removeItem('token');
  alert('로그아웃 되었습니다.');
  const router = useRouter();
  router.push('/');
}
