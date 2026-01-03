// Check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('mochand_logged_in');
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('mochand_user') || '{}');
    if (userData.name) {
        document.querySelector('.user-name').textContent = userData.name;
    }
    if (userData.email) {
        document.querySelector('.user-email').textContent = userData.email;
        document.querySelector('.user-avatar').textContent = userData.name ? userData.name[0].toUpperCase() : 'U';
    }
});

// Logout functionality
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('mochand_logged_in');
        localStorage.removeItem('mochand_user');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart');
if (revenueCtx) {
    const revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#6366f1'
                },
                {
                    label: 'Messages',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#06b6d4'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Inter'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Inter'
                    },
                    borderColor: '#6366f1',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        color: '#64748b'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        color: '#64748b'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });

    // Animate chart data
    setTimeout(() => {
        revenueChart.data.datasets[0].data = [1200, 1900, 1500, 2200, 2800, 2400, 3200, 3800, 3400, 4200, 4500, 5000];
        revenueChart.data.datasets[1].data = [150, 220, 180, 280, 320, 290, 380, 420, 390, 480, 520, 580];
        revenueChart.update('active');
        
        // Update stat cards
        animateValue(document.querySelectorAll('.stat-value')[0], 0, 5000, 2000, '$');
        animateValue(document.querySelectorAll('.stat-value')[1], 0, 2500, 2000, '$');
        animateValue(document.querySelectorAll('.stat-value')[2], 0, 85, 2000, '$');
        animateValue(document.querySelectorAll('.stat-value')[3], 0, 580, 2000);
        animateValue(document.querySelectorAll('.stat-value')[4], 0, 200, 2000, '', '%');
        animateValue(document.querySelectorAll('.stat-value')[5], 0, 45, 2000);
        
        // Update message stats
        const messageStatValues = document.querySelectorAll('.message-stat-item .value');
        animateValue(messageStatValues[0], 0, 420, 2000);
        animateValue(messageStatValues[1], 0, 140, 2000);
        animateValue(messageStatValues[2], 0, 20, 2000);
        
        // Update detail items
        const detailValues = document.querySelectorAll('.detail-value');
        animateValue(detailValues[0], 0, 580, 2000);
        animateValue(detailValues[1], 0, 560, 2000);
        animateValue(detailValues[2], 0, 420, 2000);
        animateValue(detailValues[3], 0, 315, 2000);
        animateValue(detailValues[4], 0, 20, 2000);
    }, 500);
}

// Message Status Chart
const messageStatusCtx = document.getElementById('messageStatusChart');
if (messageStatusCtx) {
    const messageStatusChart = new Chart(messageStatusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Read', 'Delivered', 'Failed'],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    '#10b981',
                    '#6366f1',
                    '#ef4444'
                ],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        family: 'Inter'
                    },
                    bodyFont: {
                        size: 13,
                        family: 'Inter'
                    }
                }
            }
        }
    });

    // Animate chart
    setTimeout(() => {
        messageStatusChart.data.datasets[0].data = [420, 140, 20];
        messageStatusChart.update('active');
    }, 800);
}

// Animate number values
function animateValue(element, start, end, duration, prefix = '', suffix = '') {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = prefix + Math.round(end).toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.round(current).toLocaleString() + suffix;
        }
    }, 16);
}

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        showNotification(`Switched to ${this.textContent} view`, 'info');
    });
});

// Mobile sidebar toggle
const createMobileMenuToggle = () => {
    if (window.innerWidth <= 768) {
        const topBar = document.querySelector('.top-bar');
        const existingToggle = document.querySelector('.mobile-menu-btn');
        
        if (!existingToggle) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1000;
                width: 40px;
                height: 40px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            `;
            
            menuBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
            
            document.body.appendChild(menuBtn);
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                const sidebar = document.querySelector('.sidebar');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }
};

// Quick actions
document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.action-title').textContent;
        showNotification(`Opening ${title}...`, 'info');
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        background: colors[type],
        color: 'white',
        fontWeight: '600',
        fontSize: '0.95rem',
        zIndex: '99999',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .sidebar.active {
        transform: translateX(0) !important;
    }
`;
document.head.appendChild(style);

// Initialize
createMobileMenuToggle();
window.addEventListener('resize', createMobileMenuToggle);

console.log('📊 Mochan-D Dashboard loaded successfully!');

