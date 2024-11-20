import { ref } from 'vue'

export const showPopup = ref(false)
export const popupMessage = ref('')

// 팝업 열기 함수
export const openPopup = (message) => {
  popupMessage.value = message
  showPopup.value = true
  // 5초 후 자동으로 팝업 닫기
  setTimeout(() => {
    showPopup.value = false
  }, 5000)
}

// 팝업 닫기 함수
export const closePopup = () => {
  showPopup.value = false
}
