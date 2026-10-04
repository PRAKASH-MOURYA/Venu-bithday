// =========================================================
// 💖 HAPPY BIRTHDAY VENU - MODERN INTERACTIVE CELEBRATION 💖
// =========================================================

// --- DOM References ---
const themeToggle = document.getElementById('theme-toggle');
const giftBox = document.getElementById('gift-container');
const popupOverlay = document.getElementById('popup-overlay');
const closePopup = document.getElementById('close-popup');
const currentDateEl = document.getElementById('current-date');
const previewBtn = document.getElementById('preview-btn');

// --- Canvas References ---
const starCanvas = document.getElementById('star-map');
const trailCanvas = document.getElementById('mouse-trail');
const particleCanvas = document.getElementById('text-particles');
const gardenCanvas = document.getElementById('flower-garden');
const visualizerCanvas = document.getElementById('audio-visualizer');

// 1. Footer Date (Honors October 8th for Venu)
if (currentDateEl) {
    currentDateEl.innerText = "October 8th · Venu's Special Day ✨";
}

// ---------------------------------------------------------
// 2. Countdown Logic (Target: October 8th for Venu)
// ---------------------------------------------------------
const countdownOverlay = document.getElementById('countdown-overlay');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function getVenuBirthdayDate() {
    const now = new Date();
    // Month is 0-indexed: 9 = October
    let bday = new Date(now.getFullYear(), 9, 8, 0, 0, 0);
    // If today is past October 8th of this year, target next year's Oct 8
    if (now.getTime() > bday.getTime() + (24 * 60 * 60 * 1000)) {
        bday = new Date(now.getFullYear() + 1, 9, 8, 0, 0, 0);
    }
    return bday.getTime();
}

const birthdayDate = getVenuBirthdayDate();

function updateCountdown() {
    if (!countdownOverlay) return;

    const now = new Date().getTime();
    const distance = birthdayDate - now;

    // Check if it's already her birthday or past it (within birthday day)
    const isBirthdayNow = distance <= 0 && distance >= -(24 * 60 * 60 * 1000);

    if (distance <= 0) {
        // Birthday is here! Auto-unlock
        clearInterval(countdownTimer);
        unlockCelebration(true);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if (hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if (minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;

    // If countdown is active and not previewed, lock scroll
    if (!countdownOverlay.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    }
}

function unlockCelebration(isBdayArrival = false) {
    if (!countdownOverlay) return;
    countdownOverlay.classList.add('hidden');
    document.body.style.overflow = 'auto';

    if (isBdayArrival && typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 }
        });
    }
}

// Sneak Peek / Preview Mode Pass (Allows exploring right away before Oct 8!)
if (previewBtn) {
    previewBtn.addEventListener('click', () => {
        unlockCelebration(false);
        // Play brief celebratory confetti
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 }
            });
        }
    });
}

// Check if preview query param is present e.g. ?preview=true
if (window.location.search.includes('preview=true')) {
    unlockCelebration(false);
}

const countdownTimer = setInterval(updateCountdown, 1000);
updateCountdown();


// ---------------------------------------------------------
// 3. Modern Vinyl Music Player & Web Audio Fallback
// ---------------------------------------------------------
class ModernMusicPlayer {
    constructor() {
        this.audio = new Audio('assets/music.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.6;
        this.isPlaying = false;

        this.toggleBtn = document.getElementById('music-toggle-btn');
        this.volumeSlider = document.getElementById('volume-slider');
        this.vinylDisc = document.getElementById('vinyl-disc');
        this.musicWave = document.getElementById('music-wave');
        this.icon = this.toggleBtn ? this.toggleBtn.querySelector('i') : null;

        this.entryOverlay = document.getElementById('entry-overlay');
        this.enterBtn = document.getElementById('enter-btn');

        this.init();
    }

    init() {
        if (this.enterBtn) {
            this.enterBtn.addEventListener('click', () => this.startExperience());
        }

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.togglePlay());
        }

        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.audio.volume = e.target.value;
            });
        }
    }

    startExperience() {
        if (this.entryOverlay) {
            this.entryOverlay.classList.add('hidden-fade');
            setTimeout(() => this.entryOverlay.remove(), 800);
        }
        this.play();
        startBalloons();
    }

    play() {
        this.audio.play().then(() => {
            this.isPlaying = true;
            this.updateUI(true);
        }).catch(() => {
            // If browser audio policy blocked, update UI state
            this.isPlaying = false;
            this.updateUI(false);
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateUI(false);
    }

    togglePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    updateUI(playing) {
        if (this.icon) {
            this.icon.className = playing ? 'fas fa-pause' : 'fas fa-play';
        }
        if (this.vinylDisc) {
            playing ? this.vinylDisc.classList.add('spin') : this.vinylDisc.classList.remove('spin');
        }
        if (this.musicWave) {
            playing ? this.musicWave.classList.add('active') : this.musicWave.classList.remove('active');
        }
    }
}

const musicPlayer = new ModernMusicPlayer();


// ---------------------------------------------------------
// 4. Floating Interactive Balloons
// ---------------------------------------------------------
function startBalloons() {
    const container = document.getElementById('balloon-container');
    if (!container) return;

    const balloonColors = ['#FF69B4', '#FFB7C5', '#DDA0DD', '#87CEEB', '#FFD700', '#FF8DA1'];

    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const bg = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        const left = Math.random() * 92;
        const duration = Math.random() * 5 + 6;

        balloon.style.backgroundColor = bg;
        balloon.style.left = left + 'vw';
        balloon.style.animationDuration = duration + 's';

        balloon.addEventListener('click', (e) => {
            balloon.style.transform = 'scale(1.6)';
            balloon.style.opacity = '0';
            setTimeout(() => balloon.remove(), 200);

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 25,
                    spread: 45,
                    origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
                });
            }
        });

        balloon.addEventListener('animationend', () => balloon.remove());
        container.appendChild(balloon);
    }, 1800);
}


