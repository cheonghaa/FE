<script setup>
import { RouterView, useRoute } from 'vue-router'
import { provide, computed, ref } from 'vue'
const route = useRoute()
const titleMapping = {
  home: "안녕하세요! 저는 반려식물 '무럭이' 에요🌱 ",
  interaction: '무럭이를 이렇게 사용해보세요🌼'
}
const pageTitle = computed(() => {
  if (['admin', 'adminlogin', 'adminsignup'].includes(route?.name)) {
    return '안녕하세요! 돌봄복지관 관리자 페이지입니다.'
  }
  return titleMapping[route?.name] || '저를 무럭 무럭 예쁘게 키워주세요❤️'
})
const isLoggedIn = ref(false) // 로그인 상태 관리 변수
const isAdminPage = computed(
  () => route.name === 'admin' || route.name === 'adminlogin' || route.name === 'adminsignup'
) // 관리자 페이지 여부 확인
function handleLoginSuccess() {
  isLoggedIn.value = true // 로그인 성공 시 상태를 true로 설정
}
provide('isLoggedIn', isLoggedIn) // provide로 하위 컴포넌트에 전달
provide('handleLoginSuccess', handleLoginSuccess) // 로그인 성공 함수도 제공
// 헤더 색상을 동적으로 설정
const headerColor = computed(() => {
  return isAdminPage.value ? '#A5D6A7' : '#ffe0b2' // admin 페이지에서는 초록색, 기본 페이지에서는 주황색
})
// 푸터 색상을 동적으로 설정
const footerColor = computed(() => {
  return isAdminPage.value ? '#A5D6A7' : '#ffe0b2' // admin 페이지에서는 초록색, 기본 페이지에서는 주황색
})
</script>
<template>
  <div class="app-container">
    <header :style="{ backgroundColor: headerColor }" class="header">
      <h1 class="title">{{ pageTitle }}</h1>
      <nav v-if="!isAdminPage">
        <!-- 관리자 페이지에서는 네비게이션 바 숨김 -->
        <a v-if="!isLoggedIn" href="/">홈</a>
        <a href="/interaction">사용설명서</a>
      </nav>
    </header>
    <div class="background" v-if="!isAdminPage">
      <!-- 관리자 페이지에서는 배경 숨김 -->
      <img src="@/assets/images/orange.gif" alt="배경" class="background-image" />
    </div>
    <main class="content">
      <RouterView />
    </main>

    <footer :style="{ backgroundColor: footerColor }" class="footer">
      <p v-if="isAdminPage">
        개인정보취급방침
        <span class="spacer">|</span> 이메일추출방지정책 <br />
        © 2024 무럭이 서비스 <span class="spacer">|</span> 복지관 관리자 페이지
        <span class="spacer">|</span> 독거노인 돌봄 부서
      </p>
      <p v-else>
        배움터 <span class="spacer">|</span> 사랑의전화 <br />
        © 2024 무럭이 서비스 <span class="spacer">|</span> 무럭이와 함께 행복한 세상을 만들어요
      </p>
    </footer>
  </div>
</template>

<style scoped>
.spacer {
  margin: 0 1rem; /* 좌우로 1.5rem(약 3 스페이스바 정도) 간격 추가 */
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff8f0;
  color: #5a5a5a;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}
.header {
  text-align: center;
  padding: 1rem;
  border-bottom: 2px solid #c0c0c0;
  margin: 0;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.background-image {
  width: auto;
  height: auto;
  max-width: 800px;
  max-height: 600px;
  object-fit: none;
}
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(15px);
}
.title {
  font-size: 1.5rem;
  color: #5d4037;
}
nav a {
  color: #5d4037;
  margin: 0 1rem;
  text-decoration: none;
  font-weight: bold;
}
nav a:hover {
  color: #bf360c;
}
.footer {
  color: #5d4037;
  text-align: center;
  padding: 1rem;
  border-top: 2px solid #c0c0c0;
  font-size: 0.9rem;
}
</style>
