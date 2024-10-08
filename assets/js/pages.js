document.addEventListener('DOMContentLoaded', () => {
    // body 태그의 data-page 속성 값 읽기
    const pageType = document.body.getAttribute('data-page');
    
    // 기존 배경 스타일을 초기화
    document.body.className = ''; // body의 모든 클래스를 제거

    // 페이지 타입에 맞는 배경 스타일 추가
    if (pageType) {
        document.body.classList.add(`${pageType}-background`);
    }
});

