import { ref } from 'vue';
export const isWaterTime = ref(false);
let hasGivenWater = false; 
const waterStartTime = '23:01'; 
const waterEndTime = '23:05';  

if (!waterStartTime || !waterEndTime) {
  console.error('waterStartTime 또는 waterEndTime이 정의되지 않았습니다!');
}

// 현재 시간이 Water Time 범위에 있는지 확인
export const checkWaterTime = () => {
  const currentTime = new Date();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  const [startHour, startMinute] = waterStartTime.split(':').map(Number);
  const [endHour, endMinute] = waterEndTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
    if (!isWaterTime.value) {
      console.log('WaterTime 시작됨');
      isWaterTime.value = true; // Water Time 활성화
      hasGivenWater = false; // 새로운 주기에서는 물을 다시 줘야 함
    }
  } else {
    if (isWaterTime.value) {
      console.log('WaterTime 종료됨');
      isWaterTime.value = false; // Water Time 비활성화
      hasGivenWater = false; // 상태 초기화
    }
  }
};

export const startWaterTimeInterval = () => {
  checkWaterTime(); // 초기 상태 확인
  setInterval(checkWaterTime, 1000 * 60); // 1분 간격으로 상태 체크
};

export const resetWaterTime = () => {
  console.log('WaterTime 상태 초기화');
  isWaterTime.value = false;
  hasGivenWater = true; // 물을 준 상태로 설정
};