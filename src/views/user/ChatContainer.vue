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
/* ChatContainer 관련 스타일 */
</style>
