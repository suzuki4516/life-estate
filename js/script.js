// ========================================
// ヒーロースライダー
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slide');
        const prevBtn = document.querySelector('.hero-prev');
        const nextBtn = document.querySelector('.hero-next');
        const dotsContainer = document.querySelector('.hero-dots');

        let currentSlide = 0;
        const totalSlides = slides.length;

        // ドットを作成
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('hero-dot');
            if (i === 0) dot.classList.add('active');
            dot.style.width = '12px';
            dot.style.height = '12px';
            dot.style.borderRadius = '50%';
            dot.style.background = i === 0 ? 'white' : 'rgba(255, 255, 255, 0.5)';
            dot.style.cursor = 'pointer';
            dot.style.transition = 'all 0.3s ease';
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.hero-dot');

        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => {
                dot.classList.remove('active');
                dot.style.background = 'rgba(255, 255, 255, 0.5)';
            });

            currentSlide = (n + totalSlides) % totalSlides;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            dots[currentSlide].style.background = 'white';
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function goToSlide(n) {
            showSlide(n);
        }

        // ボタンイベント
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);

        // 自動スライド
        let autoSlideInterval = setInterval(nextSlide, 5000);

        // マウスオーバーで自動スライド停止
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        heroSlider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    }
});

// ========================================
// モバイルメニュー
// ========================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');

        // ハンバーガーアイコンのアニメーション
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// モバイルメニューのドロップダウン処理
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        // モバイル表示の場合のみドロップダウンを切り替え
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = this.parentElement;
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');

            // 他のドロップダウンを閉じる
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                    const menu = item.querySelector('.dropdown-menu');
                    if (menu) menu.style.display = 'none';
                }
            });

            // 現在のドロップダウンを切り替え
            dropdown.classList.toggle('active');
            if (dropdown.classList.contains('active')) {
                dropdownMenu.style.display = 'block';
            } else {
                dropdownMenu.style.display = 'none';
            }
        }
    });
});

// ========================================
// スムーススクロール
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 検索タブ切り替え
// ========================================
const searchTabs = document.querySelectorAll('.search-tab');
searchTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        searchTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // タブに応じて価格オプションを変更
        const type = this.dataset.type;
        const priceSelect = document.querySelector('.search-fields select:nth-child(2)');

        if (priceSelect && type) {
            priceSelect.innerHTML = type === 'sale'
                ? `<option value="">価格帯</option>
                   <option value="1">〜3,000万円</option>
                   <option value="2">3,000万円〜5,000万円</option>
                   <option value="3">5,000万円〜</option>`
                : `<option value="">家賃</option>
                   <option value="1">〜8万円</option>
                   <option value="2">8万円〜12万円</option>
                   <option value="3">12万円〜</option>`;
        }
    });
});

// ========================================
// お気に入りボタン
// ========================================
const favoriteButtons = document.querySelectorAll('.property-favorite');
favoriteButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.textContent === '♡') {
            this.textContent = '♥';
            this.style.color = '#E74C3C';
        } else {
            this.textContent = '♡';
            this.style.color = '';
        }
    });
});

// ========================================
// FAQ アコーディオン
// ========================================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const toggle = item.querySelector('.faq-toggle');

    if (question) {
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // すべてのFAQを閉じる
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqToggle = faq.querySelector('.faq-toggle');
                if (faqToggle) faqToggle.style.transform = '';
            });

            // クリックされたFAQを開く（既に開いていた場合は閉じる）
            if (!isActive) {
                item.classList.add('active');
                if (toggle) toggle.style.transform = 'rotate(45deg)';
            }
        });
    }
});

// ========================================
// フォームバリデーション
// ========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 簡易的なバリデーション
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            // フォーム送信処理（実際のサイトではサーバーに送信）
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });

    // フォーカス時にエラー表示をクリア
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4A90E2';
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.required) {
                this.style.borderColor = '#E74C3C';
            } else {
                this.style.borderColor = '#E0E0E0';
            }
        });
    });
}

// ========================================
// 売却査定フォームバリデーション
// ========================================
const assessmentForm = document.getElementById('assessmentForm');
if (assessmentForm) {
    assessmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 簡易的なバリデーション
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            // フォーム送信処理（実際のサイトではサーバーに送信）
            alert('売却査定のご依頼ありがとうございます。\n担当者より24時間以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });

    // フォーカス時にエラー表示をクリア
    const formInputs = assessmentForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4A90E2';
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.required) {
                this.style.borderColor = '#E74C3C';
            } else {
                this.style.borderColor = '#E0E0E0';
            }
        });
    });
}

