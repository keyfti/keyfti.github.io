window.addEventListener('load', function() {

    // 1. Zamykanie terminala (czerwona kropka)
    const closeDot = document.getElementById('close-dot');
    const terminal = document.getElementById('terminal');
    if(closeDot && terminal) {
        closeDot.addEventListener('click', function() {
            terminal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            terminal.style.opacity = '0';
            terminal.style.transform = 'scale(0.95)';
            setTimeout(() => { terminal.style.display = 'none'; }, 300);
        });
    }

    // 2. EASTER EGGI
    const terminalBody = document.getElementById('terminal-body');
    const tux = document.getElementById('tux-click');
    const cursor = document.getElementById('cursor-egg');
    const badge = document.getElementById('secret-badge');

    function addTerminalLine(text, isOutput = true) {
        if(!terminalBody) return;
        const line = document.createElement('div');
        line.className = 'line';
        if(isOutput) {
            line.innerHTML = `<span style="color: #a1a1aa; padding-left: 20px;">${text}</span>`;
            terminalBody.insertBefore(line, terminalBody.lastElementChild);
        } else {
            line.innerHTML = `<span class="prompt">$</span><span class="cmd">${text}</span>`;
            terminalBody.insertBefore(line, terminalBody.lastElementChild);
        }
    }

    if(tux) {
        tux.addEventListener('click', function() {
            addTerminalLine('echo "Tux says: Hello from LFN! Let\'s build something great!"');
            addTerminalLine('Tux says: Hello from LFN! Let\'s build something great!', true);
        });
    }

    if(cursor) {
        cursor.addEventListener('click', function() {
            addTerminalLine('fastfetch --secret');
            addTerminalLine('Secret mode activated! Kernel: 7.0.0-egg', true);
        });
    }

    if(badge) {
        badge.addEventListener('dblclick', function() {
            addTerminalLine('cat /dev/urandom | strings | grep "LFN"');
            addTerminalLine('404: Easter egg not found... just kidding! You found me!', true);
        });
    }

    // 3. ANIMACJE SCROLLOWANIA (Intersection Observer)
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

    // 4. PŁYNNE PRZEJŚCIE MIĘDZY PODSTRONAMI
    document.querySelectorAll('.nav-links a, .hero-buttons a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Jeśli link prowadzi do innej podstrony (nie jest kotwicą) i nie otwiera GitHub
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});
