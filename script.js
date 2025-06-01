// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize EmailJS (you'll need to add your service details)
    if (typeof emailjs !== 'undefined') {
        // emailjs.init('YOUR_PUBLIC_KEY'); // Uncomment and add your EmailJS public key
    }
    
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeForm();
    
    console.log('Spritz Essentials - Luxury Fragrance Solutions Initialized');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Header hide/show on scroll (optional)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Uncomment below if you want navbar to hide on scroll down
        /*
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        */
        
        lastScrollTop = scrollTop;
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
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.heritage-content, .heritage-visual, .step, .benefit-card, .collection-item, .partnership-info, .partnership-form'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Hover effects for interactive elements
    initializeHoverEffects();
    
    // Number counter animation for stats
    initializeCounterAnimation();
}

function initializeHoverEffects() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.step, .benefit-card, .collection-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.cta-primary, .btn-submit');
    
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

function initializeCounterAnimation() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 2000);
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
        
        element.textContent = current + '+';
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// ===== FORM HANDLING =====
function initializeForm() {
    const form = document.getElementById('partnershipForm');
    const submitButton = document.querySelector('.btn-submit');
    const successMessage = document.getElementById('formSuccess');
    const errorMessage = document.getElementById('formError');
    
    if (!form) return;
    
    // Form validation
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        } else {
            showMessage('Please fill out all required fields correctly.', 'error');
        }
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        }
        
        // Apply error styling if invalid
        if (!isValid) {
            field.classList.add('error');
            field.style.borderColor = '#dc3545';
        } else {
            field.style.borderColor = 'var(--color-gold)';
        }
        
        return isValid;
    }
    
    function clearFieldError(e) {
        const field = e.target;
        if (field.value.trim()) {
            field.classList.remove('error');
            field.style.borderColor = 'var(--color-gold)';
        }
    }
    
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function submitForm() {
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual EmailJS implementation)
        setTimeout(() => {
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message and reset form
            showMessage('Thank you for your inquiry. Our partnership specialist will contact you within 24 hours.', 'success');
            form.reset();
            
            // In a real implementation, you would use EmailJS here:
            /*
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'Not provided',
                venue_name: data.venue,
                venue_type: data.venueType,
                location: data.location,
                message: data.message || 'No additional message',
                reply_to: data.email
            }).then(function(response) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showMessage('Thank you for your inquiry. Our partnership specialist will contact you within 24 hours.', 'success');
                form.reset();
            }, function(error) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showMessage('There was an error submitting your inquiry. Please try again or contact us directly.', 'error');
            });
            */
            
        }, 1500); // Simulate network delay
    }
    
    function showMessage(message, type) {
        // Hide both messages first
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Show appropriate message
        if (type === 'success') {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-hide after 8 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                    successMessage.style.opacity = '1';
                }, 300);
            }, 8000);
        } else {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Auto-hide after 6 seconds
            setTimeout(() => {
                errorMessage.style.opacity = '0';
                setTimeout(() => {
                    errorMessage.style.display = 'none';
                    errorMessage.style.opacity = '1';
                }, 300);
            }, 6000);
        }
    }
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

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
const optimizedScrollHandler = throttle(function() {
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    // Update navbar background
    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
    
    // Parallax effect for hero
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
}, 16); // ~60fps

// Replace scroll listeners with optimized version
window.addEventListener('scroll', optimizedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Enter key on nav toggle
    if (e.key === 'Enter' && e.target.classList.contains('nav-toggle')) {
        e.target.click();
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    
    if (navMenu.classList.contains('active')) {
        // Focus first link when menu opens
        navLinks[0].focus();
        
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

// ===== PRELOADER (Optional) =====
function initializePreloader() {
    // Create preloader if doesn't exist
    if (!document.querySelector('.preloader')) {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <i class="fas fa-gem preloader-icon"></i>
                <div class="preloader-text">Spritz Essentials</div>
                <div class="preloader-bar">
                    <div class="preloader-progress"></div>
                </div>
            </div>
        `;
        
        // Add preloader styles
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--color-black);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .preloader-content {
                text-align: center;
                color: var(--color-white);
            }
            
            .preloader-icon {
                font-size: 3rem;
                color: var(--color-gold);
                margin-bottom: 1rem;
                animation: pulse 2s infinite;
            }
            
            .preloader-text {
                font-family: var(--font-display);
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                letter-spacing: 2px;
            }
            
            .preloader-bar {
                width: 200px;
                height: 2px;
                background: rgba(201, 169, 110, 0.3);
                border-radius: 1px;
                overflow: hidden;
            }
            
            .preloader-progress {
                height: 100%;
                background: var(--color-gold);
                width: 0;
                border-radius: 1px;
                animation: loading 2s ease-in-out;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes loading {
                0% { width: 0; }
                100% { width: 100%; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(preloader);
        
        // Remove preloader after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Optional: Send error to analytics or error reporting service
});

// ===== BROWSER COMPATIBILITY CHECKS =====
function checkBrowserCompatibility() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        console.warn('IntersectionObserver not supported. Using fallback animation.');
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(el => el.classList.add('visible'));
    }
    
    // Check for CSS Custom Properties support
    if (!CSS.supports('color', 'var(--fake-var)')) {
        console.warn('CSS Custom Properties not supported');
        // Could implement fallback styles here
    }
}

// ===== ANALYTICS & TRACKING (Optional) =====
function initializeAnalytics() {
    // Track form submissions
    const form = document.getElementById('partnershipForm');
    if (form) {
        form.addEventListener('submit', function() {
            // Example: Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    event_category: 'Partnership',
                    event_label: 'Partnership Inquiry Form'
                });
            }
        });
    }
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            // Track milestone scroll depths
            if (maxScroll >= 25 && maxScroll < 50) {
                // 25% scroll reached
            } else if (maxScroll >= 50 && maxScroll < 75) {
                // 50% scroll reached
            } else if (maxScroll >= 75) {
                // 75% scroll reached
            }
        }
    }, 1000));
}

// ===== INITIALIZATION COMPLETION =====
// Initialize additional features after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    checkBrowserCompatibility();
    // initializePreloader(); // Uncomment if you want the preloader
    initializeAnalytics();
    
    // Add CSS animation for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .error {
            border-color: #dc3545 !important;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    console.log('🎉 Spritz Essentials website fully loaded and ready!');
});

// ===== EMAILJS CONFIGURATION =====
// To use EmailJS, uncomment and configure the following:
/*
function initializeEmailJS() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
    
    // Test EmailJS connection
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        test: 'test'
    }).then(function() {
        console.log('EmailJS configured successfully');
    }).catch(function(error) {
        console.error('EmailJS configuration error:', error);
    });
}

// Email template parameters structure for reference:
const templateParams = {
    from_name: 'John Doe',
    from_email: 'john@example.com',
    phone: '+1234567890',
    venue_name: 'The Grand Hotel',
    venue_type: 'luxury-hotel',
    location: 'New York, NY',
    message: 'Interested in partnership opportunities...',
    reply_to: 'john@example.com',
    submission_date: new Date().toLocaleDateString()
};
*/

// ===== EXPORT FOR TESTING (if using modules) =====
// export { initializeApp, validateForm, animateCounter };