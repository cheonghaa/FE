<template>
  <div class="container">
    <div class="background">
      <img src="@/assets/images/orange.gif" alt="배경" class="background-image" />
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
            placeholder="아이디를 입력해주세요"
            v-model="elderAccount"
          />
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            class="input"
            placeholder="비밀번호를 입력해주세요"
            v-model="elderPwd"
          />
        </div>
        <button class="submit-button" @click="handleLogin">확인</button>
      </div>

      <!-- 커스텀 팝업 창 -->
      <div v-if="showPopup" :class="['popup', popupType]">
        <p>{{ popupMessage }}</p>
        <button @click="showPopup = false" class="popup-close">닫기</button>
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
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from '@/stores/login';

const router = useRouter();
const elderAccount = ref('');
const elderPwd = ref('');

const popupMessage = ref('');
const popupType = ref('');
const showPopup = ref(false);

// const ELDER_TOKEN_KEY = 'elder_token';

async function handleLogin() {
  console.log('로그인 요청 데이터:', { elderAccount: elderAccount.value, elderPwd: elderPwd.value });

  if (!elderAccount.value.trim() || !elderPwd.value.trim()) {
    showPopupMessage('⚠️ 아이디와 비밀번호를 모두 입력해 주세요!', 'warning');
    return;
  }

  try {
    // 로그인 요청
    const token = await login('elder', {
      elderAccount: elderAccount.value.trim(),
      elderPwd: elderPwd.value.trim(),
    });

    if (token) {
      localStorage.setItem('elder_token', token); // 토큰 저장

      // 토큰 검증
      const response = await axios.post(
        'http://localhost:8080/auth/validate',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showPopupMessage('🎉 로그인 성공! 환영합니다!', 'success');
        router.push({ name: 'mooluck' }); // 보호된 페이지로 이동
      }
    } else {
      throw new Error('로그인 성공했지만 토큰이 없습니다.');
    }
  } catch (error) {
    console.error('로그인 처리 중 오류:', error.message);
    showPopupMessage(`❌ 로그인 실패: ${error.response?.data?.error || '서버 오류'}`, 'error');
  }
}

// function handleLogout() {
//   localStorage.removeItem(ELDER_TOKEN_KEY); // 토큰 삭제
//   alert('로그아웃되었습니다.');
//   router.push('/'); // 홈 페이지로 리다이렉트
// }

function showPopupMessage(message, type) {
  popupMessage.value = message;
  popupType.value = type;
  showPopup.value = true;

  // 3초 후 팝업 자동 닫기
  setTimeout(() => {
    showPopup.value = false;
  }, 3000);
}
</script>





<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Roboto', Arial, sans-serif;
  margin: 0; /* 공백 제거 */
  padding: 0; /* 공백 제거 */
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
  object-fit: auto;
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

.submit-button {
  width: 100%;
  height: 45px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e8b05c; /* 중간 톤의 부드러운 주황색 */
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.submit-button:hover {
  background-color: #f7b35f; /* 중간 톤보다 약간 진한 주황색 */
  box-shadow: 0 3px 10px rgba(255, 167, 38, 0.5); /* 부드러운 주황빛 그림자 */
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
  position: absolute; /* 컨테이너 안에 고정 */
  bottom: 30px; /* 하단 여백 조정 */
  right: 30px; /* 오른쪽 여백 조정 */
  z-index: 10;
}

.admin-button {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: bold;
  background-color: #294c66;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.admin-button:hover {
  background-color: #3a5a80; /* 약간 밝은 블루로 호버 효과 */
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(58, 90, 128, 0.5);
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

/* 팝업 스타일 */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  border-radius: 15px;
  background-color: #fff3e0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  text-align: center;
  font-size: 1rem;
  color: #5d4037;
  max-width: 300px;
  width: 90%;
  max-width: 300px;
}

/* 팝업 내용 */
.popup p {
  margin-bottom: 1rem;
  white-space: pre-wrap; /* 줄바꿈을 유지 */
}

/* 팝업 닫기 버튼 */
.popup-close {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #ffcc80;
  color: #5d4037;
  cursor: pointer;
  font-weight: bold;
}

.popup-close:hover {
  background-color: #ffb74d;
}

/* 팝업 유형에 따른 스타일 */
.popup.success {
  border: 2px solid #4caf50;
}

.popup.error {
  border: 2px solid #ff5252;
}

.popup.warning {
  border: 2px solid #ffb74d;
}
</style>
