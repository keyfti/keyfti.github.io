window.addEventListener('load', function() {
    
    // 1. Animacje scrollowania (dla fade-in-up)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // 2. Płynne przejście między podstronami
    document.querySelectorAll('.nav-links a, .hero-buttons a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('https')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });

    // 3. Płynne przewijanie po kliknięciu w linki kotwic + NATYCHMIASTOWE PODKREŚLENIE
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Podkreślamy kliknięty link od razu (jeszcze przed animacją)
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Niezawodny algorytm odległości (z DEBOUNCE dla płynności)
    let scrollTimeout;
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('.hero, #about, #projects');
        const navLinks = document.querySelectorAll('.nav-links a');
        let closestSectionId = 'nav-home';
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.bottom > 0) {
                const distance = Math.abs(rect.top);
                if (distance < minDistance) {
                    minDistance = distance;
                    const id = section.id;
                    if (id === 'about') closestSectionId = 'nav-about';
                    else if (id === 'projects') closestSectionId = 'nav-projects';
                    else closestSectionId = 'nav-home';
                }
            }
        });

        // Zmiana tylko jeśli link się zmienił (zapobiega niepotrzebnym przeliczeniom)
        const currentActive = document.querySelector('.nav-links a.active-link');
        if (currentActive && currentActive.id === closestSectionId) return;

        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(closestSectionId).classList.add('active-link');
    }

    // Debounce: czekamy 50ms po zakończeniu przewijania, żeby nie skakało
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveLinkOnScroll, 50);
    });

    // Ustaw stan początkowy po załadowaniu
    setTimeout(updateActiveLinkOnScroll, 100);
});
