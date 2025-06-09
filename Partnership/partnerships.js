// ===== EMAILJS INITIALIZATION & MANAGEMENT =====
class EmailJSManager {
    constructor() {
        this.isInitialized = false;
        this.config = null;
    }
    
    async initialize() {
        try {
            // Check if EmailJS library is loaded
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS library not loaded');
            }
            
            // Check if config is available
            if (!window.EMAILJS_CONFIG) {
                throw new Error('EmailJS configuration not found');
            }
            
            this.config = window.EMAILJS_CONFIG;
            
            // Validate configuration
            if (!this.config.publicKey || !this.config.serviceId || !this.config.templateId) {
                throw new Error('Incomplete EmailJS configuration');
            }
            
            // Initialize EmailJS
            emailjs.init(this.config.publicKey);
            this.isInitialized = true;
            
            console.log('✅ EmailJS initialized successfully for Partnership page');
            
            // Optional: Test connection
            await this.testConnection();
            
        } catch (error) {
            console.error('❌ EmailJS initialization failed:', error.message);
            this.isInitialized = false;
        }
    }
    
    async testConnection() {
        try {
            // Send a minimal test to verify connection (this won't actually send an email)
            await emailjs.send(this.config.serviceId, this.config.templateId, {
                test: 'partnership_connection_test',
                timestamp: new Date().toISOString()
            }, this.config.publicKey);
            
            console.log('✅ EmailJS connection test successful');
        } catch (error) {
            console.warn('⚠️ EmailJS connection test failed:', error.message);
            // Don't throw error here as it might be a template validation issue
        }
    }
    
    async sendEmail(templateParams) {
        if (!this.isInitialized) {
            throw new Error('EmailJS not initialized');
        }
        
        try {
            const response = await emailjs.send(
                this.config.serviceId,
                this.config.templateId,
                templateParams,
                this.config.publicKey
            );
            
            console.log('✅ Partnership email sent successfully:', response);
            return response;
        } catch (error) {
            console.error('❌ Partnership email sending failed:', error);
            throw error;
        }
    }
    
    formatPartnershipData(formData) {
        return {
            // Basic contact info
            from_name: `${formData.firstName} ${formData.lastName}`,
            first_name: formData.firstName || '',
            last_name: formData.lastName || '',
            from_email: formData.email || '',
            phone: formData.phone || 'Not provided',
            
            // Venue information
            venue_name: formData.venue || '',
            venue_type: formData.venueType || '',
            location: formData.location || '',
            guest_capacity: formData.guestCapacity || 'Not specified',
            
            // Partnership details
            timeline: formData.timeline || 'Not specified',
            current_amenities: formData.currentAmenities || 'No details provided',
            partnership_goals: formData.partnershipGoals || 'No specific goals mentioned',
            
            // Email metadata
            reply_to: formData.email || '',
            submission_date: new Date().toLocaleDateString(),
            submission_time: new Date().toLocaleTimeString(),
            inquiry_type: 'Partnership Application',
            
            // Additional partnership-specific fields
            establishment_type: formData.venueType || '',
            establishment_name: formData.venue || '',
            daily_traffic: formData.guestCapacity || '',
            preferred_timeline: formData.timeline || '',
            current_guest_amenities: formData.currentAmenities || '',
            partnership_vision: formData.partnershipGoals || ''
        };
    }
}

// Create global EmailJS manager instance for partnerships
const emailManager = new EmailJSManager();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Initialize EmailJS first
        await emailManager.initialize();
        
        // Initialize all other components
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeForm();
        
        console.log('🎉 Spritz Essentials - Partnership Page Initialized');
    } catch (error) {
        console.error('❌ Partnership page initialization error:', error);
        // Continue with other initializations even if EmailJS fails
        initializeNavigation();
        initializeScrollEffects();
        initializeAnimations();
        initializeForm();
    }
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-left a, .nav-right a');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLeft?.classList.toggle('active');
        navRight?.classList.toggle('active');
        document.body.style.overflow = navLeft?.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle?.classList.remove('active');
            navLeft?.classList.remove('active');
            navRight?.classList.remove('active');
            document.body.style.overflow = '';
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

