<template>
  <div :class="['weather-container', backgroundClass]">
    <p>현재 날씨: {{ weatherDescription }}</p>
    <div class="mooluck-container">
      <video class="interactive-video" autoplay muted loop playsinline @click="handleVideoClick">
        <source src="@/assets/video/mooluck2.mp4" type="video/mp4" />
      </video>
      <p class="instruction">무럭이를 쓰다듬어주세요!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const weatherDescription = ref('')
const backgroundClass = ref('')
const elderId = ref(1) // Elder ID를 고정값으로 설정. 필요시 동적으로 가져올 수 있음.

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

const getWeatherDescription = (icon) => {
  const weatherMapping = {
    '01': 'Clear',
    '02': 'Clouds',
    '03': 'Clouds',
    '04': 'Broken Clouds',
    '09': 'Rain',
    10: 'Rain',
    11: 'Rain',
    13: 'Snow',
    50: 'Mist'
  }
  const code = icon.slice(0, 2)
  return weatherMapping[code] || 'Default'
}

const setBackground = (icon) => {
  const code = icon.slice(0, 2)
  const dayNight = icon.endsWith('d') ? 'D' : 'N'
  const backgroundMapping = {
    '01': 'clearD_sample',
    '02': 'cloudsD_sample',
    '03': 'cloudsD_sample',
    '04': 'cloudsD_sample',
    '09': 'rainD_sample',
    10: 'rainD_sample',
    11: 'rainD_sample',
    13: 'snowD_sample',
    50: 'mistD'
  }
  backgroundClass.value = backgroundMapping[code] || 'default'
}

const handleVideoClick = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/interaction/pet',
      { elderId: elderId.value },
      {
        headers: {
          'Content-Type': 'application/json' // 명시적 JSON Content-Type 설정
        }
      }
    )
    alert(response.data) // API 응답 메시지를 출력
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error)
    alert('무럭이를 쓰다듬는 중 오류가 발생했습니다.')
  }
}

onMounted(() => {
  fetchWeather()
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

/* 배경 이미지 클래스 */
.clearD_sample {
  background-image: url('@/assets/image/clearD_sample.webp');
}

.cloudsD_sample {
  background-image: url('@/assets/image/cloudsD_sample.webp');
}

.rainD_sample {
  background-image: url('@/assets/image/rainD_sample.webp');
}

.snowD_sample {
  background-image: url('@/assets/image/snowD_sample.webp');
}

.mistD {
  background-image: url('@/assets/image/mistD.jpg');
}

.default {
  background-color: #cccccc;
}

.mooluck-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.interactive-video {
  width: 400px;
  border: none;
  box-shadow: none;
  cursor: pointer;
  margin: 0;
  padding: 0;
  background: transparent;
}

.instruction {
  margin-top: 10px;
  font-size: 1.2rem;
  color: #333;
  text-align: center;
}
</style>
