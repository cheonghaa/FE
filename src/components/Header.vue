<template>
    <header :style="{ backgroundColor: headerColor }" class="Header">
      <h1 class="title">{{ pageTitle }}</h1>
      <nav v-if="!isAdminPage">
        <a
          v-for="link in navigationLinksList"
          :key="link.route"
          :href="link.route"
        >
          {{ link.name }}
        </a>
      </nav>
    </header>
  </template>
  
  <script setup>
  import { useAppSettings } from '@/useAppSettings';
  
  const { pageTitle, isAdminPage, headerColor, navigationLinksList } = useAppSettings('ko');
  </script>
  
  <style scoped>
  /* 헤더 스타일 */
  .Header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* 수직 가운데 정렬 */
    text-align: center;
    width: 100%; /* 전체 화면 너비 */
    height: 70px; /* 고정된 헤더 높이 */
    background-color: #ffe0b2; /* 헤더 배경색 */
    color: #5d4037; /* 텍스트 색상 */
    position: fixed; /* 최상단 고정 */
    top: 0;
    left: 0;
    z-index: 10; /* 다른 요소 위에 표시 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
    box-sizing: border-box; /* 패딩 포함 크기 계산 */
    padding: 10px 0; /* 상하 간격 조정 */
  }
  
  /* 제목 스타일 */
  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0; /* 기본 마진 제거 */
    line-height: 1.2; /* 줄 높이 설정 */
  }
  
  /* 네비게이션 스타일 */
  nav {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
  }
  
  nav a {
    color: #5d4037;
    margin: 0 1rem;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }
  
  nav a:hover {
    color: #bf360c;
  }
  </style>
  