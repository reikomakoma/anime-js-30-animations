// ══════════════ PARTICLES ══════════════
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
function resizeC() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
resizeC(); window.addEventListener('resize', resizeC);
const pts = Array.from({ length: 80 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2 + .3, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, a: Math.random() * .4 + .1 }));
function drawPts() { ctx.clearRect(0, 0, canvas.width, canvas.height); pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > canvas.width) p.vx *= -1; if (p.y < 0 || p.y > canvas.height) p.vy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(124,58,237,${p.a})`; ctx.fill() }); requestAnimationFrame(drawPts) }
drawPts();

// ══════════════ HERO ENTRANCE ══════════════
anime.timeline()
    .add({ targets: '.badge', opacity: [0, 1], translateY: [20, 0], easing: 'easeOutCubic', duration: 700 })
    .add({ targets: '.hero h1', opacity: [0, 1], translateY: [30, 0], easing: 'easeOutCubic', duration: 700 }, '-=400')
    .add({ targets: '.hero p', opacity: [0, 1], translateY: [20, 0], easing: 'easeOutCubic', duration: 600 }, '-=400');

// ══════════════ NAV DOTS ══════════════
const secs = ['hero', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
const nav = document.getElementById('navDots');
secs.forEach((id, i) => {
    const b = document.createElement('button'); b.className = 'nav-dot' + (i === 0 ? ' active' : '');
    b.onclick = () => document.getElementById('sec-' + id).scrollIntoView({ behavior: 'smooth' });
    nav.appendChild(b);
});
new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { const i = secs.indexOf(e.target.id.replace('sec-', '')); document.querySelectorAll('.nav-dot').forEach((d, j) => d.classList.toggle('active', i === j)) } }) }, { threshold: .5 })
    .observe.call(new IntersectionObserver(() => { }), document.body);
// Fix: observe each section
const secObs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { const i = secs.indexOf(e.target.id.replace('sec-', '')); document.querySelectorAll('.nav-dot').forEach((d, j) => d.classList.toggle('active', i === j)) } }) }, { threshold: .5 });
secs.forEach(id => { const el = document.getElementById('sec-' + id); if (el) secObs.observe(el) });

// ══════════════ BUILD UI ══════════════
// Easing rows
const easings = [
    { l: 'linear', c: '#94a3b8' }, { l: 'easeInOutSine', c: '#a78bfa' }, { l: 'easeOutCubic', c: '#06b6d4' },
    { l: 'easeOutElastic(1,.5)', c: '#34d399' }, { l: 'easeOutBounce', c: '#f59e0b' }, { l: 'easeInOutBack', c: '#ec4899' }
];
const easeC = document.getElementById('ease-rows');
easings.forEach((e, i) => {
    const row = document.createElement('div'); row.className = 'ease-item';
    row.innerHTML = `<div class="ease-lbl">${e.l.replace('easeInOut', '±').replace('easeOut', '↗').replace('ease', '')}</div>
    <div class="ease-track"><div class="ease-dot" id="ed-${i}" style="background:${e.c};box-shadow:0 0 8px ${e.c}88"></div></div>`;
    easeC.appendChild(row);
});
// Stagger grid
const sgGrid = document.getElementById('sg-grid');
for (let i = 0; i < 25; i++) { const d = document.createElement('div'); d.className = 'sg-dot'; sgGrid.appendChild(d) }
// Wave bars
const waveS = document.getElementById('wave-scene');
for (let i = 0; i < 16; i++) { const b = document.createElement('div'); b.className = 'wbar'; b.style.height = '20px'; waveS.appendChild(b) }

// ══════════════ DEMO RUNNERS ══════════════
const A = {};
function stop(k) { if (A[k]) { A[k].pause(); delete A[k] } }

// 01 Basic Tween
window.runD1 = function () {
    stop('d1');
    A.d1 = anime({ targets: '#tb-box', translateX: [0, 100], rotate: '1turn', borderRadius: ['10px', '50%'], scale: [1, 1.3, 1], easing: 'easeInOutQuad', duration: 1300, direction: 'alternate', loop: true });
    // Real: toast slide in
    stop('d1r');
    anime.set('#toast1', { translateX: '120%' });
    A.d1r = anime({ targets: '#toast1', translateX: ['120%', '0%'], easing: 'easeOutElastic(1,.5)', duration: 900, delay: 200, direction: 'alternate', loop: true, endDelay: 1500 });
};

// 02 Easing
window.runD2 = function () {
    stop('d2');
    easings.forEach((e, i) => {
        A['d2_' + i] = anime({ targets: `#ed-${i}`, left: ['0%', 'calc(100% - 12px)'], easing: e.l, duration: 1100, loop: true, direction: 'alternate', delay: i * 30 });
    });
    // Real: modal
    stop('d2r');
    anime.set('#modal-ov', { opacity: 0 }); anime.set('#modal-box2', { scale: .8, opacity: 0 });
    A.d2r = anime.timeline({ loop: true, direction: 'alternate', endDelay: 800 })
        .add({ targets: '#modal-ov', opacity: [0, 1], easing: 'linear', duration: 400 })
        .add({ targets: '#modal-box2', scale: [.8, 1], opacity: [0, 1], easing: 'easeOutBack', duration: 500 }, '-=200');
};

