<template>
  <div v-if="showWaterPopup" class="water-popup" @click="closeWaterPopup">
    <p class="popup-title">💧물이 필요해요💧</p>
    <p class="popup-message">
      "무럭이 목말라요!" <br />
      지금 바로 무럭이에게 물을 주세요
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showWaterPopup = ref(true)
const closeWaterPopup = () => {
  showWaterPopup.value = false
}
</script>

<style scoped>
/* WaterPopup 관련 스타일 */
</style>
