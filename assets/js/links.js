const links = {
    korea: 'pages/korea.html',
        busan: 'pages/korea/busan.html',
        jeju: 'pages/korea/jeju',
    japan: 'pages/japan.html',
        osaka: 'pages/japan/osaka.html',
        tokyo: 'pages/japan/tokyo.html',
        
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

                const url = `template.html?page=${person}`;
                
                // target 속성을 체크하여 새 탭에서 열지 여부를 결정
                const target = link.getAttribute('target');
                if (target === '_blank') {
                    window.open(url, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = url;
                }
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

