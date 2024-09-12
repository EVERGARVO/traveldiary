document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    // 기존 배경 스타일 제거
    document.body.classList.remove('japan-background', 'korea-background');

    // 페이지에 맞는 배경 스타일 추가
    if (page === 'japan') {
        document.body.classList.add('japan-background');
    } else if (page === 'korea') {
        document.body.classList.add('korea-background');
    }
});
