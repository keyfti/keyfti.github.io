// --- 3. Obsługa aktywnego linku i płynnego przewijania dla sekcji ---
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