// ---------------------------------------------------------
// 5. Theme Toggle (Dark & Light Mode)
// ---------------------------------------------------------
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    });
}


// ---------------------------------------------------------
// 6. Scroll Animations & Reveal Observers
// ---------------------------------------------------------
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in-up, .section-title, .reveal-text, .polaroid-card').forEach(el => {
    el.classList.add('fade-in-up');
    scrollObserver.observe(el);
});


// ---------------------------------------------------------
// 7. Interactive Background Star Map Canvas
// ---------------------------------------------------------
if (starCanvas) {
    const starCtx = starCanvas.getContext('2d');
    let stars = [];
    const mousePos = { x: -100, y: -100 };

    window.addEventListener('mousemove', e => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    });

    function resizeStars() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        initStars();
    }
    window.addEventListener('resize', resizeStars);

    class Star {
        constructor() {
            this.x = Math.random() * starCanvas.width;
            this.y = Math.random() * starCanvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0) this.x = starCanvas.width;
            if (this.x > starCanvas.width) this.x = 0;
            if (this.y < 0) this.y = starCanvas.height;
            if (this.y > starCanvas.height) this.y = 0;
        }
        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            starCtx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 105, 180, 0.6)';
            starCtx.beginPath();
            starCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            starCtx.fill();
        }
    }

    function initStars() {
        stars = [];
        const count = Math.floor(window.innerWidth / 15);
        for (let i = 0; i < count; i++) stars.push(new Star());
    }

    function animateStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        stars.forEach(star => {
            star.update();
            star.draw();
            const dx = mousePos.x - star.x;
            const dy = mousePos.y - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
                starCtx.strokeStyle = 'rgba(255, 105, 180, 0.25)';
                starCtx.lineWidth = 1;
                starCtx.beginPath();
                starCtx.moveTo(star.x, star.y);
                starCtx.lineTo(mousePos.x, mousePos.y);
                starCtx.stroke();
            }
        });
        requestAnimationFrame(animateStars);
    }

    resizeStars();
    animateStars();
}


