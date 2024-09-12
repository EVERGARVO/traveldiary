document.addEventListener('DOMContentLoaded', () => {
    // 인증 상태를 확인합니다.
    if (!localStorage.getItem('authenticated')) {
        window.location.href = 'password.html'; // 암호 페이지로 리디렉션
    }
});
