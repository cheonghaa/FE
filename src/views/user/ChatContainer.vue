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
import { ref } from 'vue'

const chatMessages = ref(['안녕하세요! 무럭이에요.'])
const startChat = () => {
  chatMessages.value.push('무럭이와 대화 시작!')
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
  position: relative;
}

.chat-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  z-index: 1;
}

.chat-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: black;
  font-size: 16px;
  font-family: Arial, sans-serif;
  z-index: 2;
  background: rgba(0, 0, 0, 0);
  border-radius: 15px;
}

.chat-button {
  background-color: #ffecb3;
  color: #ff7043;
  font-family: 'Comic Sans MS', 'Arial', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #ffab91;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.chat-button:hover {
  background-color: #ffe0b2;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}

.chat-button:active {
  background-color: #ffcc80;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  transform: translateY(1px);
}
</style>
