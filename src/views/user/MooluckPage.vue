<template>
  <WeatherContainer>
    <MooluckContainer />
    <ChatContainer />
    <WaterPopup />
  </WeatherContainer>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { isWaterTime, checkWaterTime, startWaterTimeInterval } from '@/managers/WaterTimeManager';
import { showPopup, openPopup } from '@/managers/PopupManager';
import { fetchWeather } from '@/managers/WeatherManager';
import { logout } from '@/stores/logout';
import axios from 'axios';

import WeatherContainer from './WeatherContainer.vue'
import MooluckContainer from './MooluckContainer.vue'
import ChatContainer from './ChatContainer.vue'
import WaterPopup from './WaterPopup.vue'

// Elder ID 설정
const elderId = ref(1);

// 상태 변수
const showWaterPopup = ref(false); // Water Time 팝업 상태
const chatMessages = ref([]); // 대화 메시지 상태
const isHovering = ref(false); // 호버 상태

const router = useRouter();
const ELDER_TOKEN_KEY = 'elder_token';

// 페이지 보호 로직: 토큰 확인 및 검증
onMounted(async () => {
  const token = localStorage.getItem(ELDER_TOKEN_KEY);

  if (!token) {
    alert('다시 로그인 해주세요.');
    router.push('/');
    return;
  }

  try {
    // 서버에서 토큰 검증 요청
    const response = await axios.post(
      'http://localhost:8080/auth/validate',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Bearer 토큰 형식으로 전달
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status !== 200 || response.data !== 'Token is valid') {
      throw new Error('유효하지 않은 토큰입니다.');
    }

    console.log('토큰 검증 성공: 페이지 로드');
  } catch (error) {
    console.error('토큰 검증 실패:', error.message);
    alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
    localStorage.removeItem(ELDER_TOKEN_KEY); // 유효하지 않은 토큰 삭제
    router.push('/'); // 홈 페이지로 리다이렉트
  }
});

// 커서 변경 로직
const setHover = (hover) => {
  isHovering.value = hover;
  if (hover) {
    const cursorUrl = new URL('@/assets/pet_cursor.png', import.meta.url).href;
    document.body.style.cursor = `url(${cursorUrl}), pointer`;
  } else {
    document.body.style.cursor = 'default'; // 기본 커서로 복원
  }
};

// 실시간 STT-TTS 대화 시작
const startChat = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5050/interaction/pet',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const { stt_text, tts_text } = response.data;

    console.log('오디오 응답:', response.data);

    chatMessages.value.push(`문희: ${stt_text}`);
    chatMessages.value.push(`무럭이: ${tts_text}`);

    openPopup(response.data.message);
  } catch (error) {
    console.error('대화 중 오류 발생:', error);
    chatMessages.value.push('무럭이와 대화에 실패했어요 😭');
    openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭');
  }
};

// 물 주기 또는 쓰다듬기 처리
const handleVideoClick = async () => {
  try {
    const apiUrl = isWaterTime.value
      ? 'http://localhost:8080/interaction/water'
      : 'http://localhost:8080/interaction/pet';

    const response = await axios.post(
      apiUrl,
      { elderId: elderId.value },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ELDER_TOKEN_KEY)}`, // Bearer 토큰 추가
          'Content-Type': 'application/json',
        }
      }
    );

    if (isWaterTime.value) {
      console.log('물 주기 응답:', response.data);
      openPopup('무럭이에게 물을 주었어요💧무럭이가 아주 좋아해요🌱');
    } else {
      console.log('쓰다듬기 응답:', response.data);
      openPopup('무럭이를 쓰다듬었어요✨ 무럭이가 행복해하고 있어요💚');
    }
  } catch (error) {
    console.error('비디오 호출 중 오류 발생:', error);
    openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭');
  }
};

// Water Time에 따른 자동 팝업 처리
watch(isWaterTime, (newVal) => {
  if (newVal) {
    showWaterPopup.value = true;
    setTimeout(() => {
      showWaterPopup.value = false;
    }, 240000); // 4분 후 팝업 자동 닫기
  }
});

// Water Time 팝업 닫기 (사용자 클릭 시)
const closeWaterPopup = () => {
  showWaterPopup.value = false;
  isWaterTime.value = false; // Water Time 상태 해제
};

// 컴포넌트 마운트 시 실행
onMounted(() => {
  fetchWeather(); // 날씨 데이터 가져오기
  checkWaterTime(); // Water Time 확인
  startWaterTimeInterval(); // Water Time 주기적 체크 시작
});
</script>




<style scoped>
/* 공통 스타일 */
body {
  cursor: url('@/assets/pet_cursor.png'), pointer !important;
}

@font-face {
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
}

.weather-container {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 날씨별 배경 스타일 */
.clearD {
  background: url('@/assets/image/clearD_sample.webp') no-repeat center center;
  background-size: cover;
}

.clearN {
  background: url('@/assets/image/clearN_sample.webp') no-repeat center center;
  background-size: cover;
}

.cloudsD {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}

.cloudsN {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}

.brokenCloudsD {
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
  background-size: cover;
}

.brokenCloudsN {
  background: url('@/assets/image/sample_made.png') no-repeat center center;
  background-size: cover;
}

.rainD {
  background: url('@/assets/image/rainD_sample.webp') no-repeat center center;
  background-size: cover;
}

.rainN {
  background: url('@/assets/image/rainD_sample.webp') no-repeat center center;
  background-size: cover;
}

.snowD {
  background: url('@/assets/image/snowD_sample.webp') no-repeat center center;
  background-size: cover;
}

.snowN {
  background: url('@/assets/image/snowD_sample.jpeg') no-repeat center center;
  background-size: cover;
}

.mistD {
  background: url('@/assets/image/mistD_sample.jpeg') no-repeat center center;
  background-size: cover;
}

.mistN {
  background: url('@/assets/image/mistD_sample.webp') no-repeat center center;
  background-size: cover;
}

.default {
  background: url('@/assets/image/clearD.webp') no-repeat center center;
  background-size: cover;
}
</style>
