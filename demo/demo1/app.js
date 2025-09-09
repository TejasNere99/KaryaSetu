document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close nav when a link is clicked (for smooth scrolling)
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // Smooth scrolling for anchor links (already handled by CSS scroll-behavior: smooth, but JS fallback/enhancement)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Basic search functionality (client-side, for demonstration)
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission if it were a form
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: "${searchTerm}"\n(This is a client-side demo. In a real app, this would send a request to a server.)`);
                // In a real application, you would redirect or fetch data:
                // window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
            } else {
                alert('Please enter a search term.');
            }
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Newsletter form submission (client-side, for demonstration)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            if (email && email.includes('@') && email.includes('.')) {
                alert(`Subscribed with: ${email}\n(This is a client-side demo. In a real app, this would send data to a server.)`);
                emailInput.value = ''; // Clear input
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});