// 03 Timeline
window.runD3 = function () {
    stop('d3');
    anime.set('.tl-item', { opacity: 0, scale: .5, translateX: 0, translateY: 0, rotate: 0 });
    A.d3 = anime.timeline({ loop: true, direction: 'alternate', easing: 'easeOutExpo' })
        .add({ targets: '#tl1', opacity: [0, 1], scale: [.3, 1], duration: 550 })
        .add({ targets: '#tl2', opacity: [0, 1], translateX: [40, 0], duration: 550 }, '-=300')
        .add({ targets: '#tl3', opacity: [0, 1], rotate: ['-45deg', '0deg'], duration: 550 }, '-=300')
        .add({ targets: '#tl1', translateX: [-15, 15], rotate: '1turn', duration: 700 }, '+= 150')
        .add({ targets: '#tl2', scale: [1, 1.4, 1], duration: 550 }, '-=550')
        .add({ targets: '#tl3', opacity: [1, 0], translateY: [0, 25], duration: 450 });
    // Real: hero sequence
    stop('d3r');
    anime.set(['.hm-logo', '.hm-h3', '.hm-sub', '.hm-cta'], { opacity: 0, translateY: 16, scale: 1 });
    anime.set('.hm-logo', { scale: .5 });
    A.d3r = anime.timeline({ loop: true, endDelay: 1200, easing: 'easeOutCubic' })
        .add({ targets: '.hm-logo', opacity: [0, 1], scale: [.5, 1], duration: 500 })
        .add({ targets: '.hm-h3', opacity: [0, 1], translateY: [16, 0], duration: 500 }, '-=200')
        .add({ targets: '.hm-sub', opacity: [0, 1], translateY: [12, 0], duration: 400 }, '-=300')
        .add({ targets: '.hm-cta', opacity: [0, 1], translateY: [10, 0], duration: 400 }, '-=200');
};

// 04 Stagger
window.runD4 = function () {
    stop('d4');
    A.d4 = anime({ targets: '.sg-dot', scale: [.5, 1], opacity: [.15, 1], borderRadius: ['6px', '50%', '6px'], easing: 'easeOutElastic(1,.5)', duration: 900, loop: true, direction: 'alternate', delay: anime.stagger(55, { grid: [5, 5], from: 'center' }) });
    // Real: product grid
    stop('d4r');
    anime.set('.prod-card', { opacity: 0, translateY: 20 });
    A.d4r = anime({ targets: '.prod-card', opacity: [0, 1], translateY: [20, 0], easing: 'easeOutCubic', duration: 600, delay: anime.stagger(120), loop: true, endDelay: 1500, direction: 'alternate' });
};

