// ============================================
// ശ്രീ ചൈതന്യ ഭൈരവി ജ്യോതിഷം
// Complete JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ---- Preloader ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    });

    // Fallback in case load event already fired
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // ---- AOS Init ----
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: window.innerWidth < 768 ? 'phone' : false
    });

    // ---- Navbar Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Active Nav Link on Scroll ----
    const sections = document.querySelectorAll('section[id]');

    function activateNavLink() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);

    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 8 + 5) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.width = (Math.random() * 4 + 1) + 'px';
            particle.style.height = particle.style.width;

            // Random colors
            const colors = ['#FFD700', '#FF6B00', '#FF8C3A', '#FFFFFF', '#FFE44D'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];

            particlesContainer.appendChild(particle);
        }
    }

    // ---- Counter Animation ----
    const statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ---- Testimonials Slider ----
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let slidesPerView = 1;
    let totalSlides = 0;

    function updateSlidesPerView() {
        if (window.innerWidth >= 1024) {
            slidesPerView = 3;
        } else if (window.innerWidth >= 768) {
            slidesPerView = 2;
        } else {
            slidesPerView = 1;
        }
    }

    function initSlider() {
        if (!track) return;

        updateSlidesPerView();
        const cards = track.querySelectorAll('.testimonial-card');
        totalSlides = Math.max(0, cards.length - slidesPerView + 1);

        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        goToSlide(0);
    }

    function goToSlide(index) {
        if (!track) return;
        currentSlide = Math.max(0, Math.min(index, totalSlides - 1));
        const cards = track.querySelectorAll('.testimonial-card');
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth + 20; // including margin
        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

        // Update dots
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    window.slideTestimonials = function(direction) {
        goToSlide(currentSlide + direction);
    };

    initSlider();
    window.addEventListener('resize', () => {
        initSlider();
    });

    // Auto-slide
    setInterval(() => {
        if (currentSlide >= totalSlides - 1) {
            goToSlide(0);
        } else {
            goToSlide(currentSlide + 1);
        }
    }, 5000);

    // ---- Rashi Modal ----
    window.openRashiModal = function(name, symbol, text) {
        const modal = document.getElementById('rashiModal');
        document.getElementById('modalSymbol').textContent = symbol;
        document.getElementById('modalTitle').textContent = name;
        document.getElementById('modalText').textContent = text;

        const waBtn = document.getElementById('modalWaBtn');
        waBtn.href = `https://wa.me/919876543210?text=നമസ്കാരം!%20${encodeURIComponent(name)}%20രാശിയുടെ%20വിശദമായ%20ഫലം%20അറിയാൻ%20ആഗ്രഹിക്കുന്നു.`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeRashiModal = function() {
        const modal = document.getElementById('rashiModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Close modal on outside click
    document.getElementById('rashiModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeRashiModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeRashiModal();
        }
    });

    // ---- Contact Form -> WhatsApp ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !phone) {
                alert('ദയവായി പേരും ഫോൺ നമ്പറും നൽകുക.');
                return;
            }

            let waMessage = `നമസ്കാരം!%0A%0A`;
            waMessage += `*പേര്:* ${encodeURIComponent(name)}%0A`;
            waMessage += `*ഫോൺ:* ${encodeURIComponent(phone)}%0A`;

            if (service) {
                waMessage += `*സേവനം:* ${encodeURIComponent(service)}%0A`;
            }

            if (message) {
                waMessage += `*സന്ദേശം:* ${encodeURIComponent(message)}%0A`;
            }

            waMessage += `%0Aശ്രീ ചൈതന്യ ഭൈരവി ജ്യോതിഷം വെബ്സൈറ്റ് വഴി.`;

            window.open(`https://wa.me/919876543210?text=${waMessage}`, '_blank');

            // Reset form
            contactForm.reset();
        });
    }

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Current Year ----
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ---- Touch Swipe for Testimonials ----
    if (track) {
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    slideTestimonials(1);
                } else {
                    slideTestimonials(-1);
                }
            }
            isDragging = false;
        });
    }

    // ---- Smooth reveal for WhatsApp button ----
    const waFloat = document.getElementById('whatsappFloat');
    const callFloat = document.getElementById('callFloat');

    setTimeout(() => {
        if (waFloat) waFloat.style.transform = 'scale(1)';
        if (callFloat) callFloat.style.transform = 'scale(1)';
    }, 2000);

});