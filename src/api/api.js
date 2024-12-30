// api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 서버의 기본 URL
  withCredentials: true, // 쿠키와 자격 증명 포함
  headers: {
    'Content-Type': 'application/json', // 기본 Content-Type 설정
  },
});

export default apiClient;
