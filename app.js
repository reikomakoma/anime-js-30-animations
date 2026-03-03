// ══════════════ STAGE BUILDER ══════════════
function buildStage(spec, n) {
  const [t, ...a] = spec.split(' ');
  const g = a[0] || 'g1';
  if (t === 'box') return `<div class="db ${g}"></div>`;
  if (t === 'circle') return `<div class="db dc ${g}"></div>`;
  if (t === 'spinner') return `<div class="spinner" id="spspin${n}"></div>`;
  if (t === 'color') return `<div class="color-box" id="colbox${n}"></div>`;
  if (t === 'br') return `<div class="br-pill" id="brpill${n}">はじめる</div>`;
  if (t === 'multi') return `<div class="db g6" id="multi${n}"></div>`;
  if (t === 'dots') { const c = +a[0] || 3, cl = a[1] || 'g2'; return `<div class="dots-row">${Array(c).fill(`<div class="dot-s ${cl}"></div>`).join('')}</div>`; }
  if (t === 'bars') { const c = +a[0] || 6, cl = a[1] || 'g1'; return `<div class="bars-row">${Array(c).fill(0).map((_, i) => `<div class="bar-s ${cl}" style="height:${20 + i * 8}px"></div>`).join('')}</div>`; }
  if (t === 'grid') { const [r, c] = a[0].split('x').map(Number), cl = a[1] || 'g1'; return `<div class="sg-mini" style="grid-template-columns:repeat(${c},1fr)">${Array(r * c).fill(`<div class="dot-s ${cl} sg-dot"></div>`).join('')}</div>`; }
  if (t === 'tl') return `<div style="display:flex;flex-direction:column;gap:10px;align-items:center">${['g1', 'g2', 'g3'].map((g2, i) => `<div class="db ${g2}" style="opacity:0;transform:scale(.5)" id="tl_${n}_${i}"></div>`).join('')}</div>`;
  if (t === 'svgpath') return `<svg viewBox="0 0 200 100" width="200" height="100" style="overflow:visible"><defs><linearGradient id="sg${n}" x1="0%" y1="0%" x2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><path id="spl${n}" d="M10 50 C50 10,100 90,150 50 C170 10,185 80,200 50" fill="none" stroke="url(#sg${n})" stroke-width="2" stroke-dasharray="500" stroke-dashoffset="500"/><path id="spm${n}" d="M10 50 C50 10,100 90,150 50 C170 10,185 80,200 50" fill="none" stroke="none"/><circle id="spb${n}" cx="0" cy="0" r="7" fill="#f59e0b" style="filter:drop-shadow(0 0 6px #f59e0b)"/></svg>`;
  if (t === 'morph') return `<svg viewBox="0 0 100 100" width="100" height="100" style="overflow:visible"><defs><linearGradient id="mg${n}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#f59e0b"/></linearGradient></defs><path id="mp${n}" d="M50 10 L92 35 L92 65 L50 90 L8 65 L8 35 Z" fill="url(#mg${n})" style="filter:drop-shadow(0 0 8px #ec489966)"/></svg>`;
  if (t === 'svgring2') return `<svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="28" fill="none" stroke="#1e293b" stroke-width="6"/><defs><linearGradient id="rg2${n}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><circle id="svgr2${n}" cx="40" cy="40" r="28" fill="none" stroke="url(#rg2${n})" stroke-width="6" stroke-dasharray="176" stroke-dashoffset="176" stroke-linecap="round" transform="rotate(-90 40 40)"/></svg>`;
  if (t === 'text') return `<div class="db-text" style="font-size:1rem;font-weight:800;letter-spacing:-.03em;color:var(--t)"></div>`;
  return `<div class="db g1"></div>`;
}

