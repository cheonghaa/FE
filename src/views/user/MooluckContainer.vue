<template>
  <div class="mooluck-container">
    <img
      class="interactive-video"
      src="@/assets/video/mooluck_gif.gif"
      :class="{ 'water-mode': isWaterTime }"
      @mouseover="setHover(true)"
      @mouseleave="setHover(false)"
      @click.stop="handleVideoClick"
    />
    <p class="instruction" v-if="!isWaterTime">🌱무럭이를 쓰다듬어주세요🌱</p>
    <p v-else class="water-mode-instruction">💧무럭이에게 물을 주세요💧</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isWaterTime = ref(false)

const setHover = (state) => {
  console.log(state ? 'Hovering over Mooluck' : 'Not hovering')
}

const handleVideoClick = () => {
  console.log('Video clicked')
}
</script>

<style scoped>
/* MooluckContainer 관련 스타일 */
</style>
