// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeLegalPages();
});

function initializeLegalPages() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeContentNavigation();
    initializeAnimations();
    
    console.log('Spritz Essentials - Legal Pages Initialized');
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

// ===== CONTENT NAVIGATION =====
function initializeContentNavigation() {
    const contentNavLinks = document.querySelectorAll('.content-nav a');
    const sections = document.querySelectorAll('.content-section[id]');
    
    // Smooth scrolling for content navigation
    contentNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 120; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section in navigation
    function updateActiveNavigation() {
        const scrollPosition = window.pageYOffset + 150; // Offset for better detection
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.content-nav a[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    contentNavLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current link
                    navLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll listener for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavigation, 50);
    });
    
    // Initialize active state
    updateActiveNavigation();
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // Add scroll-based effects here if needed
    let lastScrollTop = 0;
    
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
                // Optional: unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.content-main, .content-nav, .intro-section, .content-section'
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
    // Enhanced hover effects for navigation links
    const contentNavLinks = document.querySelectorAll('.content-nav a');
    
    contentNavLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Hover effects for CTA buttons
    const ctaButtons = document.querySelectorAll('.partnership-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Create a "back to top" button
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
    `;
    
    // Add click event
    backToTopButton.addEventListener('click', scrollToTop);
    
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
        this.style.transform = 'translateY(-2px)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--color-gold)';
        this.style.color = 'var(--color-black)';
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(backToTopButton);
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
});

// ===== PRINT FUNCTIONALITY =====
function initializePrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print This Page';
    printButton.className = 'print-button';
    
    printButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        padding: 0.75rem 1.5rem;
        background: var(--color-white);
        color: var(--color-black);
        border: 2px solid var(--color-gold);
        border-radius: 4px;
        cursor: pointer;
        font-family: var(--font-primary);
        font-size: 0.9rem;
        font-weight: 600;
        transition: all 0.3s ease;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--color-gold)';
        this.style.color = 'var(--color-black)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--color-white)';
        this.style.color = 'var(--color-black)';
    });
    
    document.body.appendChild(printButton);
}

// ===== CONTENT ENHANCEMENT =====

// Add copy link functionality for sections
function initializeCopyLinkFeature() {
    const sections = document.querySelectorAll('.content-section[id]');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) {
            const linkIcon = document.createElement('span');
            linkIcon.innerHTML = ' <i class="fas fa-link"></i>';
            linkIcon.className = 'copy-link';
            linkIcon.title = 'Copy link to this section';
            
            linkIcon.style.cssText = `
                opacity: 0;
                transition: opacity 0.3s ease;
                cursor: pointer;
                color: var(--color-gold);
                margin-left: 0.5rem;
                font-size: 0.8em;
            `;
            
            linkIcon.addEventListener('click', function() {
                const url = window.location.origin + window.location.pathname + '#' + section.id;
                navigator.clipboard.writeText(url).then(function() {
                    // Show success feedback
                    linkIcon.innerHTML = ' <i class="fas fa-check"></i>';
                    setTimeout(() => {
                        linkIcon.innerHTML = ' <i class="fas fa-link"></i>';
                    }, 2000);
                });
            });
            
            section.addEventListener('mouseenter', function() {
                linkIcon.style.opacity = '1';
            });
            
            section.addEventListener('mouseleave', function() {
                linkIcon.style.opacity = '0';
            });
            
            heading.appendChild(linkIcon);
        }
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== INITIALIZATION COMPLETION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize additional features
    createBackToTopButton();
    initializePrintButton();
    initializeCopyLinkFeature();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .content-nav a.active {
            color: var(--color-gold);
            border-left-color: var(--color-gold);
            font-weight: 600;
        }
        
        @media print {
            .back-to-top,
            .print-button {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎉 Legal pages fully loaded and ready!');
});

// ===== PERFORMANCE OPTIMIZATION =====

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