// ---------------------------------------------------------
// 8. Magic Mouse Trail Canvas
// ---------------------------------------------------------
if (trailCanvas) {
    const trailCtx = trailCanvas.getContext('2d');
    let trailParticles = [];

    function resizeTrail() {
        trailCanvas.width = window.innerWidth;
        trailCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeTrail);
    resizeTrail();

    window.addEventListener('mousemove', e => {
        for (let i = 0; i < 2; i++) {
            trailParticles.push(new TrailParticle(e.clientX, e.clientY));
        }
    });

    class TrailParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 2;
            this.speedX = (Math.random() - 0.5) * 2;
            this.speedY = (Math.random() - 0.5) * 2;
            this.color = `hsl(${Math.random() * 50 + 320}, 100%, 65%)`; // Pinkish glowing hues
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.12;
        }
        draw() {
            trailCtx.fillStyle = this.color;
            trailCtx.beginPath();
            trailCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            trailCtx.fill();
        }
    }

    function handleTrail() {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        for (let i = 0; i < trailParticles.length; i++) {
            trailParticles[i].update();
            trailParticles[i].draw();
            if (trailParticles[i].size <= 0.2) {
                trailParticles.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(handleTrail);
    }
    handleTrail();
}


// ---------------------------------------------------------
// 9. Particle Text Canvas in Hero ("Venu")
// ---------------------------------------------------------
if (particleCanvas) {
    const pCtx = particleCanvas.getContext('2d');
    let particleTextArray = [];
    const heroMouse = { x: -1000, y: -1000 };

    window.addEventListener('mousemove', e => {
        heroMouse.x = e.clientX;
        heroMouse.y = e.clientY;
    });

    class TextParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.baseX = x;
            this.baseY = y;
            this.size = 2.4;
            this.density = (Math.random() * 25) + 5;
        }
        draw() {
            pCtx.fillStyle = '#FF69B4';
            pCtx.beginPath();
            pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            pCtx.closePath();
            pCtx.fill();
        }
        update() {
            const rect = particleCanvas.getBoundingClientRect();
            const dx = heroMouse.x - (this.x + rect.left);
            const dy = heroMouse.y - (this.y + rect.top);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 90;

            if (dist < maxDistance) {
                const force = (maxDistance - dist) / maxDistance;
                const forceDirX = dx / dist;
                const forceDirY = dy / dist;
                this.x -= forceDirX * force * this.density;
                this.y -= forceDirY * force * this.density;
            } else {
                if (this.x !== this.baseX) {
                    this.x -= (this.x - this.baseX) / 10;
                }
                if (this.y !== this.baseY) {
                    this.y -= (this.y - this.baseY) / 10;
                }
            }
        }
    }

    function initParticleText() {
        particleCanvas.width = 800;
        particleCanvas.height = 150;
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        pCtx.fillStyle = '#FF69B4';
        pCtx.font = 'bold 84px "Playfair Display", serif';
        pCtx.textAlign = 'center';
        pCtx.textBaseline = 'middle';
        // Render Venu with love heart
        pCtx.fillText('Venu 💖', particleCanvas.width / 2, particleCanvas.height / 2);

        const textCoordinates = pCtx.getImageData(0, 0, particleCanvas.width, particleCanvas.height);
        particleTextArray = [];

        // Sample pixels with a step of 4 for smooth performance
        for (let y = 0; y < textCoordinates.height; y += 4) {
            for (let x = 0; x < textCoordinates.width; x += 4) {
                const alpha = textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3];
                if (alpha > 128) {
                    particleTextArray.push(new TextParticle(x, y));
                }
            }
        }
    }

    function animateTextParticles() {
        pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
        particleTextArray.forEach(p => {
            p.draw();
            p.update();
        });
        requestAnimationFrame(animateTextParticles);
    }

    setTimeout(() => {
        initParticleText();
        animateTextParticles();
    }, 600);
}


// ---------------------------------------------------------
// 10. Polaroid Real Photo Uploader & Persistence
// ---------------------------------------------------------
document.querySelectorAll('.photo-input').forEach(input => {
    const targetId = input.dataset.target;
    // Load saved image from localStorage if available
    const saved = localStorage.getItem('venu_photo_' + targetId);
    if (saved) {
        const img = document.getElementById(targetId);
        if (img) img.src = saved;
    }

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                const img = document.getElementById(targetId);
                if (img) img.src = dataUrl;
                try {
                    localStorage.setItem('venu_photo_' + targetId, dataUrl);
                } catch (err) {
                    console.log('Photo cached for session');
                }
                if (typeof confetti === 'function') {
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
                }
            };
            reader.readAsDataURL(file);
        }
    });
});


// ---------------------------------------------------------
// 11. 🎮 ARCADE OF LOVE (ALL 4 INTERACTIVE GAMES)
// ---------------------------------------------------------

// --- Game Tab Navigation ---
const gameTabBtns = document.querySelectorAll('.game-tab-btn');
const gamePanels = document.querySelectorAll('.game-panel');

gameTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        gameTabBtns.forEach(b => b.classList.remove('active'));
        gamePanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const gameId = btn.dataset.game;
        const targetPanel = document.getElementById('game-panel-' + gameId);
        if (targetPanel) targetPanel.classList.add('active');
    });
});


