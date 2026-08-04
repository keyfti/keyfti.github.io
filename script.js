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
            
            // Podkreślamy kliknięty link od razu (jeszcze przed animacją)
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Niezawodny listener na scroll (algorytm odległości)
    // Oblicza, która sekcja jest najbliżej górnej krawędzi ekranu.
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('.hero, #about, #projects');
        const navLinks = document.querySelectorAll('.nav-links a');
        let closestSectionId = 'nav-home'; // Domyślnie Home
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Sprawdzamy tylko te sekcje, które mają jakąkolwiek widoczną część na ekranie (bottom > 0)
            if (rect.bottom > 0) {
                // Odległość górnej krawędzi sekcji od góry okna (0)
                const distance = Math.abs(rect.top);
                // Jeśli ta sekcja jest bliżej góry niż poprzednio znaleziona...
                if (distance < minDistance) {
                    minDistance = distance;
                    const id = section.id;
                    if (id === 'about') closestSectionId = 'nav-about';
                    else if (id === 'projects') closestSectionId = 'nav-projects';
                    else closestSectionId = 'nav-home';
                }
            }
        });

        // Usuń wszystkie podkreślenia i podkreśl właściwy link
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(closestSectionId).classList.add('active-link');
    }

    // Nasłuchuj zdarzenia scroll i od razu ustaw poprawny link po załadowaniu strony
    window.addEventListener('scroll', updateActiveLinkOnScroll);
    updateActiveLinkOnScroll(); 
});
