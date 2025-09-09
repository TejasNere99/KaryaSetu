// --- Global Data (Simulated Backend) ---
const workersData = [
    {
        id: 'w1',
        name: 'Rajesh Kumar',
        skill: 'Plumber',
        experience: 8,
        location: 'New Delhi',
        rating: 4.8,
        bio: 'Experienced plumber specializing in leak detection, pipe repair, and new installations. Reliable and efficient service.',
        profilePic: 'https://i.pravatar.cc/150?img=1',
        services: ['Leak Repair', 'Pipe Installation', 'Water Heater Service', 'Drain Cleaning'],
        reviews: [
            { user: 'Anjali Sharma', rating: 5, date: '2023-09-15', text: 'Rajesh fixed our kitchen sink quickly and professionally. Highly recommend!' },
            { user: 'Vikram Singh', rating: 4, date: '2023-08-20', text: 'Good service, a bit late but job was done well.' }
        ]
    },
    {
        id: 'w2',
        name: 'Priya Sharma',
        skill: 'Electrician',
        experience: 5,
        location: 'Gurgaon',
        rating: 4.5,
        bio: 'Certified electrician providing safe and reliable electrical solutions for homes and offices. Specializing in wiring, repairs, and fixture installations.',
        profilePic: 'https://i.pravatar.cc/150?img=2',
        services: ['Residential Wiring', 'Commercial Electrical Installation', 'Fault Finding & Repair', 'Lighting Solutions', 'Panel Upgrades'],
        reviews: [
            { user: 'Rahul Gupta', rating: 5, date: '2023-10-01', text: 'Priya installed new lights perfectly. Very neat work.' },
            { user: 'Sneha Reddy', rating: 4, date: '2023-09-10', text: 'Professional and knowledgeable. Fixed the short circuit efficiently.' }
        ]
    },
    {
        id: 'w3',
        name: 'Amit Singh',
        skill: 'Carpenter',
        experience: 10,
        location: 'Noida',
        rating: 4.9,
        bio: 'Master carpenter with over a decade of experience in custom furniture, repairs, and woodworking projects. Precision and quality guaranteed.',
        profilePic: 'https://i.pravatar.cc/150?img=3',
        services: ['Custom Furniture', 'Door & Window Repair', 'Cabinet Installation', 'Wood Flooring'],
        reviews: [
            { user: 'Deepak Kumar', rating: 5, date: '2023-10-20', text: 'Amit built a custom bookshelf for me, and it looks amazing! Excellent craftsmanship.' },
            { user: 'Pooja Devi', rating: 5, date: '2023-09-25', text: 'Repaired my old wooden chair, now it feels brand new. Thank you!' }
        ]
    },
    {
        id: 'w4',
        name: 'Sonia Devi',
        skill: 'Painter',
        experience: 7,
        location: 'Faridabad',
        rating: 4.7,
        bio: 'Creative and meticulous painter offering interior and exterior painting services. Transforms spaces with vibrant colors and smooth finishes.',
        profilePic: 'https://i.pravatar.cc/150?img=4',
        services: ['Interior Painting', 'Exterior Painting', 'Wall Textures', 'Varnish & Polish'],
        reviews: [
            { user: 'Gaurav Jain', rating: 5, date: '2023-10-10', text: 'Sonia painted my entire apartment. The finish is flawless and she was very quick.' },
            { user: 'Meena Kumari', rating: 4, date: '2023-08-30', text: 'Good work, but took a bit longer than expected.' }
        ]
    },
    {
        id: 'w5',
        name: 'Mohit Yadav',
        skill: 'Gardener',
        experience: 6,
        location: 'Delhi',
        rating: 4.6,
        bio: 'Passionate gardener providing landscaping, plant care, and garden maintenance services. Creates beautiful and thriving green spaces.',
        profilePic: 'https://i.pravatar.cc/150?img=5',
        services: ['Landscaping', 'Planting & Pruning', 'Lawn Care', 'Garden Maintenance'],
        reviews: [
            { user: 'Ritu Singh', rating: 5, date: '2023-09-05', text: 'My garden looks amazing after Mohit worked on it. Very happy!' },
            { user: 'Arjun Das', rating: 4, date: '2023-07-18', text: 'Reliable and knows his plants well.' }
        ]
    },
    {
        id: 'w6',
        name: 'Deepak Kumar',
        skill: 'Electrician',
        experience: 3,
        location: 'Noida',
        rating: 4.2,
        bio: 'Young and energetic electrician, proficient in basic electrical repairs and installations. Always ready to learn and deliver quality work.',
        profilePic: 'https://i.pravatar.cc/150?img=6',
        services: ['Fan Installation', 'Light Repair', 'Socket Replacement'],
        reviews: [
            { user: 'Kavita Rao', rating: 4, date: '2023-10-25', text: 'Fixed my fan quickly. Good service for the price.' }
        ]
    },
    {
        id: 'w7',
        name: 'Sunita Sharma',
        skill: 'Cleaner',
        experience: 4,
        location: 'Delhi',
        rating: 4.7,
        bio: 'Thorough and efficient cleaner for homes and offices. Provides deep cleaning, regular maintenance, and specialized cleaning services.',
        profilePic: 'https://i.pravatar.cc/150?img=7',
        services: ['Home Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Post-Construction Cleaning'],
        reviews: [
            { user: 'Prakash Verma', rating: 5, date: '2023-10-18', text: 'My house was sparkling clean after Sunita finished. Excellent attention to detail.' }
        ]
    },
    {
        id: 'w8',
        name: 'Ganesh Prasad',
        skill: 'Plumber',
        experience: 12,
        location: 'Ghaziabad',
        rating: 4.9,
        bio: 'Highly experienced master plumber, capable of handling complex plumbing issues and large-scale installations. Trusted by many.',
        profilePic: 'https://i.pravatar.cc/150?img=8',
        services: ['Commercial Plumbing', 'Sewer Line Repair', 'Water Line Installation', 'Emergency Plumbing'],
        reviews: [
            { user: 'Ramesh Gupta', rating: 5, date: '2023-10-05', text: 'Ganesh solved a long-standing plumbing issue in my office building. Very skilled.' }
        ]
    }
];