// --- GAME 1: Catch the Love (Falling Hearts Arcade) ---
const catchCanvas = document.getElementById('heart-catch-canvas');
if (catchCanvas) {
    const cCtx = catchCanvas.getContext('2d');
    let catchScore = 0;
    let comboMultiplier = 1;
    let isCatchRunning = false;
    let fallingItems = [];
    const scoreEl = document.getElementById('catch-score');
    const comboEl = document.getElementById('catch-combo');
    const startOverlay = document.getElementById('catch-game-overlay');
    const startCatchBtn = document.getElementById('start-catch-btn');
    const winModal = document.getElementById('game-win-modal');
    const closeWinBtn = document.getElementById('close-game-win-btn');

    // Basket / Player
    const basket = {
        x: 260,
        y: 330,
        width: 80,
        height: 35,
        speed: 8
    };

    // Responsive Canvas
    function resizeCatchCanvas() {
        const container = catchCanvas.parentElement;
        if (container) {
            catchCanvas.width = Math.min(600, container.clientWidth);
            catchCanvas.height = 380;
            basket.y = catchCanvas.height - 45;
        }
    }
    resizeCatchCanvas();
    window.addEventListener('resize', resizeCatchCanvas);

    // Track basket with mouse and touch
    function moveBasket(clientX) {
        const rect = catchCanvas.getBoundingClientRect();
        const relativeX = clientX - rect.left;
        basket.x = Math.max(0, Math.min(catchCanvas.width - basket.width, relativeX - basket.width / 2));
    }

    catchCanvas.addEventListener('mousemove', e => moveBasket(e.clientX));
    catchCanvas.addEventListener('touchmove', e => {
        if (e.touches.length > 0) {
            moveBasket(e.touches[0].clientX);
            e.preventDefault();
        }
    }, { passive: false });

    // Keyboard support
    window.addEventListener('keydown', e => {
        if (!isCatchRunning) return;
        if (e.key === 'ArrowLeft') basket.x = Math.max(0, basket.x - 25);
        if (e.key === 'ArrowRight') basket.x = Math.min(catchCanvas.width - basket.width, basket.x + 25);
    });

    const itemTypes = [
        { char: '💖', pts: 10 },
        { char: '🍓', pts: 15 },
        { char: '🧁', pts: 20 },
        { char: '⭐', pts: 25 },
        { char: '🎁', pts: 30 }
    ];

    function spawnItem() {
        if (!isCatchRunning) return;
        const type = itemTypes[Math.floor(Math.random() * itemTypes.length)];
        fallingItems.push({
            x: Math.random() * (catchCanvas.width - 40) + 20,
            y: -30,
            speed: Math.random() * 2 + 2,
            type: type,
            size: 26
        });
    }

    let spawnInterval = null;

    function startCatchGame() {
        catchScore = 0;
        comboMultiplier = 1;
        fallingItems = [];
        if (scoreEl) scoreEl.innerText = '0';
        if (comboEl) comboEl.innerText = 'x1';
        isCatchRunning = true;
        if (startOverlay) startOverlay.classList.add('hidden');

        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawnItem, 800);
        requestAnimationFrame(updateCatchGame);
    }

    if (startCatchBtn) startCatchBtn.addEventListener('click', startCatchGame);

    function updateCatchGame() {
        if (!isCatchRunning) return;

        cCtx.clearRect(0, 0, catchCanvas.width, catchCanvas.height);

        // Draw Player Basket (Cute glowing pink bowl)
        cCtx.fillStyle = '#FF1493';
        cCtx.shadowColor = '#FF69B4';
        cCtx.shadowBlur = 15;
        cCtx.beginPath();
        cCtx.roundRect(basket.x, basket.y, basket.width, basket.height, [8, 8, 20, 20]);
        cCtx.fill();
        cCtx.shadowBlur = 0;

        // Basket label
        cCtx.fillStyle = 'white';
        cCtx.font = 'bold 13px "Poppins", sans-serif';
        cCtx.textAlign = 'center';
        cCtx.fillText('Venu 🧺', basket.x + basket.width / 2, basket.y + 22);

        // Update and draw falling items
        for (let i = 0; i < fallingItems.length; i++) {
            const it = fallingItems[i];
            it.y += it.speed;

            // Draw emoji
            cCtx.font = `${it.size}px sans-serif`;
            cCtx.textAlign = 'center';
            cCtx.fillText(it.type.char, it.x, it.y);

            // Catch Collision Check
            if (
                it.y >= basket.y &&
                it.y <= basket.y + basket.height + 10 &&
                it.x >= basket.x - 10 &&
                it.x <= basket.x + basket.width + 10
            ) {
                // Caught!
                catchScore += it.type.pts * comboMultiplier;
                comboMultiplier = Math.min(5, comboMultiplier + 1);
                if (scoreEl) scoreEl.innerText = catchScore;
                if (comboEl) comboEl.innerText = 'x' + comboMultiplier;

                fallingItems.splice(i, 1);
                i--;

                // Check Win Condition (100 pts)
                if (catchScore >= 100) {
                    isCatchRunning = false;
                    clearInterval(spawnInterval);
                    if (winModal) {
                        winModal.classList.remove('hidden');
                        setTimeout(() => winModal.classList.add('show'), 10);
                    }
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
                    }
                    return;
                }
            } else if (it.y > catchCanvas.height + 40) {
                // Missed
                comboMultiplier = 1;
                if (comboEl) comboEl.innerText = 'x1';
                fallingItems.splice(i, 1);
                i--;
            }
        }

        requestAnimationFrame(updateCatchGame);
    }

    if (closeWinBtn) {
        closeWinBtn.addEventListener('click', () => {
            if (winModal) {
                winModal.classList.remove('show');
                setTimeout(() => winModal.classList.add('hidden'), 300);
            }
            if (startOverlay) startOverlay.classList.remove('hidden');
        });
    }
}


