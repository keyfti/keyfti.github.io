window.addEventListener('load', function() {

    // 1. Zamykanie terminala
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

    // 2. Tłumaczenia (Tutorial, Requirements, Info)
    const translations = {
        'en': {
            'nav_home': 'Home', 'nav_tutorial': 'Tutorial', 'nav_req': 'Requirements', 'nav_info': 'Info',
            'hero_text': 'Building an independent operating system from bare disk space.<br>Environment configuration, kernel compilation, and user-space preparation.',
            'btn_repo': 'Open repository', 'btn_tutorial': 'Start Tutorial &rarr;',
            'os': 'OS:', 'build': 'Build: x86_64', 'kernel': 'Kernel: 7.0.0 (Stable)',
            'toolchain': 'Toolchain: GCC 14.2.0 · Glibc 2.41', 'shell': 'Shell: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Selectable)',
            'status': 'Status:', 'status_independent': 'Fully independent system',
            'label_about': '// ABOUT', 'title_about': 'What is LFN?',
            'about_desc': 'Linux From Nothing is a fully customizable, source-based Linux distribution built entirely from scratch. Unlike traditional distros, you control every binary, library, and boot script. It is designed for low-level system education and minimal embedded environments.',
            
            'label_tutorial': '// TUTORIAL', 'title_tutorial': 'Build Guide',
            'tut1_title': 'Prepare the Environment', 'tut1_desc': 'Set up your build directory, download source packages, and configure system variables for the cross-compilation environment.',
            'tut2_title': 'Compile the Toolchain', 'tut2_desc': 'Build Binutils, GCC, and Glibc from source to create an isolated cross-toolchain independent of the host system.',
            'tut3_title': 'Build the Kernel & Init', 'tut3_desc': 'Compile a monolithic Linux kernel tailored to your hardware, create custom init scripts, and prepare the final system image.',
            
            'label_req': '// REQUIREMENTS', 'title_req': 'System Requirements',
            'req1_title': 'Operating System', 'req1_desc': 'Linux distribution (or Windows WSL) with GCC, make, autoconf, and automake installed.',
            'req2_title': 'Hardware', 'req2_desc': 'Minimum 4GB RAM (8GB recommended) and approximately 10GB of free disk space for builds.',
            'req3_title': 'Network', 'req3_desc': 'Stable internet connection to fetch all required upstream source packages and patches.',
            
            'label_info': '// INFO', 'title_info': 'About the Project',
            'info1_title': 'Philosophy', 'info1_desc': 'LFN is designed for deep learning of Linux internals. By building everything from source, you gain full control and understanding of the OS stack.',
            'info2_title': 'Licensing', 'info2_desc': 'The project is released under the MIT License. All source code and build scripts are free to use, modify, and distribute.',
            'info3_title': 'Community', 'info3_desc': 'LFN is an open-source initiative. Contributions, suggestions, and bug reports are welcome via the official GitHub repository.'
        },
        'pl': {
            'nav_home': 'Strona główna', 'nav_tutorial': 'Poradnik', 'nav_req': 'Wymagania', 'nav_info': 'Info',
            'hero_text': 'Budowa niezależnego systemu operacyjnego od czystej przestrzeni dyskowej.<br>Konfiguracja środowiska, kompilacja jądra oraz przygotowanie przestrzeni użytkownika.',
            'btn_repo': 'Otwórz repozytorium', 'btn_tutorial': 'Rozpocznij poradnik &rarr;',
            'os': 'System:', 'build': 'Architektura: x86_64', 'kernel': 'Jądro: 7.0.0 (Stable)',
            'toolchain': 'Narzędzia: GCC 14.2.0 · Glibc 2.41', 'shell': 'Powłoka: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Wybór)',
            'status': 'Status:', 'status_independent': 'W pełni niezależny system',
            'label_about': '// O PROJEKCIE', 'title_about': 'Czym jest LFN?',
            'about_desc': 'Linux From Nothing to w pełni konfigurowalna, źródłowa dystrybucja Linuxa zbudowana od zera. W przeciwieństwie do tradycyjnych dystrybucji, masz kontrolę nad każdym binarnym plikiem, biblioteką i skryptem startowym. Jest zaprojektowany do edukacji niskopoziomowej oraz minimalnych środowisk wbudowanych.',
            
            'label_tutorial': '// PORADNIK', 'title_tutorial': 'Przewodnik budowania',
            'tut1_title': 'Przygotuj środowisko', 'tut1_desc': 'Skonfiguruj katalog budowania, pobierz pakiety źródłowe i ustaw zmienne systemowe dla środowiska cross-kompilacji.',
            'tut2_title': 'Skompiluj Toolchain', 'tut2_desc': 'Zbuduj Binutils, GCC i Glibc ze źródeł, aby stworzyć izolowany toolchain niezależny od systemu hosta.',
            'tut3_title': 'Zbuduj Jądro i Init', 'tut3_desc': 'Skompiluj monolityczne jądro Linux dostosowane do Twojego sprzętu, stwórz własne skrypty init i przygotuj końcowy obraz systemu.',
            
            'label_req': '// WYMAGANIA', 'title_req': 'Wymagania systemowe',
            'req1_title': 'System operacyjny', 'req1_desc': 'Dystrybucja Linux (lub Windows WSL) z zainstalowanym GCC, make, autoconf i automake.',
            'req2_title': 'Sprzęt', 'req2_desc': 'Minimum 4GB RAM (zalecane 8GB) oraz około 10GB wolnego miejsca na dysku na kompilacje.',
            'req3_title': 'Sieć', 'req3_desc': 'Stabilne połączenie internetowe w celu pobrania wszystkich wymaganych pakietów źródłowych i poprawek.',
            
            'label_info': '// INFO', 'title_info': 'O projekcie',
            'info1_title': 'Filozofia', 'info1_desc': 'LFN został zaprojektowany do głębokiego poznania wewnętrznych mechanizmów Linuksa. Budując wszystko ze źródeł, zyskujesz pełną kontrolę i zrozumienie stosu systemu.',
            'info2_title': 'Licencja', 'info2_desc': 'Projekt wydany na licencji MIT. Cały kod źródłowy i skrypty budowania mogą być swobodnie używane, modyfikowane i rozpowszechniane.',
            'info3_title': 'Społeczność', 'info3_desc': 'LFN to inicjatywa open-source. Wkłady, sugestie i zgłoszenia błędów są mile widziane za pośrednictwem oficjalnego repozytorium GitHub.'
        }
    };

    function setLanguage(lang) {
        localStorage.setItem('lfn_lang', lang);
        document.documentElement.lang = lang;
        document.querySelectorAll('.nav-lang .flag').forEach(el => el.classList.remove('active'));
        document.getElementById('flag-' + lang).classList.add('active');

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    document.getElementById('flag-pl').addEventListener('click', () => setLanguage('pl'));
    document.getElementById('flag-us').addEventListener('click', () => setLanguage('en'));

    // Ustawiamy domyślnie 'en'. Polski nie odpala się przypadkiem.
    const savedLang = localStorage.getItem('lfn_lang') || 'en';
    setLanguage(savedLang);

    // 3. EASTER EGGI
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
