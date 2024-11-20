// src/managers/WaterTimeManager.js
import { ref } from 'vue'

export const isWaterTime = ref(false)
const waterStartTime = '23:52'
const waterEndTime = '23:53'

// 현재 Water Time 상태를 체크하는 함수
export const checkWaterTime = () => {
  const currentTime = new Date().toTimeString().slice(0, 5) // HH:mm 형식
  isWaterTime.value = currentTime >= waterStartTime && currentTime <= waterEndTime
}

// 주기적으로 Water Time 상태를 체크하도록 설정
export const startWaterTimeInterval = () => {
  checkWaterTime() // 초기 체크
  setInterval(checkWaterTime, 1000 * 60) // 1분마다 체크
}