const testimonialsData = [
    {
        id: 1,
        text: "KaryaSetu made finding a reliable electrician so easy! Priya was professional and fixed our wiring issue quickly. Highly recommend this platform!",
        author: "Jane Doe, User",
        rating: 5
    },
    {
        id: 2,
        text: "As a carpenter, KaryaSetu has been a game-changer for me. I get consistent job requests and can manage my schedule efficiently. Great platform!",
        author: "Amit Singh, Laborer",
        rating: 5
    },
    {
        id: 3,
        text: "Needed a plumber urgently for a leaky pipe. Found Rajesh on KaryaSetu, and he arrived within an hour. Fantastic service!",
        author: "Rahul Sharma, User",
        rating: 4
    },
    {
        id: 4,
        text: "The profile management and job request system on KaryaSetu are incredibly user-friendly. It's helped me expand my painting business significantly.",
        author: "Sonia Devi, Laborer",
        rating: 5
    }
];

// --- DOM Elements ---
const navLinks = document.querySelector('.nav-links');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const pages = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-links a');
const categoryCards = document.querySelectorAll('.category-card');
const featuredWorkersContainer = document.getElementById('featured-workers-container');
const testimonialsContainer = document.getElementById('testimonials-container');
const currentCategoryName = document.getElementById('current-category-name');
const categoryWorkersContainer = document.getElementById('category-workers-container');
const workerProfilePage = document.getElementById('worker-profile-page');
const authTabs = document.querySelectorAll('.auth-tabs .tab-btn');
const dashboardTabs = document.querySelectorAll('.dashboard-tabs .tab-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');

// --- State Variables ---
let isLoggedIn = false;
let currentUserRole = null; // 'user' or 'laborer'

// --- Functions ---
function toggleHamburgerMenu() {
    navLinks.classList.toggle('active');
}

function hideAllPages() {
    pages.forEach(page => page.classList.remove('active'));
}

