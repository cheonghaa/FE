<template>
    <div class="container">
      <h1 class="title" @click="goToHome">Mooluck</h1>
      <div class="form">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" class="input" placeholder="아이디 입력" />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" class="input" placeholder="비밀번호 입력" />
        </div>
        <router-link to="/admin" class="admin-link">
          <button class="submit-button">확인</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  function goToHome() {
    router.push('/'); 
  }
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-family: Arial, sans-serif;
    text-align: center;
  }
  
  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    cursor: pointer; /* 클릭 가능하도록 커서 스타일 추가 */
  }
  
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  label {
    font-size: 0.9rem;
    text-align: left;
    margin-bottom: 0.5rem;
  }
  
  .input {
    width: 100%;
    height: 40px;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #e0e0e0;
  }
  
  .admin-link {
    width: 100%;
    display: block;
  }
  
  .submit-button {
    width: 60%; 
    height: 50px;
    font-size: 1rem;
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 1rem;
  }
  </style>
  