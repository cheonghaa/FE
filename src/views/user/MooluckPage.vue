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
