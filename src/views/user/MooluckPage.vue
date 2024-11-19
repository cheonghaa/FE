<template>
  <div :class="['weather-container', backgroundClass]">
    <p>현재 날씨: {{ weatherDescription }}</p>
    <div class="mooluck-container">
      <video
        class="interactive-video"
        autoplay
        muted
        loop
        playsinline
        :class="{ 'water-mode': isWaterTime }"
        @click="handleVideoClick"
      >
        <source src="@/assets/video/mooluck_noBackground.mp4" type="video/mp4" />
      </video>
      <p class="instruction">무럭이를 쓰다듬어주세요!</p>
      <p v-if="isWaterTime" class="water-mode-instruction">지금은 물을 줄 시간입니다!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 날씨 관련 데이터
const weatherDescription = ref('')
const backgroundClass = ref('')

// Elder ID 설정
const elderId = ref(1) // Elder ID를 고정값으로 설정. 필요시 동적으로 가져올 수 있음.

// Water Time 관련 데이터
const isWaterTime = ref(false)
const waterStartTime = "20:05" // 물 주기 시작 시간 (HH:mm)
const waterEndTime = "20:15" // 물 주기 끝 시간 (HH:mm)

// 현재 시간이 Water Time인지 확인
const checkWaterTime = () => {
  const currentTime = new Date().toTimeString().slice(0, 5) // HH:mm 형식
  isWaterTime.value = currentTime >= waterStartTime && currentTime <= waterEndTime
}

// 날씨 데이터 가져오기
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

// 날씨 아이콘 매핑
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

// 배경 설정
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

// 클릭 이벤트 처리
const handleVideoClick = async () => {
  try {
    if (isWaterTime.value) {
      // Water Time: water_count 증가
      const response = await axios.post(
        'http://localhost:8080/interaction/water',
        { elderId: elderId.value },
        { headers: { 'Content-Type': 'application/json' } }
      )
      alert(response.data)
    } else {
      // 평소: pet_count 증가
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

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(() => {
  fetchWeather()
  checkWaterTime() // 처음 로드 시 Water Time 체크
  setInterval(checkWaterTime, 1000 * 60) // 1분마다 Water Time 체크
})
</script>

<style scoped>
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

.interactive-video {
  width: 400px;
  border: none;
  cursor: pointer;
}

.interactive-video.water-mode {
  cursor: url("@/assets/water_cursor.png"), pointer;
}

.water-mode-instruction {
  color: blue;
  font-weight: bold;
  margin-top: 10px;
}
</style>
