// 스크립트 파일 (scripts.js)

document.addEventListener('DOMContentLoaded', () => {
    // 헤더와 푸터 파일을 동적으로 로드
    fetch('includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // 현재 문서의 title 태그에서 제목을 읽어옵니다.
            const pageTitle = document.title;
            document.getElementById('header-title').textContent = pageTitle;

            // 페이지 로드 시 목차 생성
            generateTOC();
        });

    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // URL의 쿼리 파라미터에서 'page' 값 추출
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');

    if (page) {
        // 페이지 본문을 동적으로 로드
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(data => {
                const mainContent = document.getElementById("main-content");
                // 본문 내용을 덮어씌우기 전에 초기화
                mainContent.innerHTML = '';

                // 본문 내용 추가
                mainContent.innerHTML = data;

                // 본문에서 첫 번째 h 태그를 찾아서 제목으로 설정
                const firstHeading = mainContent.querySelector('h1') || 
                                     mainContent.querySelector('h2') || 
                                     mainContent.querySelector('h3') || 
                                     mainContent.querySelector('h4') || 
                                     mainContent.querySelector('h5') || 
                                     mainContent.querySelector('h6');

                if (firstHeading) {
                    const titleText = firstHeading.textContent;
                    document.title = titleText;

                    // 헤더의 제목을 업데이트
                    const headerTitle = document.getElementById('header-title');
                    if (headerTitle) {
                        headerTitle.textContent = titleText;
                    }
                }

                // 목차 생성
                generateTOC();

                // 동적으로 로드된 콘텐츠에 대해 캐러셀 초기화 실행
                const carousels = mainContent.querySelectorAll('.carousel');
                carousels.forEach(initCarousel); // 새로 불러온 캐러셀에 대해 초기화

                // 팝업 스크립트 초기화
                initializeModals();

                // 폼 초기화
                const event = new Event('content-loaded');
                document.dispatchEvent(event);

                // 코멘트 폼 초기화
                initializeCommentForms();
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // 페이지 로딩 시 본문에 페이드 인 효과 추가
    document.body.classList.add('fade-in');
});

function initializeCommentForms() {
    document.querySelectorAll('.comment-container').forEach(container => {
        const formId = container.getAttribute('data-form-id');
        loadTemplate(formId, container);
    });
}



// 텍스트 박스 동작
document.addEventListener('DOMContentLoaded', () => {
    const textBoxes = document.querySelectorAll('.text-box');

    textBoxes.forEach((textBox) => {
        // 페이지 로드 시 각 텍스트 박스의 내용 불러오기
        textBox.value = localStorage.getItem(textBox.id) || '';
        adjustHeight(textBox);

        // 텍스트 박스 내용이 변경될 때 로컬 스토리지에 저장하고 높이 조정
        textBox.addEventListener('input', () => {
            localStorage.setItem(textBox.id, textBox.value);
            adjustHeight(textBox);
        });
    });

    // 자동으로 텍스트 박스 높이 조정
    function adjustHeight(textBox) {
        textBox.style.height = 'auto'; // 높이를 초기화
        textBox.style.height = `${textBox.scrollHeight}px`; // 내용에 맞게 높이 조정
    }

    // 다른 곳을 클릭했을 때 텍스트 박스 비활성화
    document.addEventListener('click', (event) => {
        textBoxes.forEach((textBox) => {
            if (!textBox.contains(event.target)) {
                textBox.blur(); // 텍스트 박스의 포커스를 잃게 함
            }
        });
    });
});
  


// 팝업 동작
// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.popup-link');
    const closeButtons = document.querySelectorAll('.close');

    // 링크 클릭 시 해당 모달 열기
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const popupId = trigger.getAttribute('data-popup');
            const modal = document.getElementById(popupId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    // 닫기 버튼 클릭 시 모달 닫기
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
});

// 본문 로드 후 모달 스크립트 다시 초기화
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.popup-link');
    const closeButtons = document.querySelectorAll('.close');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const popupId = trigger.getAttribute('data-popup');
            const modal = document.getElementById(popupId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}




// 초기화 함수: 캐러셀에 필요한 설정을 적용합니다.
function initCarousel(carousel) {
    const slides = carousel.querySelectorAll('.carousel-item');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');

    // 인디케이터가 제대로 있는지 확인 후 동적 생성
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.onclick = () => showSlide(carousel.id, index);
            if (index === 0) {
                indicator.classList.add('active');
            }
            indicatorsContainer.appendChild(indicator);
        });
    }
}

