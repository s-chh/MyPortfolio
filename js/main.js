document.addEventListener('DOMContentLoaded', () => {
    const typedEl = document.querySelector('.typed');
    if (typedEl && typeof Typed !== 'undefined') {
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
});
