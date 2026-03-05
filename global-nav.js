/* ══════════════════════════════════════════
   global-nav.js — 全ページ共通ナビゲーション
   ・グローバルナビ注入
   ・ライト/ダークモード切替（localStorage持続）
   ・モバイル ハンバーガーメニュー
   ══════════════════════════════════════════ */
(function () {
    /* ── 現在ページのパスを基準に相対パスを解決 ── */
    function root(path) {
        const depth = location.pathname.split('/').length - 2;
        const prefix = depth > 0 ? '../'.repeat(depth) : './';
        return prefix + path;
    }

    /* ── アクティブリンク判定 ── */
    function isActive(href) {
        const cur = location.pathname.replace(/\/$/, '');
        const target = new URL(href, location.href).pathname.replace(/\/$/, '');
        return cur === target || cur.startsWith(target + '/');
    }

    /* ── ナビHTML ── */
    const links = [
        { label: '30 Demos', href: 'index.html' },
        { label: 'Guides', href: 'guides/timing-easing.html' },
        { label: 'Blog', href: 'blog/index.html' },
        { label: 'FAQ', href: 'faq.html' },
        { label: '更新履歴', href: 'changelog.html' },
    ];
    const rightLinks = [
        { label: '運営者情報', href: 'about.html', cls: 'gn-about' },
        { label: 'お問い合わせ', href: 'contact.html', cls: 'gn-contact' },
    ];

    const navHTML = `
<nav class="global-nav" id="globalNav" aria-label="グローバルナビゲーション">
  <a href="${root('index.html')}" class="gn-logo">anime.js Animations</a>

  <div class="gn-links" id="gnLinks">
    ${links.map(l => {
        const href = root(l.href);
        const active = isActive(href) ? ' class="active"' : '';
        return `<a href="${href}"${active}>${l.label}</a>`;
    }).join('\n    ')}
  </div>

  <div class="gn-right">
    <div class="gn-search-wrap" id="gnSearchWrap" style="display:none">
      <span class="gn-search-icon">🔍</span>
      <input type="text" id="search" placeholder="検索… (例: stagger, SVG)" />
    </div>
    <span class="gn-count" id="count-display" style="display:none">30 / 30</span>
    <button class="gn-theme-btn" id="themeToggle" onclick="window.toggleTheme&&window.toggleTheme()" title="テーマ切り替え">🌙</button>
    ${rightLinks.map(l => `<a href="${root(l.href)}" class="${l.cls}">${l.label}</a>`).join('\n    ')}
    <button class="gn-hamburger" id="gnHamburger" aria-label="メニュー" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- モバイルドロワー -->
<div class="gn-drawer" id="gnDrawer" aria-hidden="true">
  <div class="gn-drawer-inner">
    ${links.map(l => {
        const href = root(l.href);
        const active = isActive(href) ? ' class="active"' : '';
        return `<a href="${href}"${active}>${l.label}</a>`;
    }).join('\n    ')}
    <div class="gn-drawer-divider"></div>
    ${rightLinks.map(l => `<a href="${root(l.href)}">${l.label}</a>`).join('\n    ')}
  </div>
</div>
<div class="gn-overlay" id="gnOverlay"></div>`;

    /* ── bodyの先頭に挿入 ── */
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    /* ── index.htmlの既存static navを除去 ── */
    document.querySelectorAll('.global-nav').forEach((el, i) => {
        if (i > 0) el.remove(); // 2個目以降を削除（重複防止）
    });

    /* ── テーマ初期化 ── */
    const saved = localStorage.getItem('anime-demo-theme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';

    /* ── グローバル toggleTheme（index.jsより先に定義してもOK） ── */
    if (!window.toggleTheme) {
        window.toggleTheme = function () {
            const cur = document.body.getAttribute('data-theme') || 'dark';
            const next = cur === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            const b = document.getElementById('themeToggle');
            if (b) b.textContent = next === 'dark' ? '🌙' : '☀️';
            localStorage.setItem('anime-demo-theme', next);
        };
    }

    /* ── index.html専用: 検索・カウントを表示 ── */
    const isIndex = location.pathname.endsWith('/') || location.pathname.endsWith('index.html') || location.pathname.split('/').pop() === '';
    if (isIndex || location.pathname.endsWith('index.html')) {
        const sw = document.getElementById('gnSearchWrap');
        const cd = document.getElementById('count-display');
        if (sw) sw.style.display = '';
        if (cd) cd.style.display = '';
    }

    /* ── ハンバーガーメニュー ── */
    const ham = document.getElementById('gnHamburger');
    const drawer = document.getElementById('gnDrawer');
    const overlay = document.getElementById('gnOverlay');

    function openDrawer() {
        drawer.classList.add('open');
        overlay.classList.add('open');
        ham.setAttribute('aria-expanded', 'true');
        ham.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        ham.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (ham) ham.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
    if (overlay) overlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
})();
