export function logout(type) {
  if (type === 'elder') {
    localStorage.removeItem('elder_token'); // Elder 사용자 토큰 삭제
  } else if (type === 'admin') {
    localStorage.removeItem('admin_token'); // 관리자 토큰 삭제
  } else {
    console.error(`알 수 없는 사용자 유형: ${type}`);
  }
  alert('로그아웃되었습니다.');
}



// export function logout(router) {

//   localStorage.removeItem('token');
  
//   alert('로그아웃 되었습니다.');

//   router.push('/');

//   window.history.pushState(null, '', '/');
// }