// --- GAME 2: Spin the Wheel of Love ---
const wheelCanvas = document.getElementById('wheel-canvas');
if (wheelCanvas) {
    const wCtx = wheelCanvas.getContext('2d');
    const spinBtn = document.getElementById('spin-wheel-btn');
    const voucherModal = document.getElementById('voucher-modal');
    const closeVoucherBtn = document.getElementById('close-voucher');
    const claimVoucherBtn = document.getElementById('claim-voucher-btn');
    const voucherTitle = document.getElementById('voucher-title');
    const voucherDesc = document.getElementById('voucher-desc');
    const voucherCode = document.getElementById('voucher-code');

    const prizes = [
        { label: 'Ice Cream & Drive 🍦', code: 'VENU-ICECREAM', desc: 'Late night ice cream run to her favorite spot with good music!' },
        { label: 'Unlimited Hugs 🫂', code: 'VENU-CUDDLES', desc: 'Unlimited warm cuddles and forehead kisses whenever she wants!' },
        { label: 'Massage Pass 💆‍♀️', code: 'VENU-MASSAGE', desc: 'One 30-minute relaxing neck and back massage voucher!' },
        { label: 'Dinner Date 🍝', code: 'VENU-DINNER', desc: 'A candlelit romantic dinner anywhere Venu chooses. My treat!' },
        { label: 'Your Wish Pass 👑', code: 'VENU-WILDCARD', desc: 'Wildcard: Your wish is my command! Valid for any cute request.' },
        { label: 'Movie Marathon 🍿', code: 'VENU-MOVIES', desc: 'Cozy movie night with your favorite snacks, popcorn & blanket!' }
    ];

    const colors = ['#FF69B4', '#FF8DA1', '#FFB6C1', '#DDA0DD', '#FF6B8B', '#FFA07A'];
    let currentAngle = 0;
    let isSpinning = false;

    function drawWheel(angle) {
        const numPrizes = prizes.length;
        const arc = (2 * Math.PI) / numPrizes;
        const cx = wheelCanvas.width / 2;
        const cy = wheelCanvas.height / 2;
        const radius = cx - 15;

        wCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

        prizes.forEach((prize, i) => {
            const startA = angle + i * arc;
            const endA = startA + arc;

            // Sector slice
            wCtx.beginPath();
            wCtx.moveTo(cx, cy);
            wCtx.arc(cx, cy, radius, startA, endA);
            wCtx.fillStyle = colors[i % colors.length];
            wCtx.fill();
            wCtx.lineWidth = 2;
            wCtx.strokeStyle = 'white';
            wCtx.stroke();

            // Label text
            wCtx.save();
            wCtx.translate(cx, cy);
            wCtx.rotate(startA + arc / 2);
            wCtx.textAlign = 'right';
            wCtx.fillStyle = 'white';
            wCtx.font = 'bold 14px "Poppins", sans-serif';
            wCtx.shadowColor = 'rgba(0,0,0,0.3)';
            wCtx.shadowBlur = 4;
            wCtx.fillText(prize.label, radius - 15, 5);
            wCtx.restore();
        });

        // Center hub
        wCtx.beginPath();
        wCtx.arc(cx, cy, 30, 0, 2 * Math.PI);
        wCtx.fillStyle = '#FFF';
        wCtx.shadowColor = 'rgba(0,0,0,0.2)';
        wCtx.shadowBlur = 8;
        wCtx.fill();
        wCtx.shadowBlur = 0;

        wCtx.font = '18px sans-serif';
        wCtx.textAlign = 'center';
        wCtx.textBaseline = 'middle';
        wCtx.fillText('💖', cx, cy);
    }

    drawWheel(0);

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

        const spinRotations = 5 + Math.random() * 4;
        const totalRotation = spinRotations * 2 * Math.PI;
        const duration = 4000;
        const startTime = performance.now();
        const startAngle = currentAngle;

        function animateSpin(now) {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);

            currentAngle = startAngle + totalRotation * easeOut;
            drawWheel(currentAngle);

            if (progress < 1) {
                requestAnimationFrame(animateSpin);
            } else {
                isSpinning = false;
                // Calculate winner: Pointer is at top (-PI/2)
                const numPrizes = prizes.length;
                const arc = (2 * Math.PI) / numPrizes;
                // Normalized angle
                const normalizedAngle = (1.5 * Math.PI - (currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
                const winnerIndex = Math.floor(normalizedAngle / arc) % numPrizes;
                const winningPrize = prizes[winnerIndex];

                if (voucherTitle) voucherTitle.innerText = winningPrize.label;
                if (voucherDesc) voucherDesc.innerText = winningPrize.desc;
                if (voucherCode) voucherCode.innerText = 'PASS: ' + winningPrize.code;

                setTimeout(() => {
                    if (voucherModal) {
                        voucherModal.classList.remove('hidden');
                        setTimeout(() => voucherModal.classList.add('show'), 10);
                    }
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                    }
                }, 400);
            }
        }

        requestAnimationFrame(animateSpin);
    }

    if (spinBtn) spinBtn.addEventListener('click', spinWheel);

    function closeVoucher() {
        if (voucherModal) {
            voucherModal.classList.remove('show');
            setTimeout(() => voucherModal.classList.add('hidden'), 300);
        }
    }

    if (closeVoucherBtn) closeVoucherBtn.addEventListener('click', closeVoucher);
    if (claimVoucherBtn) claimVoucherBtn.addEventListener('click', closeVoucher);
}