// ══════════════ REAL UI TEMPLATES ══════════════
const RP = {
  toast: n => `<div class="rui" style="position:relative;overflow:hidden"><div class="r-bg-app"><div style="width:30px;height:30px;background:#1e293b;border-radius:6px;flex-shrink:0"></div><div style="flex:1;display:flex;flex-direction:column;gap:5px"><div style="height:8px;background:#1e293b;border-radius:3px;width:65%"></div><div style="height:6px;background:#1e3a5f;border-radius:3px;width:40%"></div></div><div style="font-size:.6rem;color:#475569;background:#1e293b;border-radius:6px;padding:3px 8px">保存</div></div><div class="r-toast" style="transform:translateX(120px)"><div class="r-toast-icon" style="background:linear-gradient(135deg,#22c55e,#16a34a);color:#fff">✓</div><div><div style="font-size:.68rem;font-weight:600">カートに追加しました</div><div style="font-size:.58rem;color:#94a3b8">Nike Air Max</div></div></div></div>`,
  sheet: n => `<div class="rui" style="background:#0f172a;border-radius:8px;overflow:hidden;position:relative;height:100%"><div style="padding:.4rem .7rem;font-size:.6rem;color:#475569">アプリ画面</div><div id="bs${n}" style="position:absolute;left:0;right:0;bottom:0;background:#1e293b;border-radius:10px 10px 0 0;padding:.7rem;transform:translateY(100%)"><div style="width:28px;height:3px;background:#475569;border-radius:2px;margin:0 auto .4rem"></div><div style="font-size:.65rem;font-weight:600;margin-bottom:.4rem">シェアする</div><div style="display:flex;gap:.4rem">${['📋コピー', '📸画像', '✉メール'].map(x => `<div style="flex:1;background:#0f172a;border-radius:5px;padding:4px;text-align:center;font-size:.55rem;color:#94a3b8">${x}</div>`).join('')}</div></div></div>`,
  spinner: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;height:100%"><div class="spinner" style="width:36px;height:36px;border:3px solid #1e293b;border-top-color:#7c3aed;border-right-color:#06b6d4;border-radius:50%"></div><div style="font-size:.62rem;color:#94a3b8">データを読み込み中...</div></div>`,
  modal: n => `<div class="rui" style="position:relative;background:#0f172a;border-radius:8px;display:flex;align-items:center;justify-content:center"><div style="position:absolute;top:6px;left:8px;font-size:.58rem;color:#475569">サービス管理画面</div><div id="rmo${n}" style="position:absolute;inset:0;background:#00000060;border-radius:8px;display:flex;align-items:center;justify-content:center;opacity:0"><div id="rmb${n}" style="background:#1e293b;border-radius:10px;padding:.9rem;width:120px;text-align:center;transform:scale(.7)"><div style="font-size:.7rem;font-weight:700;margin-bottom:.3rem">削除しますか?</div><div style="font-size:.58rem;color:#94a3b8;margin-bottom:.5rem">取り消せません</div><button style="width:100%;background:linear-gradient(135deg,#7c3aed,#9333ea);border:none;color:#fff;border-radius:5px;padding:4px;font-size:.6rem;font-weight:600">削除する</button></div></div></div>`,
  fade: n => `<div class="rui" style="background:#0f172a;border-radius:8px;padding:.7rem;display:flex;flex-direction:column;gap:.5rem">${[{ e: '📰', t: '最新ニュース', s: '3分前' }, { e: '📊', t: '売上レポート', s: '本日' }, { e: '🎯', t: '達成率 94%', s: '今週' }].map(x => `<div class="rf-item" style="display:flex;gap:8px;align-items:center;background:#1e293b;border-radius:7px;padding:6px 10px;opacity:0"><div style="font-size:.85rem">${x.e}</div><div style="flex:1;font-size:.65rem;font-weight:600">${x.t}</div><div style="font-size:.58rem;color:#475569">${x.s}</div></div>`).join('')}</div>`,
  like: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.4rem;height:100%"><div style="background:#1e293b;border-radius:10px;padding:.7rem;width:160px"><div style="font-size:.62rem;color:#94a3b8;margin-bottom:.4rem">投稿テキストがここに入ります</div><div style="position:relative"><button class="r-like-btn" style="display:flex;align-items:center;gap:4px;font-size:.68rem">❤ いいね <span style="font-size:.58rem">128</span></button><div id="rh${n}" style="position:absolute;top:-4px;left:30%;pointer-events:none"></div></div></div><div style="font-size:.58rem;color:#475569">← クリックしてみて</div></div>`,
  pill: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.7rem;height:100%"><div style="font-size:.62rem;color:#94a3b8;margin-bottom:.2rem">ホバーで変形するCTAボタン</div>${['登録する', '詳しく見る', '始める'].map(x => `<div class="rp-btn" style="background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;border-radius:6px;padding:5px 16px;font-size:.68rem;font-weight:600;cursor:pointer">${x}</div>`).join('')}</div>`,
  hero: n => `<div class="rui" style="background:#0f172a;border-radius:8px;padding:.7rem"><div id="rhl${n}" style="width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#7c3aed,#06b6d4);margin-bottom:.5rem;opacity:0;transform:scale(.5)"></div><div id="rhh${n}" style="font-size:.85rem;font-weight:800;line-height:1.2;margin-bottom:.25rem;opacity:0;transform:translateY(12px)">次世代AIサービス</div><div id="rhp${n}" style="font-size:.6rem;color:#94a3b8;margin-bottom:.45rem;opacity:0;transform:translateY(8px)">3,000社以上が導入中</div><div id="rhc${n}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#9333ea);color:#fff;border-radius:6px;padding:4px 12px;font-size:.62rem;font-weight:600;opacity:0;transform:translateY(8px)">無料で始める →</div></div>`,
  cards: n => `<div style="width:100%;padding:.3rem"><div class="r-pg">${['👟', '👜', '🕶️', '🧥', '⌚', '💍'].map((e, i) => `<div class="r-pc" style="opacity:0;transform:translateY(15px)"><div class="r-pc-img">${e}</div><div class="r-pc-p">¥${[12800, 8400, 5200, 24000, 38000, 15600][i].toLocaleString()}</div></div>`).join('')}</div></div>`,
  skeleton: n => `<div style="padding:.3rem;width:100%"><div class="r-sk"><div class="r-sk-row"><div class="r-sk-av"></div><div style="flex:1;display:flex;flex-direction:column;gap:4px"><div class="r-sk-l" style="width:70%"></div><div class="r-sk-l" style="width:45%"></div></div></div><div class="r-sk-c"></div><div class="r-sk-l" style="width:90%;margin-top:4px"></div><div class="r-sk-l" style="width:60%;margin-top:3px"></div></div></div>`,
  sign: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;height:100%"><div style="font-size:.58rem;color:#94a3b8">ブランドシグネチャー</div><svg viewBox="0 0 160 60" width="160" height="60"><path id="sgn${n}" d="M8 45 C25 15 42 55 58 30 C74 5 82 55 98 30 C114 10 122 50 140 30" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="320" stroke-dashoffset="320"/></svg></div>`,
  morph: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;height:100%"><div style="background:#1e293b;border-radius:8px;padding:.6rem;width:160px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.4rem"><div style="font-size:.7rem;font-weight:700">MyApp</div><div id="hamBtn${n}" style="display:flex;flex-direction:column;gap:4px;cursor:pointer;padding:5px" onclick=""><div class="ham-l" id="hl1_${n}"></div><div class="ham-l" id="hl2_${n}"></div><div class="ham-l" id="hl3_${n}"></div></div></div><div style="height:28px;background:#0f172a;border-radius:5px"></div></div><div style="font-size:.58rem;color:#475569">← クリックで体験</div></div>`,
  svgring: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.3rem;height:100%"><svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="30" fill="none" stroke="#1e293b" stroke-width="8"/><defs><linearGradient id="rg${n}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient></defs><circle id="svgr${n}" cx="40" cy="40" r="30" fill="none" stroke="url(#rg${n})" stroke-width="8" stroke-dasharray="188" stroke-dashoffset="188" stroke-linecap="round" transform="rotate(-90 40 40)"/></svg><div style="font-size:.8rem;font-weight:700" id="ringpct${n}">0%</div><div style="font-size:.58rem;color:#94a3b8">アップロード完了</div></div>`,
  progress: n => `<div style="padding:.4rem;width:100%;display:flex;flex-direction:column;gap:.4rem"><div style="font-size:.62rem;font-weight:600;margin-bottom:.2rem">📤 ファイルアップロード中</div>${[['image.jpg', 'linear-gradient(90deg,#7c3aed,#9333ea)'], ['video.mp4', 'linear-gradient(90deg,#06b6d4,#0ea5e9)'], ['doc.pdf', 'linear-gradient(90deg,#10b981,#06b6d4)']].map(([f, g], i) => `<div><div style="display:flex;justify-content:space-between;margin-bottom:2px;font-size:.58rem;color:#94a3b8"><span>${f}</span><span id="rpp${n}_${i}">0%</span></div><div style="height:5px;background:#1e293b;border-radius:3px;overflow:hidden"><div id="rpf${n}_${i}" style="height:100%;width:0%;border-radius:3px;background:${g}"></div></div></div>`).join('')}</div>`,
  menu: n => `<div style="padding:.4rem;width:100%"><div style="font-size:.6rem;color:#475569;margin-bottom:.3rem">ナビゲーションメニュー</div>${[['🏠', 'ホーム'], ['📊', 'ダッシュボード'], ['👥', 'ユーザー管理'], ['⚙️', '設定'], ['❓', 'ヘルプ']].map(([e, l]) => `<div class="rmenu-item" style="display:flex;align-items:center;gap:6px;padding:4px 6px;border-radius:6px;opacity:0;font-size:.65rem;color:#94a3b8;transform:translateX(-16px)"><span>${e}</span><span>${l}</span></div>`).join('')}</div>`,
  settings: n => `<div style="background:#1e293b;border-radius:8px;padding:.7rem;width:100%"><div style="font-size:.68rem;font-weight:600;margin-bottom:.5rem">⚙️ 設定</div>${[['プッシュ通知', 'on'], ['ダークモード', 'on'], ['2段階認証', 'off']].map(([k, v], i) => `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 0"><div style="font-size:.62rem;color:#94a3b8">${k}</div><div class="r-tgl ${v === 'on' ? 'on' : ''}" id="rtgl${n}_${i}"style="width:36px;height:20px;border-radius:10px;position:relative;cursor:pointer"><div class="r-tgl-th" style="width:14px;height:14px;top:3px;left:${v === 'on' ? '19' : '3'}px"></div></div></div>`).join('')}</div>`,
  bounce: n => `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;height:100%;width:100%"><div style="background:#1e293b;border-radius:8px;padding:.5rem .7rem;width:90%;font-size:.62rem"><div style="display:flex;gap:6px;margin-bottom:.3rem"><input style="flex:1;background:#0f172a;border:1px solid #334155;border-radius:5px;padding:3px 8px;font-size:.6rem;color:#94a3b8" placeholder="パスワード" disabled/></div></div><div id="errmsg${n}" style="background:#ef444411;border:1px solid #ef444433;border-radius:6px;padding:.4rem .6rem;font-size:.62rem;color:#f87171;width:90%;opacity:0;transform:translateY(-10px)">⚠ パスワードが一致しません</div></div>`,
  counter: n => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;width:100%;padding:.3rem">${[[`cnt0_${n}`, '導入社数', '社'], [`cnt1_${n}`, '月間ユーザー', '人'], [`cnt2_${n}`, '満足度', '★']].slice(0, 2).map(([id, lbl, unit]) => `<div style="background:#1e293b;border-radius:8px;padding:.6rem;text-align:center"><div style="font-size:1.3rem;font-weight:900;background:linear-gradient(135deg,#7c3aed,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent" id="${id}">0</div><div style="font-size:.55rem;color:#94a3b8;margin-top:2px">${lbl}</div></div>`).join('')}<div style="background:#1e293b;border-radius:8px;padding:.6rem;text-align:center;grid-column:1/-1"><div style="font-size:1rem;font-weight:900;background:linear-gradient(135deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent" id="cnt2_${n}">0</div><div style="font-size:.55rem;color:#94a3b8;margin-top:2px">顧客満足度</div></div></div>`,
  typewriter: n => `<div style="display:flex;flex-direction:column;justify-content:center;padding:.5rem;height:100%"><div style="background:#1e293b;border-radius:8px;padding:.6rem"><div style="font-size:.58rem;color:#94a3b8;margin-bottom:.3rem">🤖 AIアシスタント</div><div id="tw${n}" style="font-size:.65rem;color:#f1f5f9;line-height:1.6;min-height:36px"></div></div></div>`,
  htext: n => `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;height:100%"><div id="htxt${n}" style="font-size:1rem;font-weight:800;letter-spacing:-.02em;background:linear-gradient(135deg,#7c3aed,#06b6d4,#f59e0b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-align:center"></div></div>`,
  dropdown: n => `<div style="display:flex;flex-direction:column;justify-content:center;height:100%;width:100%;padding:.4rem"><div style="font-size:.6rem;color:#475569;margin-bottom:.3rem">プラン選択</div><div id="ddtrig${n}" style="background:#1e293b;border-radius:6px;padding:.4rem .6rem;font-size:.65rem;display:flex;justify-content:space-between;align-items:center;cursor:pointer"><span>プランを選択...</span><span id="ddarr${n}" style="display:inline-block;transition:transform .3s">▾</span></div><div id="ddmenu${n}" style="background:#1e293b;border:1px solid #334155;border-radius:6px;margin-top:3px;overflow:hidden;opacity:0;transform:translateY(-8px) scaleY(.8);transform-origin:top;pointer-events:none">${['🆓 フリープラン (¥0)', '⭐ スタンダード (¥980/月)', '💎 プレミアム (¥2,980/月)'].map(x => `<div style="padding:.3rem .6rem;font-size:.6rem;color:#94a3b8;border-bottom:1px solid #0f172a;cursor:pointer">${x}</div>`).join('')}</div></div>`,
};

