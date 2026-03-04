/**
 * ==========================================================================
 * 1. SELEKTOR ELEMEN & KONSTANTA
 * ==========================================================================
 */
const elements = {
    toggleButton: document.getElementById('theme-toggle'),
    navToggle: document.querySelector('.nav-toggle'),
    toTopButton: document.getElementById('to-top'),
    cursorDot: document.querySelector('.cursor-dot'),
    cursorOutline: document.querySelector('.cursor-outline'),
    typewriter: document.getElementById('typewriter-text')
};

const THEME = {
    DARK: 'dark',
    LIGHT: 'light'
};

/**
 * ==========================================================================
 * 2. LOGIKA TEMA (DARK/LIGHT MODE)
 * ==========================================================================
 */
function applyTheme(theme) {
    const isDark = theme === THEME.DARK;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (elements.toggleButton) {
        elements.toggleButton.textContent = isDark ? 'Ganti Mode ☀️' : 'Ganti Mode 🌙';
    }
}

function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    applyTheme(targetTheme);
}

// Inisialisasi Tema
(function initTheme() {
    const savedTheme = localStorage.getItem('theme') || THEME.DARK;
    applyTheme(savedTheme);
    if (elements.toggleButton) elements.toggleButton.onclick = handleThemeToggle;
})();

/**
 * ==========================================================================
 * 3. INTERAKSI SCROLL & NAVIGATION
 * ==========================================================================
 */
// Menu Mobile
if (elements.navToggle) {
    elements.navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        document.body.classList.toggle('nav-open');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-inner')) {
            document.body.classList.remove('nav-open');
        }
    });
}

// Scroll to Top
if (elements.toTopButton) {
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 300;
        elements.toTopButton.classList.toggle('show', isScrolled);
    });

    elements.toTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * ==========================================================================
 * 4. ANIMASI MUNCUL (SCROLL REVEAL)
 * ==========================================================================
 */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .hero-content, .contact-section').forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
});

/**
 * ==========================================================================
 * 5. CUSTOM CURSOR
 * ==========================================================================
 */
if (elements.cursorDot && elements.cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const { clientX: posX, clientY: posY } = e;
        
        // Munculkan & Update Posisi
        [elements.cursorDot, elements.cursorOutline].forEach(el => {
            el.style.opacity = "1";
            el.style.left = `${posX}px`;
            el.style.top = `${posY}px`;
        });
    });

    document.addEventListener('mousedown', () => {
        elements.cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    document.addEventListener('mouseup', () => {
        elements.cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

/**
 * ==========================================================================
 * 6. TYPEWRITER ANIMATION
 * ==========================================================================
 */
const phrases = ["Kaka.", "Developer.", "Tech Enthusiast.", "Problem Solver."];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    if (!elements.typewriter) return;

    const currentPhrase = phrases[phraseIndex];
    const fullText = currentPhrase.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
    
    elements.typewriter.textContent = fullText;
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    let delta = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        delta = 2000; // Jeda saat teks lengkap
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delta = 500; // Jeda sebelum mulai kata baru
    }

    setTimeout(typeAnimation, delta);
}

// Jalankan Typewriter
document.addEventListener('DOMContentLoaded', typeAnimation);