// ===== FRAGRANCE CAROUSEL DATA =====
const fragrances = [
    // Men's Fragrances
    {
        name: "Aventus",
        brand: "Creed",
        type: "Men's",
        description: "A sophisticated blend of blackcurrant, bergamot, apple, and patchouli. This iconic fragrance embodies confidence and success with its bold, masculine character.",
        notes: ["Blackcurrant", "Bergamot", "Apple", "Patchouli", "Oakmoss"]
    },
    {
        name: "Sauvage",
        brand: "Dior",
        type: "Men's",
        description: "Fresh and raw, inspired by landscapes of blue sky and desert. A powerful concentration with notes that evoke the magic hour of twilight in the desert.",
        notes: ["Bergamot", "Pepper", "Lavender", "Ambroxan", "Cedar"]
    },
    {
        name: "Bleu de Chanel",
        brand: "Chanel",
        type: "Men's",
        description: "A woody aromatic fragrance that defines a man who refuses to be defined. Independent and determined, he makes his own rules.",
        notes: ["Citrus", "Labdanum", "Sandalwood", "Cedar", "Ginger"]
    },
    {
        name: "Tom Ford Oud Wood",
        brand: "Tom Ford",
        type: "Men's",
        description: "A composition of exotic, smoky woods including rare oud, sandalwood, and rosewood. Sophisticated and mysterious.",
        notes: ["Oud", "Sandalwood", "Rosewood", "Cardamom", "Vanilla"]
    },
    {
        name: "Acqua di Gio Profumo",
        brand: "Giorgio Armani",
        type: "Men's",
        description: "An aquatic woody fragrance combining freshness and intensity. Inspired by the volcanic rock of Stromboli and the Mediterranean Sea.",
        notes: ["Sea Water", "Bergamot", "Geranium", "Sage", "Patchouli"]
    },
    {
        name: "1 Million",
        brand: "Paco Rabanne",
        type: "Men's",
        description: "A bold and confident fragrance with spicy and leather accords. For the man who dares to shine and attracts attention.",
        notes: ["Grapefruit", "Mint", "Cinnamon", "Leather", "Amber"]
    },
    {
        name: "The One",
        brand: "Dolce & Gabbana",
        type: "Men's",
        description: "A modern classic combining oriental spices with fresh tobacco leaves. Sophisticated elegance for the contemporary man.",
        notes: ["Grapefruit", "Basil", "Tobacco", "Cedarwood", "Amber"]
    },
    {
        name: "Invictus",
        brand: "Paco Rabanne",
        type: "Men's",
        description: "A powerful, energetic fragrance. Fresh grapefruit collides with aromatic bay leaves and woods. Victory in a bottle.",
        notes: ["Grapefruit", "Bay Leaf", "Jasmine", "Patchouli", "Ambergris"]
    },
    {
        name: "Terre d'Hermès",
        brand: "Hermès",
        type: "Men's",
        description: "A symbolic narrative exploring the relationship between man and earth. Orange and mineral notes dance between earth and sky.",
        notes: ["Orange", "Grapefruit", "Flint", "Pepper", "Vetiver"]
    },
    {
        name: "Green Irish Tweed",
        brand: "Creed",
        type: "Men's",
        description: "A fresh, sporty fragrance inspired by the Irish countryside. Cool and crisp with a sophisticated edge that's both timeless and modern.",
        notes: ["Lemon", "Peppermint", "Violet", "Sandalwood", "Ambergris"]
    },

    // Women's Fragrances
    {
        name: "Black Opium",
        brand: "Yves Saint Laurent",
        type: "Women's",
        description: "A seductive and intoxicating fragrance. Coffee and vanilla create an addictive gourmand scent with a rock'n'roll attitude.",
        notes: ["Coffee", "Vanilla", "White Flowers", "Pink Pepper", "Patchouli"]
    },
    {
        name: "Flowerbomb",
        brand: "Viktor & Rolf",
        type: "Women's",
        description: "An explosive bouquet of flowers. A floral explosion that transforms everything in its path with an addictive signature.",
        notes: ["Sambac Jasmine", "Rose", "Freesia", "Patchouli", "Vanilla"]
    },
    {
        name: "Good Girl",
        brand: "Carolina Herrera",
        type: "Women's",
        description: "A modern fragrance of duality expressing the beautiful contradiction of today's woman. Both good and bad, sensual and innocent.",
        notes: ["Almond", "Coffee", "Tuberose", "Cacao", "Tonka Bean"]
    },
    {
        name: "J'adore",
        brand: "Dior",
        type: "Women's",
        description: "A luxurious bouquet of the most beautiful flowers. Sophisticated femininity in a sensual, smooth, and voluptuous fragrance.",
        notes: ["Ylang-Ylang", "Rose", "Jasmine", "Tuberose", "Vanilla"]
    },
    {
        name: "Coco Mademoiselle",
        brand: "Chanel",
        type: "Women's",
        description: "A spirited and voluptuous fragrance. An oriental fresh fragrance that recalls the free and bold spirit of Gabrielle Chanel.",
        notes: ["Orange", "Jasmine", "Rose", "Patchouli", "Vanilla"]
    },
    {
        name: "La Vie Est Belle",
        brand: "Lancôme",
        type: "Women's",
        description: "The happiness fragrance. A sweet gourmand scent built around a unique essence of iris, creating an irresistible aura of happiness.",
        notes: ["Iris", "Praline", "Vanilla", "Patchouli", "Blackcurrant"]
    },
    {
        name: "Miss Dior",
        brand: "Dior",
        type: "Women's",
        description: "A scent of couture and love. Sparkling mandarin essence meets soft peony and elegant wood notes in perfect harmony.",
        notes: ["Mandarin", "Peony", "Rose", "Patchouli", "Musk"]
    },
    {
        name: "Alien",
        brand: "Thierry Mugler",
        type: "Women's",
        description: "A mysterious and powerful fragrance. Dominated by jasmine sambac, it's an otherworldly scent that's both familiar and strange.",
        notes: ["Jasmine", "Cashmeran", "White Amber", "Woody Notes"]
    },
    {
        name: "Bombshell",
        brand: "Victoria's Secret",
        type: "Women's",
        description: "An explosion of purple passion fruit, Shangri-La peony, and vanilla orchid. Sexy, playful, and absolutely irresistible.",
        notes: ["Passion Fruit", "Peony", "Vanilla Orchid", "Musk", "Woods"]
    },
    {
        name: "Baccarat Rouge 540",
        brand: "Maison Francis Kurkdjian",
        type: "Women's",
        description: "A luminous and sophisticated fragrance. Saffron and jasmine create a radiant and voluptuous opening with a crystal-clear signature.",
        notes: ["Saffron", "Jasmine", "Ambergris", "Fir Resin", "Cedar"]
    }
];

