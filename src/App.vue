<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
// import { useAppSettings } from '@/useAppSettings';
import { provide } from 'vue';
function handleLoginSuccess() {
  console.log('로그인 성공!');
  // 로그인 성공 후 처리할 로직
}
provide('handleLoginSuccess', handleLoginSuccess);
// const { isAdminPage, images } = useAppSettings('ko');
</script>



<template>
  <div>
    <Header/>
    <main class="content">
      <RouterView/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
</style>
