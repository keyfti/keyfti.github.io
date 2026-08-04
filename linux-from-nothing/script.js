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

    // Egg 1: Kliknięcie w Tuxa
    if(tux) {
        tux.addEventListener('click', function() {
            addTerminalLine('echo "Tux says: Hello from LFN! Let\'s build something great!"');
            addTerminalLine('Tux says: Hello from LFN! Let\'s build something great!', true);
        });
    }

    // Egg 2: Kliknięcie w kursor
    if(cursor) {
        cursor.addEventListener('click', function() {
            addTerminalLine('fastfetch --secret');
            addTerminalLine('Secret mode activated! Kernel: 7.0.0-egg', true);
        });
    }

    // Egg 3: Podwójne kliknięcie na wersję (v0.1.0)
    if(badge) {
        badge.addEventListener('dblclick', function() {
            addTerminalLine('cat /dev/urandom | strings | grep "LFN"');
            addTerminalLine('404: Easter egg not found... just kidding! You found me!', true);
        });
    }
});
