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
    
    // Load orders
    loadOrders();
    
    // Setup auto-refresh
    setupAutoRefresh();
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

// Sample orders data
const ordersData = [
    {
        id: '#ORD-1001',
        customer: { name: 'John Smith', email: 'john@email.com', avatar: 'J' },
        products: ['Wireless Headphones', 'Smart Watch'],
        total: 279.98,
        status: 'paid',
        date: '2025-01-03 10:30 AM'
    },
    {
        id: '#ORD-1002',
        customer: { name: 'Sarah Johnson', email: 'sarah@email.com', avatar: 'S' },
        products: ['Cotton T-Shirt'],
        total: 24.99,
        status: 'confirmed',
        date: '2025-01-03 09:15 AM'
    },
    {
        id: '#ORD-1003',
        customer: { name: 'Michael Brown', email: 'michael@email.com', avatar: 'M' },
        products: ['Running Shoes', 'Yoga Mat'],
        total: 119.98,
        status: 'shipped',
        date: '2025-01-02 03:45 PM'
    },
    {
        id: '#ORD-1004',
        customer: { name: 'Emily Davis', email: 'emily@email.com', avatar: 'E' },
        products: ['Coffee Maker'],
        total: 49.99,
        status: 'paid',
        date: '2025-01-02 11:20 AM'
    },
    {
        id: '#ORD-1005',
        customer: { name: 'David Wilson', email: 'david@email.com', avatar: 'D' },
        products: ['Smart Watch', 'Wireless Headphones'],
        total: 279.98,
        status: 'draft',
        date: '2025-01-01 02:30 PM'
    }
];

let currentFilter = 'all';

// Load orders
function loadOrders() {
    const tbody = document.getElementById('ordersTableBody');
    
    // Simulate loading
    setTimeout(() => {
        tbody.innerHTML = '';
        
        const filteredOrders = filterOrders(ordersData);
        
        if (filteredOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 3rem;">
                        <div style="color: var(--text-gray);">No orders found</div>
                    </td>
                </tr>
            `;
        } else {
            filteredOrders.forEach(order => {
                const row = createOrderRow(order);
                tbody.appendChild(row);
            });
        }
        
        // Update orders count
        document.getElementById('ordersCount').textContent = `${filteredOrders.length} order(s) found`;
        
        // Update stats
        updateStats();
    }, 1000);
}

// Filter orders
function filterOrders(orders) {
    if (currentFilter === 'all') {
        return orders;
    }
    return orders.filter(order => order.status === currentFilter);
}

// Create order row
function createOrderRow(order) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td><span class="order-id">${order.id}</span></td>
        <td>
            <div class="customer-info">
                <div class="customer-avatar">${order.customer.avatar}</div>
                <div class="customer-details">
                    <div class="customer-name">${order.customer.name}</div>
                    <div class="customer-email">${order.customer.email}</div>
                </div>
            </div>
        </td>
        <td><span class="products-count">${order.products.length} item(s)</span></td>
        <td><span class="order-total">$${order.total.toFixed(2)}</span></td>
        <td><span class="order-status ${order.status}">${order.status}</span></td>
        <td><span class="order-date">${order.date}</span></td>
        <td>
            <div class="action-btns">
                <button class="action-btn edit" onclick='viewOrderDetails(${JSON.stringify(order).replace(/'/g, "\\'")})'title="View Details">
                    👁️
                </button>
                <button class="action-btn delete" onclick="deleteOrder('${order.id}')" title="Delete">
                    🗑️
                </button>
            </div>
        </td>
    `;
    
    return tr;
}

// Update stats
function updateStats() {
    const total = ordersData.length;
    const paid = ordersData.filter(o => o.status === 'paid').length;
    const pending = ordersData.filter(o => o.status === 'confirmed' || o.status === 'draft').length;
    const revenue = ordersData.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0);
    
    const statValues = document.querySelectorAll('.stat-value');
    animateValue(statValues[0], 0, total, 1000);
    animateValue(statValues[1], 0, paid, 1000);
    animateValue(statValues[2], 0, pending, 1000);
    animateValue(statValues[3], 0, revenue, 1000, '$', '');
    
    const quickStats = document.querySelectorAll('.quick-stat-value');
    animateValue(quickStats[0], 0, total, 1000);
    animateValue(quickStats[1], 0, paid, 1000);
    animateValue(quickStats[2], 0, pending, 1000);
    animateValue(quickStats[3], 0, revenue, 1000, '$', '');
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
            element.textContent = prefix + (prefix === '$' ? end.toFixed(2) : Math.round(end)) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + (prefix === '$' ? current.toFixed(2) : Math.round(current)) + suffix;
        }
    }, 16);
}

// Tab filtering
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        currentFilter = this.dataset.status;
        loadOrders();
    });
});

// Search orders
const searchInput = document.getElementById('searchOrders');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.orders-table tbody tr');
        
        rows.forEach(row => {
            const orderId = row.querySelector('.order-id');
            const customerName = row.querySelector('.customer-name');
            
            if (orderId && customerName) {
                const id = orderId.textContent.toLowerCase();
                const name = customerName.textContent.toLowerCase();
                
                if (id.includes(searchTerm) || name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
}

// View order details
function viewOrderDetails(order) {
    const modal = document.getElementById('orderDetailsModal');
    const modalBody = document.getElementById('orderDetailsBody');
    
    modalBody.innerHTML = `
        <div class="order-details-section">
            <h4>Order Information</h4>
            <div class="detail-row">
                <span class="detail-label">Order ID:</span>
                <span class="detail-value">${order.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Order Date:</span>
                <span class="detail-value">${order.date}</span>
            </div>
        </div>
        
        <div class="order-details-section">
            <h4>Customer Information</h4>
            <div class="detail-row">
                <span class="detail-label">Name:</span>
                <span class="detail-value">${order.customer.name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${order.customer.email}</span>
            </div>
        </div>
        
        <div class="order-details-section">
            <h4>Products</h4>
            ${order.products.map(product => `
                <div class="product-item">
                    <div class="product-item-info">
                        <div class="product-item-name">${product}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="order-details-section">
            <h4>Order Summary</h4>
            <div class="order-summary">
                <div class="summary-row total">
                    <span>Total Amount:</span>
                    <span>$${order.total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Delete order
function deleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
        const index = ordersData.findIndex(o => o.id === orderId);
        ordersData.splice(index, 1);
        showNotification('Order deleted successfully!', 'success');
        loadOrders();
    }
}

// Refresh orders
function refreshOrders() {
    showNotification('Refreshing orders...', 'info');
    loadOrders();
}

// Auto-refresh setup
function setupAutoRefresh() {
    const toggle = document.getElementById('autoRefresh');
    let intervalId = null;
    
    if (toggle.checked) {
        intervalId = setInterval(() => {
            refreshOrders();
        }, 30000); // Refresh every 30 seconds
    }
    
    toggle.addEventListener('change', (e) => {
        const label = document.querySelector('.toggle-label');
        
        if (e.target.checked) {
            label.textContent = 'Auto-Refresh ON';
            intervalId = setInterval(() => {
                refreshOrders();
            }, 30000);
        } else {
            label.textContent = 'Auto-Refresh OFF';
            if (intervalId) {
                clearInterval(intervalId);
            }
        }
    });
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
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
`;
document.head.appendChild(style);

// Mobile sidebar toggle
const createMobileMenuToggle = () => {
    if (window.innerWidth <= 768) {
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

// Initialize
createMobileMenuToggle();
window.addEventListener('resize', createMobileMenuToggle);

console.log('🛒 Mochan-D Orders loaded successfully!');

