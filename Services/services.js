// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeServicePages();
});

function initializeServicePages() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractiveElements();
    
    console.log('Spritz Essentials - Service Pages Initialized');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            if (navLeft) navLeft.classList.toggle('active');
            if (navRight) navRight.classList.toggle('active');
            document.body.style.overflow = navLeft && navLeft.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) navToggle.classList.remove('active');
            if (navLeft) navLeft.classList.remove('active');
            if (navRight) navRight.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for internal links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (navbar) {
            if (scrolled > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for page header
    const pageHeader = document.querySelector('.page-header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        
        if (pageHeader) {
            pageHeader.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress indicator
    createScrollProgressIndicator();
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--color-gold), var(--color-black));
        z-index: 1001;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-overview, .step-item, .feature-card, .service-card, .cta-content'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Number counter animation for any stats
    initializeCounterAnimation();
    
    // Enhanced hover effects
    initializeHoverEffects();
}

function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number, .metric-number');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                if (!isNaN(finalValue)) {
                    animateCounter(target, 0, finalValue, 2000);
                }
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(start + (end - start) * easeOutQuart(progress));
        
        element.textContent = current + (element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

function initializeHoverEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.step-item, .feature-card, .service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Smooth scroll to CTA section when page loads with hash
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }
    
    // Enhanced visual placeholder interactions
    initializePlaceholderEffects();
    
    // Back to top functionality
    createBackToTopButton();
    
    // Service card interaction enhancements
    enhanceServiceCards();
}

function initializePlaceholderEffects() {
    const placeholders = document.querySelectorAll('.visual-placeholder');
    
    placeholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        placeholder.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    
    // Style the button
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--color-gold);
        color: var(--color-black);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: var(--shadow-medium);
    `;
    
    // Add click event
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Add hover effects
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--color-black)';
        this.style.color = 'var(--color-gold)';
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--color-gold)';
        this.style.color = 'var(--color-black)';
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    document.body.appendChild(backToTopButton);
}

function enhanceServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add loading effect when clicked
        card.addEventListener('click', function(e) {
            const icon = this.querySelector('.service-icon i');
            if (icon) {
                icon.style.animation = 'spin 0.5s ease-in-out';
                setTimeout(() => {
                    icon.style.animation = '';
                }, 500);
            }
        });
        
        // Add pulse effect on hover
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = 'pulse 1s ease-in-out infinite';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function() {
        const context = this;
        const args = arguments;
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(context, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function() {
                func.apply(context, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (navLeft && navLeft.classList.contains('active')) {
            if (navToggle) navToggle.classList.remove('active');
            navLeft.classList.remove('active');
            if (navRight) navRight.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Enter key on nav toggle
    if (e.key === 'Enter' && e.target.classList.contains('nav-toggle')) {
        e.target.click();
    }
    
    // Arrow keys for service card navigation
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('service-card')) {
            e.preventDefault();
            const serviceCards = Array.from(document.querySelectorAll('.service-card'));
            const currentIndex = serviceCards.indexOf(focusedElement);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = currentIndex < serviceCards.length - 1 ? currentIndex + 1 : 0;
            } else {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : serviceCards.length - 1;
            }
            
            serviceCards[nextIndex].focus();
        }
    }
});

// Focus management for better accessibility
function manageFocus() {
    const navLeft = document.querySelector('.nav-left');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
    
    if (navLeft && navLeft.classList.contains('active')) {
        // Focus first link when menu opens
        if (navLinks[0]) navLinks[0].focus();
        
        // Trap focus within menu
        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey && index === 0) {
                        e.preventDefault();
                        navLinks[navLinks.length - 1].focus();
                    } else if (!e.shiftKey && index === navLinks.length - 1) {
                        e.preventDefault();
                        navLinks[0].focus();
                    }
                }
            });
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    const pageHeader = document.querySelector('.page-header');
    
    // Update navbar background
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    }
    
    // Parallax effect for page header
    if (pageHeader) {
        const rate = scrolled * -0.2;
        pageHeader.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

// Replace scroll listeners with optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== BROWSER COMPATIBILITY CHECKS =====
function checkBrowserCompatibility() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported. Using fallback animation.');
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => el.classList.add('visible'));
    }
    
    // Check for CSS Custom Properties support
    if (!CSS.supports('color', 'var(--fake-var)')) {
        console.warn('CSS Custom Properties not supported');
    }
}

// ===== INITIALIZATION COMPLETION =====
document.addEventListener('DOMContentLoaded', function() {
    checkBrowserCompatibility();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card {
            position: relative;
        }
        
        .service-card:focus {
            outline: 2px solid var(--color-gold);
            outline-offset: 2px;
        }
        
        .back-to-top:focus {
            outline: 2px solid var(--color-black);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Service pages fully loaded and ready!');
});

// ===== EXPORT FOR TESTING (if using modules) =====
// export { initializeServicePages, animateCounter, throttle, debounce };