 document.addEventListener('DOMContentLoaded', function () {
            // Hide loading screen after page loads
            const loadingScreen = document.getElementById('loadingScreen');
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 1500);

            // Initialize AOS
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });

            // Create particles
            createParticles();

            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            const header = document.querySelector('header');
            const backToTop = document.getElementById('backToTop');
            const headerHeight = 80;

            // Hamburger menu toggle
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Header scroll effect and back to top button
            window.addEventListener('scroll', function () {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Show/hide back to top button
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });

            // Back to top functionality
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Movie filter functionality
            const filterBtns = document.querySelectorAll('.filter-btn');
            const movieCards = document.querySelectorAll('.movie-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');

                    const filter = btn.getAttribute('data-filter');

                    movieCards.forEach(card => {
                        if (filter === 'all' || card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeIn 0.5s ease';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Improved smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const targetPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = targetPosition + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Contact form submission
            const contactForm = document.querySelector('#contact form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('Thank you for your message! We will get back to you soon.');
                    this.reset();
                });
            }
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';

                // Random size between 2-6px
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';

                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';

                // Random animation delay
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

                particlesContainer.appendChild(particle);
            }
        }