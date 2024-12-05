<template>
    <footer :style="{ backgroundColor: footerColor }" class="Footer">
      <p>
        <span v-for="(text, index) in footerTextsList" :key="index">
          {{ text }}
          <span v-if="index < footerTextsList.length - 1" class="spacer">|</span>
        </span>
      </p>
    </footer>
  </template>
  
  <script setup>
  import { useAppSettings } from '@/useAppSettings';
  
  const { footerColor, footerTextsList } = useAppSettings('ko');
  </script>
  
  <style scoped>
  /* 푸터 스타일 */
  .Footer {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.9rem;
    color: #5d4037;
    background-color: #ffe0b2; /* 푸터 배경색 */
    position: fixed; /* 화면 하단 고정 */
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%; /* 전체 화면 너비 */
    height: 50px; 
  }
  
  .spacer {
    margin: 0 0.5rem; /* 텍스트 사이 간격 */
  }
  </style>
  