// ══════════════ CARD RENDERER ══════════════
window.switchTab = function (btn, showId, hideId) {
  const tabs = btn.parentElement.querySelectorAll('.ac-tab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(showId + '_wrap').style.display = 'flex';
  document.getElementById(hideId + '_wrap').style.display = 'none';
};

function buildCard(d) {
  const cat = CATS[d.cat];
  const stageHTML = buildStage(d.stage || 'box g1', d.id);
  const realHTML = RP[d.real] ? RP[d.real](d.id) : `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#1e293b;font-size:.8rem">実装中</div>`;
  const summary = d.desc.split('。')[0] + '。';

  return `<div class="anim-card" id="card${d.id}" data-cat="${d.cat}" data-search="${d.title} ${d.en} ${(d.tags || []).join(' ')}">
    <div class="ac-decorator bg-${cat.cls.replace('badge-', '')}"></div>

    <div class="ac-header">
      <div class="ac-header-top">
        <span class="ac-index">${String(d.id).padStart(2, '0')} / 30</span>
        <span class="ac-cat ${cat.cls}">${cat.l}</span>
      </div>
      <h2 class="ac-title">${d.en}</h2>
      <div class="ac-subtitle">${d.title}</div>
      <p class="ac-summary">${summary}</p>
    </div>

    <div class="ac-body">
      <div class="ac-left">
        <p class="ac-desc">${d.desc}</p>
        <div class="ac-tags">${(d.tags || []).map(t => `<span class="ac-tag">#${t}</span>`).join('')}</div>
        
        <div class="ac-code-wrap">
          <div class="ac-code-hdr">
            <span>anime.js</span>
            <button class="ac-copy-btn" onclick="navigator.clipboard.writeText(this.nextElementSibling.innerText);this.innerText='Copied!';setTimeout(()=>this.innerText='Copy',2000)">Copy</button>
            <div style="display:none" class="raw-code">${d.code || ''}</div>
          </div>
          <div class="ac-code-content">${formatCode(d.code || '')}</div>
        </div>
      </div>

      <div class="ac-right">
        <div class="ac-demo-tabs">
          <button class="ac-tab active" onclick="switchTab(this, 's${d.id}', 'r${d.id}')">Motion Demo</button>
          <button class="ac-tab" onclick="switchTab(this, 'r${d.id}', 's${d.id}')">UI Example</button>
        </div>
        <div class="ac-demo-area">
          <div class="ac-demo-wrap active-wrap" id="s${d.id}_wrap">
            <div class="stage" id="s${d.id}">${stageHTML}</div>
          </div>
          <div class="ac-demo-wrap" id="r${d.id}_wrap" style="display:none;">
            <div class="rp-stage" id="r${d.id}">${realHTML}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="ac-footer">
      <div class="ac-tip">${d.tip ? `💡 ${d.tip}` : ''}</div>
      <button class="ac-play-btn" onclick="runDemo(${d.id})">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right:4px"><path d="M8 5v14l11-7z"/></svg> Play
      </button>
    </div>
  </div>`;
}


function formatCode(c) {
  return c.replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/('.*?'|".*?")/g, '<span class="cs">$1</span>')
    .replace(/\b(anime|const|let|var|function|return|if|true|false|new)\b/g, '<span class="ck">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="cv">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="cc">$1</span>');
}

// ══════════════ TOGGLE ══════════════
const expanded = new Set();
window.toggleCard = function (n) {
  const detail = document.getElementById('detail' + n);
  const btn = document.getElementById('expbtn' + n);
  const isOpen = expanded.has(n);
  if (isOpen) { detail.style.display = 'none'; btn.classList.remove('open'); expanded.delete(n); }
  else { detail.style.display = 'block'; btn.classList.add('open'); expanded.add(n); }
};

// ══════════════ RENDER ══════════════
let activeCat = 'all';
function render(q = '') {
  const grid = document.getElementById('grid');
  const filtered = DEMOS.filter(d => {
    const matchCat = activeCat === 'all' || d.cat === activeCat;
    const matchQ = !q || (d.title + d.en + (d.tags || []).join(' ')).toLowerCase().includes(q.toLowerCase());
    return matchCat && matchQ;
  });

  grid.innerHTML = filtered.length ? filtered.map(buildCard).join('') : `<div class="no-result">「${q}」に一致するアニメーションが見つかりません 🔍</div>`;
  document.getElementById('count-display').textContent = `${filtered.length} / ${DEMOS.length}`;

  // 出現アニメーション (Apple風の静かなフェード)
  if (filtered.length) {
    anime({
      targets: '.anim-card',
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 500,
      delay: anime.stagger(40),
      easing: 'easeOutCubic'
    });
  }

  filtered.forEach(d => {
    const stage = document.getElementById('s' + d.id);
    if (stage) observer.observe(stage);
  });
}

// ══════════════ NAVIGATION LOGIC ══════════════
function updateNavIndicator(btn, immediate = false) {
  const indicator = document.getElementById('navActiveBg');
  if (!indicator || !btn) return;

  const rect = btn.getBoundingClientRect();
  const parentRect = btn.parentElement.getBoundingClientRect();
  const left = btn.offsetLeft;
  const width = btn.offsetWidth;

  anime({
    targets: indicator,
    left: left,
    width: width,
    duration: immediate ? 0 : 450,
    easing: 'spring(1, 80, 13, 0)'
  });
}

// ══════════════ AUTO-PLAY ══════════════
const played = new Set();
const playedReal = new Set();
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const m = e.target.id.match(/^s(\d+)$/);
      if (m) {
        const n = +m[1];
        if (!played.has(n)) { played.add(n); const d = DEMOS.find(x => x.id === n); if (d && d.run) try { d.run(n); } catch (err) { console.warn('run error', n, err); } }
        if (!playedReal.has(n)) { playedReal.add(n); const d = DEMOS.find(x => x.id === n); if (d && d.realRun) setTimeout(() => { try { d.realRun(n); } catch (err) { console.warn('realRun error', n, err); } }, 200); }
      }
    }
  });
}, { threshold: .3 });

// ══════════════ SEARCH & FILTER ══════════════
document.getElementById('search').addEventListener('input', e => render(e.target.value));
document.querySelectorAll('.pill').forEach(btn => {
  btn.addEventListener('click', () => {
    // アクティブ切り替え
    document.querySelectorAll('.pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;

    updateNavIndicator(btn);

    // スムーズスクロール
    const navPos = document.querySelector('.nav-container-wrapper').offsetTop;
    window.scrollTo({ top: navPos - 20, behavior: 'smooth' });

    // モバイル: 選択されたチップを中央へ
    btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

    render(document.getElementById('search').value);
  });
});

// ══════════════ INIT ══════════════
window.addEventListener('load', () => {
  const activePill = document.querySelector('.pill.active');
  if (activePill) updateNavIndicator(activePill, true);
  render();
});

// ══════════════ RUN DEMO (再生ボタン) ══════════════
window.runDemo = function (n) {
  const d = DEMOS.find(x => x.id === n);
  if (!d) return;
  if (d.run) { try { d.run(n); } catch (e) { } }
  if (d.realRun) { setTimeout(() => { try { d.realRun(n); } catch (e) { } }, 100); }
  // 再生済みにマーク
  played.add(n); playedReal.add(n);
};

// ══════════════ HERO STARS / SKY ─ Dual Mode ══════════════
function initStars() {
  const c = document.getElementById('starCanvas');
  if (!c) { setTimeout(initStars, 100); return; }
  const ctx = c.getContext('2d');
  const hero = document.getElementById('hero');

  function resize() {
    const w = hero ? hero.offsetWidth : window.innerWidth;
    const h = hero ? hero.offsetHeight : window.innerHeight;
    c.width = w || window.innerWidth;
    c.height = h || window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const isLight = () => document.body.getAttribute('data-theme') === 'light';

  // ══ DARK MODE: 夜空 ══
  const makeStar = (layer) => {
    const cfgs = [
      { rMin: 0.15, rMax: 0.6, oMax: 0.30, speed: 0.001, colors: ['255,255,255', '200,220,255', '255,240,220'] },
      { rMin: 0.4, rMax: 1.2, oMax: 0.60, speed: 0.003, colors: ['255,255,255', '180,210,255', '255,210,150', '200,255,230', '255,180,220'] },
      { rMin: 0.8, rMax: 2.4, oMax: 1.0, speed: 0.005, colors: ['255,255,255', '220,240,255', '255,200,120', '160,255,220', '220,180,255'] },
    ];
    const cfg = cfgs[layer];
    const col = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
    const o = Math.random() * cfg.oMax * 0.55 + 0.05;
    return { x: Math.random(), y: Math.random(), r: Math.random() * (cfg.rMax - cfg.rMin) + cfg.rMin, baseO: o, col, layer, phase: Math.random() * Math.PI * 2, freq: Math.random() * 0.025 + 0.004, sparkle: layer === 2 && Math.random() < 0.45 };
  };
  const stars = [...Array.from({ length: 150 }, () => makeStar(0)), ...Array.from({ length: 110 }, () => makeStar(1)), ...Array.from({ length: 65 }, () => makeStar(2))];
  const nebulae = [
    { x: 0.12, y: 0.20, rx: 0.32, ry: 0.22, color: '100,0,200', o: 0.13 },
    { x: 0.80, y: 0.55, rx: 0.26, ry: 0.20, color: '0,100,220', o: 0.11 },
    { x: 0.48, y: 0.82, rx: 0.38, ry: 0.14, color: '0,160,140', o: 0.09 },
    { x: 0.88, y: 0.18, rx: 0.22, ry: 0.18, color: '180,40,100', o: 0.10 },
    { x: 0.28, y: 0.68, rx: 0.25, ry: 0.18, color: '30,80,220', o: 0.10 },
    { x: 0.60, y: 0.30, rx: 0.20, ry: 0.16, color: '200,80,255', o: 0.08 },
  ];
  const auroras = Array.from({ length: 4 }, (_, i) => ({ hue: [260, 180, 320, 200][i], baseY: [0.15, 0.30, 0.55, 0.70][i], amp: Math.random() * 0.06 + 0.04, freq: Math.random() * 0.0008 + 0.0003, phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.003 + 0.001, width: Math.random() * 0.06 + 0.02, alpha: Math.random() * 0.04 + 0.02 }));
  const dust = Array.from({ length: 60 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0002, vy: (Math.random() - 0.5) * 0.0001, r: Math.random() * 0.8 + 0.2, o: Math.random() * 0.15 + 0.03, col: ['180,160,255', '160,220,255', '255,200,180'][Math.floor(Math.random() * 3)] }));
  const shootingStars = [];
  let shootTimer = 0;
  const SHOOT_INTERVAL = 140;

  function spawnShooting() {
    const colors = [['255,255,255', '180,220,255'], ['255,220,180', '255,160,100'], ['180,255,220', '100,255,200'], ['220,180,255', '180,100,255']];
    const [headCol, tailCol] = colors[Math.floor(Math.random() * colors.length)];
    const angle = (Math.random() * 35 + 10) * Math.PI / 180;
    const len = Math.random() * 220 + 150;
    const speed = Math.random() * 7 + 6;
    shootingStars.push({ x: Math.random() * 0.65 + 0.05, y: Math.random() * 0.45, angle, len, speed, life: 0, maxLife: len / speed + 25, headCol, tailCol, particles: [] });
  }

  function drawCross(x, y, size, alpha, col) {
    [0, Math.PI / 2].forEach(angle => {
      const grad = ctx.createLinearGradient(x - Math.cos(angle) * size, y - Math.sin(angle) * size, x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      grad.addColorStop(0, `rgba(${col},0)`); grad.addColorStop(0.5, `rgba(${col},${(alpha * 0.6).toFixed(3)})`); grad.addColorStop(1, `rgba(${col},0)`);
      ctx.save(); ctx.globalAlpha = alpha * 0.7;
      ctx.beginPath(); ctx.moveTo(x - Math.cos(angle) * size, y - Math.sin(angle) * size); ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
      ctx.strokeStyle = grad; ctx.lineWidth = 0.8; ctx.stroke(); ctx.restore();
    });
  }

  function drawDarkFrame() {
    auroras.forEach(a => {
      a.phase += a.speed;
      for (let x = 0; x <= c.width; x += 3) {
        const waveY = (a.baseY + Math.sin(x * a.freq + a.phase) * a.amp) * c.height;
        const pulse = (Math.sin(frame * 0.012 + a.phase) * 0.5 + 0.5);
        const alpha = a.alpha * pulse * (0.6 + 0.4 * Math.sin(x * 0.002 + a.phase));
        const bandH = a.width * c.height;
        const grad = ctx.createLinearGradient(x, waveY - bandH, x, waveY + bandH);
        grad.addColorStop(0, `hsla(${a.hue},100%,70%,0)`); grad.addColorStop(0.5, `hsla(${a.hue + 20},100%,80%,${alpha.toFixed(3)})`); grad.addColorStop(1, `hsla(${a.hue},100%,70%,0)`);
        ctx.fillStyle = grad; ctx.fillRect(x, waveY - bandH, 4, bandH * 2);
      }
    });
    nebulae.forEach(n => {
      const pulse = 0.85 + 0.15 * Math.sin(frame * 0.008 + n.x * 10);
      const grd = ctx.createRadialGradient(n.x * c.width, n.y * c.height, 0, n.x * c.width, n.y * c.height, n.rx * c.width * pulse);
      grd.addColorStop(0, `rgba(${n.color},${n.o})`); grd.addColorStop(1, `rgba(${n.color},0)`);
      ctx.save(); ctx.scale(1, n.ry / n.rx); ctx.beginPath(); ctx.arc(n.x * c.width, n.y * c.height * n.rx / n.ry, n.rx * c.width * pulse, 0, Math.PI * 2); ctx.fillStyle = grd; ctx.fill(); ctx.restore();
    });
    dust.forEach(d => { d.x += d.vx; d.y += d.vy; if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0; if (d.y < 0) d.y = 1; if (d.y > 1) d.y = 0; ctx.beginPath(); ctx.arc(d.x * c.width, d.y * c.height, d.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${d.col},${d.o})`; ctx.fill(); });
    stars.forEach(s => {
      s.phase += s.freq;
      const flicker = Math.sin(s.phase) * 0.5 + 0.5;
      const alpha = Math.max(0.02, s.baseO * (0.35 + 0.65 * flicker));
      if (s.r > 1.0) { const glowR = s.r * (s.sparkle ? 8 : 5); const glow = ctx.createRadialGradient(s.x * c.width, s.y * c.height, 0, s.x * c.width, s.y * c.height, glowR); glow.addColorStop(0, `rgba(${s.col},${(alpha * 0.45).toFixed(3)})`); glow.addColorStop(1, `rgba(${s.col},0)`); ctx.beginPath(); ctx.arc(s.x * c.width, s.y * c.height, glowR, 0, Math.PI * 2); ctx.fillStyle = glow; ctx.fill(); }
      if (s.sparkle) drawCross(s.x * c.width, s.y * c.height, s.r * (6 + 4 * flicker), alpha, s.col);
      ctx.beginPath(); ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${s.col},${alpha.toFixed(3)})`; ctx.fill();
    });
    shootTimer++;
    if (shootTimer >= SHOOT_INTERVAL && shootingStars.length < 3) { shootTimer = 0; spawnShooting(); if (Math.random() < 0.25) setTimeout(spawnShooting, 400); }
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i]; s.life++;
      const progress = s.life / s.maxLife; if (progress >= 1) { shootingStars.splice(i, 1); continue; }
      const tailProgress = Math.min(1, progress * 2.0);
      const px = (s.x + Math.cos(s.angle) * (s.speed * s.life / c.width)) * c.width;
      const py = (s.y + Math.sin(s.angle) * (s.speed * s.life / c.height)) * c.height;
      const tx = px - Math.cos(s.angle) * s.len * tailProgress; const ty = py - Math.sin(s.angle) * s.len * tailProgress;
      const alpha = Math.sin(progress * Math.PI);
      const grad = ctx.createLinearGradient(tx, ty, px, py);
      grad.addColorStop(0, `rgba(${s.tailCol},0)`); grad.addColorStop(0.85, `rgba(${s.headCol},${(alpha * 0.8).toFixed(2)})`); grad.addColorStop(1, `rgba(255,255,255,${alpha.toFixed(2)})`);
      ctx.save(); ctx.shadowBlur = 12; ctx.shadowColor = `rgba(${s.headCol},0.9)`; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(px, py); ctx.strokeStyle = grad; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      if (s.life % 3 === 0 && alpha > 0.3) s.particles.push({ x: px, y: py, vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5, life: 0, maxLife: 18 + Math.random() * 12, r: Math.random() * 1.5 + 0.5, col: s.headCol });
      s.particles = s.particles.filter(p => { p.life++; p.x += p.vx; p.y += p.vy; const pa = (1 - p.life / p.maxLife) * alpha * 0.7; if (pa <= 0) return false; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.col},${pa.toFixed(3)})`; ctx.fill(); return p.life < p.maxLife; });
    }
  }

  // ══ LIGHT MODE: 晴れ空 ══
  const clouds = Array.from({ length: 9 }, (_, i) => ({
    x: Math.random(),
    y: Math.random() * 0.65,
    rx: Math.random() * 0.12 + 0.06,
    ry: Math.random() * 0.055 + 0.025,
    speed: Math.random() * 0.00012 + 0.00004,
    alpha: Math.random() * 0.45 + 0.25,
    puffs: Array.from({ length: Math.floor(Math.random() * 4) + 3 }, () => ({ ox: (Math.random() - 0.5) * 0.8, oy: (Math.random() - 0.5) * 0.5, rs: Math.random() * 0.5 + 0.6 })),
  }));
  const motes = Array.from({ length: 55 }, () => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00015,
    vy: -Math.random() * 0.00018 - 0.00005,
    r: Math.random() * 2.5 + 0.6,
    alpha: Math.random() * 0.35 + 0.08,
    phase: Math.random() * Math.PI * 2,
    freq: Math.random() * 0.012 + 0.004,
  }));
  const birds = Array.from({ length: 7 }, () => ({
    x: Math.random(),
    y: Math.random() * 0.55 + 0.05,
    speed: Math.random() * 0.0006 + 0.0003,
    size: Math.random() * 5 + 4,
    flapPhase: Math.random() * Math.PI * 2,
    flapSpeed: Math.random() * 0.08 + 0.05,
  }));

  function drawLightFrame() {
    // 空グラデーション
    const skyGrad = ctx.createLinearGradient(0, 0, 0, c.height);
    skyGrad.addColorStop(0, 'rgba(135,206,250,0.55)');
    skyGrad.addColorStop(0.5, 'rgba(176,224,240,0.25)');
    skyGrad.addColorStop(1, 'rgba(220,240,255,0.05)');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, c.width, c.height);

    // 雲
    clouds.forEach(cl => {
      cl.x += cl.speed;
      if (cl.x > 1.2) cl.x = -0.15;
      cl.puffs.forEach(p => {
        const px = (cl.x + p.ox * cl.rx) * c.width;
        const py = (cl.y + p.oy * cl.ry) * c.height;
        const pr = cl.rx * c.width * p.rs * 0.55;
        const grd = ctx.createRadialGradient(px, py, 0, px, py, pr);
        grd.addColorStop(0, `rgba(255,255,255,${cl.alpha})`);
        grd.addColorStop(0.6, `rgba(240,248,255,${(cl.alpha * 0.5).toFixed(2)})`);
        grd.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.beginPath();
        ctx.ellipse(px, py, pr, pr * 0.62, 0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
    });

    // 光の粒（ほこり・コナユキ感）
    motes.forEach(m => {
      m.x += m.vx; m.y += m.vy;
      m.phase += m.freq;
      if (m.y < -0.02) m.y = 1.02;
      if (m.x < 0) m.x = 1; if (m.x > 1) m.x = 0;
      const flicker = Math.sin(m.phase) * 0.4 + 0.6;
      const a = m.alpha * flicker;
      const grd = ctx.createRadialGradient(m.x * c.width, m.y * c.height, 0, m.x * c.width, m.y * c.height, m.r * 2.5);
      grd.addColorStop(0, `rgba(255,255,255,${a.toFixed(2)})`);
      grd.addColorStop(1, `rgba(200,230,255,0)`);
      ctx.beginPath();
      ctx.arc(m.x * c.width, m.y * c.height, m.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });

    // 鳥（V字シルエット）
    birds.forEach(b => {
      b.x += b.speed;
      b.flapPhase += b.flapSpeed;
      if (b.x > 1.1) b.x = -0.05;
      const bx = b.x * c.width;
      const by = b.y * c.height;
      const flap = Math.sin(b.flapPhase) * b.size * 0.45;
      ctx.save();
      ctx.strokeStyle = 'rgba(80,120,160,0.45)';
      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bx - b.size, by - flap);
      ctx.quadraticCurveTo(bx, by + flap * 0.5, bx + b.size, by - flap);
      ctx.stroke();
      ctx.restore();
    });

    // 太陽の光芒（右上）
    const sunX = c.width * 0.92;
    const sunY = c.height * 0.08;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, c.width * 0.28);
    sunGlow.addColorStop(0, `rgba(255,240,180,${0.18 + 0.06 * Math.sin(frame * 0.015)})`);
    sunGlow.addColorStop(0.4, `rgba(255,220,120,0.06)`);
    sunGlow.addColorStop(1, 'rgba(255,200,80,0)');
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, c.width, c.height);
  }

  let frame = 0;
  function tick() {
    ctx.clearRect(0, 0, c.width, c.height);
    if (isLight()) {
      drawLightFrame();
    } else {
      drawDarkFrame();
    }
    frame++;
    requestAnimationFrame(tick);
  }

  shootTimer = SHOOT_INTERVAL - 60;
  tick();
}