function showPage(pageId) {
    hideAllPages();
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
    // Close hamburger menu on navigation
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
    updateActiveNavLink(pageId);
}

function updateActiveNavLink(currentPageId) {
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page && currentPageId.startsWith(item.dataset.page)) {
            item.classList.add('active');
        }
    });
}

function renderWorkerCards(container, workers, isFeatured = false) {
    container.innerHTML = '';
    workers.forEach(worker => {
        const workerCard = document.createElement('div');
        workerCard.classList.add('worker-card');
        workerCard.innerHTML = `
            <img src="${worker.profilePic}" alt="${worker.name}">
            <h3>${worker.name} ${isFeatured ? '<span class="verified-badge"><i class="fas fa-check-circle"></i></span>' : ''}</h3>
            <p class="skill">${worker.skill}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${worker.location}</p>
            <p class="experience"><i class="fas fa-briefcase"></i> ${worker.experience} Years Exp.</p>
            <div class="rating-stars">${generateStarRating(worker.rating)} ${worker.rating}</div>
            <p class="bio">${worker.bio}</p>
            <button class="btn btn-primary view-profile-btn" data-worker-id="${worker.id}">View Profile</button>
        `;
        container.appendChild(workerCard);
    });

    // Add event listeners for 'View Profile' buttons
    container.querySelectorAll('.view-profile-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const workerId = e.target.dataset.workerId;
            renderWorkerProfile(workerId);
            showPage('worker-profile-page');
        });
    });
}

function renderTestimonials() {
    testimonialsContainer.innerHTML = '';
    testimonialsData.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.classList.add('testimonial-card');
        testimonialCard.innerHTML = `
            <p>"${testimonial.text}"</p>
            <div class="rating-stars">${generateStarRating(testimonial.rating)}</div>
            <p class="author">- ${testimonial.author}</p>
        `;
        testimonialsContainer.appendChild(testimonialCard);
    });
}

