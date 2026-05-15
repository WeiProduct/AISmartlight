document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        document.body.classList.add('no-motion');
    }

    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });

    const header = document.querySelector('.header');
    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.scrollY > 50);
    };
    
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .use-case, .screenshot-item');
    
    animateElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const useCases = document.querySelectorAll('.use-case');
    useCases.forEach((useCase, index) => {
        useCase.style.transitionDelay = `${index * 0.1}s`;
    });

    const screenshots = document.querySelectorAll('.screenshot-item');
    screenshots.forEach((screenshot, index) => {
        screenshot.style.transitionDelay = `${index * 0.1}s`;
    });

    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup && !prefersReducedMotion) {
        phoneMockup.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg)';
        });
        
        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0)';
        });
    }

    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen && !prefersReducedMotion) {
        const colors = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
        ];
        
        let currentColor = 0;
        
        setInterval(() => {
            currentColor = (currentColor + 1) % colors.length;
            phoneScreen.style.background = colors[currentColor];
        }, 3000);
    }
});
