<template>
  <div class="container">
    <!-- 배경 GIF -->
    <div class="background">
      <img src="@/assets/images/seed.gif" alt="배경 애니메이션" class="background-gif" />
    </div>
    <!-- 콘텐츠 -->
    <div class="content">
      <h1 class="title">Mooluck</h1>
      <p class="subtitle">무럭이 로그인 화면</p>
      <div class="form">
        <label for="code" class="label">코드 번호 :</label>
        <input type="text" id="code" class="input" placeholder="코드 입력" v-model="code" />
        <button class="submit-button" @click="handleSubmit">확인</button>
      </div>
      <div class="admin-login">
        <router-link to="/login" class="admin-link">
          <button class="admin-button">관리자</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const code = ref('') // 코드 번호 입력 값을 저장

// 코드 형식을 확인하는 정규 표현식
const codePattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

function handleSubmit() {
  if (codePattern.test(code.value.trim())) {
    router.push({ name: 'mooluck' }) // 'mooluck' 라우트 이름으로 이동
  } else {
    alert('유효한 코드 형식을 입력해주세요. 예: CWVB-USBZ-2C5U-EIW3')
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
}

/* 배경 GIF */
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8; /* 살짝 투명하게 */
  filter: blur(2px); /* 흐림 효과로 텍스트와 구분 */
}

/* 콘텐츠 스타일 */
.content {
  z-index: 1;
  text-align: center;
  color: white;
  backdrop-filter: blur(10px); /* 유리창 효과 */
  padding: 2rem;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
}

.title {
  font-size: 4rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #dddddd;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.label {
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
}

.input {
  width: 300px;
  height: 40px;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #1e90ff;
  background-color: #fff;
  outline: none;
  box-shadow: 0 0 5px rgba(30, 144, 255, 0.7);
}

.submit-button {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #1e90ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-button:hover {
  background-color: #0073e6;
  box-shadow: 0 3px 8px rgba(0, 115, 230, 0.3);
}

/* 관리자 버튼 */
.admin-login {
  margin-top: 2rem;
}

.admin-link {
  text-decoration: none;
}

.admin-button {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #ff6b6b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.admin-button:hover {
  background-color: #e63946;
  box-shadow: 0 3px 8px rgba(230, 57, 70, 0.4);
}
</style>
