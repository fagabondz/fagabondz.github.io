const ErrorPage = {
    init() {
        this.reveal();
        this.floatingElements();
    },

    reveal() {
        const reveals = document.querySelectorAll('.err-reveal');
        
        reveals.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            el.style.transitionDelay = `${index * 120}ms`;
            
            void el.offsetWidth;
            
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    },

    floatingElements() {
        const nodes = [
            document.getElementById('err-node-1'),
            document.getElementById('err-node-2'),
            document.getElementById('err-node-3'),
            document.getElementById('err-node-4'),
            document.getElementById('err-node-5')
        ];

        let time = 0;
        
        function animate() {
            time += 0.03;
            nodes.forEach((node, i) => {
                if (node) {
                    // Create a subtle floating effect
                    const offsetY = Math.sin(time + (i * 1.5)) * 4;
                    const offsetX = Math.cos(time + (i * 1.5)) * 2;
                    node.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });
            requestAnimationFrame(animate);
        }

        animate();
    }
};

document.addEventListener("DOMContentLoaded", () => {
    ErrorPage.init();
});
