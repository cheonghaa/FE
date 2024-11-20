<template>
  <div :class="['weather-container', backgroundClass]">
    <p>현재 날씨: {{ weatherDescription }}</p>
    <div class="mooluck-container">
      <img
        class="interactive-gif"
        src="@/assets/video/mooluck123.gif"
        alt="무럭이 GIF"
        @click="handleGifClick"
      />
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
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

        const response = await axios.get(
          `http://localhost:8080/api/weather?lat=${latitude}&lon=${longitude}`
        )
        console.log('API 응답 데이터:', response.data)

        const weatherIcon = response.data.response.data.weatherIcon // API에서 반환한 weatherIcon
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
  const code = icon.slice(0, 2) // 아이콘의 숫자만 떼어내기, fetch할 때 weather의 icon으로 가져와서 ok
  return weatherMapping[code] || 'Default'
}

const setBackground = (icon) => {
  const code = icon.slice(0, 2)
  const dayNight = icon.endsWith('d') ? 'D' : 'N'
  const backgroundMapping = {
    '01': `clear${dayNight}`,
    '02': `clouds${dayNight}`,
    '03': `clouds${dayNight}`,
    '04': `brokenClouds${dayNight}`,
    '09': `rain${dayNight}`,
    10: `rain${dayNight}`,
    11: `rain${dayNight}`,
    13: `snow${dayNight}`,
    50: `mist${dayNight}`
  }
  const newBackgroundClass = backgroundMapping[code] || 'default'
  console.log('backgroundClass set to:', newBackgroundClass)
  backgroundClass.value = backgroundMapping[code] || 'default'
}

const handleGifClick = async () => {
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

/* 모든 날씨 배경화면 - 낮밤 구분 */
/* 전체 사진 임시 설정 */
/* cloudsN, brokenCloudsD, brokenCloudsN, rainN, snowN, mistN 사진 임의로 */
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
  background: url('@/assets/image/cloudsD_sample.webp') no-repeat center center;
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
  background-color: white;
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
