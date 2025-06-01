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
    
    console.log('Spritz Essentials - Partnership Page Initialized');
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLeft.classList.toggle('active');
        navRight.classList.toggle('active');
        document.body.style.overflow = navLeft.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
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
    // Header hide/show on scroll (optional)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.partnership-info, .partnership-form, .benefit-item, .contact-details'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Hover effects for interactive elements
    initializeHoverEffects();
}

function initializeHoverEffects() {
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn-submit');
    
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

// ===== FORM HANDLING WITH EMAILJS =====
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
        
        // EmailJS Implementation
        if (typeof emailjs !== 'undefined') {
            // Prepare template parameters for EmailJS
            const templateParams = {
                from_name: `${data.firstName} ${data.lastName}`,
                first_name: data.firstName,
                last_name: data.lastName,
                from_email: data.email,
                phone: data.phone || 'Not provided',
                venue_name: data.venue,
                venue_type: data.venueType,
                location: data.location,
                guest_capacity: data.guestCapacity || 'Not specified',
                timeline: data.timeline || 'Not specified',
                current_amenities: data.currentAmenities || 'No details provided',
                partnership_goals: data.partnershipGoals || 'No specific goals mentioned',
                reply_to: data.email,
                submission_date: new Date().toLocaleDateString(),
                submission_time: new Date().toLocaleTimeString()
            };
            
            // Send email using EmailJS
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully:', response);
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    showMessage('Thank you for your partnership inquiry. Our specialist will contact you within 24 hours to discuss your vision and explore opportunities.', 'success');
                    form.reset();
                }, function(error) {
                    console.error('Email send failed:', error);
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    showMessage('There was an error submitting your inquiry. Please try again or contact us directly at partnerships@spritzessentials.com', 'error');
                });
        } else {
            // Fallback if EmailJS is not loaded
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showMessage('EmailJS is not configured. Please set up your EmailJS credentials to enable form submission.', 'error');
            }, 1000);
        }
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

// ===== EMAILJS CONFIGURATION HELPER =====
function initializeEmailJS() {
    // To use EmailJS, follow these steps:
    
    // 1. Sign up at https://www.emailjs.com/
    // 2. Create an email service (Gmail, Outlook, etc.)
    // 3. Create an email template
    // 4. Get your public key, service ID, and template ID
    // 5. Replace the placeholder values below:
    
    /*
    emailjs.init('YOUR_PUBLIC_KEY'); // Your EmailJS public key
    
    // Example of what YOUR_SERVICE_ID and YOUR_TEMPLATE_ID should look like:
    // YOUR_SERVICE_ID: 'service_abc123'
    // YOUR_TEMPLATE_ID: 'template_xyz789'
    */
    
    // Template variables available in your EmailJS template:
    /*
    {{from_name}} - Full name of the person submitting
    {{first_name}} - First name
    {{last_name}} - Last name
    {{from_email}} - Email address
    {{phone}} - Phone number
    {{venue_name}} - Establishment name
    {{venue_type}} - Type of establishment
    {{location}} - Location
    {{guest_capacity}} - Daily guest traffic
    {{timeline}} - Preferred timeline
    {{current_amenities}} - Current amenities description
    {{partnership_goals}} - Partnership goals and vision
    {{reply_to}} - Reply-to email
    {{submission_date}} - Date of submission
    {{submission_time}} - Time of submission
    */
}

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (navLeft.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== CSS ANIMATION INJECTION =====
// Add required CSS animations
const style = document.createElement('style');
style.textContent = `
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
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

console.log('🎉 Spritz Essentials Partnership page loaded and ready!');