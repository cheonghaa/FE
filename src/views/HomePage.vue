<template>
  <div class="container">
    <h1 class="title">Mooluck</h1>
    <div class="form">
      <label for="id">아이디 :</label>
      <input
        type="text"
        id="id"
        class="input"
        placeholder="아이디 입력"
        v-model="elderAccount"
      />

      <label for="password">비밀번호 :</label>
      <input
        type="password"
        id="password"
        class="input"
        placeholder="비밀번호 입력"
        v-model="elderPwd"
      />

      <button class="submit-button" @click="handleLogin">확인</button>
    </div>

    <div v-if="authStore.error" class="error">{{ authStore.error }}</div>
    <div v-if="authStore.isLoggedIn" class="success">
      로그인 성공! 사용자 ID: {{ authStore.userId }}
    </div>

    <div class="admin-login">
      <router-link to="/login" class="admin-link">
        <button class="admin-button">관리자</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();

const elderAccount = ref('');
const elderPwd = ref('');

async function handleLogin() {
  console.log("아이디:", elderAccount.value);
  console.log("비밀번호:", elderPwd.value);

  if (!elderAccount.value || !elderPwd.value) {
    alert('아이디와 비밀번호를 입력해주세요.');
    return;
  }

  await authStore.login(elderAccount.value.trim(), elderPwd.value.trim());

  if (authStore.isLoggedIn) {
    alert('로그인 성공!');
    router.push({ name: 'mooluck' }); 
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
}

label {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.input {
  width: 200px;
  height: 30px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  background-color: #e0e0e0;
}

.submit-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
}

.success {
  color: green;
  margin-top: 1rem;
}

.admin-login {
  position: fixed;
  bottom: 40px;
  right: 40px;
}

.admin-link {
  text-decoration: none; /* 밑줄 제거 */
}

.admin-button {
  width: 60px;
  height: 60px;
  padding: 0;
  font-size: 0.8rem;
  background-color: #e0e0e0;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
}
</style>
