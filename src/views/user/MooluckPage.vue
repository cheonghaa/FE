<template>
  <WeatherContainer>
    <MooluckContainer />
    <ChatContainer />
    <WaterPopup />
  </WeatherContainer>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { isWaterTime, checkWaterTime, startWaterTimeInterval } from '@/managers/WaterTimeManager'
import { showPopup, popupMessage, openPopup } from '@/managers/PopupManager'
import { fetchWeather, backgroundClass } from '@/managers/WeatherManager'
import axios from 'axios'

import WeatherContainer from './WeatherContainer.vue'
import MooluckContainer from './MooluckContainer.vue'
import ChatContainer from './ChatContainer.vue'
import WaterPopup from './WaterPopup.vue'

// Elder ID 설정
const elderId = ref(1)

// 자동 Water Time 팝업 상태
const showWaterPopup = ref(false)

const chatMessages = ref([])

const isHovering = ref(false)

const setHover = (hover) => {
  isHovering.value = hover
  if (hover) {
    const cursorUrl = new URL('@/assets/pet_cursor.png', import.meta.url).href
    document.body.style.cursor = `url(${cursorUrl}), pointer`
  } else {
    document.body.style.cursor = 'default' // 기본 커서로 복원
  }
}

// 실시간 STT-TTS 대화 시작
const startChat = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5050/interaction/pet',
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    // 응답 데이터에서 stt_text와 tts_text 추출
    const { stt_text, tts_text } = response.data

    console.log('오디오 응답:', response.data)

    chatMessages.value.push(`문희: ${stt_text}`)
    chatMessages.value.push(`무럭이: ${tts_text}`)

    openPopup(response.data.message)
  } catch (error) {
    console.error('대화 중 오류 발생:', error)

    chatMessages.value.push('무럭이와 대화에 실패했어요 😭')
    openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭')
  }
}

