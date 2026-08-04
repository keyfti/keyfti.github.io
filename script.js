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
            
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. NIEZAWODNY LISTENER NA SCROLL (bez Math.abs, stabilny)
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('.hero, #about, #projects');
        const navLinks = document.querySelectorAll('.nav-links a');
        let currentId = 'nav-home';
        let closestTop = 9999;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Szukamy tylko tych sekcji, które są widoczne na ekranie (bottom > 0)
            // i znajdują się w okolicach góry (top < 120 - wysokość paska)
            if (rect.bottom > 0 && rect.top < 120) {
                // Wybieramy tę, która jest najbliżej góry (ma najmniejszy rect.top)
                if (rect.top < closestTop) {
                    closestTop = rect.top;
                    const id = section.id;
                    if (id === 'about') currentId = 'nav-about';
                    else if (id === 'projects') currentId = 'nav-projects';
                    else currentId = 'nav-home';
                }
            }
        });

        // Usuń wszystkie podkreślenia i podkreśl właściwy link
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(currentId).classList.add('active-link');
    }

    window.addEventListener('scroll', updateActiveLinkOnScroll);
    updateActiveLinkOnScroll(); 
});
