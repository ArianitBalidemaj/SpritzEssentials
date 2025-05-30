// Simple navigation - jump to sections with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            const headerHeight = 100; // Adjust if needed
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo(0, targetPosition);
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 42, 77, 0.98)';
    } else {
        header.style.background = 'rgba(26, 42, 77, 0.95)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// Mobile menu functionality - FIXED VERSION
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Add mobile menu styles when active
    if (navLinks.classList.contains('active')) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'rgba(26, 42, 77, 0.98)';
        navLinks.style.padding = '2rem';
        navLinks.style.gap = '1rem';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    } else {
        navLinks.style.display = 'none';
    }
});

// FIXED: Only close mobile menu on mobile devices, not desktop
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        // Only hide menu if we're in mobile view
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navLinks.style.display = 'none';
        }
        // Don't hide navigation on desktop
    });
});

// Ensure navigation stays visible on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex'; // Show nav on desktop
        navLinks.classList.remove('active');
    } else {
        if (!navLinks.classList.contains('active')) {
            navLinks.style.display = 'none'; // Hide nav on mobile when not active
        }
    }
});

// Form submission handling
const form = document.getElementById('partnership-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    const requiredFields = ['name', 'email', 'venue-name', 'venue-type', 'location'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showError('Please fill out all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showError('Please enter a valid email address.');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('loading');
        showSuccess();
        form.reset();
    }, 2000);
});

function showSuccess() {
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Add hover effects to interactive elements
document.querySelectorAll('.step, .benefit, .brand-item').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Don't prevent default for anchor links
        if (this.getAttribute('href').startsWith('#')) {
            return;
        }
        
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
let ticking = false;

function updateOnScroll() {
    // Header background change
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 42, 77, 0.98)';
    } else {
        header.style.background = 'rgba(26, 42, 77, 0.95)';
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states
    console.log('Spritz Essentials - Premium Fragrance Vending Solutions');
    
    // Ensure navigation is visible on desktop by default
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    }
    
    // Add focus management for accessibility
    const form = document.getElementById('partnership-form');
    form.addEventListener('submit', function() {
        setTimeout(() => {
            const firstError = form.querySelector('.error-message:not([style*="display: none"])');
            if (firstError) {
                firstError.focus();
            }
        }, 100);
    });
});