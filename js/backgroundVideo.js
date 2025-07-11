// Simple Background Video
const videoElement = document.querySelector('.hero-video');
const videoContainer = document.querySelector('.hero-bg');

// Add overlay for better text visibility
const addOverlay = () => {
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))';
    videoContainer.appendChild(overlay);
};

// Initialize video
const initVideo = () => {
    addOverlay();
    
    // Start video
    videoElement.play().catch(error => {
        console.error('Error playing video:', error);
    });
};

// Add event listeners for mobile optimization
document.addEventListener('DOMContentLoaded', () => {
    initVideo();
    
    // Handle mobile devices
    if (window.innerWidth < 768) {
        videoElement.setAttribute('playsinline', '');
    }
    
    // Add responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            videoElement.setAttribute('playsinline', '');
        }
    });
});
