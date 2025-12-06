// FineFoundry Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a.nav-link[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlighting on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once on load

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and feature elements
    const animatedElements = document.querySelectorAll('.card, .feature-card, .tech-feature, .usage-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Copy code to clipboard functionality for code blocks
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'btn btn-sm btn-outline-light position-absolute top-0 end-0 m-2';
        button.innerHTML = '<i class="bi bi-clipboard"></i>';
        button.title = 'Copy to clipboard';

        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', function() {
            const code = block.textContent;
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="bi bi-check-lg"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="bi bi-clipboard"></i>';
                }, 2000);
            });
        });
    });

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    backToTopButton.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.display = 'none';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.title = 'Back to top';

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // Add external link icons
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.querySelector('i.bi-github') && !link.querySelector('i.bi')) {
            const icon = document.createElement('i');
            icon.className = 'bi bi-box-arrow-up-right ms-1';
            icon.style.fontSize = '0.8em';
            link.appendChild(icon);
        }
    });

    // Console easter egg
    console.log('%c🔧 FineFoundry 🔧', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cDesktop studio for dataset curation and model fine-tuning', 'color: #764ba2; font-size: 14px;');
    console.log('%cGitHub: https://github.com/SourceBox-LLC/FineFoundry', 'color: #333; font-size: 12px;');

    // Documentation sidebar navigation
    const docsNav = document.querySelector('.docs-nav');
    if (docsNav) {
        const docLinks = docsNav.querySelectorAll('.nav-link');
        const docPanels = document.querySelectorAll('.doc-panel');

        // Click handler for doc nav links
        docLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active state
                docLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // Scroll to target panel
                const targetId = this.getAttribute('href');
                const targetPanel = document.querySelector(targetId);
                if (targetPanel) {
                    targetPanel.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active state on scroll
        function updateDocsNavOnScroll() {
            const scrollPosition = window.scrollY + 150;

            docPanels.forEach(panel => {
                const panelTop = panel.offsetTop;
                const panelHeight = panel.offsetHeight;
                const panelId = panel.getAttribute('id');

                if (scrollPosition >= panelTop && scrollPosition < panelTop + panelHeight) {
                    docLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${panelId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateDocsNavOnScroll);
    }
});
