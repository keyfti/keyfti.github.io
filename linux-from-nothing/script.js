document.addEventListener('DOMContentLoaded', function() {

    // 1. Zamykanie terminala
    const closeDot = document.getElementById('close-dot');
    const terminal = document.getElementById('terminal');

    if(closeDot && terminal) {
        closeDot.addEventListener('click', function() {
            terminal.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            terminal.style.opacity = '0';
            terminal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                terminal.style.display = 'none';
            }, 300);
        });
    }

    // 2. Tłumaczenia (dla wszystkich widoków)
    const translations = {
        'en': {
            'nav_arch': 'Architecture', 'nav_proc': 'Process', 'nav_faq': 'Assumptions',
            'hero_text': 'Building an independent operating system from bare disk space.<br>Environment configuration, kernel compilation, and user-space preparation.',
            'btn_repo': 'Open repository', 'btn_arch': 'Architecture &darr;',
            'os': 'OS:', 'build': 'Build: x86_64', 'kernel': 'Kernel: 7.0.0 (Stable)',
            'toolchain': 'Toolchain: GCC 14.2.0 · Glibc 2.41', 'shell': 'Shell: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Selectable)',
            'status': 'Status:', 'status_independent': 'Fully independent system',
            'label_arch': '// ARCHITECTURE', 'title_arch': 'System Components',
            'card1_title': 'Control', 'card1_desc': 'All binaries, system libraries, and boot scripts are selected and compiled manually.',
            'card2_title': 'Toolchain', 'card2_desc': 'Independent compilation of the development toolchain (Binutils, GCC, Glibc) ensures full isolation.',
            'card3_title': 'Kernel', 'card3_desc': 'Compilation of a monolithic Linux kernel tailored directly to the target hardware architecture.',
            'label_proc': '// PROCESS', 'title_proc': 'Deployment Steps',
            'step1_title': 'Environment Setup', 'step1_desc': 'Configuration of system variables, directory structure, and fetching upstream source code.',
            'step2_title': 'Building Components', 'step2_desc': 'Compilation of the cross-compiler and preparation of basic user-space programs.',
            'step3_title': 'System Initialization', 'step3_desc': 'Creating the init boot script, mounting file systems, and performing a test environment boot.',
            'label_faq': '// ASSUMPTIONS', 'title_faq': 'Technical Foundations',
            'faq1_title': 'No Package Manager', 'faq1_desc': 'The system does not rely on any existing distribution. Everything is built directly from source code.',
            'faq2_title': 'Minimal User Space', 'faq2_desc': 'Utilizing a stripped-down set of coreutils to maintain a minimal image size.',
            'faq3_title': 'Custom Init', 'faq3_desc': 'The system is booted by a custom init script that can be easily modified and tailored.'
        },
        'pl': {
            'nav_arch': 'Architektura', 'nav_proc': 'Proces', 'nav_faq': 'Założenia',
            'hero_text': 'Budowa niezależnego systemu operacyjnego od czystej przestrzeni dyskowej.<br>Konfiguracja środowiska, kompilacja jądra oraz przygotowanie przestrzeni użytkownika.',
            'btn_repo': 'Otwórz repozytorium', 'btn_arch': 'Architektura &darr;',
            'os': 'System:', 'build': 'Architektura: x86_64', 'kernel': 'Jądro: 7.0.0 (Stable)',
            'toolchain': 'Narzędzia: GCC 14.2.0 · Glibc 2.41', 'shell': 'Powłoka: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Wybór)',
            'status': 'Status:', 'status_independent': 'W pełni niezależny system',
            'label_arch': '// ARCHITEKTURA', 'title_arch': 'Komponenty systemu',
            'card1_title': 'Kontrola', 'card1_desc': 'Wszystkie pliki binarne, biblioteki systemowe oraz skrypty rozruchowe są dobierane i kompilowane ręcznie.',
            'card2_title': 'Toolchain', 'card2_desc': 'Niezależna kompilacja zestawu narzędzi deweloperskich (Binutils, GCC, Glibc) zapewnia pełną izolację.',
            'card3_title': 'Jądro', 'card3_desc': 'Kompilacja monolitycznego jądra Linux dostosowanego bezpośrednio do docelowej architektury sprzętowej.',
            'label_proc': '// PROCES', 'title_proc': 'Etapy wdrożenia',
            'step1_title': 'Przygotowanie środowiska', 'step1_desc': 'Konfiguracja zmiennych systemowych, struktury katalogów i pobranie kodów źródłowych upstream.',
            'step2_title': 'Budowa składników', 'step2_desc': 'Kompilacja cross-compilera oraz przygotowanie podstawowych programów przestrzeni użytkownika.',
            'step3_title': 'Inicjalizacja systemu', 'step3_desc': 'Utworzenie skryptu rozruchowego init, montowanie systemów plików oraz testowe uruchomienie środowiska.',
            'label_faq': '// ZAŁOŻENIA', 'title_faq': 'Fundamenty techniczne',
            'faq1_title': 'Brak menedżera pakietów', 'faq1_desc': 'System nie bazuje na istniejących dystrybucjach. Całość powstaje poprzez bezpośrednie budowanie kodu ze źródeł.',
            'faq2_title': 'Minimalna przestrzeń użytkownika', 'faq2_desc': 'Wykorzystanie uproszczonego zestawu narzędzi coreutils w celu zachowania minimalnego rozmiaru obrazu systemu.',
            'faq3_title': 'Własny init', 'faq3_desc': 'System uruchamiany jest przez autorski skrypt inicjalizacyjny, który można łatwo modyfikować i dostosowywać.'
        }
    };

    // 3. Funkcja ustawiania języka (czyści i nadpisuje)
    function setLanguage(lang) {
        localStorage.setItem('lfn_lang', lang);
        document.documentElement.lang = lang;

        // Flagi
        document.querySelectorAll('.nav-lang .flag').forEach(el => el.classList.remove('active'));
        document.getElementById('flag-' + lang).classList.add('active');

        // Tłumaczenia
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    // 4. Obsługa kliknięcia flag
    document.getElementById('flag-pl').addEventListener('click', () => setLanguage('pl'));
    document.getElementById('flag-us').addEventListener('click', () => setLanguage('en'));

    // 5. Załaduj zapisany język (domyślnie en, jeśli brak)
    const savedLang = localStorage.getItem('lfn_lang') || 'en';
    setLanguage(savedLang);

    // 6. Przełączanie widoków (SPA)
    const views = {
        'architecture': document.getElementById('view-architecture'),
        'process': document.getElementById('view-process'),
        'assumptions': document.getElementById('view-assumptions')
    };
    const navLinks = document.querySelectorAll('.nav-links a[data-view]');

    function switchView(viewName) {
        // Ukryj wszystkie widoki
        Object.values(views).forEach(v => v.classList.remove('active'));
        // Pokaż wybrany
        if(views[viewName]) views[viewName].classList.add('active');
        
        // Zaznacz link w pasku
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.querySelector(`.nav-links a[data-view="${viewName}"]`)?.classList.add('active-link');
    }

    // Obsługa kliknięcia linków w pasku
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const view = this.getAttribute('data-view');
            if(view) switchView(view);
        });
    });

    // Obsługa przycisku "Architecture" w hero
    document.querySelector('.btn-secondary[data-view="architecture"]')?.addEventListener('click', function(e) {
        e.preventDefault();
        switchView('architecture');
    });

    // Ustaw domyślny widok na początku (Architecture)
    switchView('architecture');
});
