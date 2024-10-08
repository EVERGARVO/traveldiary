document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzDyPo_ZPVE4x86ZhXmVaZugJJf20T1LIyPfh0BF_fzrNAyLavcO3BtFkyHOJpZC8yz/exec'; // 위에서 제공받은 구글 앱 스크립트 웹 앱 URL로 교체

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const enteredPassword = passwordInput.value;

        try {
            const response = await fetch(scriptUrl, {
                method: 'POST',
                body: new URLSearchParams({
                    'password': enteredPassword
                })
            });
            const result = await response.text();

            if (result === 'success') {
                localStorage.setItem('authenticated', 'true');
                window.location.href = 'index.html'; // 인증 후 이동할 페이지
            } else {
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.style.display = 'block';
        }
    });
});
