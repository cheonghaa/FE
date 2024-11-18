<template>
  <div>
    <h1>관리자 페이지</h1>
    <button @click="logout">로그아웃</button>
    <table border="1">
      <thead>
        <tr>
          <th>알람 ID</th>
          <th>사용자 ID</th>
          <th>시간</th>
          <th>메세지</th>
          <th>상태 (해결 여부)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(alert, index) in alerts" :key="index">
          <td>{{ alert.alertId }}</td>
          <td>{{ alert.elderId }}</td>
          <td>{{ alert.alertTime || 'N/A' }}</td>
          <td>{{ alert.alertType || '알림 없음' }}</td>
          <td>{{ alert.resolved ? '해결됨' : '미해결' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { useRouter } from 'vue-router'

const alerts = ref([]) // 알람 데이터를 저장할 배열
const router = useRouter()
let stompClient // STOMP 클라이언트 객체

// WebSocket 연결 및 알림 수신
const connectWebSocket = () => {
  const token = localStorage.getItem('token') // 로컬스토리지에서 JWT 가져오기
  if (!token) {
    alert('로그인이 필요합니다.')
    router.push('/login') // 로그인 페이지로 리다이렉트
    return
  }

  const socket = new SockJS(`/ws-alert?token=${token}`) // JWT를 쿼리 파라미터로 전달
  stompClient = Stomp.over(socket)

  stompClient.connect(
    {},
    (frame) => {
      console.log('WebSocket 연결 성공: ' + frame)
      stompClient.subscribe('/topic/admin-alerts', (alertMessage) => {
        const alert = JSON.parse(alertMessage.body)
        alerts.value.push(alert) // 알림 데이터를 테이블에 추가
      })
    },
    (error) => {
      console.error('WebSocket 연결 실패:', error)
      setTimeout(connectWebSocket, 5000) // 연결 실패 시 5초 후 재시도
    }
  )
}

// 로그아웃 요청
const logout = async () => {
  try {
    const token = localStorage.getItem('token') // 로컬스토리지에서 JWT 가져오기
    if (!token) {
      alert('로그인 상태가 아닙니다.')
      return
    }

    const response = await axios.post(
      '/api/admin/logout', // 상대 경로로 수정
      {},
      {
        headers: {
          Authorization: `Bearer ${token}` // JWT를 Authorization 헤더에 포함
        }
      }
    )
    alert(response.data.message || '로그아웃 성공')
    localStorage.removeItem('token') // 토큰 삭제
    router.push('/login') // 로그인 페이지로 이동
  } catch (error) {
    console.error('로그아웃 실패:', error)
    alert('로그아웃 실패: ' + (error.response?.data?.message || '서버와 연결할 수 없습니다.'))
  }
}

onMounted(() => {
  connectWebSocket()
})

onUnmounted(() => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('WebSocket 연결 해제')
    })
  }
})
</script>

<style scoped>
h1 {
  color: #333;
}

button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
