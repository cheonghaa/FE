<template>
  <div
    :class="['weather-container', backgroundClass, { 'water-mode-cursor': isWaterTime }]"
    @click="closeWaterPopup"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isWaterTime = ref(false)
const backgroundClass = ref('')
const closeWaterPopup = () => {
  isWaterTime.value = false
}
</script>

<style scoped>
/* WeatherContainer 관련 스타일 */
</style>
