<template>
  <div :class="['weather-container', backgroundClass, { 'water-mode-cursor': isWaterTime }]">
    <div class="mooluck-container">
      <img
        class="interactive-video"
        src="@/assets/video/mooluck_gif.gif"
        :class="{ 'water-mode': isWaterTime }"
        @click="handleVideoClick"
      />
      <p class="instruction" v-if="!isWaterTime">🌱저를 쓰다듬어주세요🌱</p>
      <p v-else class="water-mode-instruction">💧지금 저에게 물을 주세요💧</p>
    </div>

    <!-- 커스텀 팝업 창 -->
    <div v-if="showPopup" class="popup">
      <p>{{ popupMessage }}</p>
      <button @click="closePopup" class="popup-close">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { isWaterTime, checkWaterTime, startWaterTimeInterval } from '@/managers/WaterTimeManager'
import { showPopup, popupMessage, openPopup, closePopup } from '@/managers/PopupManager'
import { fetchWeather, backgroundClass } from '@/managers/WeatherManager'
import axios from 'axios'

// Elder ID 설정
const elderId = 1


// 비디오 클릭 이벤트
const handleVideoClick = async () => {
  let isPopupShown = false // 첫 번째 팝업 표시 여부를 확인하는 변수

  try {
    // 첫 번째 API 호출
    const response1 = await axios.post(
      'http://localhost:5050/interaction/pet',
      {},
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    // 첫 번째 API 응답 메시지를 팝업에 표시하고 플래그 업데이트
    openPopup(response1.data.message)
    isPopupShown = true
  } catch (error) {
    console.error('첫 번째 API 호출 중 오류 발생:', error)
    openPopup('오류가 발생했어요. 다시 시도해 주세요😭')
    isPopupShown = true
  }

  // 첫 번째 팝업이 이미 표시되었으면 이후 코드 실행 중지
  if (isPopupShown) return

  try {
    // isWaterTime 값에 따라 다른 API 호출
    if (isWaterTime.value) {
      const response2 = await axios.post(
        'http://localhost:8080/interaction/water',
        { elderId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log(response2.data) // 응답 로그 확인
      openPopup('무럭이에게 물을 주었어요!💧\n무럭이가 아주 좋아해요! 🌱')
    } else {
      const response2 = await axios.post(
        'http://localhost:8080/interaction/pet',
        { elderId },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log(response2.data) // 응답 로그 확인
      openPopup('무럭이를 쓰다듬었어요✨ \n무럭이가 행복해하고 있어요💚')
    }
  } catch (error) {
    console.error('두 번째 API 호출 중 오류 발생:', error)
    openPopup('오류가 발생했어요. 다시 시도해 주세요😭')
  }
}

// 컴포넌트 마운트 시 실행
onMounted(() => {
  fetchWeather()
  checkWaterTime()
  startWaterTimeInterval() // 주기적으로 Water Time 체크
})
</script>

<style scoped>
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

/* 텍스트 스타일 */
.instruction {
  color: #2d8130; /* 부드러운 녹색 톤 */
  font-size: 1.8rem; /* 큰 글씨 크기 */
  font-weight: bold;
  font-family: 'Arial', sans-serif; /* Arial 폰트 적용 */
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 입체감 효과 */
}

.water-mode-instruction {
  color: #357ca5; /* 물을 주는 상황에 맞는 파란색 톤 */
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'Arial', sans-serif; /* Arial 폰트 적용 */
  margin-top: 20px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 입체감 효과 */
}

/* Water Time일 때 전체 화면에서 커서 변경 */
.weather-container.water-mode-cursor {
  cursor: url('@/assets/water_cursor.png'), pointer;
}

/* Water Time일 때 비디오 위 커서 변경 */
.interactive-video.water-mode {
  cursor: url('@/assets/water_cursor.png'), pointer;
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
  color: #5a5a5a;
  font-size: 1rem;
  max-width: 250px;
  width: 90%;
  z-index: 1000;
}

.popup p {
  margin-bottom: 1rem;
  color: #5a5a5a;
}

.popup-close {
  background-color: #ffcc80;
  color: #5a5a5a;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.popup-close:hover {
  background-color: #ffb74d;
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