// --- GAME 3: Scratch & Reveal Love Coupons ---
document.querySelectorAll('.scratch-canvas').forEach(canvas => {
    const sCtx = canvas.getContext('2d');
    let isScratching = false;

    // Fill canvas with shimmering rose-gold foil
    function initFoil() {
        const grad = sCtx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#E0BFB8');
        grad.addColorStop(0.5, '#F7D6D0');
        grad.addColorStop(1, '#D4A373');

        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, canvas.width, canvas.height);

        // Pattern / Text overlay
        sCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        sCtx.font = 'bold 15px "Poppins", sans-serif';
        sCtx.textAlign = 'center';
        sCtx.textBaseline = 'middle';
        sCtx.fillText('✨ Scratch for Venu ✨', canvas.width / 2, canvas.height / 2);
    }
    initFoil();

    function scratch(x, y) {
        sCtx.globalCompositeOperation = 'destination-out';
        sCtx.beginPath();
        sCtx.arc(x, y, 18, 0, Math.PI * 2);
        sCtx.fill();
        checkScratchCompletion();
    }

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        if (e.touches && e.touches.length > 0) {
            return {
                x: (e.touches[0].clientX - rect.left) * (canvas.width / rect.width),
                y: (e.touches[0].clientY - rect.top) * (canvas.height / rect.height)
            };
        }
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener('mousedown', e => {
        isScratching = true;
        const coords = getCoords(e);
        scratch(coords.x, coords.y);
    });
    window.addEventListener('mouseup', () => isScratching = false);
    canvas.addEventListener('mousemove', e => {
        if (!isScratching) return;
        const coords = getCoords(e);
        scratch(coords.x, coords.y);
    });

    // Touch support
    canvas.addEventListener('touchstart', e => {
        isScratching = true;
        const coords = getCoords(e);
        scratch(coords.x, coords.y);
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchend', () => isScratching = false);
    canvas.addEventListener('touchmove', e => {
        if (!isScratching) return;
        const coords = getCoords(e);
        scratch(coords.x, coords.y);
        e.preventDefault();
    }, { passive: false });

    // Check if > 50% scratched to auto-clear
    let cleared = false;
    function checkScratchCompletion() {
        if (cleared) return;
        const imgData = sCtx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentPixels = 0;
        for (let i = 3; i < imgData.data.length; i += 16) {
            if (imgData.data[i] === 0) transparentPixels++;
        }
        const totalSampled = imgData.data.length / 16;
        if (transparentPixels / totalSampled > 0.45) {
            cleared = true;
            canvas.style.opacity = '0';
            setTimeout(() => canvas.style.display = 'none', 400);
            if (typeof confetti === 'function') {
                confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
            }
        }
    }
});


// --- GAME 4: Couple Trivia Quiz ---
const quizData = [
    {
        q: "Who is the absolute boss in this relationship? 😉",
        options: [
            { text: "Venu (100% undisputed Queen) 👑", correct: true, feedback: "Spot on! The Queen's word is law!" },
            { text: "Him (only in his dreams 😂)", correct: true, feedback: "Haha, keep dreaming buddy!" },
            { text: "It's a tie, but Venu decides everything", correct: true, feedback: "The diplomatic and true answer!" }
        ]
    },
    {
        q: "What is my absolute favorite thing about you, Venu?",
        options: [
            { text: "Your radiant smile & contagious laugh", correct: true, feedback: "It literally lights up my whole universe!" },
            { text: "How sweet & caring your heart is", correct: true, feedback: "You have the purest heart of anyone I know." },
            { text: "All of the above and a million more things ❤️", correct: true, feedback: "Bingo! I love every single thing about you!" }
        ]
    },
    {
        q: "What should we do on our next romantic date?",
        options: [
            { text: "Late night drive with ice cream & stargazing 🍦", correct: true, feedback: "Consider it booked! Sounds magical." },
            { text: "Cozy movie marathon with all your favorite snacks 🍿", correct: true, feedback: "I'll make the popcorn and grab the blankets!" },
            { text: "A surprise dinner date at a fancy place 🍝", correct: true, feedback: "Dress up pretty, my treat!" }
        ]
    },
    {
        q: "How much does your boyfriend love you?",
        options: [
            { text: "To the moon and back 🌙", correct: true, feedback: "Way further than the moon!" },
            { text: "More than pizza, sleep, and everything combined", correct: true, feedback: "True fact!" },
            { text: "To infinity & beyond, forever and always ❤️", correct: true, feedback: "Forever and always, my darling Venu! ✨" }
        ]
    }
];

let currentQuizIndex = 0;
let quizScore = 0;
const quizQuestionText = document.getElementById('quiz-question-text');
const quizOptionsList = document.getElementById('quiz-options-list');
const quizProgress = document.getElementById('quiz-progress');
const quizMeterFill = document.getElementById('quiz-meter-fill');
const quizReaction = document.getElementById('quiz-reaction');

function loadQuizQuestion() {
    if (!quizQuestionText || !quizOptionsList) return;

    if (currentQuizIndex >= quizData.length) {
        // Quiz completed -> Render Certificate
        renderSoulmateCertificate();
        return;
    }

    const currentQ = quizData[currentQuizIndex];
    quizQuestionText.innerText = currentQ.q;
    if (quizProgress) quizProgress.innerText = `Question ${currentQuizIndex + 1} of ${quizData.length}`;
    if (quizMeterFill) quizMeterFill.style.width = `${((currentQuizIndex + 1) / quizData.length) * 100}%`;
    if (quizReaction) quizReaction.classList.add('hidden');

    quizOptionsList.innerHTML = '';
    currentQ.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.classList.add('quiz-opt-btn');
        btn.innerHTML = `<span>${opt.text}</span> <i class="fas fa-heart" style="color: #FF69B4; opacity: 0.6;"></i>`;
        btn.addEventListener('click', () => handleQuizAnswer(opt, btn));
        quizOptionsList.appendChild(btn);
    });
}

