<template>
  <div>
    <h1>사용자 페이지</h1>
    <div>
      <!-- 밥 주세요 버튼 (초록색) -->
      <button @click="sendAlert('밥 주세요')" class="green-btn">밥 주세요</button>
      <!-- 물 주세요 버튼 (주황색) -->
      <button @click="sendAlert('물 주세요')" class="orange-btn">물 주세요</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'

let stompClient

const userId = 1 // 현재 사용자의 ID, 실제 구현에서는 동적으로 설정될 수 있습니다.

// WebSocket 연결 및 알림 전송
const connectWebSocket = () => {
  const socket = new SockJS('/ws-alert')
  stompClient = Stomp.over(socket)

  stompClient.connect(
    {},
    (frame) => {
      console.log('Connected to WebSocket: ' + frame)
    },
    (error) => {
      console.error('STOMP connection error:', error)

      // 연결 실패 시 재시도
      setTimeout(connectWebSocket, 5000)
    }
  )
}

// WebSocket을 통해 알림 전송
const sendAlert = (alertType) => {
  const alertMessage = {
    userId: userId,
    message: alertType,
    time: new Date().toLocaleString() // 현재 시간
  }

  // WebSocket을 통해 알림 전송
  stompClient.send('/app/send-alert', {}, JSON.stringify(alertMessage)) // 예시: /app/send-alert 경로로 메시지 전송
}

// Vue 컴포넌트 마운트 시 WebSocket 연결
onMounted(() => {
  connectWebSocket()
})

// Vue 컴포넌트 언마운트 시 WebSocket 연결 종료
onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('Disconnected from WebSocket')
    })
  }
})
</script>

<style scoped>
h1 {
  color: #333;
}

.green-btn {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

.orange-btn {
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
