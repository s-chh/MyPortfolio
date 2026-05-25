document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const typedEl = document.querySelector('.typed');

    if (typedEl) {
        if (prefersReducedMotion || typeof Typed === 'undefined') {
            typedEl.textContent = 'Machine Learning Scientist';
        } else {
            new Typed('.typed', {
                strings: [
                    'Machine Learning Scientist',
                    'PhD Graduate',
                    'Computer Vision Researcher',
                ],
                typeSpeed: 70,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
            });
        }
    }
});
