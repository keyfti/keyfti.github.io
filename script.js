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

    // 3. Płynne przewijanie po kliknięciu w linki kotwic (#about, #projects)
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. AUTOMATYCZNE PODKREŚLANIE AKTYWNEGO LINKU PODCZAS PRZEWIJANIA
    const sections = document.querySelectorAll('.hero, #about, #projects');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Usuń podkreślenie ze wszystkich linków
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                // Sprawdź, która sekcja jest widoczna
                const id = entry.target.id;
                if (id === 'about') {
                    document.getElementById('nav-about').classList.add('active-link');
                } else if (id === 'projects') {
                    document.getElementById('nav-projects').classList.add('active-link');
                } else {
                    // Jeśli widoczny jest .hero (czyli jesteśmy na górze)
                    document.getElementById('nav-home').classList.add('active-link');
                }
            }
        });
    }, { threshold: 0.1 }); // <-- ZMIANA: 0.1 zamiast 0.3. Łapie sekcję już przy 10% widoczności

    // Obserwuj wszystkie sekcje
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
