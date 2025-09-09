document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const loadingOverlay = document.getElementById('loading-overlay');
    const messageList = document.querySelector('.message-list');
    const messageBadge = document.getElementById('message-badge');
    const jobBadge = document.getElementById('job-badge');
    const jobFilterButtons = document.querySelectorAll('.filter-buttons .btn');
    const jobRequestCards = document.querySelectorAll('.job-request-card');
    const profilePicInput = document.getElementById('profile-pic-input');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    let messageCount = parseInt(messageBadge.textContent);
    let jobCount = parseInt(jobBadge.textContent);

    // --- Sidebar Toggle for Mobile --- //
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && !sidebar.contains(event.target) && !menuToggle.contains(event.target) && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // --- Tab Switching Logic --- //
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = item.dataset.tab;

            // Show loading overlay
            loadingOverlay.classList.add('active');

            // Simulate loading time
            setTimeout(() => {
                // Deactivate current tab and content
                navItems.forEach(nav => nav.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Activate new tab and content
                item.classList.add('active');
                document.getElementById(targetTab).classList.add('active');

                // Hide loading overlay
                loadingOverlay.classList.remove('active');

                // Re-render charts if on performance tab
                if (targetTab === 'performance') {
                    renderCharts();
                }

                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }

            }, 500); // 500ms loading animation
        });
    });

    // --- Message Center Interactivity --- //
    if (messageList) {
        messageList.addEventListener('click', (e) => {
            const messageItem = e.target.closest('.message-item');
            if (!messageItem) return;

            // Toggle message thread expansion
            if (!e.target.closest('.message-actions') && !e.target.closest('textarea') && !e.target.closest('.btn')) {
                messageItem.classList.toggle('expanded');
                if (messageItem.classList.contains('new')) {
                    messageItem.classList.remove('new');
                    messageItem.classList.add('read');
                    const statusBadge = messageItem.querySelector('.message-status');
                    if (statusBadge) {
                        statusBadge.textContent = 'Read';
                        statusBadge.classList.remove('status-new');
                        statusBadge.classList.add('status-read');
                    }
                    messageCount--;
                    updateBadge(messageBadge, messageCount);
                }
            }

            // Handle Accept/Reject Job Request
            if (e.target.classList.contains('accept-job')) {
                const messageId = messageItem.dataset.messageId;
                alert(`Job Request ${messageId} Accepted!`);
                messageItem.remove(); // Remove from messages
                messageCount--;
                updateBadge(messageBadge, messageCount);
                jobCount--; // Assuming accepted job is no longer pending
                updateBadge(jobBadge, jobCount);
                // In a real app, you'd update job status in a database
            } else if (e.target.classList.contains('reject-job')) {
                const messageId = messageItem.dataset.messageId;
                alert(`Job Request ${messageId} Rejected.`);
                messageItem.remove(); // Remove from messages
                messageCount--;
                updateBadge(messageBadge, messageCount);
                jobCount--; // Assuming rejected job is no longer pending
                updateBadge(jobBadge, jobCount);
                // In a real app, you'd update job status in a database
            }
        });
    }

    function updateBadge(badgeElement, count) {
        badgeElement.textContent = count > 0 ? count : '';
        badgeElement.style.display = count > 0 ? 'inline-block' : 'none';
    }

    // Initial badge update
    updateBadge(messageBadge, messageCount);
    updateBadge(jobBadge, jobCount);

    // --- Job Requests Filtering --- //
    jobFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            jobFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.dataset.filter;

            jobRequestCards.forEach(card => {
                const status = card.dataset.status;
                if (filter === 'all' || status === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Profile Picture Upload Preview --- //
    if (profilePicInput && profilePicPreview) {
        profilePicInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Ripple Effect for Buttons --- //
    document.querySelectorAll('.ripple-effect').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
        });
    });

    // --- Chart.js Initialization and Dynamic Updates --- //
    let earningsChart, completionChart, ratingChart, categoryChart;

    function renderCharts() {
        // Destroy existing charts if they exist to prevent duplicates
        if (earningsChart) earningsChart.destroy();
        if (completionChart) completionChart.destroy();
        if (ratingChart) ratingChart.destroy();
        if (categoryChart) categoryChart.destroy();

        // Earnings Over Time (Line Chart)
        const earningsCtx = document.getElementById('earningsChart');
        if (earningsCtx) {
            earningsChart = new Chart(earningsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'Monthly Earnings ($)',
                        data: [500, 750, 600, 900, 800, 1100, 950, 1200, 1050, 1300],
                        borderColor: 'rgb(0, 123, 255)',
                        backgroundColor: 'rgba(0, 123, 255, 0.1)',
                        tension: 0.3,
                        fill: true,
                        pointBackgroundColor: 'rgb(0, 123, 255)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgb(0, 123, 255)'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false },
                        datalabels: { display: false } // Disable datalabels for line chart
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Earnings ($)' }
                        },
                        x: {
                            title: { display: true, text: 'Month' }
                        }
                    },
                    animation: {
                        duration: 1000, // Animation duration in milliseconds
                        easing: 'easeOutQuart' // Easing function
                    }
                }
            });
        }

        // Job Completion Rate (Doughnut Chart / Progress Circle)
        const completionCtx = document.getElementById('completionChart');
        if (completionCtx) {
            completionChart = new Chart(completionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Incomplete'],
                    datasets: [{
                        data: [92, 8],
                        backgroundColor: ['rgb(40, 167, 69)', 'rgb(220, 53, 69)'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom' },
                        tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } },
                        datalabels: {
                            color: '#fff',
                            formatter: (value, context) => `${value}%`,
                            font: { size: 16, weight: 'bold' }
                        }
                    },
                    animation: {
                        animateScale: true,
                        animateRotate: true,
                        duration: 1000
                    }
                },
                plugins: [ChartDataLabels]
            });
        }

        // Average Rating Trend (Bar Chart)
        const ratingCtx = document.getElementById('ratingChart');
        if (ratingCtx) {
            ratingChart = new Chart(ratingCtx, {
                type: 'bar',
                data: {
                    labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'],
                    datasets: [{
                        label: 'Average Rating',
                        data: [4.2, 4.5, 4.8, 4.7],
                        backgroundColor: [
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(255, 193, 7, 0.8)'
                        ],
                        borderColor: 'rgb(255, 193, 7)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false },
                        datalabels: {
                            color: '#343a40',
                            anchor: 'end',
                            align: 'top',
                            formatter: (value) => value.toFixed(1),
                            font: { size: 14, weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 5,
                            title: { display: true, text: 'Rating' }
                        },
                        x: {
                            title: { display: true, text: 'Quarter' }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                },
                plugins: [ChartDataLabels]
            });
        }

        // Jobs by Category (Bar Chart)
        const categoryCtx = document.getElementById('categoryChart');
        if (categoryCtx) {
            categoryChart = new Chart(categoryCtx, {
                type: 'bar',
                data: {
                    labels: ['Plumbing', 'Electrical', 'Handyman', 'Appliance'],
                    datasets: [{
                        label: 'Jobs Completed',
                        data: [45, 30, 35, 15],
                        backgroundColor: [
                            'rgba(0, 123, 255, 0.8)',
                            'rgba(40, 167, 69, 0.8)',
                            'rgba(23, 162, 184, 0.8)',
                            'rgba(108, 117, 125, 0.8)'
                        ],
                        borderColor: [
                            'rgb(0, 123, 255)',
                            'rgb(40, 167, 69)',
                            'rgb(23, 162, 184)',
                            'rgb(108, 117, 125)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y', // Horizontal bar chart
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false },
                        datalabels: {
                            color: '#343a40',
                            anchor: 'end',
                            align: 'end',
                            formatter: (value) => value,
                            font: { size: 14, weight: 'bold' }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: { display: true, text: 'Number of Jobs' }
                        },
                        y: {
                            title: { display: true, text: 'Category' }
                        }
                    },
                    animation: {
                        duration: 1000,
                        easing: 'easeOutQuart'
                    }
                },
                plugins: [ChartDataLabels]
            });
        }
    }

    // Initial chart render when the page loads (if dashboard is active)
    if (document.getElementById('dashboard-overview').classList.contains('active')) {
        renderCharts();
    }

    // Simulate real-time notification updates (optional)
    // setInterval(() => {
    //     messageCount++;
    //     updateBadge(messageBadge, messageCount);
    //     console.log('New message simulated!');
    // }, 30000); // Every 30 seconds
});
