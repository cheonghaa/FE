<template>
  <div class="container">
    <div class="background">
      <img src="@/assets/images/seed.gif" alt="배경" class="background-image" />
    </div>
    <div class="content">
      <h1 class="title">Mooluck</h1>
      <div class="form">
        <div class="form-group">
          <label for="id">아이디</label>
          <input
            type="text"
            id="id"
            class="input"
            placeholder="아이디 입력"
            v-model="elderAccount"
          />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            class="input"
            placeholder="비밀번호 입력"
            v-model="elderPwd"
          />
        </div>
        <button class="submit-button" @click="handleLogin">확인</button>
      </div>
      <div v-if="authStore.error" class="error-message">{{ authStore.error }}</div>
      <div v-if="authStore.isLoggedIn" class="success-message">
        로그인 성공! 사용자 ID: {{ authStore.userId }}
      </div>
    </div>
    <div class="admin-login">
      <router-link to="/login">
        <button class="admin-button">관리자</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const elderAccount = ref('')
const elderPwd = ref('')

async function handleLogin() {
  console.log('아이디:', elderAccount.value)
  console.log('비밀번호:', elderPwd.value)

  if (!elderAccount.value || !elderPwd.value) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  await authStore.login(elderAccount.value.trim(), elderPwd.value.trim())

  if (authStore.isLoggedIn) {
    alert('로그인 성공!')
    router.push({ name: 'mooluck' })
  }
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

/* 배경 이미지 */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  filter: blur(3px);
}

/* 콘텐츠 박스 */
.content {
  z-index: 1;
  text-align: center;
  backdrop-filter: blur(15px);
  padding: 3rem 2rem;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 타이틀 스타일 */
.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 2rem;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
}

/* 폼 스타일 */
.form {
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 1rem;
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
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.input:focus {
  outline: none;
  border: 1px solid #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.7);
}

/* 버튼 스타일 */
.submit-button {
  width: 100%;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
  box-shadow: 0 3px 10px rgba(0, 123, 255, 0.5);
}

/* 에러 및 성공 메시지 */
.error-message {
  margin-top: 1rem;
  color: #ff4c4c;
}

.success-message {
  margin-top: 1rem;
  color: #4caf50;
}

/* 관리자 버튼 */
.admin-login {
  position: fixed; /* 스크롤 시에도 고정 */
  bottom: 20px;
  right: 20px;
  z-index: 10;
}

.admin-button {
  width: 70px;
  height: 70px;
  border: none;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #f39c12;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.admin-button:hover {
  background-color: #e67e22;
  transform: scale(1.1); /* 호버 시 확대 */
  box-shadow: 0 6px 12px rgba(243, 156, 18, 0.5);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .admin-button {
    width: 60px;
    height: 60px;
    font-size: 0.8rem;
  }

  .admin-login {
    bottom: 15px;
    right: 15px;
  }
}
</style>
