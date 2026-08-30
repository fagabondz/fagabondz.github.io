/**
 * Navbar & Language Switcher Manager
 * Engineering Portfolio
 */

const LanguageManager = {
    STORAGE_KEY: 'portfolio_lang',
    DEFAULT_LANG: 'id',

    init() {
        const savedLang = localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
        this.setLanguage(savedLang, false);
        this.bindEvents();
    },

    bindEvents() {
        const toggleButtons = document.querySelectorAll('.lang-switcher-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        });
    },

    getCurrentLanguage() {
        return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANG;
    },

    toggleLanguage() {
        const current = this.getCurrentLanguage();
        const next = current === 'id' ? 'en' : 'id';
        this.setLanguage(next, true);
    },

    setLanguage(lang, save = true) {
        if (save) {
            localStorage.setItem(this.STORAGE_KEY, lang);
        }
        document.documentElement.lang = lang;

        // 1. Translate elements with data-id and data-en
        const translatables = document.querySelectorAll('[data-id][data-en]');
        translatables.forEach(el => {
            const targetText = lang === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-id');
            if (targetText !== null) {
                // If element has child elements with icons, only replace text or innerHTML appropriately
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = targetText;
                } else {
                    el.textContent = targetText;
                }
            }
        });

        // 2. Translate placeholders with data-id-placeholder and data-en-placeholder
        const placeholderElements = document.querySelectorAll('[data-id-placeholder][data-en-placeholder]');
        placeholderElements.forEach(el => {
            const targetPh = lang === 'en' ? el.getAttribute('data-en-placeholder') : el.getAttribute('data-id-placeholder');
            if (targetPh !== null) {
                el.setAttribute('placeholder', targetPh);
            }
        });

        // 3. Update UI buttons (Flag & Label)
        // Rule: When in Indonesian (default), show US Flag 🇺🇸 (option to switch to English)
        //       When in English, show ID Flag 🇮🇩 (option to switch to Indonesian)
        const toggleButtons = document.querySelectorAll('.lang-switcher-btn');
        toggleButtons.forEach(btn => {
            const flagEl = btn.querySelector('.lang-flag');
            const labelEl = btn.querySelector('.lang-label');

            if (lang === 'id') {
                if (flagEl) flagEl.textContent = '🇺🇸';
                if (labelEl) labelEl.textContent = 'EN';
                btn.setAttribute('aria-label', 'Switch to English');
                btn.setAttribute('title', 'Switch to English');
            } else {
                if (flagEl) flagEl.textContent = '🇮🇩';
                if (labelEl) labelEl.textContent = 'ID';
                btn.setAttribute('aria-label', 'Ganti ke Bahasa Indonesia');
                btn.setAttribute('title', 'Ganti ke Bahasa Indonesia');
            }
        });

        // Re-initialize lucide icons if any icon was re-rendered
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }
};

const Navbar = {
    init() {
        this.mobileMenu();
        this.scrollEffect();
    },

    mobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const iconMenu = document.getElementById('icon-menu');
        const iconClose = document.getElementById('icon-close');

        if (!btn || !menu) return;

        let isOpen = false;

        const toggleMenu = (open) => {
            isOpen = (open !== undefined) ? open : !isOpen;
            btn.setAttribute('aria-expanded', isOpen);

            if (isOpen) {
                menu.classList.remove('grid-rows-[0fr]', 'opacity-0', 'invisible');
                menu.classList.add('grid-rows-[1fr]', 'opacity-100', 'visible');
                if (iconMenu) iconMenu.classList.add('hidden');
                if (iconClose) iconClose.classList.remove('hidden');
            } else {
                menu.classList.remove('grid-rows-[1fr]', 'opacity-100', 'visible');
                menu.classList.add('grid-rows-[0fr]', 'opacity-0', 'invisible');
                if (iconMenu) iconMenu.classList.remove('hidden');
                if (iconClose) iconClose.classList.add('hidden');
            }
        };

        btn.addEventListener('click', () => toggleMenu());

        // Close mobile menu on clicking any navigation link
        const mobileLinks = menu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    },

    scrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-background/95', 'shadow-lg', 'shadow-black/20', 'border-border');
                navbar.classList.remove('bg-background/80');
            } else {
                navbar.classList.remove('bg-background/95', 'shadow-lg', 'shadow-black/20');
                navbar.classList.add('bg-background/80');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Navbar.init();
    LanguageManager.init();
});

export { Navbar, LanguageManager };