const handleVideoClick = async () => {
  try {
    if (isWaterTime.value) {
      // 물 주기 API 호출
      const response = await axios.post(
        'http://localhost:8080/interaction/water',
        { elderId: elderId.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('물 주기 응답:', response.data)
      openPopup('무럭이에게 물을 주었어요💧무럭이가 아주 좋아해요🌱')
    } else {
      // 쓰다듬기 API 호출
      const response = await axios.post(
        'http://localhost:8080/interaction/pet',
        { elderId: elderId.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('쓰다듬기 응답:', response.data)

      openPopup('무럭이를 쓰다듬었어요✨ 무럭이가 행복해하고 있어요💚')
    }
  } catch (error) {
    console.error('비디오 호출 중 오류 발생:', error)
    openPopup('오류가 발생했어요. 다시 시도해 주세요. 😭')
  }
}

// Water Time에 따른 자동 팝업 처리
watch(isWaterTime, (newVal) => {
  if (newVal) {
    showWaterPopup.value = true // Water Time 팝업 표시
    setTimeout(() => {
      showWaterPopup.value = false // 4분 후 자동으로 팝업 닫기
    }, 240000)
  }
})

// Water Time 팝업 닫기 (사용자 클릭 시)
const closeWaterPopup = () => {
  showWaterPopup.value = false
  isWaterTime.value = false // Water Time 상태 해제
}

// 컴포넌트 마운트 시 실행
onMounted(() => {
  fetchWeather()
  checkWaterTime()
  startWaterTimeInterval() // 주기적으로 Water Time 체크
})
</script>

<style scoped>
/* 챗봇 */
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-box {
  position: relative; /* 자식 요소를 기준으로 겹치도록 설정 */
}

.chat-bg {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 박스에 꽉 차게 */
  border-radius: 15px;
  z-index: 1; /* 이미지 레이어 */
}

.chat-content {
  position: absolute; /* 부모 요소인 .chat-box 기준으로 절대 위치 */
  top: 0; /* 이미지 상단에 배치 */
  left: 0; /* 이미지 왼쪽에 배치 */
  width: 100%; /* 이미지 너비에 맞게 */
  height: 100%; /* 이미지 높이에 맞게 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 텍스트를 가운데 정렬 */
  align-items: center; /* 텍스트를 수평 가운데 정렬 */
  padding: 10px;
  color: black; /* 텍스트 색상 */
  font-size: 16px;
  font-family: Arial, sans-serif;
  z-index: 2; /* 이미지 위에 배치 */
  background: rgba(0, 0, 0, 0); /* 반투명 배경 추가 */
  border-radius: 15px; /* 이미지와 동일한 모서리 둥글기 */
}

.chat-button {
  background-color: #ffecb3; /* 밝고 부드러운 노란색 */
  color: #ff7043; /* 따뜻한 오렌지색 */
  font-family: 'Comic Sans MS', 'Arial', sans-serif; /* 귀여운 글씨체 */
  font-size: 1.2rem; /* 적당한 크기 */
  font-weight: bold;
  padding: 10px 20px; /* 여유 있는 패딩 */
  border: 2px solid #ffab91; /* 버튼 테두리 */
  border-radius: 25px; /* 둥근 모서리 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 */
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s; /* 클릭 시 애니메이션 */
}

/* 호버 효과 */
.chat-button:hover {
  background-color: #ffe0b2; /* 약간 밝아지는 색상 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 더 깊어진 그림자 */
  transform: translateY(-2px); /* 버튼이 살짝 떠오르는 효과 */
}

/* 클릭 효과 */
.chat-button:active {
  background-color: #ffcc80; /* 약간 어두운 색상 */
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2); /* 그림자 축소 */
  transform: translateY(1px); /* 클릭 시 버튼이 눌리는 효과 */
}

/* 디폴트 커서 스타일 */
body {
  cursor: url('@/assets/pet_cursor.png'), pointer !important;
}

/* 전체 화면 스타일 */
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

/* 비디오 스타일 */
.interactive-video {
  width: 400px;
  border: none;
  display: block;
  margin: 0 auto;
}

/* 웹 폰트 정의 */
@font-face {
  font-family: 'HakgyoansimDunggeunmisoTTF-B';
  src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2')
    format('woff2');
  font-weight: 700;
  font-style: normal;
}

/* 텍스트 스타일 */
.instruction {
  color: #f6e5d6; /* 밝은 주황색 */
  font-size: 2.4rem; /* 큰 글씨 크기 */
  font-weight: bold;
  font-family: 'HakgyoansimDunggeunmisoTTF-B', 'Comic Sans MS', 'Arial', sans-serif; /* 새 폰트 적용 */
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 부드러운 그림자 효과 */
  letter-spacing: 0.05em; /* 글자 간격을 약간 넓혀 둥글게 보이도록 */
  text-transform: capitalize; /* 첫 글자만 대문자로 깔끔한 느낌 */
  -webkit-text-stroke: 2px #6e6e6e; /* 검은색 테두리 */
}

.water-mode-instruction {
  color: #ffffff; /* 물을 주는 상황에 맞는 파란색 톤 */
  font-size: 2.4rem;
  font-weight: bold;
  font-family: 'HakgyoansimDunggeunmisoTTF-B', 'Comic Sans MS', 'Arial', sans-serif; /* 새 폰트 적용 */
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 부드러운 그림자 효과 */
  letter-spacing: 0.05em; /* 글자 간격을 약간 넓혀 둥글게 보이도록 */
  text-transform: capitalize; /* 첫 글자만 대문자로 깔끔한 느낌 */
  -webkit-text-stroke: 2px #6e6e6e; /* 검은색 테두리 */
}

/* mooluck-container 내부에서 텍스트를 이미지 아래에 중앙에 배치 */
.mooluck-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

/* 팝업 스타일 */
/* 일반 팝업 스타일 */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  border-radius: 10px;
  background-color: #fffbf3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
  z-index: 1000;
  animation: fadeInOut 5s forwards;
}

/* Water Time 팝업 스타일 */
.water-popup {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem;
  border-radius: 15px;
  background-color: #e3f2fd;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #1e88e5;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1001;
  cursor: url('@/assets/water_cursor.png'), pointer;
  animation: fadeInOut 5s forwards;
}

/* Fade In-Out Animation */
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* 모든 날씨 배경화면 - 낮밤 구분 */
/* 전체 사진 임시 설정 */
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