// ========================================
// スクロールアニメーション（フェードイン）
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素
const animateElements = document.querySelectorAll('.service-card, .property-card, .reason-card, .testimonial-card, .news-item, .staff-card, .business-card, .office-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ヘッダーのスクロール時の挙動
// ========================================
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール時にヘッダーに影を追加
    if (scrollTop > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// ========================================
// 画像の遅延読み込み
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Intersection Observer を使った代替実装
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// 物件カードのホバーエフェクト強化
// ========================================
const propertyCards = document.querySelectorAll('.property-card');
propertyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ========================================
// 検索フォームの処理
// ========================================
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 検索パラメータを取得
        const formData = new FormData(this);
        const searchParams = new URLSearchParams();

        for (let [key, value] of formData.entries()) {
            if (value) searchParams.append(key, value);
        }

        // 実際のサイトでは検索結果ページに遷移
        console.log('検索パラメータ:', searchParams.toString());
        alert('検索機能は実装例です。実際のサイトでは検索結果ページに遷移します。');
    });
}

// ========================================
// フィルターフォームの処理
// ========================================
const filterForm = document.querySelector('.filter-form');
if (filterForm) {
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        console.log('フィルター条件:', Object.fromEntries(formData));
        alert('フィルター機能は実装例です。実際のサイトでは絞り込み結果が表示されます。');
    });

    // リセットボタン
    const resetBtn = filterForm.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            setTimeout(() => {
                console.log('フィルターをリセットしました');
            }, 10);
        });
    }
}

// ========================================
// ソート機能
// ========================================
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        console.log('ソート:', sortValue);
        // 実際のサイトでは物件を並び替え
    });
}

// ========================================
// 電話番号のクリックトラッキング
// ========================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('電話番号クリック:', this.href);
        // 実際のサイトではアナリティクスにイベント送信
    });
});

// ========================================
// メールリンクのクリックトラッキング
// ========================================
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', function() {
        console.log('メールリンククリック:', this.href);
        // 実際のサイトではアナリティクスにイベント送信
    });
});

// ========================================
// ページトップへ戻るボタン（オプション）
// ========================================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4A90E2;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
        z-index: 999;
    `;

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
}

// ページトップボタンを作成
createScrollToTopButton();

// ========================================
// 現在のページをナビゲーションでハイライト
// ========================================
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentLocation === linkPath) {
        link.style.color = '#4A90E2';
        link.style.fontWeight = '600';
    }
});

// ========================================
// サービスフォームバリデーション（売買仲介）
// ========================================
const serviceSaleForm = document.getElementById('serviceSaleForm');
if (serviceSaleForm) {
    serviceSaleForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });
}

// ========================================
// サービスフォームバリデーション（賃貸仲介）
// ========================================
const serviceRentForm = document.getElementById('serviceRentForm');
if (serviceRentForm) {
    serviceRentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });
}

// ========================================
// サービスフォームバリデーション（不動産管理）
// ========================================
const serviceManagementForm = document.getElementById('serviceManagementForm');
if (serviceManagementForm) {
    serviceManagementForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });
}

// ========================================
// サービスフォームバリデーション（リフォーム・リノベーション）
// ========================================
const serviceReformForm = document.getElementById('serviceReformForm');
if (serviceReformForm) {
    serviceReformForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('お問い合わせありがとうございます。\n2営業日以内にご連絡させていただきます。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });
}

// ========================================
// アクセスフォームバリデーション
// ========================================
const accessForm = document.getElementById('accessForm');
if (accessForm) {
    accessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#E74C3C';
            } else {
                field.style.borderColor = '#E0E0E0';
            }
        });

        if (isValid) {
            alert('来店予約を承りました。\n確認のメールをお送りいたしますのでご確認ください。');
            this.reset();
        } else {
            alert('必須項目をすべてご入力ください。');
        }
    });

    // フォーカス時にエラー表示をクリア
    const formInputs = accessForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#4A90E2';
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim() && this.required) {
                this.style.borderColor = '#E74C3C';
            } else {
                this.style.borderColor = '#E0E0E0';
            }
        });
    });
}

// ========================================
// コンソールにウェルカムメッセージ
// ========================================
console.log('%c株式会社ライフエステート', 'color: #4A90E2; font-size: 24px; font-weight: bold;');
console.log('%cあなたの理想の住まい探しをサポートします', 'color: #7F8C8D; font-size: 14px;');
console.log('%cTEL: 045-678-9012', 'color: #27AE60; font-size: 14px;');
