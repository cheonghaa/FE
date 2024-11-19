<template>
  <div
    :class="['weather-container', backgroundClass, { 'water-mode-cursor': isWaterTime }]"
  >
    <p>현재 날씨: {{ weatherDescription }}</p>
    <div class="mooluck-container">
      <img
        class="interactive-video"
        src = "@/assets/video/mooluck_gif.gif"
        :class="{ 'water-mode': isWaterTime }"
        @click="handleVideoClick"
      >
      <p class="instruction" v-if="!isWaterTime">무럭이를 쓰다듬어주세요!</p>
      <p v-else class="water-mode-instruction">지금 무럭이에게 물을 주세요!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

// 날씨와 배경 설정 관련 상태값
const weatherDescription = ref('')
const backgroundClass = ref('')

// Elder ID (고정값, 필요시 동적으로 변경 가능)
const elderId = ref(1)

// Water Time 관련 상태값
const isWaterTime = ref(false)
const waterStartTime = "20:46"
const waterEndTime = "20:50"

// Water Time 체크 함수
const checkWaterTime = () => {
  const currentTime = new Date().toTimeString().slice(0, 5) // HH:mm 형식
  isWaterTime.value = currentTime >= waterStartTime && currentTime <= waterEndTime
}

// 날씨 정보 가져오기 함수
const fetchWeather = async () => {
  try {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const response = await axios.get(
          `http://localhost:8080/api/weather?lat=${latitude}&lon=${longitude}`
        )
        const weatherIcon = response.data.response.data.weatherIcon
        weatherDescription.value = getWeatherDescription(weatherIcon)
        setBackground(weatherIcon)
      },
      (error) => {
        console.error('위치 권한 거부 또는 위치 가져오기 실패:', error.message)
      }
    )
  } catch (error) {
    console.error('날씨 데이터를 가져오는 중 오류 발생:', error)
  }
}

// 날씨 아이콘 매핑 함수
const getWeatherDescription = (icon) => {
  const weatherMapping = {
    '01': 'Clear',
    '02': 'Clouds',
    '03': 'Clouds',
    '04': 'Broken Clouds',
    '09': 'Rain',
    '10': 'Rain',
    '11': 'Rain',
    '13': 'Snow',
    '50': 'Mist',
  }
  const code = icon.slice(0, 2)
  return weatherMapping[code] || 'Default'
}

// 배경 설정 함수
const setBackground = (icon) => {
  const code = icon.slice(0, 2)
  const dayNight = icon.endsWith('d') ? 'D' : 'N'
  const backgroundMapping = {
    "01": `clear${dayNight}`,
    "02": `clouds${dayNight}`,
    "03": `clouds${dayNight}`,
    "04": `brokenClouds${dayNight}`,
    "09": `rain${dayNight}`,
    "10": `rain${dayNight}`,
    "11": `rain${dayNight}`,
    "13": `snow${dayNight}`,
    "50": `mist${dayNight}`,
  }
  backgroundClass.value = backgroundMapping[code] || 'default'
}

// 비디오 클릭 이벤트 처리 함수
const handleVideoClick = async () => {
  try {
    if (isWaterTime.value) {
      // 물을 줄 시간 (water_count 증가)
      const response = await axios.post(
        'http://localhost:8080/interaction/water',
        { elderId: elderId.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      alert(response.data)
    } else {
      // 평소 쓰다듬기 (pet_count 증가)
      const response = await axios.post(
        'http://localhost:8080/interaction/pet',
        { elderId: elderId.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      alert(response.data)
    }
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error)
    alert('오류가 발생했습니다.')
  }
}

// Water Time 상태 변화 감지
watch(isWaterTime, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    alert('지금 물을 주는 시간이에요!') // 팝업 알림
  }
})

// 컴포넌트 마운트 시 실행
onMounted(() => {
  fetchWeather()
  checkWaterTime() // 초기 Water Time 체크
  setInterval(checkWaterTime, 1000 * 60) // 1분마다 Water Time 체크
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

/* Water Time일 때 전체 화면에서 커서 변경 */
.weather-container.water-mode-cursor {
  cursor: url("@/assets/water_cursor.png"), pointer;
}

/* 비디오 스타일 */
.interactive-video {
  width: 400px;
  border: none;
}

/* Water Time일 때 비디오 위 커서 변경 */
.interactive-video.water-mode {
  cursor: url("@/assets/water_cursor.png"), pointer;
}

/* 텍스트 스타일 */
.water-mode-instruction {
  color: blue;
  font-weight: bold;
  margin-top: 10px;
}

.instruction {
  color: black;
  margin-top: 10px;
}

/* 모든 날씨 배경화면 - 낮밤 구분 */
/* 전체 사진 임시 설정 */
/* cloudsN, brokenCloudsD, brokenCloudsN, rainN, snowN, mistN 사진 임의로 */
.clearD {
  background: url("@/assets/image/clearD_sample.webp") no-repeat center center;
  background-size: cover;
}
.clearN {
  background: url("@/assets/image/clearN_sample.webp") no-repeat center center;
  background-size: cover;
}
.cloudsD {
  background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
  background-size: cover;
}
.cloudsN { 
  background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
  background-size: cover;
}
.brokenCloudsD {
  background: url("@/assets/image/cloudsD_sample.webp") no-repeat center center;
  background-size: cover;
}
.brokenCloudsN {
  background: url("@/assets/image/sample_made.png") no-repeat center center;
  background-size: cover;
}
.rainD {
  background: url("@/assets/image/rainD_sample.webp") no-repeat center center;
  background-size: cover;
}
.rainN {
  background: url("@/assets/image/rainD_sample.webp") no-repeat center center;
  background-size: cover;
}
.snowD {
  background: url("@/assets/image/snowD_sample.webp") no-repeat center center;
  background-size: cover;
}
.snowN {
  background: url("@/assets/image/snowD_sample.jpeg") no-repeat center center;
  background-size: cover;
}
.mistD {
  background: url("@/assets/image/mistD_sample.jpeg") no-repeat center center;
  background-size: cover;
}
.mistN {
  background: url("@/assets/image/mistD_sample.webp") no-repeat center center;
  background-size: cover;
}
.default {
  background: url("@/assets/image/clearD.webp") no-repeat center center;
  background-size: cover;
}
</style>
