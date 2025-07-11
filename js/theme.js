document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeText = themeToggle.querySelector('.theme-text');

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeText(true);
    } else {
        // Default to light mode
        body.classList.remove('dark-mode');
        updateThemeText(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save the user's theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update theme text
            updateThemeText(isDark);
        });
    }

    // Update theme text function
    function updateThemeText(isDark) {
        if (isDark) {
            themeText.textContent = 'Light Mode';
        } else {
            themeText.textContent = 'Dark Mode';
        }
    }
});