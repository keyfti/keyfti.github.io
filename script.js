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

    // 3. Obsługa aktywnego linku dla kotwic (About, Projects)
    // Najpierw obsługa kliknięcia
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });

    // 4. Automatyczne podkreślanie podczas przewijania (scroll)
    // Mapowanie ID sekcji na ID linku w pasku
    const sectionLinkMap = {
        'about': 'nav-about',
        'projects': 'nav-projects'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Kiedy sekcja staje się widoczna
                const sectionId = entry.target.id;
                const linkId = sectionLinkMap[sectionId];
                
                // Usuń active-link ze wszystkich linków
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
                
                // Podkreśl odpowiedni link
                if (linkId) {
                    document.getElementById(linkId).classList.add('active-link');
                }
            }
        });
    }, { threshold: 0.4 }); // 0.4 oznacza, że sekcja musi być widoczna w 40%, żeby się podkreśliła

    // Obserwuj sekcje
    document.querySelectorAll('#about, #projects').forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. Przywrócenie podkreślenia "Home", gdy użytkownik jest na samej górze
    // (Sekcje o wysokości mniejszej niż 40% ekranu nie będą widoczne, więc Home zostanie podkreślony)
    // Dodatkowo, jeśli użytkownik wróci na górę ręcznie, to też zadziała.
    // Obserwujemy również nagłówek hero
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Jeśli widzimy Hero, to znaczy, że jesteśmy na górze
                document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
                document.getElementById('nav-home').classList.add('active-link');
            }
        });
    }, { threshold: 0.5 });

    const heroElement = document.querySelector('.hero');
    if (heroElement) {
        heroObserver.observe(heroElement);
    }
});