// 슬라이드를 표시하고 인디케이터를 업데이트하는 함수
function showSlide(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    // 슬라이드 인덱스 조정 (순환 가능)
    if (index >= totalSlides) {
        index = 0;
    } else if (index < 0) {
        index = totalSlides - 1;
    }

    // 슬라이드 이동
    carousel.querySelector('.carousel-inner').style.transform = `translateX(${-index * 100}%)`;

    // 현재 활성 슬라이드 및 인디케이터 업데이트
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    const indicators = carousel.querySelectorAll('.carousel-indicators span');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// 다음 슬라이드로 이동
function nextSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(slide => slide.classList.contains('active'));
    showSlide(carouselId, currentSlide + 1);
}

// 이전 슬라이드로 이동
function prevSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    const currentSlide = Array.from(carousel.querySelectorAll('.carousel-item')).findIndex(slide => slide.classList.contains('active'));
    showSlide(carouselId, currentSlide - 1);
}

// 페이지 로드 시 모든 캐러셀 초기화
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel').forEach(initCarousel);
});




// Toggle the Table of Contents
function toggleToc() {
    const toc = document.getElementById('toc');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (toc.classList.contains('show')) {
        toc.classList.remove('show');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        toc.classList.add('show');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
}

// Close the Table of Contents if the user clicks outside of it
document.addEventListener('click', (event) => {
    const toc = document.getElementById('toc');
    const menuToggle = document.querySelector('.menu-toggle');

    if (toc.classList.contains('show') && !toc.contains(event.target) && !menuToggle.contains(event.target)) {
        toc.classList.remove('show');
        document.getElementById('menu-icon').style.display = 'block';
        document.getElementById('close-icon').style.display = 'none';
    }
});

// 자동으로 목차 생성하기
function generateTOC() {
    const tocList = document.getElementById('tocList');
    if (!tocList) {
        console.error('TOC List element not found!');
        return;
    }

    const headers = document.querySelectorAll('main h1:not(.no-toc), main h2:not(.no-toc), main h3:not(.no-toc), main h4:not(.no-toc), main h5:not(.no-toc), main h6:not(.no-toc)');
    const tocItems = [];

    headers.forEach(header => {
        // ID 설정
        const id = header.id || header.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (!header.id) {
            header.id = id;
        }

        // 항목 생성
        const level = parseInt(header.tagName.substring(1));
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = header.textContent;
        link.style.marginLeft = `${(level - 1) * 20}px`; // 계층에 따라 들여쓰기

        listItem.appendChild(link);
        tocItems.push({ level, listItem });
    });

    // 목차 항목 추가
    let lastLevel = 1;
    const stack = [];
    tocItems.forEach(item => {
        while (stack.length && stack[stack.length - 1].level >= item.level) {
            stack.pop();
        }
        if (stack.length) {
            const parent = stack[stack.length - 1].listItem;
            const ul = parent.querySelector('ul') || document.createElement('ul');
            if (!parent.querySelector('ul')) {
                parent.appendChild(ul);
            }
            ul.appendChild(item.listItem);
        } else {
            tocList.appendChild(item.listItem);
        }
        stack.push(item);
    });
}




//비디오 기능
document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyS') {  // 'S' 키로 자막 토글
        const track = document.getElementById('myTrack');
        if (track.mode === 'showing') {
            track.mode = 'disabled';
        } else {
            track.mode = 'showing';
        }
    }
});


const scriptUrl = 'https://script.google.com/macros/s/AKfycbyxaWjGvUiOyjVNpdY2iBVZeIxuNyKqeuNu_AU58UZd2j_1jENAqqF0cM70DpZMtsWvzg/exec';

