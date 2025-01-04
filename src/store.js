// src/store.js
import { reactive } from 'vue';

export const store = reactive({
  isAuthenticated: false, // 인증 상태
  token: null,            // 토큰
  setAuthentication(token) {
    this.isAuthenticated = !!token;
    this.token = token;
  },
  clearAuthentication() {
    this.isAuthenticated = false;
    this.token = null;
  },
});
