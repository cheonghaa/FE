<template>
  <div class="container">
    <!-- 배경 GIF -->
    <div class="background">
      <img src="@/assets/images/green.gif" alt="배경 GIF" class="background-gif" />
    </div>
    <!-- 로그인 폼 -->
    <div class="content">
      <h1 class="title" @click="goToHome">Admin</h1>
      <div class="form">
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="input"
            placeholder="이메일을 입력해주세요."
            required
          />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="input"
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>
        <button @click="handleLogin" class="submit-button">로그인</button>
        <button @click="goToSignUp" class="signup-button">신규 담당자 등록</button>
      </div>
    </div>
    <!-- 뒤로가기 버튼 -->
    <div class="back-button" @click="goBack">
      <span>&larr;</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/stores/login';
import { logout } from '@/stores/logout';
import axios from 'axios'

const email = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  login(email.value, password.value, router);
}

function handleLogout() {
  logout();
}

//로그인 함수
// async function login() {
//   try {
//     const response = await axios.post('http://localhost:8080/admin/login', {
//       staff_email: email.value,
//       password: password.value
//     })
//     const token = response.data.response.data.token // JWT 추출
//     localStorage.setItem('token', token) // JWT 저장
//     alert('환영합니다! 오늘도 좋은 하루 되세요.')
//     router.push('/admin') // 관리자 페이지로 이동
//   } catch (error) {
//     console.error('로그인 실패:', error)
//     alert('이메일 또는 비밀번호가 올바르지 않습니다.')
//   }
// }

//로그아웃 함수 - 클리어 처리

function goToHome() {
  router.push('/')
}

function goToSignUp() {
  router.push('/signup') // 회원가입 페이지로 이동
}

function goBack() {
  router.push('/') // 뒤로가기 버튼 동작: 홈으로 이동
}
</script>

<style scoped>
/* 전체 컨테이너 */
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', Arial, sans-serif;
}

/* 배경 GIF */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  filter: blur(2px);
}

/* 로그인 폼 */
.content {
  z-index: 1;
  text-align: center;
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: auto;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.2rem;
}

label {
  font-size: 1rem;
  text-align: left;
  margin-bottom: 0.5rem;
  color: #ffffff;
}

.input {
  width: 100%;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input:focus {
  outline: none;
  border: 1px solid #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-button,
.signup-button {
  width: 100%;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button {
  background-color: #007bff;
}

.submit-button:hover {
  background-color: #0056b3;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.4);
}

.signup-button {
  margin-top: 1rem;
  background-color: #28a745;
}

.signup-button:hover {
  background-color: #218838;
  box-shadow: 0 3px 10px rgba(40, 167, 69, 0.4);
}

/* 뒤로가기 버튼 */
.back-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.back-button:hover {
  background-color: #5a6268;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}
</style>