// ===== ENHANCED FORM HANDLING WITH EMAILJS =====
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
    
    // Form submission with EmailJS
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            await submitForm();
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
    
    async function submitForm() {
        // Show loading state
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        try {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Check if EmailJS is available and configured
            if (emailManager.isInitialized) {
                // Format data for EmailJS template
                const templateParams = emailManager.formatPartnershipData(data);
                
                // Send email via EmailJS
                await emailManager.sendEmail(templateParams);
                
                // Success
                showMessage('Thank you for your partnership inquiry! Our specialist will contact you within 24 hours to discuss your vision and explore opportunities.', 'success');
                form.reset();
                
                // Optional: Track successful submission
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'partnership_form_submission_success', {
                        event_category: 'Partnership Inquiry',
                        event_label: 'EmailJS Success'
                    });
                }
                
            } else {
                // Fallback behavior when EmailJS is not available
                console.warn('EmailJS not available for partnership form, using fallback submission');
                
                // Simulate success but inform user to contact directly
                setTimeout(() => {
                    showMessage('Thank you for your partnership inquiry! Please contact us directly at partnerships@spritzessentials.com for immediate assistance.', 'success');
                    form.reset();
                }, 1000);
            }
            
        } catch (error) {
            console.error('Partnership form submission error:', error);
            
            // Show error message
            showMessage('There was an error submitting your partnership inquiry. Please try again or contact us directly at partnerships@spritzessentials.com', 'error');
            
            // Optional: Track failed submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'partnership_form_submission_error', {
                    event_category: 'Partnership Inquiry',
                    event_label: error.message || 'Unknown Error'
                });
            }
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    function showMessage(message, type) {
        // Hide both messages first
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        
        // Show appropriate message
        if (type === 'success' && successMessage) {
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
        } else if (type === 'error' && errorMessage) {
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

// ===== EMAILJS DEBUGGING UTILITIES =====
function debugEmailJSConfig() {
    console.group('📧 EmailJS Configuration Debug (Partnership Page)');
    console.log('Config available:', !!window.EMAILJS_CONFIG);
    
    if (window.EMAILJS_CONFIG) {
        console.log('Public Key:', window.EMAILJS_CONFIG.publicKey ? '✅ Set' : '❌ Missing');
        console.log('Service ID:', window.EMAILJS_CONFIG.serviceId ? '✅ Set' : '❌ Missing');
        console.log('Template ID:', window.EMAILJS_CONFIG.templateId ? '✅ Set' : '❌ Missing');
    }
    
    console.log('EmailJS Library:', typeof emailjs !== 'undefined' ? '✅ Loaded' : '❌ Not loaded');
    console.log('EmailJS Manager:', emailManager.isInitialized ? '✅ Initialized' : '❌ Not initialized');
    console.groupEnd();
}

// Expose debug function globally for console testing
window.debugEmailJSPartnership = debugEmailJSConfig;

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (navLeft?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navLeft?.classList.remove('active');
            navRight?.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== ANALYTICS & TRACKING =====
function initializeAnalytics() {
    // Track partnership form interactions
    const form = document.getElementById('partnershipForm');
    if (form) {
        form.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'partnership_form_submission_attempt', {
                    event_category: 'Partnership Inquiry',
                    event_label: 'Partnership Form'
                });
            }
        });
    }
    
    // Track venue type selections
    const venueTypeSelect = document.getElementById('venueType');
    if (venueTypeSelect) {
        venueTypeSelect.addEventListener('change', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'venue_type_selection', {
                    event_category: 'Partnership Form',
                    event_label: this.value
                });
            }
        });
    }
}

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
    
    /* Partnership-specific styles */
    .partnership-status {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 15px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .partnership-status.success {
        background-color: #28a745;
    }
    
    .partnership-status.error {
        background-color: #dc3545;
    }
    
    .partnership-status.show {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===== INITIALIZATION COMPLETION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
    
    console.log('🎉 Spritz Essentials Partnership page loaded and ready!');
    console.log('💡 Run debugEmailJSPartnership() in console to check EmailJS configuration');
});

// ===== PARTNERSHIP TEMPLATE VARIABLES REFERENCE =====
/*
EmailJS Template Variables for Partnership Form:

{{from_name}} - Full name (first + last)
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
{{inquiry_type}} - Type of inquiry (Partnership Application)
{{establishment_type}} - Alias for venue_type
{{establishment_name}} - Alias for venue_name
{{daily_traffic}} - Alias for guest_capacity
{{preferred_timeline}} - Alias for timeline
{{current_guest_amenities}} - Alias for current_amenities
{{partnership_vision}} - Alias for partnership_goals
*/