function handleQuizAnswer(option, btnElement) {
    btnElement.classList.add('correct');
    quizScore++;

    if (quizReaction) {
        quizReaction.innerText = option.feedback;
        quizReaction.classList.remove('hidden');
    }

    // Disable all options briefly
    const allBtns = quizOptionsList.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    setTimeout(() => {
        currentQuizIndex++;
        loadQuizQuestion();
    }, 1400);
}

function renderSoulmateCertificate() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    quizContainer.innerHTML = `
        <div class="quiz-cert">
            <div class="cert-badge">🏆💖</div>
            <h3>100% Soulmate Rating Verified!</h3>
            <p><strong>Official Certificate for Venu:</strong> You have passed the love test with flying colors! You are officially the most adored, cherished, and loved girl on earth.</p>
            <div class="voucher-code" style="margin: 1.5rem auto;">OFFICIAL MATCH: VENU & FOREVER</div>
            <button class="glow-btn" onclick="location.reload();">Play Again 🔄</button>
        </div>
    `;

    if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 85, origin: { y: 0.6 } });
    }
}

loadQuizQuestion();


// ---------------------------------------------------------
// 12. 3D Memory Flipbook Logic
// ---------------------------------------------------------
const book = document.querySelector('.book');
const pages = document.querySelectorAll('.page');

pages.forEach((page, index) => {
    page.addEventListener('click', (e) => {
        e.stopPropagation();

        if (index === 0 && book) {
            book.classList.add('book-open');
        }

        if (page.classList.contains('flipped')) {
            page.classList.remove('flipped');
            for (let i = index + 1; i < pages.length; i++) {
                pages[i].classList.remove('flipped');
            }
        } else {
            page.classList.add('flipped');
            for (let i = 0; i < index; i++) {
                pages[i].classList.add('flipped');
            }
        }
    });
});


// ---------------------------------------------------------
// 13. Open When Letters Modal
// ---------------------------------------------------------
window.openLetter = function (type) {
    const modal = document.getElementById('letter-modal');
    const title = document.getElementById('letter-title');
    const body = document.getElementById('letter-body');
    if (!modal || !title || !body) return;

    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);

    const messages = {
        'sad': {
            t: 'When You Feel Down or Sad 🫂',
            b: '<p>My darling Venu,</p><p>Remember how incredibly strong, resilient, and deeply loved you are. Bad days are only temporary, but my love and support for you will never waver.</p><p>Take a deep breath, wrap yourself in your warmest blanket, and call or text me immediately. I am always right here by your side. ❤️</p><div class="letter-signoff">Forever yours,<br>With all my love 💖</div>'
        },
        'happy': {
            t: 'Yay! You Are Super Happy! 🥳',
            b: '<p>My gorgeous Venu,</p><p>Keep that radiant smile shining bright! Your happiness is my absolute favorite sight in the world.</p><p>Go celebrate, dance around, treat yourself to your favorite dessert, and know that seeing you happy makes my entire world complete! ✨🍦</p><div class="letter-signoff">Cheering for you always,<br>Your biggest fan 💖</div>'
        },
        'miss': {
            t: 'When You Miss Me 💌',
            b: '<p>Hey beautiful,</p><p>Close your eyes for a second and feel my arms around you giving you the warmest, tightest hug.</p><p>No matter where we are or how busy life gets, you are always the first and last thought on my mind every single day. Sending you a million kisses right now! 💋</p><div class="letter-signoff">Always in my heart,<br>Yours forever ❤️</div>'
        },
        'bored': {
            t: 'When You Feel Bored 🐙',
            b: '<p>Boredom emergency alert!</p><p>Fun fact: Sea otters hold hands while sleeping so they never drift apart — just like how I never want to let go of your hand!</p><p>Now pick up your phone and text me your favorite meme, or tell me what snack you want and let\'s do something fun! 🧸✨</p><div class="letter-signoff">Ready to hang out,<br>Always your cutie ❤️</div>'
        }
    };

    if (messages[type]) {
        title.innerText = messages[type].t;
        body.innerHTML = messages[type].b;
    }
};

