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
    
    // Load products
    loadProducts();
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

// Sample products data
const productsData = [
    {
        id: 1,
        name: 'Wireless Headphones',
        sku: 'WH-001',
        category: 'Electronics',
        price: 79.99,
        stock: 45,
        status: 'active',
        image: '🎧'
    },
    {
        id: 2,
        name: 'Smart Watch',
        sku: 'SW-002',
        category: 'Electronics',
        price: 199.99,
        stock: 8,
        status: 'active',
        image: '⌚'
    },
    {
        id: 3,
        name: 'Cotton T-Shirt',
        sku: 'TS-003',
        category: 'Clothing',
        price: 24.99,
        stock: 120,
        status: 'active',
        image: '👕'
    },
    {
        id: 4,
        name: 'Running Shoes',
        sku: 'RS-004',
        category: 'Clothing',
        price: 89.99,
        stock: 0,
        status: 'inactive',
        image: '👟'
    },
    {
        id: 5,
        name: 'Coffee Maker',
        sku: 'CM-005',
        category: 'Home & Garden',
        price: 49.99,
        stock: 32,
        status: 'active',
        image: '☕'
    },
    {
        id: 6,
        name: 'Yoga Mat',
        sku: 'YM-006',
        category: 'Home & Garden',
        price: 29.99,
        stock: 3,
        status: 'active',
        image: '🧘'
    }
];

// Load products
function loadProducts() {
    const tbody = document.getElementById('productsTableBody');
    
    // Simulate loading
    setTimeout(() => {
        tbody.innerHTML = '';
        
        productsData.forEach(product => {
            const row = createProductRow(product);
            tbody.appendChild(row);
        });
        
        // Update stats
        updateStats();
    }, 1000);
}

// Create product row
function createProductRow(product) {
    const tr = document.createElement('tr');
    
    const stockStatus = product.stock === 0 ? 'out-of-stock' : 
                       product.stock < 10 ? 'low-stock' : 'in-stock';
    
    const stockText = product.stock === 0 ? 'Out of Stock' :
                     product.stock < 10 ? 'Low Stock' : 'In Stock';
    
    tr.innerHTML = `
        <td><input type="checkbox"></td>
        <td>
            <div class="product-info">
                <div class="product-image">${product.image}</div>
                <div class="product-details">
                    <div class="product-name">${product.name}</div>
                    <div class="product-sku">SKU: ${product.sku}</div>
                </div>
            </div>
        </td>
        <td>${product.category}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
            <span class="stock-badge ${stockStatus}">${product.stock} ${stockText}</span>
        </td>
        <td>
            <span class="status-badge ${product.status}">${product.status === 'active' ? 'Active' : 'Inactive'}</span>
        </td>
        <td>
            <div class="action-btns">
                <button class="action-btn edit" onclick="editProduct(${product.id})" title="Edit">
                    ✏️
                </button>
                <button class="action-btn delete" onclick="deleteProduct(${product.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </td>
    `;
    
    return tr;
}

// Update stats
function updateStats() {
    const total = productsData.length;
    const active = productsData.filter(p => p.status === 'active').length;
    const lowStock = productsData.filter(p => p.stock > 0 && p.stock < 10).length;
    const outOfStock = productsData.filter(p => p.stock === 0).length;
    
    const statValues = document.querySelectorAll('.stat-value');
    animateValue(statValues[0], 0, total, 1000);
    animateValue(statValues[1], 0, active, 1000);
    animateValue(statValues[2], 0, lowStock, 1000);
    animateValue(statValues[3], 0, outOfStock, 1000);
}

// Animate number values
function animateValue(element, start, end, duration) {
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.round(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Search products
const searchInput = document.getElementById('searchProducts');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.products-table tbody tr');
        
        rows.forEach(row => {
            const productName = row.querySelector('.product-name');
            const productSku = row.querySelector('.product-sku');
            
            if (productName && productSku) {
                const name = productName.textContent.toLowerCase();
                const sku = productSku.textContent.toLowerCase();
                
                if (name.includes(searchTerm) || sku.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
}

// Filter by category
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
        const category = e.target.value;
        const rows = document.querySelectorAll('.products-table tbody tr');
        
        rows.forEach(row => {
            const categoryCell = row.cells[2];
            
            if (categoryCell) {
                if (category === 'all' || categoryCell.textContent === category.charAt(0).toUpperCase() + category.slice(1)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });
}

// Select all checkbox
const selectAll = document.getElementById('selectAll');
if (selectAll) {
    selectAll.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.products-table tbody input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = e.target.checked);
    });
}

// Show add product modal
function showAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('active');
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Handle add product form
const addProductForm = document.getElementById('addProductForm');
if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        showNotification('Product added successfully!', 'success');
        closeModal('addProductModal');
        addProductForm.reset();
        
        // Reload products (in real app, this would add to database)
        setTimeout(() => {
            loadProducts();
        }, 500);
    });
}

// Edit product
function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (product) {
        showNotification(`Editing ${product.name}...`, 'info');
        // In real app, show edit modal with product data
    }
}

// Delete product
function deleteProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (product && confirm(`Are you sure you want to delete ${product.name}?`)) {
        const index = productsData.findIndex(p => p.id === id);
        productsData.splice(index, 1);
        showNotification('Product deleted successfully!', 'success');
        loadProducts();
    }
}

// Export products
function exportProducts() {
    showNotification('Exporting products...', 'info');
    // In real app, this would generate CSV or Excel file
    setTimeout(() => {
        showNotification('Products exported successfully!', 'success');
    }, 1000);
}

// Show import modal
function showImportModal() {
    showNotification('Import feature coming soon!', 'info');
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

console.log('📦 Mochan-D Inventory loaded successfully!');

