document.addEventListener('DOMContentLoaded', () => {
    // Typing effect
    new Typed('.typed', {
        strings: [
            'Machine Learning Scientist',
            'PhD Graduate',
            'Computer Vision Researcher',
        ],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        loop: true
    });

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});