function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < (5 - fullStars - (hasHalfStar ? 1 : 0)); i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function renderWorkerProfile(workerId) {
    const worker = workersData.find(w => w.id === workerId);
    if (!worker) {
        console.error('Worker not found:', workerId);
        return;
    }

    document.getElementById('worker-profile-name').innerHTML = `${worker.name} <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>`;
    document.getElementById('worker-profile-skill').textContent = worker.skill;
    document.getElementById('worker-profile-location').textContent = worker.location;
    document.getElementById('worker-profile-experience').textContent = `${worker.experience} Years Experience`;
    document.getElementById('worker-profile-contact').textContent = `+91 98765 43210`; // Placeholder contact
    document.getElementById('worker-profile-rating').innerHTML = `${generateStarRating(worker.rating)} ${worker.rating} (${worker.reviews.length} Reviews)`;
    document.querySelector('#worker-profile-page .profile-photo').src = worker.profilePic;
    document.getElementById('worker-profile-bio').textContent = worker.bio;

    const servicesList = document.getElementById('worker-profile-services');
    servicesList.innerHTML = '';
    worker.services.forEach(service => {
        const li = document.createElement('li');
        li.textContent = service;
        servicesList.appendChild(li);
    });

    const reviewsContainer = document.getElementById('worker-profile-reviews-container');
    reviewsContainer.innerHTML = '';
    if (worker.reviews.length > 0) {
        worker.reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.user}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="rating-stars">${generateStarRating(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            `;
            reviewsContainer.appendChild(reviewCard);
        });
    } else {
        reviewsContainer.innerHTML = '<p>No reviews yet for this worker.</p>';
    }

    document.getElementById('send-job-request-btn').onclick = () => {
        if (isLoggedIn && currentUserRole === 'user') {
            alert(`Job request sent to ${worker.name}! (Simulated)`);
        } else if (isLoggedIn && currentUserRole === 'laborer') {
            alert('You are logged in as a laborer. Please log out and log in as a user to send requests.');
        } else {
            alert('Please login as a user to send a job request.');
            showPage('auth-page');
            document.querySelector('.auth-tabs .tab-btn[data-tab="login"]').click();
        }
    };
}

function handleLogin(role) {
    isLoggedIn = true;
    currentUserRole = role;
    document.querySelector('.auth-link').classList.add('hidden');
    document.querySelector('.logout-link').classList.remove('hidden');

    document.querySelectorAll('.dashboard-link').forEach(link => link.classList.add('hidden'));
    if (role === 'user') {
        document.querySelector('.dashboard-link[data-page="user-dashboard"]').classList.remove('hidden');
        showPage('user-dashboard-page');
    } else if (role === 'laborer') {
        document.querySelector('.dashboard-link[data-page="laborer-dashboard"]').classList.classList.remove('hidden');
        showPage('laborer-dashboard-page');
    }
    alert(`Logged in as ${role}!`);
}

function handleLogout() {
    isLoggedIn = false;
    currentUserRole = null;
    document.querySelector('.auth-link').classList.remove('hidden');
    document.querySelector('.logout-link').classList.add('hidden');
    document.querySelectorAll('.dashboard-link').forEach(link => link.classList.add('hidden'));
    showPage('home-page');
    alert('Logged out successfully!');
}

// --- Event Listeners ---

// Hamburger menu
hamburgerMenu.addEventListener('click', toggleHamburgerMenu);

// Navigation links (simulated page routing)
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.dataset.page + '-page'; // Append -page to match section IDs
        if (pageId === 'home-page') {
            showPage(pageId);
            renderFeaturedWorkers(); // Re-render featured workers on home page load
            renderTestimonials(); // Re-render testimonials on home page load
        } else if (pageId === 'user-dashboard-page' && currentUserRole !== 'user') {
            alert('Please login as a User to access this dashboard.');
            showPage('auth-page');
            document.querySelector('.auth-tabs .tab-btn[data-tab="login"]').click();
        } else if (pageId === 'laborer-dashboard-page' && currentUserRole !== 'laborer') {
            alert('Please login as a Laborer to access this dashboard.');
            showPage('auth-page');
            document.querySelector('.auth-tabs .tab-btn[data-tab="login"]').click();
        } else {
            showPage(pageId);
        }
    });
});

// Category card clicks
categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.currentTarget.dataset.category;
        currentCategoryName.textContent = category;
        const filteredWorkers = workersData.filter(worker => worker.skill === category);
        renderWorkerCards(categoryWorkersContainer, filteredWorkers);
        showPage('category-page');
    });
});

// Call to Action buttons
document.querySelectorAll('.cta-buttons .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.dataset.page + '-page';
        showPage(pageId);
        if (e.target.textContent.includes('Join as a Worker')) {
            document.querySelector('.auth-tabs .tab-btn[data-tab="signup"]').click();
            document.getElementById('signup-role').value = 'laborer';
        } else if (e.target.textContent.includes('Find a Worker')) {
            // For 'Find a Worker', it stays on home or navigates to categories
            // For this simulation, it just ensures home is active
            showPage('home-page');
        }
    });
});

// Auth page tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        authTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('#auth-page .tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(tab.dataset.tab).classList.add('active');
    });
});

// Dashboard tab switching
dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const parentDashboard = tab.closest('.page');
        parentDashboard.querySelectorAll('.dashboard-tabs .tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        parentDashboard.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        parentDashboard.querySelector(`#${tab.dataset.tab}`).classList.add('active');
    });
});

// Simulated Login/Signup
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    // Simple simulation: if email contains 'laborer', login as laborer, else as user
    if (email.includes('laborer')) {
        handleLogin('laborer');
    } else {
        handleLogin('user');
    }
    loginForm.reset();
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const role = document.getElementById('signup-role').value;
    handleLogin(role);
    signupForm.reset();
});

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleLogout();
});

// Laborer profile photo upload preview
document.getElementById('laborer-profile-photo')?.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('laborer-profile-img-preview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    renderWorkerCards(featuredWorkersContainer, workersData.slice(0, 6), true); // Show first 6 as featured
    renderTestimonials();
    showPage('home-page'); // Start on the home page
});
