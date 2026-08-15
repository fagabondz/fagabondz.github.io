const About = {
    init() {
        this.revealSections();
        this.timelineAnimation();
    },

    revealSections() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const reveals = entry.target.querySelectorAll('.about-reveal');
                    
                    if (entry.target.classList.contains('about-reveal')) {
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
                        // If the target is a section containing reveal elements
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
            const elementsToHide = section.querySelectorAll('.about-reveal');
            if (elementsToHide.length > 0) {
                elementsToHide.forEach(el => el.style.opacity = '0');
                observer.observe(section);
            }
        });
    },

    timelineAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px -10% -20% 0px',
            threshold: 0.2
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const dot = entry.target.querySelector('.timeline-dot');
                    if (dot) {
                        dot.style.transform = 'scale(0)';
                        dot.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                        
                        void dot.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            dot.style.transform = 'scale(1)';
                        });
                    }
                    
                    const textContents = entry.target.querySelectorAll('.text-left, .text-right, .md\\:hidden');
                    textContents.forEach(text => {
                        text.style.opacity = '0';
                        text.style.transform = 'translateY(15px)';
                        text.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        text.style.transitionDelay = '150ms';
                        
                        void text.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            text.style.opacity = '1';
                            text.style.transform = 'translateY(0)';
                        });
                    });

                    timelineObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const dot = item.querySelector('.timeline-dot');
            const texts = item.querySelectorAll('.text-left, .text-right, .md\\:hidden');
            
            if (dot) dot.style.transform = 'scale(0)';
            texts.forEach(t => t.style.opacity = '0');
            
            timelineObserver.observe(item);
        });
        
        // Line animation
        const line = document.querySelector('.timeline-line');
        if (line) {
            line.style.height = '0';
            line.style.transition = 'height 2s ease-out';
            
            const lineObserver = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    line.style.height = '100%';
                    lineObserver.disconnect();
                }
            }, { threshold: 0.1 });
            
            lineObserver.observe(line.parentElement);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    About.init();
});