initStars();


// ══════════════ HERO ANIMATIONS ══════════════
function initHeroAnimations() {
  // ── 文字分割ユーティリティ ──
  function splitChars(el, extraClass = '') {
    const text = el.textContent;
    el.innerHTML = [...text].map(ch =>
      `<span class="hc${extraClass ? ' ' + extraClass : ''}" style="display:inline-block;opacity:0;transform:translateY(40px) scale(0.7)">${ch === ' ' ? '&nbsp;' : ch}</span>`
    ).join('');
    return el.querySelectorAll('.hc');
  }

  // ── 要素取得 ──
  const badge = document.querySelector('.hero-badge');
  const heroH = document.querySelector('.hero-h');
  const heroHl = document.querySelector('.hero-hl');
  const heroSub = document.querySelector('.hero-sub');
  const scroll = document.querySelector('.hero-scroll');
  if (!badge || !heroH) return;

  // ── タイトル1行目（アニメーション）を文字分割 ──
  // heroH の firstChild（テキストノード「アニメーション」）を span に変換
  const line1Node = heroH.firstChild;
  const line1Text = line1Node ? line1Node.textContent.trim() : '';
  if (line1Node && line1Node.nodeType === 3) {
    const wrapper = document.createElement('span');
    wrapper.className = 'hero-line1';
    line1Node.replaceWith(wrapper);
    wrapper.innerHTML = [...line1Text].map(ch =>
      `<span class="hc" style="display:inline-block;opacity:0;transform:translateY(20px)">${ch}</span>`
    ).join('');
  }

  // ── タイトル2行目（グラデーション）を文字分割 ──
  if (heroHl) {
    const hl2Text = heroHl.textContent;
    heroHl.innerHTML = [...hl2Text].map(ch =>
      `<span class="hc hc-hl" style="display:inline-block;opacity:0;transform:translateY(40px) scale(0.5)">${ch}</span>`
    ).join('');
  }

  // バッジ・スクロールを初期非表示
  if (badge) { badge.style.opacity = '0'; badge.style.transform = 'translateY(-20px)'; }
  if (scroll) { scroll.style.opacity = '0'; }

  // ── Timeline アニメーション ──
  const tl = anime.timeline({ easing: 'easeOutExpo' });

  // 1. バッジ: 宇宙から降ってくる
  tl.add({
    targets: badge,
    opacity: [0, 1],
    translateY: [-24, 0],
    duration: 700,
    easing: 'easeOutBack',
  }, 200);

  // 2. タイトル1行目: Apple風フェードイン＋スケールアップ
  tl.add({
    targets: '.hero-line1 .hc',
    opacity: [0, 1],
    translateY: [20, 0],
    scale: [0.95, 1],
    duration: 800,
    delay: anime.stagger(40, { easing: 'easeOutCubic' }),
    easing: 'easeOutCubic',
  }, 600);

  // 3. タイトル2行目（グラデーション）: 光が広がるように出現
  tl.add({
    targets: '.hc-hl',
    opacity: [0, 1],
    translateY: [35, 0],
    scale: [0.4, 1],
    duration: 650,
    delay: anime.stagger(45, { easing: 'easeOutSine' }),
    easing: 'easeOutElastic(1, .7)',
  }, 950);

  // 4. サブテキスト: フェードイン
  if (heroSub) {
    heroSub.style.opacity = '0';
    heroSub.style.transform = 'translateY(20px)';
    tl.add({
      targets: heroSub,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      easing: 'easeOutCubic',
    }, 1400);
  }

  // 5. スクロールインジケーター
  if (scroll) {
    tl.add({
      targets: scroll,
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutSine',
    }, 1900);
  }

  // ── ループアニメーション ──

  // グラデーションテキストの発光パルス
  if (heroHl) {
    // background-size を変化させてシマーエフェクト
    anime({
      targets: heroHl,
      backgroundSize: ['200% 100%', '400% 100%', '200% 100%'],
      backgroundPositionX: ['0%', '100%', '0%'],
      duration: 4000,
      loop: true,
      easing: 'easeInOutSine',
    });
  }

  // ヒーローコンテンツの微細な浮遊
  const content = document.querySelector('.hero-content');
  if (content) {
    anime({
      targets: content,
      translateY: [0, -10, 0],
      duration: 6000,
      loop: true,
      easing: 'easeInOutSine',
      delay: 2000,
    });
  }

  // バッジのきらめきパルス
  if (badge) {
    anime({
      targets: badge,
      boxShadow: [
        '0 0 0px rgba(6,182,212,0)',
        '0 0 18px rgba(6,182,212,0.5)',
        '0 0 0px rgba(6,182,212,0)',
      ],
      borderColor: [
        'rgba(6,182,212,0.18)',
        'rgba(6,182,212,0.6)',
        'rgba(6,182,212,0.18)',
      ],
      duration: 2800,
      loop: true,
      easing: 'easeInOutSine',
      delay: 2500,
    });
  }
}

