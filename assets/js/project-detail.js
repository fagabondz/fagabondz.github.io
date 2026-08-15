const ProjectDetail = {
    init() {
        this.revealAnimation();
        this.initStickyTOC();
    },

    revealAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal general elements
                    const reveals = entry.target.querySelectorAll('.detail-reveal');
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

                    // Reveal content sections
                    if (entry.target.classList.contains('detail-section')) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        entry.target.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        
                        void entry.target.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        });
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe main wrappers for standard reveals
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const elementsToHide = section.querySelectorAll('.detail-reveal');
            if (elementsToHide.length > 0) {
                elementsToHide.forEach(el => el.style.opacity = '0');
                observer.observe(section);
            }
        });

        // Observe detailed content sections
        const detailSections = document.querySelectorAll('.detail-section');
        detailSections.forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    },

    initStickyTOC() {
        const sections = document.querySelectorAll('.detail-section');
        const navLinks = document.querySelectorAll('.toc-nav a');

        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Add a small offset so it activates slightly before it hits the exact top
                if (scrollY >= (sectionTop - 250)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-primary', 'font-bold');
                if (link.getAttribute('href').includes(current) && current !== '') {
                    link.classList.add('text-primary', 'font-bold');
                }
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    ProjectDetail.init();
});
