import translations from '../data/translations.js';

let currentLang = 'ko';

function updateContent(lang) {
    currentLang = lang;
    const content = document.getElementById('content');
    const data = translations[lang];
    
    content.innerHTML = `
        <h2 data-aos="fade-down">${data.welcome}</h2>
        <p data-aos="fade-up">${data.description}</p>
        <h3 data-aos="fade-up">FAQ</h3>
        <div class="faq-container">
            ${data.faq.map((item, index) => `
                <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <h4>${item.q}</h4>
                    <p>${item.a}</p>
                </div>
            `).join('')}
        </div>
    `;
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        updateContent(lang);
    });
});

// 초기 컨텐츠 로드
updateContent(currentLang); 