// 05 SVG Path
window.runD5 = function () {
    stop('d5a'); stop('d5b');
    anime.set('#svg-ball', { translateX: 0, translateY: 0 });
    anime.set('#svg-line', { strokeDashoffset: 600 });
    A.d5a = anime({ targets: '#svg-line', strokeDashoffset: [600, 0], easing: 'easeInOutSine', duration: 1800, loop: true, direction: 'alternate' });
    const path = anime.path('#motion-path');
    A.d5b = anime({ targets: '#svg-ball', translateX: path('x'), translateY: path('y'), rotate: path('angle'), easing: 'linear', duration: 1800, loop: true });
    // Real: signature
    stop('d5r');
    anime.set('#sign-path', { strokeDashoffset: 500 });
    A.d5r = anime({ targets: '#sign-path', strokeDashoffset: [500, 0], easing: 'easeInOutSine', duration: 2000, loop: true, direction: 'alternate', endDelay: 400 });
};

// 06 Keyframes
window.runD6 = function () {
    stop('d6');
    A.d6 = anime({
        targets: '#kf-box', keyframes: [
            { translateX: 70, scale: 1.3, borderRadius: '50%', duration: 550, easing: 'easeOutCubic' },
            { translateY: -50, rotate: 90, duration: 450, easing: 'easeInOutQuad' },
            { translateX: 0, rotate: 180, scale: .8, duration: 450, easing: 'easeInOutQuad' },
            { translateY: 0, rotate: 0, scale: 1, borderRadius: '10px', duration: 600, easing: 'easeOutBounce' }
        ], loop: true
    });
    // Real: like button
    stop('d6r');
    const btn = document.getElementById('like-btn');
    let liked = false;
    btn.onclick = function () {
        liked = !liked;
        btn.classList.toggle('liked', liked);
        if (liked) {
            anime({ targets: '#like-btn', scale: [1, .85, 1.2, 1], easing: 'easeOutElastic(1,.3)', duration: 600 });
            // burst hearts
            const container = document.getElementById('hearts');
            for (let i = 0; i < 6; i++) {
                const h = document.createElement('div'); h.className = 'heart-burst'; h.textContent = '❤️'; container.appendChild(h);
                anime({ targets: h, translateX: [0, (Math.random() - .5) * 60], translateY: [0, -40 - Math.random() * 30], opacity: [1, 0], scale: [.5, 1.2], duration: 600 + Math.random() * 300, easing: 'easeOutCubic', complete: () => h.remove() });
            }
        }
    };
};

// 07 Spring
window.runD7 = function () {
    stop('d7');
    A.d7 = anime({ targets: '#sp-ball', translateY: [-80, 0], easing: 'spring(1,120,8,0)', loop: true, delay: 400, endDelay: 200 });
    // Real: toggle
    const tgl = document.getElementById('toggle1');
    const thumb = document.getElementById('thumb1');
    let on = false;
    tgl.onclick = function () {
        on = !on; tgl.classList.toggle('on', on);
        anime({ targets: thumb, left: [on ? '3px' : '23px', on ? '23px' : '3px'], easing: 'spring(1,120,10,0)', duration: 800 });
    };
};

