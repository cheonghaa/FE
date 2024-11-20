<template>
  <div>
    <h1>Mooluck</h1>
    <div>담당 독거노인 현황입니다.</div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <canvas id="interactionChart"></canvas>
    </div>

    <!-- 테이블 영역 -->
    <table class="data-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>주소</th>
          <th>상태</th>
          <th>상호작용 횟수</th>
          <th>마지막 체크인</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>
            <input v-if="editIndex === index" v-model="record.elderName" />
            <span v-else>{{ record.elderName }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.elderAddress" />
            <span v-else>{{ record.elderAddress }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.status" />
            <span v-else>{{ record.status }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.totalCount" type="number" />
            <span v-else>{{ record.totalCount }}</span>
          </td>
          <td>
            <span>{{ record.lastCheckIn }}</span>
          </td>
          <td>
            <button v-if="editIndex === index" @click="updateRecord(index)">저장</button>
            <button v-else @click="startEditing(index)">수정</button>
            <button @click="deleteRecord(index)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <button @click="fetchData(1)">데이터 불러오기</button>
  <button @click="logout">로그아웃</button>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const records = ref([])
const editIndex = ref(null)
let chart = null
const router = useRouter()

// API 데이터 불러오기
const fetchData = async (staffId) => {
  try {
    const response = await axios.get(`http://localhost:8080/admin/table?staffId=${staffId}`)
    const data = response.data.response.data
    records.value = data.map((item) => ({
      elderName: item.elderName,
      elderAddress: item.elderAddress,
      status: item.status,
      totalCount: item.totalCount,
      lastCheckIn: item.lastCheckIn
    }))
  } catch (error) {
    console.error('데이터 로드 실패:', error)
    alert('데이터를 불러오는 데 실패했습니다.')
  }
}

// 차트 그리기
const drawChart = () => {
  const ctx = document.getElementById('interactionChart').getContext('2d')
  if (chart) chart.destroy()

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: records.value.map((record) => record.lastCheckIn),
      datasets: [
        {
          label: '총 상호작용 횟수',
          data: records.value.map((record) => record.totalCount),
          borderColor: 'blue',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: '마지막 체크인 시간' }
        },
        y: {
          title: { display: true, text: '상호작용 횟수' },
          beginAtZero: true
        }
      }
    }
  })
}

watch(
  records,
  () => {
    if (records.value.length) drawChart()
  },
  { deep: true }
)

// 수정 준비
const startEditing = (index) => {
  editIndex.value = index
}

// 업데이트(Update) 기능
const updateRecord = (index) => {
  records.value[index].lastCheckIn = new Date().toLocaleString()
  editIndex.value = null
}

// 삭제(Delete) 기능
const deleteRecord = (index) => {
  records.value.splice(index, 1)
  editIndex.value = null
}

// 로그아웃
const logout = () => {
  alert('로그아웃되었습니다.')
  router.push('/login')
}

onMounted(() => fetchData(1)) // 기본 ID로 데이터 로드
</script>

<style scoped>
.chart-container {
  width: 800px;
  height: 400px;
  margin: 0 auto;
}

.data-table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

thead {
  background-color: #f2f2f2;
}
</style>
