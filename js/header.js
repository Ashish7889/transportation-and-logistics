// Header scroll effect
const header = document.querySelector('header');
const heroHeight = document.querySelector('.hero').offsetHeight;

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > heroHeight) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Smooth header hide/show on scroll
    if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    // Update last scroll position
    lastScroll = currentScroll;
});
