<template>
  <div>
    <h1>Mooluck</h1>
    <div>담당 독거노인 현황입니다.</div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <canvas id="interactionChart"></canvas>
    </div>
    <!-- 데이터 추가 폼 -->
    <div>
      <input v-model="newName" placeholder="이름" />
      <input v-model="newAge" placeholder="나이" type="number" />
      <input v-model="newPhoneNum" placeholder="전화번호" type="number" />
      <input v-model="newLocation" placeholder="주소" />
      <input v-model="newStatus" placeholder="상태" />
      <input v-model="newInteractionNum" placeholder="상호작용 횟수" type="number" />
      <button @click="addRecord">추가</button>
    </div>

    <!-- 테이블 영역 -->
    <table class="data-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>나이</th>
          <th>전화번호</th>
          <th>주소</th>
          <th>상태</th>
          <th>상호작용 횟수</th>
          <th>마지막 상호작용 시간</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in records" :key="index">
          <td>
            <input v-if="editIndex === index" v-model="record.name" />
            <span v-else>{{ record.name }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.age" type="number" />
            <span v-else>{{ record.age }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.phoneNum" />
            <span v-else>{{ record.phoneNum }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.location" />
            <span v-else>{{ record.location }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.status" />
            <span v-else>{{ record.status }}</span>
          </td>
          <td>
            <input v-if="editIndex === index" v-model="record.interactionNum" type="number" />
            <span v-else>{{ record.interactionNum }}</span>
          </td>
          <td>
            <span>{{ record.lastInteractionTime }}</span>
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
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

const records = ref([])

const newName = ref('')
const newAge = ref('')
const newPhoneNum = ref('')
const newLocation = ref('')
const newStatus = ref('')
const newInteractionNum = ref('')
const editIndex = ref(null)
let chart = null

// 현재 시간을 포맷팅하는 함수
const getCurrentTime = () => {
  const date = new Date()
  return date.toLocaleString()
}

// 차트 그리기 함수
const drawChart = () => {
  const ctx = document.getElementById('interactionChart').getContext('2d')

  // 기존 차트를 제거하고 새로 그리기
  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: records.value.map((record) => record.lastInteractionTime),
      datasets: [
        {
          label: '상호작용 횟수',
          data: records.value.map((record) => record.interactionNum),
          borderColor: 'blue',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // 비율 유지를 false로 설정하여 높이에 맞게 조정
      scales: {
        x: {
          title: {
            display: true,
            text: '마지막 상호작용 시간'
          }
        },
        y: {
          title: {
            display: true,
            text: '상호작용 횟수'
          },
          beginAtZero: true
        }
      }
    }
  })
}

onMounted(drawChart)
watch(records, drawChart, { deep: true })

// 추가(Create) 기능
const addRecord = () => {
  if (
    newName.value &&
    newAge.value &&
    newPhoneNum.value &&
    newLocation.value &&
    newStatus.value &&
    newInteractionNum.value
  ) {
    records.value.push({
      name: newName.value,
      age: parseInt(newAge.value),
      phoneNum: newPhoneNum.value,
      location: newLocation.value,
      status: newStatus.value,
      interactionNum: parseInt(newInteractionNum.value),
      lastInteractionTime: getCurrentTime()
    })
    newName.value = ''
    newAge.value = ''
    newPhoneNum.value = ''
    newLocation.value = ''
    newStatus.value = ''
    newInteractionNum.value = ''
  }
}

// 수정 준비
const startEditing = (index) => {
  editIndex.value = index
}

// 업데이트(Update) 기능
const updateRecord = (index) => {
  records.value[index].lastInteractionTime = getCurrentTime()
  editIndex.value = null
}

// 삭제(Delete) 기능
const deleteRecord = (index) => {
  records.value.splice(index, 1)
  editIndex.value = null
}
</script>

<style scoped>
/* 모든 기본 여백과 패딩 제거 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.chart-container {
  width: 800px;
  height: 400px; /* 높이 조정 */
  margin: 0 auto;
  padding: 0;
}

.data-table {
  margin-top: 0; /* 테이블 위쪽 여백을 0으로 설정 */
  border-collapse: collapse;
  width: 100%;
}

.data-table,
th,
td {
  border: 1px solid #ddd;
  text-align: center;
}

th,
td {
  padding: 8px;
}

thead {
  background-color: #f2f2f2;
}
</style>
<template>
  <div>관리자 페이지</div>
</template>

<script setup></script>

<style scoped></style>
