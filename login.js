// Login Form Handler
const loginForm = document.getElementById('loginForm');
const signinBtn = document.querySelector('.signin-btn');
const signupLink = document.getElementById('signupLink');

// Handle form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Validate inputs
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Add loading state
    signinBtn.classList.add('loading');
    signinBtn.textContent = '';
    
    // Simulate login (replace with actual API call)
    setTimeout(() => {
        signinBtn.classList.remove('loading');
        signinBtn.textContent = 'Sign in';
        
        // Store login state
        localStorage.setItem('mochand_logged_in', 'true');
        localStorage.setItem('mochand_user', JSON.stringify({
            email: email,
            name: email.split('@')[0]
        }));
        
        showNotification('Login successful!', 'success');
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    }, 2000);
});

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.querySelector('span').textContent;
        handleSocialLogin(provider);
    });
});

function handleSocialLogin(provider) {
    console.log(`Logging in with ${provider}...`);
    showNotification(`Redirecting to ${provider} login...`, 'info');
    
    // Add your OAuth logic here
    // For Google: window.location.href = 'your-google-oauth-url';
    // For Apple: window.location.href = 'your-apple-oauth-url';
    // etc.
}

// Sign up link handler
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Change to signup mode or redirect to signup page
    window.location.href = 'signup.html';
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    const styles = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        color: 'white',
        fontWeight: '600',
        fontSize: '0.95rem',
        zIndex: '9999',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    };
    
    Object.assign(notification.style, styles);
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    notification.style.background = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
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

// Input field animations
const inputs = document.querySelectorAll('.form-group input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Password visibility toggle (optional enhancement)
const passwordInput = document.getElementById('password');
const showPasswordBtn = document.createElement('button');
showPasswordBtn.type = 'button';
showPasswordBtn.innerHTML = '👁️';
showPasswordBtn.style.cssText = `
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    opacity: 0.6;
    transition: opacity 0.3s ease;
`;
showPasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.innerHTML = '👁️‍🗨️';
    } else {
        passwordInput.type = 'password';
        showPasswordBtn.innerHTML = '👁️';
    }
});
showPasswordBtn.addEventListener('mouseenter', () => {
    showPasswordBtn.style.opacity = '1';
});
showPasswordBtn.addEventListener('mouseleave', () => {
    showPasswordBtn.style.opacity = '0.6';
});
passwordInput.parentElement.style.position = 'relative';
passwordInput.parentElement.appendChild(showPasswordBtn);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press Escape to clear form
    if (e.key === 'Escape') {
        loginForm.reset();
        showNotification('Form cleared', 'info');
    }
});

// Prevent multiple form submissions
let isSubmitting = false;
loginForm.addEventListener('submit', (e) => {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    isSubmitting = true;
    setTimeout(() => {
        isSubmitting = false;
    }, 2000);
});

console.log('🔐 Mochan-D Login Page loaded successfully!');
console.log('💡 Press ESC to clear the form');