window.closeLetter = function () {
    const modal = document.getElementById('letter-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
};


// ---------------------------------------------------------
// 14. Interactive Cake Candle Blowing
// ---------------------------------------------------------
const flames = document.querySelectorAll('.flame');
const smokes = document.querySelectorAll('.smoke');
const wishMsg = document.getElementById('wish-message');

flames.forEach((flame, index) => {
    flame.addEventListener('click', () => {
        flame.classList.add('hidden');
        if (smokes[index]) smokes[index].classList.remove('hidden');
        checkCandles();
    });
});

function checkCandles() {
    const activeFlames = document.querySelectorAll('.flame:not(.hidden)');
    if (activeFlames.length === 0) {
        setTimeout(() => {
            if (wishMsg) wishMsg.classList.remove('hidden');
        }, 400);

        if (typeof confetti === 'function') {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });
        }
    }
}


// ---------------------------------------------------------
// 15. Surprise Gift Box Unwrapping
// ---------------------------------------------------------
if (giftBox) {
    giftBox.addEventListener('click', () => {
        const box = giftBox.querySelector('.gift-box');
        if (!box || box.classList.contains('open')) return;
        box.classList.add('open');

        let duration = 3000;
        let end = Date.now() + duration;

        (function frame() {
            if (typeof confetti === 'function') {
                confetti({ particleCount: 6, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 6, angle: 120, spread: 55, origin: { x: 1 } });
            }
            if (Date.now() < end) requestAnimationFrame(frame);
        })();

        setTimeout(() => {
            if (popupOverlay) {
                popupOverlay.classList.remove('hidden');
                setTimeout(() => popupOverlay.classList.add('show'), 10);
            }
        }, 1200);
    });
}

if (closePopup && popupOverlay) {
    closePopup.addEventListener('click', () => {
        popupOverlay.classList.remove('show');
        setTimeout(() => popupOverlay.classList.add('hidden'), 300);
    });
}


// ---------------------------------------------------------
// 16. Reasons Why You're Special Carousel
// ---------------------------------------------------------
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button--right');
    const prevButton = document.querySelector('.carousel-button--left');
    const dotsNav = document.querySelector('.carousel-nav');
    const dots = dotsNav ? Array.from(dotsNav.children) : [];

    const setSlidePositions = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });
    };
    setSlidePositions();
    window.addEventListener('resize', setSlidePositions);

    const moveToSlide = (currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');

        if (dotsNav) {
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = slides.findIndex(slide => slide === targetSlide);
            const targetDot = dots[targetIndex];
            if (currentDot) currentDot.classList.remove('current-slide');
            if (targetDot) targetDot.classList.add('current-slide');
        }
    };

    const nextSlide = () => {
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        const next = currentSlide.nextElementSibling || slides[0];
        moveToSlide(currentSlide, next);
    };

    const prevSlide = () => {
        const currentSlide = track.querySelector('.current-slide') || slides[0];
        const prev = currentSlide.previousElementSibling || slides[slides.length - 1];
        moveToSlide(currentSlide, prev);
    };

    if (nextButton) nextButton.addEventListener('click', nextSlide);
    if (prevButton) prevButton.addEventListener('click', prevSlide);

    setInterval(nextSlide, 5000);
}


// ---------------------------------------------------------
// 17. Procedural Flower Garden (Footer Canvas)
// ---------------------------------------------------------
if (gardenCanvas) {
    const gardenCtx = gardenCanvas.getContext('2d');
    function resizeGarden() {
        gardenCanvas.width = window.innerWidth;
        gardenCanvas.height = 200;
    }
    window.addEventListener('resize', resizeGarden);
    resizeGarden();

    function drawFlower(x, y, petalColor) {
        gardenCtx.beginPath();
        gardenCtx.moveTo(x, y);
        gardenCtx.lineTo(x, y + 60);
        gardenCtx.strokeStyle = '#4CAF50';
        gardenCtx.lineWidth = 2.5;
        gardenCtx.stroke();

        gardenCtx.fillStyle = petalColor;
        for (let i = 0; i < 5; i++) {
            gardenCtx.beginPath();
            gardenCtx.arc(x + Math.sin(i * 1.25) * 11, y + Math.cos(i * 1.25) * 11, 6, 0, Math.PI * 2);
            gardenCtx.fill();
        }

        gardenCtx.beginPath();
        gardenCtx.arc(x, y, 4, 0, Math.PI * 2);
        gardenCtx.fillStyle = '#FFD700';
        gardenCtx.fill();
    }

    let hasGrown = false;
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 80) {
            if (!hasGrown) {
                hasGrown = true;
                for (let i = 20; i < window.innerWidth; i += 35) {
                    setTimeout(() => {
                        const color = `hsl(${Math.random() * 50 + 330}, 85%, 75%)`;
                        drawFlower(i, 130 + Math.random() * 30, color);
                    }, Math.random() * 900);
                }
            }
        }
    });
}
