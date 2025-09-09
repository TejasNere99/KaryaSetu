document.addEventListener('DOMContentLoaded', () => {
    const servicesSection = document.querySelector('.services-section');
    const laborersSection = document.querySelector('.laborers-section');
    const selectedServiceTitle = document.getElementById('selected-service-title');
    const laborerGrid = document.querySelector('.laborer-grid');
    const backToServicesBtn = document.querySelector('.back-to-services');

    // Simulated Laborer Data
    const laborerData = {
        'Plumber': [
            { name: 'Rajesh Kumar', image: 'https://i.pravatar.cc/150?img=68', rating: 4.8, experience: '10+ Years', contact: '+91 98765 43210', bio: 'Experienced plumber specializing in leak detection and pipe repair.' },
            { name: 'Suresh Singh', image: 'https://i.pravatar.cc/150?img=69', rating: 4.5, experience: '7 Years', contact: '+91 98765 43211', bio: 'Reliable plumber for installations and emergency services.' },
            { name: 'Amit Sharma', image: 'https://i.pravatar.cc/150?img=70', rating: 4.9, experience: '12 Years', contact: '+91 98765 43212', bio: 'Master plumber, expert in bathroom and kitchen plumbing.' },
            { name: 'Priya Devi', image: 'https://i.pravatar.cc/150?img=71', rating: 4.7, experience: '8 Years', contact: '+91 98765 43213', bio: 'Efficient and tidy, handles all types of plumbing issues.' },
            { name: 'Manoj Gupta', image: 'https://i.pravatar.cc/150?img=72', rating: 4.6, experience: '9 Years', contact: '+91 98765 43214', bio: 'Specializes in water heater repair and new pipe laying.' },
            { name: 'Deepak Yadav', image: 'https://i.pravatar.cc/150?img=73', rating: 4.4, experience: '6 Years', contact: '+91 98765 43215', bio: 'Quick response for urgent plumbing needs.' },
            { name: 'Sunita Rao', image: 'https://i.pravatar.cc/150?img=74', rating: 4.8, experience: '11 Years', contact: '+91 98765 43216', bio: 'Dedicated to providing long-lasting plumbing solutions.' }
        ],
        'Electrician': [
            { name: 'Vikram Reddy', image: 'https://i.pravatar.cc/150?img=75', rating: 4.9, experience: '15+ Years', contact: '+91 98765 54321', bio: 'Certified electrician for all residential and commercial wiring.' },
            { name: 'Prakash Nair', image: 'https://i.pravatar.cc/150?img=76', rating: 4.7, experience: '9 Years', contact: '+91 98765 54322', bio: 'Expert in fuse box repair and new electrical installations.' },
            { name: 'Geeta Singh', image: 'https://i.pravatar.cc/150?img=77', rating: 4.6, experience: '8 Years', contact: '+91 98765 54323', bio: 'Specializes in home automation and smart lighting.' },
            { name: 'Ravi Kumar', image: 'https://i.pravatar.cc/150?img=78', rating: 4.8, experience: '10 Years', contact: '+91 98765 54324', bio: 'Reliable for power outages and electrical fault finding.' },
            { name: 'Anil Das', image: 'https://i.pravatar.cc/150?img=79', rating: 4.5, experience: '7 Years', contact: '+91 98765 54325', bio: 'Provides safe and efficient electrical solutions.' },
            { name: 'Kiran Devi', image: 'https://i.pravatar.cc/150?img=80', rating: 4.7, experience: '12 Years', contact: '+91 98765 54326', bio: 'Experienced in industrial and domestic electrical work.' }
        ],
        'Carpenter': [
            { name: 'Arjun Singh', image: 'https://i.pravatar.cc/150?img=81', rating: 4.7, experience: '12+ Years', contact: '+91 98765 65432', bio: 'Skilled carpenter for custom furniture and intricate woodwork.' },
            { name: 'Babu Lal', image: 'https://i.pravatar.cc/150?img=82', rating: 4.5, experience: '8 Years', contact: '+91 98765 65433', bio: 'Expert in door and window repair and installation.' },
            { name: 'Chandan Kumar', image: 'https://i.pravatar.cc/150?img=83', rating: 4.8, experience: '10 Years', contact: '+91 98765 65434', bio: 'Provides bespoke carpentry solutions for homes and offices.' },
            { name: 'Dinesh Patel', image: 'https://i.pravatar.cc/150?img=84', rating: 4.6, experience: '9 Years', contact: '+91 98765 65435', bio: 'Specializes in modular kitchen and wardrobe installations.' },
            { name: 'Esha Sharma', image: 'https://i.pravatar.cc/150?img=85', rating: 4.9, experience: '11 Years', contact: '+91 98765 65436', bio: 'Creative and precise, delivers high-quality carpentry work.' }
        ],
        'Painter': [
            { name: 'Gopal Verma', image: 'https://i.pravatar.cc/150?img=86', rating: 4.6, experience: '9+ Years', contact: '+91 98765 76543', bio: 'Professional painter for interior and exterior painting.' },
            { name: 'Harish Kumar', image: 'https://i.pravatar.cc/150?img=87', rating: 4.5, experience: '7 Years', contact: '+91 98765 76544', bio: 'Expert in texture painting and wall finishes.' },
            { name: 'Indira Devi', image: 'https://i.pravatar.cc/150?img=88', rating: 4.7, experience: '10 Years', contact: '+91 98765 76545', bio: 'Provides clean and efficient painting services.' },
            { name: 'Jagdish Singh', image: 'https://i.pravatar.cc/150?img=89', rating: 4.8, experience: '12 Years', contact: '+91 98765 76546', bio: 'Specializes in commercial and residential painting projects.' }
        ],
        'Maid Service': [
            { name: 'Laxmi Devi', image: 'https://i.pravatar.cc/150?img=90', rating: 4.9, experience: '8+ Years', contact: '+91 98765 87654', bio: 'Thorough and reliable maid service for homes and offices.' },
            { name: 'Meena Kumari', image: 'https://i.pravatar.cc/150?img=91', rating: 4.7, experience: '6 Years', contact: '+91 98765 87655', bio: 'Provides deep cleaning and regular maintenance services.' },
            { name: 'Nisha Sharma', image: 'https://i.pravatar.cc/150?img=92', rating: 4.8, experience: '10 Years', contact: '+91 98765 87656', bio: 'Trustworthy and efficient, ensures a spotless environment.' }
        ],
        'Gardener': [
            { name: 'Om Prakash', image: 'https://i.pravatar.cc/150?img=93', rating: 4.6, experience: '10+ Years', contact: '+91 98765 98765', bio: 'Experienced gardener for landscaping, lawn care, and plant maintenance.' },
            { name: 'Pawan Kumar', image: 'https://i.pravatar.cc/150?img=94', rating: 4.5, experience: '7 Years', contact: '+91 98765 98766', bio: 'Specializes in garden design and plant health.' },
            { name: 'Ramesh Singh', image: 'https://i.pravatar.cc/150?img=95', rating: 4.7, experience: '9 Years', contact: '+91 98765 98767', bio: 'Provides regular garden upkeep and seasonal planting.' }
        ],
        'AC Repair': [
            { name: 'Sanjay Kumar', image: 'https://i.pravatar.cc/150?img=96', rating: 4.8, experience: '12+ Years', contact: '+91 98765 10987', bio: 'Expert in all types of AC repair, service, and installation.' },
            { name: 'Tarun Gupta', image: 'https://i.pravatar.cc/150?img=97', rating: 4.6, experience: '8 Years', contact: '+91 98765 10988', bio: 'Quick and efficient AC troubleshooting and gas refilling.' },
            { name: 'Umesh Yadav', image: 'https://i.pravatar.cc/150?img=98', rating: 4.7, experience: '10 Years', contact: '+91 98765 10989', bio: 'Reliable for both split and window AC repairs.' }
        ],
        'Appliance Repair': [
            { name: 'Vikas Sharma', image: 'https://i.pravatar.cc/150?img=99', rating: 4.7, experience: '11+ Years', contact: '+91 98765 21098', bio: 'Repairs all major home appliances: refrigerators, washing machines, microwaves.' },
            { name: 'Yogesh Singh', image: 'https://i.pravatar.cc/150?img=100', rating: 4.5, experience: '9 Years', contact: '+91 98765 21099', bio: 'Specializes in quick and effective appliance diagnostics.' },
            { name: 'Zoya Khan', image: 'https://i.pravatar.cc/150?img=101', rating: 4.8, experience: '7 Years', contact: '+91 98765 21100', bio: 'Trustworthy for all your home appliance repair needs.' }
        ]
    };

    // Function to render laborer profiles
    function renderLaborers(serviceName) {
        laborerGrid.innerHTML = ''; // Clear previous laborers
        const laborers = laborerData[serviceName] || [];

        if (laborers.length === 0) {
            laborerGrid.innerHTML = '<p style="text-align: center; font-size: 1.8rem; color: #777;">No laborers found for this service yet. Please check back later!</p>';
            return;
        }

        laborers.forEach(laborer => {
            const laborerCard = document.createElement('article');
            laborerCard.classList.add('laborer-card');
            laborerCard.innerHTML = `
                <img src="${laborer.image}" alt="${laborer.name}">
                <h3>${laborer.name}</h3>
                <p class="rating">${'⭐'.repeat(Math.floor(laborer.rating))} ${laborer.rating}</p>
                <p><strong>Experience:</strong> ${laborer.experience}</p>
                <p><strong>Bio:</strong> ${laborer.bio}</p>
                <p class="contact-info"><strong>Contact:</strong> ${laborer.contact}</p>
            `;
            laborerGrid.appendChild(laborerCard);
        });
    }

    // Event listener for service card clicks (using event delegation)
    servicesSection.addEventListener('click', (event) => {
        const serviceCard = event.target.closest('.service-card');
        if (serviceCard) {
            const serviceName = serviceCard.dataset.service;
            selectedServiceTitle.textContent = serviceName;
            renderLaborers(serviceName);

            servicesSection.classList.add('hidden');
            laborersSection.classList.remove('hidden');

            // Scroll to the top of the laborers section
            laborersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Event listener for back button
    backToServicesBtn.addEventListener('click', () => {
        laborersSection.classList.add('hidden');
        servicesSection.classList.remove('hidden');

        // Scroll back to the services section
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
