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

    // 2. Płynne przejście między podstronami (zewnętrzne linki)
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

    // 3. Płynne przewijanie po kliknięciu w linki kotwic + podkreślenie
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Natychmiast podkreślamy kliknięty link
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. ALGORYTM SKANOWANIA (NIEZAWODNY, BEZ SKAKANIA)
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('.hero, #about, #projects');
        const navLinks = document.querySelectorAll('.nav-links a');
        let activeId = 'nav-home'; // Domyślnie Home

        // Sprawdzamy, czy jesteśmy na samej górze (w sekcji Hero)
        const heroRect = document.querySelector('.hero').getBoundingClientRect();
        if (heroRect.top >= -10 && heroRect.top < 70) {
            activeId = 'nav-home';
        } else {
            // Jeśli nie jesteśmy na górze, szukamy która sekcja jest widoczna
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                // Jeśli górna krawędź sekcji jest widoczna (czyli mniejsza niż 1px od góry ekranu)
                // lub sekcja jest już widoczna na ekranie
                if (rect.top < 70 && rect.bottom > 0) {
                    const id = section.id;
                    if (id === 'about') activeId = 'nav-about';
                    else if (id === 'projects') activeId = 'nav-projects';
                    else activeId = 'nav-home';
                }
            });
        }

        // Usuń wszystkie podkreślenia i podkreśl właściwy link
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(activeId).classList.add('active-link');
    }

    window.addEventListener('scroll', updateActiveLinkOnScroll);
    updateActiveLinkOnScroll(); 
});