// 08 Morph
const morphs = ['M50 10 L92 35 L92 65 L50 90 L8 65 L8 35 Z', 'M50 5 L61 35 L95 35 L68 57 L79 91 L50 70 L21 91 L32 57 L5 35 L39 35 Z', 'M10 10 L90 10 L90 90 L10 90 Z', 'M50 5 A45 45 0 1 1 49.99 5 Z', 'M50 10 L90 90 L10 90 Z'];
let mi = 0;
window.runD8 = function () {
    stop('d8');
    function nm() { mi = (mi + 1) % morphs.length; A.d8 = anime({ targets: '#morph-path', d: [{ value: morphs[mi] }], easing: 'easeInOutCubic', duration: 900, complete: () => setTimeout(nm, 400) }) }
    nm();
    // Real: hamburger ↔ close
    const hamBtn = document.getElementById('ham-btn');
    const l1 = document.getElementById('hl1'), l2 = document.getElementById('hl2'), l3 = document.getElementById('hl3');
    const hlbl = document.getElementById('ham-lbl');
    let isOpen = false;
    hamBtn.onclick = function () {
        isOpen = !isOpen;
        if (isOpen) {
            anime({ targets: l1, translateY: [0, 6], rotate: [0, 45], easing: 'easeInOutQuad', duration: 300 });
            anime({ targets: l2, opacity: [1, 0], scaleX: [1, 0], easing: 'easeInOutQuad', duration: 200 });
            anime({ targets: l3, translateY: [0, -6], rotate: [0, -45], easing: 'easeInOutQuad', duration: 300 });
            hlbl.textContent = 'クリックで閉じる';
        } else {
            anime({ targets: l1, translateY: [6, 0], rotate: [45, 0], easing: 'easeInOutQuad', duration: 300 });
            anime({ targets: l2, opacity: [0, 1], scaleX: [0, 1], easing: 'easeInOutQuad', duration: 200, delay: 100 });
            anime({ targets: l3, translateY: [-6, 0], rotate: [-45, 0], easing: 'easeInOutQuad', duration: 300 });
            hlbl.textContent = 'クリックで開く';
        }
    };
};

// 09 Text
window.runD9 = function () {
    stop('d9');
    const el = document.getElementById('text-el');
    const txt = 'anime.js で動く！';
    el.innerHTML = txt.split('').map(c => `<span class="l">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    A.d9 = anime({
        targets: '#text-el .l', translateY: [{ value: 40, duration: 0 }, { value: 0, duration: 550, easing: 'easeOutElastic(1,.5)' }], opacity: [{ value: 0, duration: 0 }, { value: 1, duration: 350 }], scale: [{ value: .5, duration: 0 }, { value: 1, duration: 550, easing: 'easeOutBack' }], delay: anime.stagger(50), loop: true, endDelay: 1200,
        complete: () => anime({ targets: '#text-el .l', translateY: [0, -25], opacity: [1, 0], delay: anime.stagger(35), easing: 'easeInCubic', duration: 350 })
    });
    // Real: counter
    stop('d9r');
    const cEl = document.getElementById('counter-num');
    function countUp() { A.d9r = anime({ targets: { v: 0 }, v: 98540, easing: 'easeOutExpo', duration: 2000, round: 1, update: function (a) { cEl.textContent = Math.floor(a.animations[0].currentValue).toLocaleString() }, complete: () => setTimeout(countUp, 1500) }) }
    countUp();
};

// 10 Loop
window.runD10 = function () {
    stop('d10');
    A.d10 = anime({ targets: '.wbar', height: () => [20, anime.random(30, 95)], easing: 'easeInOutSine', duration: () => anime.random(400, 850), loop: true, direction: 'alternate', delay: anime.stagger(45) });
    // Real: skeleton
    stop('d10r');
    A.d10r = anime({ targets: '.sk-line, .sk-avatar, .sk-card', opacity: [.3, 1], easing: 'easeInOutSine', duration: 800, loop: true, direction: 'alternate', delay: anime.stagger(100) });
};

// ══════════════ AUTO-START ON SCROLL ══════════════
const runners = [null, runD1, runD2, runD3, runD4, runD5, runD6, runD7, runD8, runD9, runD10];
const started = new Set();
new IntersectionObserver(es => {
    es.forEach(e => {
        if (e.isIntersecting) { const m = e.target.id.match(/sec-(\d+)/); if (m) { const n = +m[1]; if (!started.has(n) && runners[n]) { runners[n](); started.add(n) } } }
    });
}, { threshold: .35 }).observe.call(
    (() => { const o = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) { const m = e.target.id.match(/sec-(\d+)/); if (m) { const n = +m[1]; if (!started.has(n) && runners[n]) { runners[n](); started.add(n) } } } }) }, { threshold: .35 }); for (let i = 1; i <= 10; i++) { const el = document.getElementById(`sec-${i}`); if (el) o.observe(el) } return o })(), document.body
);
