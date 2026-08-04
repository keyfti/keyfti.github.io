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

    // 3. Płynne przewijanie po kliknięciu w linki kotwic
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Od razu podkreślamy kliknięty link
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. NAJWAŻNIEJSZE: Obserwator dla podkreśleń (BEZ SKAKANIA)
    const sections = document.querySelectorAll('#hero, #about, #projects');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Usuń podkreślenie ze wszystkich linków
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                // Podkreśl ten, który pasuje do widocznej sekcji
                const id = entry.target.id;
                if (id === 'about') {
                    document.getElementById('nav-about').classList.add('active-link');
                } else if (id === 'projects') {
                    document.getElementById('nav-projects').classList.add('active-link');
                } else if (id === 'hero') {
                    document.getElementById('nav-home').classList.add('active-link');
                }
            }
        });
    }, { 
        rootMargin: '-70px 0px 0px 0px', // Magiczna linijka – liczy sekcję dopiero 70px poniżej góry
        threshold: 0 // Działa w momencie, gdy sekcja dotknie tej linii – ZERO SKAKANIA
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
