<template>
    <div class="container">
      <h1 class="title">Mooluck</h1>
      <div class="form">
        <label for="code">코드 번호 :</label>
        <input type="text" id="code" class="input" placeholder="코드 입력" v-model="code" />
        <button class="submit-button" @click="handleSubmit">확인</button>
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
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const code = ref(''); // 코드 번호 입력 값을 저장
  
  // 코드 형식을 확인하는 정규 표현식
  const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
  
  function handleSubmit() {
    if (codePattern.test(code.value.trim())) { // 코드 형식이 맞는지 확인
      router.push({ name: 'mooluck' }); // 'mooluck' 라우트 이름으로 이동
    } else {
      alert('유효한 코드 형식을 입력해주세요. 예: CWVB-USBZ-2C5U-EIW3'); // 형식이 맞지 않을 경우 알림
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
    align-items: center;
    margin-bottom: 2rem;
  }
  
  label {
    margin-right: 1rem;
    font-size: 1rem;
  }
  
  .input {
    width: 200px;
    height: 30px;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 1rem;
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
  