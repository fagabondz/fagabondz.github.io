const Projects = {
    init() {
        this.revealCards();
        this.hoverEffect();
    },

    revealCards() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal elements like header, search, category
                    const reveals = entry.target.querySelectorAll('.proj-reveal');
                    reveals.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.transitionDelay = `${index * 100}ms`;
                        
                        void el.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });

                    // Reveal project cards
                    const cards = entry.target.querySelectorAll('.proj-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.transitionDelay = `${(index * 100)}ms`;
                        
                        void card.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Group reveals by section to trigger them appropriately
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const elementsToHide = section.querySelectorAll('.proj-reveal, .proj-card');
            if (elementsToHide.length > 0) {
                elementsToHide.forEach(el => {
                    el.style.opacity = '0';
                });
                observer.observe(section);
            }
        });
    },

    hoverEffect() {
        // Tailwind handles most of the hover effects (zoom, lift, shadow, etc.).
        // We can add subtle dynamic cursor tracking or any advanced JS hover effects if needed here.
        const cards = document.querySelectorAll('.proj-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // Example of additional JS hover logic (if needed)
            });
            card.addEventListener('mouseleave', () => {
                // Example of additional JS hover logic (if needed)
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Projects.init();
});
