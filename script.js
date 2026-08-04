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

    // 3. Płynne przewijanie po kliknięciu w linki kotwic + OD RAZU PODKREŚLENIE
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Podkreślamy kliknięty link
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. AUTOMATYCZNE PODKREŚLANIE PODCZAS PRZEWIJANIA (NAJWAŻNIEJSZA NAPRAWA)
    // rootMargin: '-70px' oznacza, że sekcja zaczyna być liczona 70px poniżej góry (pod paskiem)
    const sections = document.querySelectorAll('.hero, #about, #projects');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                
                const id = entry.target.id;
                if (id === 'about') {
                    document.getElementById('nav-about').classList.add('active-link');
                } else if (id === 'projects') {
                    document.getElementById('nav-projects').classList.add('active-link');
                } else {
                    document.getElementById('nav-home').classList.add('active-link');
                }
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '-70px 0px 0px 0px' // magiczna linijka, która naprawia cały problem z paskiem
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
