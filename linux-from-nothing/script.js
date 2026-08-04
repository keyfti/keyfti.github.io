document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Zamykanie terminala ---
    const closeDot = document.getElementById('close-dot');
    const terminal = document.getElementById('terminal');

    closeDot.addEventListener('click', function() {
        terminal.style.opacity = '0';
        terminal.style.transform = 'scale(0.95)';
        setTimeout(() => {
            terminal.style.display = 'none';
        }, 300);
    });

    // --- 2. Tłumaczenia (Polski / Angielski) ---
    const translations = {
        'en': {
            'nav_req': 'Requirements',
            'nav_tut': 'Tutorial',
            'nav_info': 'Info',
            'hero_text': 'Building an independent operating system from bare disk space.<br>Environment configuration, kernel compilation, and user-space preparation.',
            'btn_repo': 'Open repository',
            'btn_arch': 'Architecture &darr;',
            'label_arch': '// ARCHITECTURE',
            'title_arch': 'System Components',
            'card1_title': 'Control',
            'card1_desc': 'All binaries, system libraries, and boot scripts are selected and compiled manually.',
            'card2_title': 'Toolchain',
            'card2_desc': 'Independent compilation of the development toolchain (Binutils, GCC, Glibc) ensures full isolation.',
            'card3_title': 'Kernel',
            'card3_desc': 'Compilation of a monolithic Linux kernel tailored directly to the target hardware architecture.',
            'label_process': '// PROCESS',
            'title_process': 'Deployment Steps',
            'step1_title': 'Environment Setup',
            'step1_desc': 'Configuration of system variables, directory structure, and fetching upstream source code.',
            'step2_title': 'Building Components',
            'step2_desc': 'Compilation of the cross-compiler and preparation of basic user-space programs.',
            'step3_title': 'System Initialization',
            'step3_desc': 'Creating the init boot script, mounting file systems, and performing a test environment boot.',
            'label_faq': '// ASSUMPTIONS',
            'title_faq': 'Technical Foundations',
            'faq1_title': 'No Package Manager',
            'faq1_desc': 'The system does not rely on any existing distribution. Everything is built directly from source code.',
            'faq2_title': 'Minimal User Space',
            'faq2_desc': 'Utilizing a stripped-down set of coreutils to maintain a minimal image size.',
            'faq3_title': 'Custom Init',
            'faq3_desc': 'The system is booted by a custom init script that can be easily modified and tailored.',
            'os': 'OS:',
            'build': 'Build: x86_64',
            'kernel': 'Kernel: 7.0.0 (Stable)',
            'toolchain': 'Toolchain: GCC 14.2.0 · Glibc 2.41',
            'shell': 'Shell: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Selectable)',
            'status': 'Status:',
            'status_independent': 'Fully independent system',
            'label_req': '// REQUIREMENTS',
            'title_req': 'System Requirements',
            'req1': 'Linux distribution (or Windows WSL) with GCC, make, autoconf.',
            'req2': 'Minimum 4GB RAM (8GB recommended).',
            'req3': 'Around 10GB of free disk space.',
            'req4': 'Internet access for downloading source packages.',
            'label_tut': '// TUTORIAL',
            'title_tut': 'Build Guide',
            'tut1_title': 'Step 1: Prepare the environment',
            'tut1_desc': 'Set up your build directory, download sources, and configure variables.',
            'tut2_title': 'Step 2: Compile the toolchain',
            'tut2_desc': 'Build Binutils, GCC, and Glibc to create a cross-compilation environment.',
            'tut3_title': 'Step 3: Build the system',
            'tut3_desc': 'Compile the kernel, core utilities, and finally the init script.',
            'label_info': '// INFO',
            'title_info': 'About the Project',
            'info_desc': 'Linux From Nothing is a passion project designed to teach low-level system programming and provide a lightweight, fully customizable OS image.'
        },
        'pl': {
            'nav_req': 'Wymagania',
            'nav_tut': 'Poradnik',
            'nav_info': 'Info',
            'hero_text': 'Budowa niezależnego systemu operacyjnego od czystej przestrzeni dyskowej.<br>Konfiguracja środowiska, kompilacja jądra oraz przygotowanie przestrzeni użytkownika.',
            'btn_repo': 'Otwórz repozytorium',
            'btn_arch': 'Architektura &darr;',
            'label_arch': '// ARCHITEKTURA',
            'title_arch': 'Komponenty systemu',
            'card1_title': 'Kontrola',
            'card1_desc': 'Wszystkie pliki binarne, biblioteki systemowe oraz skrypty rozruchowe są dobierane i kompilowane ręcznie.',
            'card2_title': 'Toolchain',
            'card2_desc': 'Niezależna kompilacja zestawu narzędzi deweloperskich (Binutils, GCC, Glibc) zapewnia pełną izolację.',
            'card3_title': 'Jądro',
            'card3_desc': 'Kompilacja monolitycznego jądra Linux dostosowanego bezpośrednio do docelowej architektury sprzętowej.',
            'label_process': '// PROCES',
            'title_process': 'Etapy wdrożenia',
            'step1_title': 'Przygotowanie środowiska',
            'step1_desc': 'Konfiguracja zmiennych systemowych, struktury katalogów i pobranie kodów źródłowych upstream.',
            'step2_title': 'Budowa składników',
            'step2_desc': 'Kompilacja cross-compilera oraz przygotowanie podstawowych programów przestrzeni użytkownika.',
            'step3_title': 'Inicjalizacja systemu',
            'step3_desc': 'Utworzenie skryptu rozruchowego init, montowanie systemów plików oraz testowe uruchomienie środowiska.',
            'label_faq': '// ZAŁOŻENIA',
            'title_faq': 'Fundamenty techniczne',
            'faq1_title': 'Brak menedżera pakietów',
            'faq1_desc': 'System nie bazuje na istniejących dystrybucjach. Całość powstaje poprzez bezpośrednie budowanie kodu ze źródeł.',
            'faq2_title': 'Minimalna przestrzeń użytkownika',
            'faq2_desc': 'Wykorzystanie uproszczonego zestawu narzędzi coreutils w celu zachowania minimalnego rozmiaru obrazu systemu.',
            'faq3_title': 'Własny init',
            'faq3_desc': 'System uruchamiany jest przez autorski skrypt inicjalizacyjny, który można łatwo modyfikować i dostosowywać.',
            'os': 'System:',
            'build': 'Architektura: x86_64',
            'kernel': 'Jądro: 7.0.0 (Stable)',
            'toolchain': 'Narzędzia: GCC 14.2.0 · Glibc 2.41',
            'shell': 'Powłoka: bash 5.2.42',
            'init': 'Init: Custom / BusyBox / OpenRC (Wybór)',
            'status': 'Status:',
            'status_independent': 'W pełni niezależny system',
            'label_req': '// WYMAGANIA',
            'title_req': 'Wymagania systemowe',
            'req1': 'Dystrybucja Linux (lub WSL) z GCC, make, autoconf.',
            'req2': 'Minimum 4GB RAM (zalecane 8GB).',
            'req3': 'Około 10GB wolnego miejsca na dysku.',
            'req4': 'Dostęp do internetu w celu pobrania pakietów źródłowych.',
            'label_tut': '// PORADNIK',
            'title_tut': 'Przewodnik budowania',
            'tut1_title': 'Krok 1: Przygotuj środowisko',
            'tut1_desc': 'Skonfiguruj katalog budowania, pobierz źródła i ustaw zmienne.',
            'tut2_title': 'Krok 2: Skompiluj toolchain',
            'tut2_desc': 'Zbuduj Binutils, GCC i Glibc, aby stworzyć środowisko cross-kompilacji.',
            'tut3_title': 'Krok 3: Zbuduj system',
            'tut3_desc': 'Skompiluj jądro, podstawowe narzędzia i na końcu skrypt init.',
            'label_info': '// INFO',
            'title_info': 'O projekcie',
            'info_desc': 'Linux From Nothing to projekt hobbystyczny, mający na celu nauczenie programowania niskopoziomowego oraz dostarczenie lekkiego, w pełni konfigurowalnego obrazu systemu.'
        }
    };

    // --- 3. Funkcja zmiany języka ---
    function setLanguage(lang) {
        localStorage.setItem('lfn_lang', lang);
        document.documentElement.lang = lang;
        
        // Aktualizuj klasy flag
        document.querySelectorAll('.nav-lang .flag').forEach(el => el.classList.remove('active'));
        document.getElementById('flag-' + lang).classList.add('active');

        // Przetłumacz elementy
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });
    }

    // --- 4. Obsługa kliknięcia flag ---
    document.getElementById('flag-pl').addEventListener('click', () => setLanguage('pl'));
    document.getElementById('flag-us').addEventListener('click', () => setLanguage('en'));

    // --- 5. Załaduj zapisany język (domyślnie 'en') ---
    const savedLang = localStorage.getItem('lfn_lang') || 'en';
    setLanguage(savedLang);

    // --- 6. Animacje scrollowania (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});
