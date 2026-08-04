window.addEventListener('load', function() {

    // 1. Animacje scrollowania (fade-in-up)
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

    // 3. Obsługa kotwic (kliknięcie w About / Projects)
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('#hero, #about, #projects');

    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Natychmiast podkreślamy kliknięty link
            navLinks.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. NIEZAWODNY LISTENER SCROLL (oparty na odległości od góry, bez skakania)
    let currentActiveId = 'nav-home'; // Zapamiętujemy aktualnie podkreślony link

    function updateActiveLink() {
        let activeId = 'nav-home'; // Domyślnie Home
        let minTop = 9999;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Szukamy sekcji, której górna krawędź jest najbliżej góry ekranu (ale nie wyżej niż 150px, żeby nie było przeskoków)
            // rect.top >= -150 warunek zapobiega podświetlaniu, gdy sekcja zniknęła za górną krawędzią
            if (rect.top > -150 && rect.top < minTop) {
                minTop = rect.top;
                const id = section.id;
                if (id === 'hero') activeId = 'nav-home';
                else if (id === 'about') activeId = 'nav-about';
                else if (id === 'projects') activeId = 'nav-projects';
            }
        });

        // Jeśli zmienił się aktywny link, dopiero wtedy aktualizuj klasę
        if (currentActiveId !== activeId) {
            currentActiveId = activeId;
            navLinks.forEach(l => l.classList.remove('active-link'));
            document.getElementById(activeId).classList.add('active-link');
        }
    }

    // Uruchom przy każdym scrollu
    window.addEventListener('scroll', updateActiveLink);
    // Uruchom od razu po załadowaniu
    updateActiveLink();
});
