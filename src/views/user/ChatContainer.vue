<!-- src/components/ChatContainer.vue -->
<template>
  <div class="chat-container">
    <p>
      <button @click="startChat" class="chat-button">
        🎙️ 무럭이와 함께 대화해요! 저를 눌러주세요! 🎙️
      </button>
    </p>
    <div class="mooluck-chat">
      <div class="chat-box">
        <img src="@/assets/chatbot.png" alt="Chatbot" class="chat-bg" />
        <div class="chat-content">
          <p v-for="(message, index) in chatMessages" :key="index">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'

// const props = defineProps({
//   chatMessages: {
//     type: Array,
//     required: true
//   }
// })

const emit = defineEmits(['startChat'])

const startChat = () => {
  emit('startChat')
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-box {
  position: relative; /* 자식 요소가 이 요소를 기준으로 정렬 */
  width: 100%; /* 부모 요소의 너비를 화면에 맞춤 */
  max-width: 800px; /* 원하는 최대 너비 설정 */
  height: auto; /* 부모 요소의 높이를 자식 내용에 따라 조정 */
  margin: 20px auto; /* 중앙 정렬 */
  border-radius: 15px; /* 모서리를 둥글게 */
  overflow: hidden; /* 내용이 넘치지 않도록 */
}

.chat-bg {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 박스에 꽉 차게 */
  border-radius: 15px;
  z-index: 1; /* 이미지 레이어 */
}

.chat-content {
  position: relative; /* 부모 요소를 기준으로 위치 지정 */
  display: flex; /* 플렉스 박스 사용 */
  flex-direction: column; /* 텍스트를 세로로 정렬 */
  justify-content: center; /* 세로 중앙 정렬 */
  align-items: center; /* 가로 중앙 정렬 */
  color: #333; /* 텍스트 색상 */
  font-size: 14px; /* 텍스트 크기 */
  font-family: Arial, sans-serif; /* 글꼴 */
  background: rgba(255, 255, 255, 0.9); /* 약간 투명한 흰색 배경 */
  border-radius: 15px; /* 부모와 동일한 둥근 모서리 */
  width: 100%; /* 부모 요소 너비를 따름 */
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
</style>
