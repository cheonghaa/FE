import axios from 'axios'; // axios 모듈 import


export async function elderLogin(elderAccount, elderPwd) {
  try {
    const response = await axios.post('http://localhost:8080/api/elders/login', {
      elderAccount,
      elderPwd,
    });

    console.log('서버 응답:', response.data); // 응답 데이터 확인

    // success와 token 처리
    if (response.data.success === 'true' && response.data.response?.data?.accessToken) {
      const token = response.data.response.data.accessToken; // accessToken 추출
      localStorage.setItem('elder_token', token); // localStorage에 저장
    } else {
      throw new Error(response.data.response?.message || '로그인 실패: 토큰이 없습니다.');
    }
  } catch (error) {
    console.error('Elder 로그인 실패:', error.response?.data || error.message);
    throw error;
  }
}


export async function adminLogin(email, password) {
  try {
    const response = await axios.post('http://localhost:8080/admin/login', {
      staff_email: email,
      password,
    });

    console.log('서버 응답:', response.data);

    // success가 문자열일 가능성 처리
    if (response.data.success === 'true' || response.data.success === true) {
      const token = response.data.response.data.token; // 서버에서 반환된 accessToken
      localStorage.setItem('admin_token', token); // accessToken 저장
    } else {
      throw new Error(response.data.message || 'Invalid admin credentials');
    }
  } catch (error) {
    console.error('관리자 로그인 실패:', error.response?.data || error.message);
    throw error;
  }
}

export async function login(type, credentials, router) {
  if (type === 'elder') {
    await elderLogin(credentials.elderAccount, credentials.elderPwd);
  } else if (type === 'admin') {
    await adminLogin(credentials.email, credentials.password);
  } else {
    console.error(`알 수 없는 로그인 유형: ${type}`);
    throw new Error(`알 수 없는 로그인 유형: ${type}`);
  }
}