// ===== FRAGRANCE CAROUSEL FUNCTIONALITY =====
class FragranceCarousel {
    constructor() {
        this.currentIndex = 0;
        this.itemsPerView = 4;
        this.totalItems = fragrances.length;
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        
        this.container = document.getElementById('fragranceGrid');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.dotsContainer = document.getElementById('carouselDots');
        
        this.init();
    }
    
    init() {
        this.renderFragrances();
        this.renderDots();
        this.bindEvents();
        this.updateButtons();
        this.updateItemsPerView();
        
        // Listen for window resize
        window.addEventListener('resize', () => this.updateItemsPerView());
    }
    
    updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) {
            this.itemsPerView = 1;
        } else if (width <= 768) {
            this.itemsPerView = 2;
        } else if (width <= 1200) {
            this.itemsPerView = 3;
        } else {
            this.itemsPerView = 4;
        }
        
        this.maxIndex = Math.max(0, this.totalItems - this.itemsPerView);
        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }
        this.updateCarousel();
        this.renderDots();
    }
    
    renderFragrances() {
        this.container.innerHTML = fragrances.map(fragrance => `
            <div class="fragrance-card">
                <div class="fragrance-type">${fragrance.type}</div>
                <h3 class="fragrance-name">${fragrance.name}</h3>
                <div class="fragrance-brand">${fragrance.brand}</div>
                <p class="fragrance-description">${fragrance.description}</p>
                <div class="fragrance-notes">
                    <div class="notes-label">Key Notes</div>
                    <div class="notes-list">
                        ${fragrance.notes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    renderDots() {
        const numberOfDots = Math.ceil(this.totalItems / this.itemsPerView);
        this.dotsContainer.innerHTML = Array(numberOfDots).fill(0).map((_, index) => 
            `<div class="dot ${index === Math.floor(this.currentIndex / this.itemsPerView) ? 'active' : ''}" data-index="${index}"></div>`
        ).join('');
    }
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const dotIndex = parseInt(e.target.dataset.index);
                this.goToSlide(dotIndex * this.itemsPerView);
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let endX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - 1);
            this.updateCarousel();
        }
    }
    
    nextSlide() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(this.maxIndex, index));
        this.updateCarousel();
    }
    
    updateCarousel() {
        const cardWidth = 100 / this.itemsPerView;
        const translateX = -(this.currentIndex * cardWidth);
        this.container.style.transform = `translateX(${translateX}%)`;
        
        this.updateButtons();
        this.updateDots();
    }
    
    updateButtons() {
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
    
    updateDots() {
        const dots = this.dotsContainer.querySelectorAll('.dot');
        const activeDotIndex = Math.floor(this.currentIndex / this.itemsPerView);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }
}

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
    initializeFragranceCarousel();
    
    console.log('Spritz Essentials - Luxury Fragrance Solutions Initialized');
}

// ===== FRAGRANCE CAROUSEL INITIALIZATION =====
function initializeFragranceCarousel() {
    // Check if elements exist before initializing
    if (document.getElementById('fragranceGrid')) {
        new FragranceCarousel();
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
    
    // Smooth scrolling for navigation links - UPDATED TO HANDLE EXTERNAL LINKS
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default and smooth scroll for internal hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (like partnerships.html), let them work normally
            // Don't prevent default for external links
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
    
    // Observe elements for animation (including fragrance cards)
    const animatedElements = document.querySelectorAll(
        '.heritage-content, .heritage-visual, .step, .benefit-card, .fragrance-card, .partnership-info, .partnership-form'
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
    // Enhanced hover effects for cards (including fragrance cards)
    const cards = document.querySelectorAll('.step, .benefit-card, .fragrance-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.cta-primary, .btn-submit, .carousel-btn');
    
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
    const form = document.getElementById('generalInquiryForm');
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
            showMessage('Thank you for your inquiry. Our team will contact you within 24 hours.', 'success');
            form.reset();
            
            // In a real implementation, you would use EmailJS here:
            /*
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone || 'Not provided',
                subject: data.subject,
                inquiry_type: data.inquiryType,
                organization: data.organization || 'Not provided',
                message: data.message,
                preferred_contact: data.preferredContact || 'No preference',
                reply_to: data.email
            }).then(function(response) {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                showMessage('Thank you for your inquiry. Our team will contact you within 24 hours.', 'success');
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
        const navLeft = document.querySelector('.nav-left');
        const navRight = document.querySelector('.nav-right');
        
        if (navLeft && navLeft.classList.contains('active')) {
            navToggle.classList.remove('active');
            navLeft.classList.remove('active');
            navRight.classList.remove('active');
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
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
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
    const form = document.getElementById('generalInquiryForm');
    if (form) {
        form.addEventListener('submit', function() {
            // Example: Google Analytics event tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    event_category: 'General Inquiry',
                    event_label: 'General Inquiry Form'
                });
            }
        });
    }
    
    // Track fragrance carousel interactions
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'carousel_navigation', {
                    event_category: 'Fragrance Carousel',
                    event_label: 'Previous Button'
                });
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'carousel_navigation', {
                    event_category: 'Fragrance Carousel',
                    event_label: 'Next Button'
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
    subject: 'General Inquiry',
    inquiry_type: 'general-info',
    organization: 'Example Company',
    message: 'Interested in your services...',
    preferred_contact: 'email',
    reply_to: 'john@example.com',
    submission_date: new Date().toLocaleDateString()
};
*/