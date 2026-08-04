window.addEventListener('load', function() {
    
    // 1. Animacje scrollowania (Intersection Observer)
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

    // 2. Płynne przejście między podstronami (jeśli link nie jest kotwicą)
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

    // 3. Obsługa aktywnego linku i płynnego przewijania dla sekcji (About i Projects)
    document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Zatrzymuje domyślne przeskakiwanie
            
            // Płynnie przewija do sekcji
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // Usuwa klasę active-link ze wszystkich linków i ustawia na kliknięty
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');
        });
    });
});