initHeroAnimations();


// ══════════════ THEME TOGGLE ══════════════
const LIGHT_COLORS = [
  ['background:#0f172a', 'background:#f8fafc'],
  ['background:#1e293b', 'background:#ffffff'],
  ['background:#0a0a14', 'background:#f5f5f8'],
  ['background:#0b0b18', 'background:#f5f5fa'],
  ['background:#0b0b17', 'background:#f5f5fa'],
  ['background:#0a1020', 'background:#edf5fe'],
  ['background:#09121e', 'background:#ecf4fe'],
  ['background:#1a1a2e', 'background:#f0f0f8'],
  ['background:#334155', 'background:#e8ecf0'],
  ['background:#1e3a5f', 'background:#d8eeff'],
  ['background:#0f0f1d', 'background:#f2f2f8'],
  ['background:#0f0f26', 'background:#f4f2ff'],
  ['color:#f1f5f9', 'color:#1a1a2e'],
  ['color:#94a3b8', 'color:#6a7280'],
  ['color:#475569', 'color:#5a6580'],
  ['color:#64748b', 'color:#7a8898'],
  ['color:#f87171', 'color:#dc2626'],
  ['border:1px solid #334155', 'border:1px solid #d0d8e4'],
  ['border: 1px solid #334155', 'border: 1px solid #d0d8e4'],
  ['border:1px solid #1e293b', 'border:1px solid #e0e8f0'],
];

function lightifyRealUI() {
  document.querySelectorAll('.rp-stage [style]').forEach(el => {
    let s = el.getAttribute('style');
    for (const [d, l] of LIGHT_COLORS) s = s.split(d).join(l);
    el.setAttribute('style', s);
  });
}

window.toggleTheme = function () {
  const cur = document.body.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('anime-demo-theme', next);
  played.clear(); playedReal.clear();
  render(document.getElementById('search').value);
  if (next === 'light') setTimeout(lightifyRealUI, 60);
};

(function () {
  const saved = localStorage.getItem('anime-demo-theme') || 'dark';
  document.body.setAttribute('data-theme', saved);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = saved === 'dark' ? '🌙' : '☀️';
  if (saved === 'light') setTimeout(lightifyRealUI, 120);
})();

// ══════════════ BACK TO TOP ══════════════
window.addEventListener('scroll', () => {
  const b2t = document.getElementById('backToTop');
  if (b2t) {
    if (window.scrollY > 500) {
      b2t.classList.add('visible');
    } else {
      b2t.classList.remove('visible');
    }
  }
});
