document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    const welcomeTextElements = document.querySelectorAll('.hero-section .glitch');
    const mainNav = document.querySelector('.main-nav');
    const footer = document.querySelector('.footer');

    // Ensure initial state for elements that will be animated on load
    welcomeTextElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.filter = 'blur(5px)';
    });
    if (mainNav) {
        mainNav.style.opacity = '0';
        mainNav.style.transform = 'translateY(20px)';
    }
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(20px)';
    }

    // Hide loading screen after a delay to show animation
    // and trigger hero section animations
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            loadingScreen.addEventListener('transitionend', () => {
                loadingScreen.style.display = 'none';
            }, { once: true });
        }

        // Animate welcome text and navigation
        welcomeTextElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.transition = 'opacity 1s ease-out, transform 1s ease-out, filter 1s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.filter = 'blur(0)';
            }, index * 200 + 300); // Stagger effect
        });

        if (mainNav) {
            setTimeout(() => {
                mainNav.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                mainNav.style.opacity = '1';
                mainNav.style.transform = 'translateY(0)';
            }, 1000); // After welcome text
        }
        if (footer) {
             setTimeout(() => {
                footer.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }, 1200); // After welcome text and nav
        }


    }, 2000); // Minimum 2 seconds for loading animation

    // 2. Scroll Animation for Sections
    const sections = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Animate skill bars if it's the skills section
                if (entry.target.id === 'skills') {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const skillWidth = bar.style.width; // Get width from inline style
                        bar.style.width = '0'; // Reset to 0 for re-animation
                        setTimeout(() => {
                            bar.style.setProperty('--skill-width', skillWidth); // Set CSS custom property
                            bar.style.width = skillWidth; // Trigger animation
                        }, 100); // Small delay to ensure reset
                    });
                }
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Smooth Scrolling for Navigation
    document.querySelectorAll('.main-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});