const Contact = {
    init() {
        this.reveal();
    },

    reveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const reveals = entry.target.querySelectorAll('.contact-reveal');
                    
                    if (entry.target.classList.contains('contact-reveal')) {
                        // If the target itself is the reveal element
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        
                        void entry.target.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        });
                    } else if (reveals.length > 0) {
                        // If the target is a wrapper containing reveal elements
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
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Group reveals by section for sequenced animation
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const elementsToHide = section.querySelectorAll('.contact-reveal');
            if (elementsToHide.length > 0) {
                elementsToHide.forEach(el => el.style.opacity = '0');
                observer.observe(section);
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Contact.init();
});
