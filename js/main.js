import translations from '../data/translations.js';

let currentLang = 'en';

// 배경 요소 생성
const backgroundDiv = document.createElement('div');
backgroundDiv.className = 'background';
document.body.appendChild(backgroundDiv); // body에 배경 요소 추가

// Security: Add HTML sanitization except for specific FAQ answers that contain links
function sanitizeHTML(str, allowHTML = false) {
    if (allowHTML) return str;
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function updateContent(lang) {
    try {
        currentLang = lang;
        const content = document.getElementById('content');
        if (!content) throw new Error('Content element not found');
        
        const data = translations[lang];
        if (!data) throw new Error(`Translation not found for language: ${lang}`);
        
        content.innerHTML = `
            <h2 data-aos="fade-down">
                ${data.welcome.replace(/edith537/gi, '<span class="highlight">Edith537</span>')}
            </h2>
            <p data-aos="fade-up">${sanitizeHTML(data.description)}</p>
            <div class="faq-container">
                ${data.faq.map((item, index) => `
                    <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 30}">
                        <h4>${sanitizeHTML(item.q)}</h4>
                        <p>${sanitizeHTML(item.a, true)}</p>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error updating content:', error);
        if (lang !== 'en') updateContent('en');
    }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        updateContent(lang);
        
        // 모든 버튼에서 active 클래스 제거
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.classList.remove('active');
        });
        
        // 클릭한 버튼에 active 클래스 추가
        e.target.classList.add('active');
    });
});

// 초기 컨텐츠 로드
updateContent(currentLang);

let lastScrollTop = 0;
const header = document.querySelector('header');

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxOpacity = 1;
    const minOpacity = 0;
    const fadeDistance = 100; // 스크롤 거리

    if (scrollTop === 0) {
        header.style.opacity = maxOpacity; // 스크롤이 맨 위일 때 상단바를 완전히 보이게 설정
    } else if (scrollTop > lastScrollTop) {
        // 스크롤 내릴 때
        const opacity = Math.max(minOpacity, maxOpacity - (scrollTop / fadeDistance));
        header.style.opacity = opacity;
    } else {
        // 스크롤 올릴 때
        const opacity = Math.min(maxOpacity, minOpacity + (scrollTop / fadeDistance));
        header.style.opacity = opacity;
    }
    lastScrollTop = scrollTop;
}

// 스크롤 이벤트 쓰로틀링
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(function() {
    requestAnimationFrame(handleScroll);
}, 100));

// 기본 언어 버튼에 active 클래스 추가
document.querySelector(`.lang-btn[data-lang="${currentLang}"]`).classList.add('active');