// login.js
import axios from 'axios';

export async function login(email, password, router) {
  try {
    const response = await axios.post('http://localhost:8080/admin/login', {
      staff_email: email,
      password,
    });
    const token = response.data.response.data.token;
    localStorage.setItem('token', token); // JWT 저장
    alert('환영합니다! 오늘도 좋은 하루 되세요.');
    router.push('/admin'); // 관리자 페이지로 이동
  } catch (error) {
    console.error('로그인 실패:', error);
    alert('이메일 또는 비밀번호가 올바르지 않습니다.');
  }
}