function autoExpand(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

function initializeForms() {
    document.querySelectorAll('form[data-form-id]').forEach(form => {
      const formId = form.getAttribute('data-form-id');
      const messageDiv = document.querySelector(`.message[data-form-id="${formId}"]`);
      const commentsDiv = document.querySelector(`.comments[data-form-id="${formId}"]`);
      const textarea = form.querySelector('textarea');
  
      autoExpand(textarea);
  
      textarea.addEventListener('input', () => autoExpand(textarea));
  
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const comment = textarea.value;
  
        fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify({ formId: `form${formId}`, name: "Alex", comment })
        })
        .then(response => response.text())
        .then(data => {
          messageDiv.innerText = data;
          form.reset();
          autoExpand(textarea);
          fetchComments(formId);
        })
        .catch(error => {
          messageDiv.innerText = 'Error: ' + error;
        });
      });
  
      function fetchComments(formId) {
        fetch(scriptUrl)
          .then(response => response.json())
          .then(data => {
            commentsDiv.innerHTML = '';
            data.forEach(row => {
              const [rowFormId, name, comment, date] = row;
              if (rowFormId === `form${formId}`) {
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                  <div class="comment-name">${name}</div>
                  <div class="comment-text">${comment}</div>
                  <div class="comment-date">${new Date(date).toLocaleString()}</div>
                `;
                commentsDiv.appendChild(commentDiv);
              }
            });
          });
      }
  
      fetchComments(formId);
  
      setInterval(() => {
        fetchComments(formId);
      }, 10000);
    });
  }
  
  function loadTemplate(formId, container) {
    fetch('comment-template.html')
      .then(response => response.text())
      .then(template => {
        template = template.replace(/{{formId}}/g, formId);
        container.innerHTML = template;
        initializeForms();
      })
      .catch(error => console.error('Error loading template:', error));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.comment-container').forEach(container => {
      const formId = container.getAttribute('data-form-id');
      loadTemplate(formId, container);
    });
  });
  



/*const scriptUrl = 'https://script.google.com/macros/s/AKfycbyxaWjGvUiOyjVNpdY2iBVZeIxuNyKqeuNu_AU58UZd2j_1jENAqqF0cM70DpZMtsWvzg/exec'; // Google Apps Script 배포 URL

    // 텍스트 박스 자동 확장 함수
    function autoExpand(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      }
  
      // 모든 폼을 자동으로 처리하는 함수
      document.querySelectorAll('form[data-form-id]').forEach(form => {
        const formId = form.getAttribute('data-form-id');
        const messageDiv = document.querySelector(`.message[data-form-id="${formId}"]`);
        const commentsDiv = document.querySelector(`.comments[data-form-id="${formId}"]`);
        const textarea = form.querySelector('textarea');
  
        // 초기 높이 설정
        autoExpand(textarea);
  
        // 입력 시 높이 자동 조정
        textarea.addEventListener('input', () => autoExpand(textarea));
  
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          const name = form.querySelector('input').value;
          const comment = textarea.value;
  
          fetch(scriptUrl, {
            method: 'POST',
            body: JSON.stringify({ formId: `form${formId}`, name, comment })
          })
          .then(response => response.text())
          .then(data => {
            messageDiv.innerText = data;
            form.reset();
            autoExpand(textarea); // 폼 리셋 후 높이 초기화
            fetchComments(formId); // 댓글 목록 갱신
          })
          .catch(error => {
            messageDiv.innerText = 'Error: ' + error;
          });
        });
  
        function fetchComments(formId) {
          fetch(scriptUrl)
            .then(response => response.json())
            .then(data => {
              commentsDiv.innerHTML = '';
              data.forEach(row => {
                const [rowFormId, name, comment, date] = row;
                if (rowFormId === `form${formId}`) {
                  const commentDiv = document.createElement('div');
                  commentDiv.className = 'comment';
                  commentDiv.innerHTML = `
                    <div class="comment-name">${name}</div>
                    <div class="comment-text">${comment}</div>
                    <div class="comment-date">${new Date(date).toLocaleString()}</div>
                  `;
                  commentsDiv.appendChild(commentDiv);
                }
              });
            });
        }
  
        // 초기 로딩 시 각 폼의 댓글 목록 가져오기
        fetchComments(formId);
  
        // 주기적으로 각 폼의 댓글 목록 갱신
        setInterval(() => {
          fetchComments(formId);
        }, 10000);
      });*/


    //드롭다운메뉴
    function toggleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // 드롭다운 외부를 클릭했을 때 닫히게 하는 기능
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    // script.js

document.addEventListener('DOMContentLoaded', () => {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault(); // 링크 클릭의 기본 동작 방지

            const submenuContent = toggle.nextElementSibling;
            if (submenuContent.style.display === 'block') {
                submenuContent.style.display = 'none';
            } else {
                submenuContent.style.display = 'block';
            }
        });
    });
});