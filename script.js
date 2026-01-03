// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + 'vh';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelector('.nav-buttons');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navButtons.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            navButtons.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                entry.target.classList.add('animated');
            }, index * 100);
        }
    });
}, observerOptions);

// Add fade-in effect to cards
const animateElements = document.querySelectorAll(`
    .value-card,
    .feature-card,
    .industry-card,
    .chatbot-card,
    .integration-card,
    .pricing-card,
    .cta-card
`);

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatStatValue(target);
            clearInterval(timer);
        } else {
            element.textContent = formatStatValue(Math.floor(current));
        }
    }, 16);
};

const formatStatValue = (value) => {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M+';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(0) + 'K+';
    }
    return value.toString();
};

// Animate stats when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statValue = entry.target.querySelector('.stat-value');
            const originalText = statValue.textContent;
            
            // Extract number from text
            let targetValue;
            if (originalText.includes('%')) {
                targetValue = 99.9;
                setTimeout(() => {
                    statValue.textContent = '99.9%';
                }, 1000);
            } else if (originalText.includes('s')) {
                setTimeout(() => {
                    let count = 5;
                    const timer = setInterval(() => {
                        count--;
                        statValue.textContent = '<' + count + 's';
                        if (count <= 2) {
                            clearInterval(timer);
                        }
                    }, 200);
                }, 500);
            } else if (originalText.includes('M+')) {
                targetValue = 2000000;
                animateCounter(statValue, targetValue);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Button click handlers
const handleButtonClick = (buttonText) => {
    console.log(`Button clicked: ${buttonText}`);
    // Add your button action logic here
    alert(`Thanks for your interest! The "${buttonText}" feature will be available soon.`);
};

// Add click handlers to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        // Don't show alert for navigation buttons
        if (!e.target.classList.contains('btn-secondary')) {
            handleButtonClick(buttonText);
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.value-card, .chatbot-card, .pricing-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const cards = document.querySelectorAll('.value-card, .chatbot-card, .pricing-card');
        cards.forEach(c => {
            if (c !== e.currentTarget) {
                c.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.value-card, .chatbot-card, .pricing-card');
        cards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Dynamic gradient animation
const gradientTexts = document.querySelectorAll('.gradient-text');
gradientTexts.forEach(text => {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        // Gradient animation is handled by CSS, but we can add additional effects here
    }, 50);
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Track scroll depth for analytics (placeholder)
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = (window.pageYOffset + window.innerHeight) / document.body.scrollHeight * 100;
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        // console.log('Max scroll depth:', Math.floor(maxScrollDepth) + '%');
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Show success message
            const button = newsletterForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = '✓ Subscribed!';
            button.style.background = '#10b981';
            
            // Reset form
            emailInput.value = '';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
            
            console.log('Newsletter subscription:', email);
        }
    });
}

// Easter egg: Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Magnetic button effect for primary buttons
document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Add ripple effect on button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add tilt effect to cards
document.querySelectorAll('.value-card, .chatbot-card, .pricing-card, .cta-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Smooth reveal for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

console.log('🚀 Mochan-D website loaded successfully!');
console.log('💡 Try the Konami code for a surprise: ↑ ↑ ↓ ↓ ← → ← → B A');

