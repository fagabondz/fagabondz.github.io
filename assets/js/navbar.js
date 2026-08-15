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

        btn.addEventListener('click', () => {
            isOpen = !isOpen;
            btn.setAttribute('aria-expanded', isOpen);

            if (isOpen) {
                // Open menu: Slide down and fade in
                menu.classList.remove('grid-rows-[0fr]', 'opacity-0', 'invisible');
                menu.classList.add('grid-rows-[1fr]', 'opacity-100', 'visible');
                
                // Toggle icons
                iconMenu.classList.add('hidden');
                iconClose.classList.remove('hidden');
            } else {
                // Close menu: Slide up and fade out
                menu.classList.remove('grid-rows-[1fr]', 'opacity-100', 'visible');
                menu.classList.add('grid-rows-[0fr]', 'opacity-0', 'invisible');
                
                // Toggle icons
                iconMenu.classList.remove('hidden');
                iconClose.classList.add('hidden');
            }
        });
    },

    scrollEffect() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        // Apply shadow only when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-sm', 'bg-white/90');
                navbar.classList.remove('bg-white/70');
            } else {
                navbar.classList.remove('shadow-sm', 'bg-white/90');
                navbar.classList.add('bg-white/70');
            }
        }, { passive: true });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Navbar.init();
});
