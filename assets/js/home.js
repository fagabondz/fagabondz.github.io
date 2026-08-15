const Home = {
    init() {
        this.heroAnimation();
        this.floatingCards();
        this.engineeringReveal();
        this.featuredProjectAnimation();
        this.engineeringProcessAnimation();
        this.technologyAnimation();
    },

    heroAnimation() {
        // Elements to animate on load
        const animElements = document.querySelectorAll('.hero-anim');
        
        animElements.forEach((el, index) => {
            // Initial state
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            // Transition setup with staggered delay
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = `${100 + (index * 150)}ms`;
            
            // Trigger reflow before applying final state
            void el.offsetWidth;
            
            // Final state
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });

        // Illustration diagram reveal
        const illustration = document.getElementById('hero-illustration');
        if (illustration) {
            illustration.style.opacity = '0';
            illustration.style.transform = 'scale(0.95)';
            illustration.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            illustration.style.transitionDelay = '600ms';
            
            void illustration.offsetWidth;
            
            requestAnimationFrame(() => {
                illustration.style.opacity = '1';
                illustration.style.transform = 'scale(1)';
            });
        }
    },

    floatingCards() {
        const cards = document.querySelectorAll('.float-card');
        if (cards.length === 0) return;

        let time = 0;
        
        function animate() {
            time += 0.015; // Global animation speed
            
            cards.forEach(card => {
                const speed = parseFloat(card.getAttribute('data-speed')) || 1;
                const offset = parseFloat(card.getAttribute('data-offset')) || 0;
                
                // Calculate y translation using Sine wave for smooth floating effect
                const y = Math.sin(time * speed + offset) * 12; // Amplitude: 12px
                
                // Very subtle rotation using Cosine wave for 3D feel
                const rotate = Math.cos(time * (speed * 0.8) + offset) * 1.5; 
                
                // Apply transform directly
                // Note: cards are wrapped in absolute positioning divs so transform doesn't conflict with positioning
                card.style.transform = `translateY(${y}px) rotate(${rotate}deg)`;
            });
            
            requestAnimationFrame(animate);
        }
        
        // Start loop
        requestAnimationFrame(animate);
    },

    engineeringReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal Left Content
                    const reveals = entry.target.querySelectorAll('.eng-reveal');
                    reveals.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.transitionDelay = `${index * 150}ms`;
                        
                        // Trigger reflow
                        void el.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });

                    // Reveal Right Content (Cards)
                    const cards = entry.target.querySelectorAll('.eng-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        // Stagger cards after left content
                        card.style.transitionDelay = `${300 + (index * 100)}ms`;
                        
                        void card.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });

                    // Stop observing once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const philosophySection = document.querySelector('.eng-reveal')?.closest('section');
        if (philosophySection) {
            // Set initial state before observing to prevent flicker
            const elementsToHide = philosophySection.querySelectorAll('.eng-reveal, .eng-card');
            elementsToHide.forEach(el => {
                el.style.opacity = '0';
            });
            
            
            observer.observe(philosophySection);
        }
    },

    featuredProjectAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal Header & Button
                    const reveals = entry.target.querySelectorAll('.feat-reveal');
                    reveals.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.transitionDelay = `${index * 150}ms`;
                        
                        void el.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });

                    // Reveal Cards
                    const cards = entry.target.querySelectorAll('.feat-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.transitionDelay = `${300 + (index * 150)}ms`;
                        
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

        const featuredSection = document.querySelector('.feat-reveal')?.closest('section');
        if (featuredSection) {
            const elementsToHide = featuredSection.querySelectorAll('.feat-reveal, .feat-card');
            elementsToHide.forEach(el => {
                el.style.opacity = '0';
            });
            
            observer.observe(featuredSection);
        }
    },

    engineeringProcessAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal Header
                    const reveals = entry.target.querySelectorAll('.process-reveal');
                    reveals.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.transitionDelay = `${index * 150}ms`;
                        
                        void el.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });

                    // Reveal Cards
                    const cards = entry.target.querySelectorAll('.process-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.transitionDelay = `${300 + (index * 100)}ms`;
                        
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

        const processSection = document.querySelector('.process-reveal')?.closest('section');
        if (processSection) {
            const elementsToHide = processSection.querySelectorAll('.process-reveal, .process-card');
            elementsToHide.forEach(el => {
                el.style.opacity = '0';
            });
            
            observer.observe(processSection);
        }
    },

    technologyAnimation() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Reveal Header
                    const reveals = entry.target.querySelectorAll('.tech-reveal');
                    reveals.forEach((el, index) => {
                        el.style.opacity = '0';
                        el.style.transform = 'translateY(20px)';
                        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        el.style.transitionDelay = `${index * 150}ms`;
                        
                        void el.offsetWidth;
                        
                        requestAnimationFrame(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        });
                    });

                    // Reveal Cards
                    const cards = entry.target.querySelectorAll('.tech-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        card.style.transitionDelay = `${300 + (index * 150)}ms`;
                        
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

        const techSection = document.querySelector('.tech-reveal')?.closest('section');
        if (techSection) {
            const elementsToHide = techSection.querySelectorAll('.tech-reveal, .tech-card');
            elementsToHide.forEach(el => {
                el.style.opacity = '0';
            });
            
            observer.observe(techSection);
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    Home.init();
});
