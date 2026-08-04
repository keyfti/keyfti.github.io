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
            
            // Podkreślamy kliknięty link od razu
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. NIEZAWODNY LISTENER NA SCROLL (zastępuje popsuty IntersectionObserver)
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('.hero, #about, #projects');
        const navLinks = document.querySelectorAll('.nav-links a');
        let currentId = 'nav-home'; // Domyślnie Home

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Jeśli górna krawędź sekcji znajduje się w odległości <= 90px od góry (uwzględniając pasek)
            if (rect.top <= 90) {
                const id = section.id;
                if (id === 'about') currentId = 'nav-about';
                else if (id === 'projects') currentId = 'nav-projects';
                else currentId = 'nav-home';
            }
        });

        // Usuń wszystkie podkreślenia i podkreśl właściwy link
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(currentId).classList.add('active-link');
    }

    // Nasłuchuj zdarzenia scroll i od razu ustaw poprawny link po załadowaniu strony
    window.addEventListener('scroll', updateActiveLinkOnScroll);
    updateActiveLinkOnScroll(); 
});
