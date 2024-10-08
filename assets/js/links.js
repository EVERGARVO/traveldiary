const links = {
    korea: 'pages/korea.html',
        busan: 'pages/korea/busan.html',
            busan241003: 'pages/korea/busan/busan241003',
            busan241004: 'pages/korea/busan/busan241004',
            busan241005: 'pages/korea/busan/busan241005',
        jeju: 'pages/korea/jeju',
    japan: 'pages/japan.html',
        osaka: 'pages/japan/osaka.html',
            osaka01: 'pages/japan/osaka/osaka01.html',
            osaka02: 'pages/japan/osaka/osaka02.html',
        tokyo: 'pages/japan/tokyo.html',
            tokyo01: 'pages/japan/tokyo/tokyo01.html',
        
};

// 링크를 초기화하는 함수
function initializeLinks() {
    // 카드에서 링크 설정
    document.querySelectorAll('.card').forEach(card => {
        const person = card.getAttribute('data-person');
        if (person && links[person]) {
            card.setAttribute('href', `template.html?page=${person}`);
        }
    });

    // 동적 링크 설정
    document.querySelectorAll('a[data-person]').forEach(link => {
        const person = link.getAttribute('data-person');
        if (person && links[person]) {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 링크 이동 방지

                // 동적 링크를 설정하여 페이지를 로드합니다.
                window.location.href = `template.html?page=${person}`;
            });
        }
    });
}

// 페이지 로드 시 링크 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeLinks();
});

// 동적으로 콘텐츠가 로드된 후에도 다시 링크를 초기화
document.addEventListener('content-loaded', () => {
    initializeLinks();
});

