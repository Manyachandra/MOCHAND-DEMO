// Signup Form Handler
const signupForm = document.getElementById('signupForm');
const createAccountBtn = document.querySelector('.signin-btn');

// Handle form submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    // Validate inputs
    if (!fullname || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Validate password strength
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Check if terms are accepted
    if (!termsAccepted) {
        showNotification('Please accept the Terms of Service', 'error');
        return;
    }
    
    // Add loading state
    createAccountBtn.classList.add('loading');
    createAccountBtn.textContent = '';
    
    // Simulate signup (replace with actual API call)
    setTimeout(() => {
        createAccountBtn.classList.remove('loading');
        createAccountBtn.textContent = 'Create Account';
        
        // Store login state
        localStorage.setItem('mochand_logged_in', 'true');
        localStorage.setItem('mochand_user', JSON.stringify({
            name: fullname,
            email: email
        }));
        
        showNotification('Account created successfully!', 'success');
        
        // Redirect to dashboard after successful signup
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    }, 2000);
});

// Social signup handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.querySelector('span').textContent;
        handleSocialSignup(provider);
    });
});

function handleSocialSignup(provider) {
    console.log(`Signing up with ${provider}...`);
    showNotification(`Redirecting to ${provider} signup...`, 'info');
    
    // Add your OAuth logic here
}

// Password strength indicator
const passwordInput = document.getElementById('password');
const strengthIndicator = document.createElement('div');
strengthIndicator.className = 'password-strength';
strengthIndicator.style.cssText = `
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    margin-top: 0.5rem;
    overflow: hidden;
    transition: all 0.3s ease;
`;

const strengthBar = document.createElement('div');
strengthBar.style.cssText = `
    height: 100%;
    width: 0%;
    transition: all 0.3s ease;
    border-radius: 2px;
`;

strengthIndicator.appendChild(strengthBar);
passwordInput.parentElement.appendChild(strengthIndicator);

passwordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    
    // Update strength bar
    strengthBar.style.width = strength.percentage + '%';
    strengthBar.style.background = strength.color;
    
    // Show strength text
    if (password.length > 0) {
        passwordInput.parentElement.setAttribute('data-strength', strength.text);
    } else {
        passwordInput.parentElement.removeAttribute('data-strength');
    }
});

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    
    let color, text;
    if (strength < 30) {
        color = '#ef4444';
        text = 'Weak';
    } else if (strength < 60) {
        color = '#f59e0b';
        text = 'Fair';
    } else if (strength < 80) {
        color = '#3b82f6';
        text = 'Good';
    } else {
        color = '#10b981';
        text = 'Strong';
    }
    
    return { percentage: strength, color, text };
}

// Notification system
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
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
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    notification.style.background = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
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
    
    .form-group[data-strength]::after {
        content: attr(data-strength);
        position: absolute;
        right: 1rem;
        top: -1.5rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
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

// Password visibility toggles
[passwordInput, document.getElementById('confirmPassword')].forEach(input => {
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
        z-index: 10;
    `;
    showPasswordBtn.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            showPasswordBtn.innerHTML = '👁️‍🗨️';
        } else {
            input.type = 'password';
            showPasswordBtn.innerHTML = '👁️';
        }
    });
    showPasswordBtn.addEventListener('mouseenter', () => {
        showPasswordBtn.style.opacity = '1';
    });
    showPasswordBtn.addEventListener('mouseleave', () => {
        showPasswordBtn.style.opacity = '0.6';
    });
    input.parentElement.style.position = 'relative';
    input.parentElement.appendChild(showPasswordBtn);
});

// Real-time password match validation
const confirmPasswordInput = document.getElementById('confirmPassword');
confirmPasswordInput.addEventListener('input', () => {
    if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#ef4444';
    } else if (confirmPasswordInput.value && passwordInput.value === confirmPasswordInput.value) {
        confirmPasswordInput.style.borderColor = '#10b981';
    } else {
        confirmPasswordInput.style.borderColor = '';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        signupForm.reset();
        showNotification('Form cleared', 'info');
    }
});

console.log('📝 Mochan-D Signup Page loaded successfully!');
console.log('💡 Press ESC to clear the form');

