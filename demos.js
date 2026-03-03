const $s = (n, q) => document.querySelector(`#s${n} ${q}`);
const $r = (n, q) => document.querySelector(`#r${n} ${q}`);
const $$r = (n, q) => [...document.querySelectorAll(`#r${n} ${q}`)];

const CATS = {
    basic: { l: '🔧 基本変形', cls: 'badge-basic' },
    ease: { l: '⚡ イージング', cls: 'badge-ease' },
    timing: { l: '⏱️ タイミング', cls: 'badge-timing' },
    svg: { l: '✏️ SVG', cls: 'badge-svg' },
    text: { l: '💬 テキスト', cls: 'badge-text' },
    ui: { l: '🎛️ UIパーツ', cls: 'badge-ui' },
};

const DEMOS = [
    // ═══════════════ 🔧 基本変形 ═══════════════
    {
        id: 1, cat: 'basic', title: '平行移動', en: 'Translate X/Y', tags: ['translateX', 'translateY'],
        stage: 'box g1', real: 'toast',
        desc: 'X・Y軸方向に要素をスライドさせる基本操作です。CSSのtransformプロパティと同等であるためGPUアクセラレーションが有効になり、カクつきのない滑らかな描画が保証されます。DOMのレイアウト計算を発生させないため、パフォーマンス要件が厳しい箇所での移動アニメーションに絶対の推奨とされています。',
        code: `anime({\n  targets: '#el',\n  translateX: [0, 200],\n  duration: 1000,\n  direction: 'alternate',\n  loop: true\n});`,
        tip: '💡 【実践事例】ECサイトでの「カートに追加完了」のトースト通知や、画面外からのナビゲーションメニューのドロワー（引き出し）UIに最適です。ユーザーの視線を自然に新しい要素へ誘導する効果があります。',
        run(n) { anime({ targets: $s(n, '.db'), translateX: [0, 90], loop: true, direction: 'alternate', easing: 'easeInOutQuad', duration: 900 }) },
        realRun(n) {
            anime.set($r(n, '.r-toast'), { translateX: 120 });
            anime({ targets: $r(n, '.r-toast'), translateX: [120, 0], easing: 'easeOutQuart', duration: 550, loop: true, direction: 'alternate', endDelay: 1800 });
        }
    },

    {
        id: 2, cat: 'basic', title: '縦移動', en: 'Translate Y', tags: ['translateY', 'slideUp', 'bottomSheet'],
        stage: 'box g2', real: 'sheet',
        desc: '要素をY軸方向へ平行移動させます。値にマイナスを指定すれば上へ、プラスなら下へ移動します。画面下部からせり上がる動きは「ユーザーの現在の文脈（見ているページ）を維持しつつ、一時的なアクションを要求する」UIデザインにおいて非常に強力なパターンです。',
        code: `anime({\n  targets: '#sheet',\n  translateY: [200, 0], // 下から上へ\n  easing: 'easeOutCubic',\n  duration: 600\n});`,
        tip: '💡 【実践事例】スマホアプリに代表される「シェアする」「フィルター設定」「詳細なアクションメニュー」などを提供するボトムシート（Bottom Sheet）の実装に欠かせません。',
        run(n) { anime({ targets: $s(n, '.db'), translateY: [0, -55], loop: true, direction: 'alternate', easing: 'easeInOutQuad', duration: 900 }) },
        realRun(n) {
            anime.set($r(n, '#bs' + n), { translateY: 100 });
            anime({ targets: $r(n, '#bs' + n), translateY: [100, 0], easing: 'easeOutCubic', duration: 550, loop: true, direction: 'alternate', endDelay: 1800 });
        }
    },

    {
        id: 3, cat: 'basic', title: '回転', en: 'Rotate', tags: ['rotate', 'spin', 'turn'],
        stage: 'spinner 3', real: 'spinner',
        desc: '要素の中心点を軸として回転させます。アニメーションの単位として度数（"360deg"）やラジアン（"2PI"）、あるいは回転数（"1turn"）を直接指定できるのが特徴です。「loop: true」と組み合わせることで無限回転するローダー（待ち時間表示）をCSSのみよりも簡単に、かつ細かなイージング付きで作ることができます。',
        code: `anime({\n  targets: '#spinner',\n  rotate: '1turn',\n  duration: 1200,\n  easing: 'linear',\n  loop: true\n});`,
        tip: '💡 【実践事例】API通信中の非同期処理を待つ間のローディングインジケーターや、画像のアップロード中の進捗スピナーとして、ユーザーに「処理が進行中であること」を伝えるために使用します。',
        run(n) { anime({ targets: $s(n, '.spinner'), rotate: '1turn', loop: true, easing: 'linear', duration: 900 }) },
        realRun(n) { anime({ targets: $r(n, '.spinner'), rotate: '1turn', loop: true, easing: 'linear', duration: 1000 }) }
    },

    {
        id: 4, cat: 'basic', title: '拡大縮小', en: 'Scale', tags: ['scale', 'zoom', 'popup'],
        stage: 'box g1', real: 'modal',
        desc: '要素のスケール（大きさ）を比率で変更します。配列 `[0.8, 1]` のように開始値と終了値を配列で渡すことで、「少し小さめの状態から元のサイズへ弾けるように現れる」ポップアップ演出が作れます。opacity（透明度）のアニメーションと組み合わせるのが現代のモダンUIの基本です。',
        code: `anime({\n  targets: '#modal',\n  scale: [0.8, 1],\n  opacity: [0, 1],\n  easing: 'easeOutBack',\n  duration: 400\n});`,
        tip: '💡 【実践事例】重要な確認を求めるダイアログモーダルや、獲得したバッジ・ポイントが画面中央にポップアップする演出など、ユーザーの意識を強制的に中央へ集めたい「マイクロインタラクション」に最適です。',
        run(n) { anime({ targets: $s(n, '.db'), scale: [1, 1.4, 1], loop: true, easing: 'easeInOutQuad', duration: 900, direction: 'alternate' }) },
        realRun(n) {
            anime.set($r(n, '#rmo' + n), { opacity: 0 });
            anime.set($r(n, '#rmb' + n), { scale: 0.7, opacity: 0 });
            anime.timeline({ loop: true, direction: 'alternate', endDelay: 1200 })
                .add({ targets: $r(n, '#rmo' + n), opacity: [0, 1], easing: 'linear', duration: 300 })
                .add({ targets: $r(n, '#rmb' + n), scale: [0.7, 1], opacity: [0, 1], easing: 'easeOutBack', duration: 400 }, '-=150');
        }
    },

    {
        id: 5, cat: 'basic', title: '透明度', en: 'Opacity / Fade', tags: ['opacity', 'fade', 'transition'],
        stage: 'box g3', real: 'fade',
        desc: '要素の透明度（opacity）を0（完全透明）から1（完全不透明）の間でコントロールします。フェードアニメーションは情報過多を防ぎ、ユーザーの認知負荷を下げる最も安定的で上品な手法です。単なる表示切り替えではなく、`translateY`（縦移動）と組み合わせることで「ふんわりと浮かび上がる」モダンな登場演出が作れます。',
        code: `anime({\n  targets: '.content',\n  opacity: [0, 1],\n  translateY: [20, 0],\n  easing: 'easeOutCubic',\n  duration: 600\n});`,
        tip: '💡 【実践事例】ページのスクロールに合わせてコンテンツブロックを遅延表示（Lazy Reveal）させる実装や、タブ切り替え時のコンテンツのクロスフェードに必須のテクニックです。',
        run(n) { anime({ targets: $s(n, '.db'), opacity: [0, 1], loop: true, direction: 'alternate', duration: 900, easing: 'easeInOutSine' }) },
        realRun(n) { anime({ targets: $$r(n, '.rf-item'), opacity: [0, 1], translateY: [15, 0], easing: 'easeOutCubic', duration: 600, delay: anime.stagger(100), loop: true, direction: 'alternate', endDelay: 1200 }) }
    },

    {
        id: 6, cat: 'basic', title: '色変化', en: 'Color Animation', tags: ['color', 'backgroundColor', 'fill'],
        stage: 'color 6', real: 'like',
        desc: 'CSSのカラーコード（Hex、RGB、HSLなど）を文字列として直接指定し、色を滑らかに遷移させます。急激な色の変化はユーザーの目に負担をかけるため、hover時やアクティブ状態への移行時に数百ミリ秒のcolorアニメーションを挟むことで、UI全体に「柔らかさ」と「高級感」を付与することができます。',
        code: `anime({\n  targets: '#btn',\n  backgroundColor: ['#1e293b', '#ec4899'],\n  color: ['#94a3b8', '#ffffff'],\n  duration: 400,\n  easing: 'easeOutQuad'\n});`,
        tip: '💡 【実践事例】「いいね！」や「お気に入り追加」ボタンを押した際、アイコンがグレーから鮮やかなブランドカラーに染まるような、マイクロ・フィードバックの演出に最適です。',
        run(n) { anime({ targets: $s(n, '#colbox' + n), backgroundColor: ['#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#7c3aed'], easing: 'linear', duration: 2000, loop: true }) },
        realRun(n) {
            const btn = $r(n, '.r-like-btn');
            if (!btn._bound) {
                btn._bound = true; btn.onclick = () => {
                    btn.classList.toggle('on');
                    anime({ targets: btn, scale: [1, .85, 1.2, 1], easing: 'easeOutElastic(1,.4)', duration: 600 });
                }
            }
        }
    },

    {
        id: 7, cat: 'basic', title: '角丸変化', en: 'Border Radius', tags: ['borderRadius', 'pill', 'morphing'],
        stage: 'br 7', real: 'pill',
        desc: '`borderRadius`プロパティをアニメーションさせ、要素のシルエット（形状）をダイナミックに変形（モーフィング）させます。人間の目は直角から曲線への変化を「柔らかく、触り心地の良いもの」として認識する傾向があります。状態の変化を「形」で表現する高度なインタラクション手法です。',
        code: `anime({\n  targets: '#btn',\n  borderRadius: ['4px', '100px'],\n  paddingLeft: [16, 28],\n  duration: 400,\n  easing: 'easeOutCubic'\n});`,
        tip: '💡 【実践事例】ただの四角い検索アイコンをクリックすると横に伸びて丸みを帯びた検索バーに変形するUIや、ホバー時にカプセル型へ変化するCTA（Call To Action）ボタンなどで使用されます。',
        run(n) { anime({ targets: $s(n, '#brpill' + n), borderRadius: ['4px', '100px'], loop: true, direction: 'alternate', easing: 'easeInOutCubic', duration: 900 }) },
        realRun(n) { anime({ targets: $$r(n, '.rp-btn'), borderRadius: ['6px', '100px'], loop: true, direction: 'alternate', easing: 'easeInOutCubic', duration: 900 }) }
    },

    {
        id: 8, cat: 'basic', title: '複数プロパティ同時変化', en: 'Multiple Properties', tags: ['multiple', 'combined', 'complex'],
        stage: 'box g6', real: 'cards',
        desc: 'アニメーションライブラリを使う最大のメリットは、移動・透明度・拡縮・回転など、全く異なる複数のCSSプロパティを「一度の関数呼び出しで、完全に同期させて」動かせる点にあります。CSS Transitionsで別々に定義する手間やタイミングのズレを解消し、複雑でリッチなUIアニメーションを一撃で構築できます。',
        code: `anime({\n  targets: '#card',\n  translateY: [20, 0],\n  opacity: [0, 1],\n  scale: [0.95, 1],\n  easing: 'easeOutCubic',\n  duration: 500\n});`,
        tip: '💡 【実践事例】情報量の多いダッシュボードのカードウィジェットやECサイトの商品一覧など。「下から現れ（Y軸）、実体を持ち（透過）、こちらへ向かってくる（拡縮）」という複合モーションで高品質な体験を作れます。',
        run(n) { anime({ targets: $s(n, '.db'), translateY: [20, 0], opacity: [0, 1], scale: [.9, 1], loop: true, direction: 'alternate', easing: 'easeOutCubic', duration: 900 }) },
        realRun(n) {
            anime.set($$r(n, '.r-pc'), { opacity: 0, translateY: 20, scale: .95 });
            anime({ targets: $$r(n, '.r-pc'), opacity: [0, 1], translateY: [20, 0], scale: [.95, 1], easing: 'easeOutCubic', duration: 500, delay: anime.stagger(100), loop: true, direction: 'alternate', endDelay: 1200 });
        }
    },

    // ═══════════════ ⚡ イージング ═══════════════
    {
        id: 9, cat: 'ease', title: 'easeInOut系', en: 'easeInOut Functions', tags: ['easeInOutQuad', 'easeInOutSine', 'smooth'],
        stage: 'dots 3 g2', real: 'progress',
        desc: 'イージングの基本である「最初と最後が緩やかで中間が速い」動きです。現実世界における物体の加速・減速を模倣しているため、人間の目に最も自然に映ります。linear（等速）は機械的に見えてしまうため、基本的にはすべてのUIアニメーションのデフォルトとしてこの `easeInOut` 系（Quad, Cubic, Sine等）を設定するのがベストプラクティスです。',
        code: `anime({\n  targets: '#el',\n  translateX: 200,\n  easing: 'easeInOutQuad', // または Sine, Cubic\n  duration: 800\n});`,
        tip: '💡 【実践事例】カルーセルスライダーの画像送り、滑らかなページスクロール、アコーディオンメニューの開閉など、「ユーザーがその移動の軌跡を追う必要がある」UI全般で使用します。',
        run(n) {
            const dots = $$r(n || 0, '.dot-s'); // fallback
            anime({ targets: $s(n, '.dots-row'), translateX: [0, 60], loop: true, direction: 'alternate', easing: 'easeInOutSine', duration: 1000 });
        },
        realRun(n) {
            [[`#rpf${n}_0`, '#7c3aed', 72], [`#rpf${n}_1`, '#06b6d4', 45], [`#rpf${n}_2`, '#10b981', 88]].forEach(([id, col, pct]) => {
                const el = $r(n, id); if (!el) return;
                anime({ targets: el, width: [0, pct + '%'], easing: 'easeInOutQuad', duration: 1500, loop: true, direction: 'alternate', endDelay: 800, delay: Math.random() * 200 });
            });
        }
    },

    {
        id: 10, cat: 'ease', title: 'easeOutElastic', en: 'Elastic Easing', tags: ['easeOutElastic', 'elastic', 'bounce'],
        stage: 'circle g4', real: 'like',
        desc: '終点付近でゴムのようにビヨンと伸縮する弾力的なイージングです。`easeOutElastic(振幅, 周期)` というパラメータで弾み具合を細かくチューニングできます。遊び心を持たせたいカジュアルなアプリや、ユーザーのアクションに対して明確な「手応え（リワード感）」を返したい場合に非常に効果的です。',
        code: `anime({\n  targets: '#heart',\n  scale: [0, 1],\n  easing: 'easeOutElastic(1, 0.5)',\n  duration: 700\n});`,
        tip: '💡 【実践事例】SNS系アプリでの「いいね（Like）」時のハートアイコンのバウンスや、タスク完了時のスタンプ押印エフェクトなど、ポジティブな感情を引き出したいフィードバックに最適です。',
        run(n) { anime({ targets: $s(n, '.db'), scale: [.5, 1.2, .8, 1], loop: true, easing: 'easeOutElastic(1,.5)', duration: 900, endDelay: 400 }) },
        realRun(n) {
            const btn = $r(n, '.r-like-btn');
            if (!btn._bound2) {
                btn._bound2 = true; btn.onclick = () => {
                    btn.classList.toggle('on');
                    anime({ targets: btn, scale: [1, .8, 1.3, 1], easing: 'easeOutElastic(1,.4)', duration: 700 });
                }
            }
        }
    },

    {
        id: 11, cat: 'ease', title: 'easeOutBounce', en: 'Bounce Easing', tags: ['easeOutBounce', 'bounce', 'callback'],
        stage: 'box g3', real: 'bounce',
        desc: 'ボールが床に落ちて弾むような、重力と反発を感じさせるイージングです。Elastic（ゴム）とは異なり一方向への反発となるため、より物理法則に忠実な重量感を表現できます。画面の上から落ちてくる要素に対して適用すると、強力な視線誘導効果を発揮し、ユーザーの注意を瞬時に引きつけることができます。',
        code: `anime({\n  targets: '#error',\n  translateY: [-30, 0],\n  opacity: [0, 1],\n  easing: 'easeOutBounce',\n  duration: 800\n});`,
        tip: '💡 【実践事例】フォーム入力時のバリデーションエラーや、課金失敗時の警告トーストなど。「見逃してはいけない重要なお知らせ」をユーザーの視界に物理的なインパクトと共に提示する際に有効です。',
        run(n) { anime({ targets: $s(n, '.db'), translateY: [-50, 0], loop: true, easing: 'easeOutBounce', duration: 900, endDelay: 600 }) },
        realRun(n) {
            anime.set($r(n, '#errmsg' + n), { opacity: 0, translateY: -15 });
            anime({ targets: $r(n, '#errmsg' + n), opacity: [0, 1], translateY: [-15, 0], easing: 'easeOutBounce', duration: 700, loop: true, endDelay: 1500, direction: 'alternate' });
        }
    },

    {
        id: 12, cat: 'ease', title: 'Spring Physics', en: 'spring() Easing', tags: ['spring', 'physics', 'natural'],
        stage: 'circle g1', real: 'settings',
        desc: '質量（mass）、剛性（stiffness）、減衰（damping）、初速（velocity）という4つの物理パラメータに基づいて軌道を計算する、プロご用達の最強イージングです。アニメーションの「時間（duration）」を直接指定せず、バネの物理演算によって時間が決定されるため、あらゆる幅や距離の変化に対して常に一定の「心地よい質感（iOSのような触感）」を維持できます。',
        code: `anime({\n  targets: '#thumb',\n  left: 23,\n  // mass, stiffness, damping, velocity\n  easing: 'spring(1, 120, 10, 0)'\n});`,
        tip: '💡 【実践事例】設定画面のトグルスイッチ、ドラッグ＆ドロップ要素の元の位置への復帰、スライダーの吸着（スナップ）など、指に吸い付くようなネイティヴアプリ品質の操作感を出したい箇所に多用します。',
        run(n) { anime({ targets: $s(n, '.db'), translateX: [-40, 40], easing: 'spring(1,80,8,0)', loop: true, direction: 'alternate', endDelay: 300 }) },
        realRun(n) {
            const tgls = $$r(n, '.r-tgl');
            tgls.forEach((tgl, i) => {
                if (tgl._bound) return; tgl._bound = true;
                tgl.onclick = () => {
                    const on = tgl.classList.toggle('on');
                    const th = tgl.querySelector('.r-tgl-th');
                    anime({ targets: th, left: on ? 21 : 3, easing: 'spring(1,120,10,0)', duration: 800 });
                };
            });
        }
    },

    {
        id: 13, cat: 'ease', title: 'easeInOutBack', en: 'Overshoot Easing', tags: ['easeInOutBack', 'overshoot', 'menu'],
        stage: 'box g2', real: 'dropdown',
        desc: '目的の数値を少しだけ通り越して（オーバーシュート）、その後ピタッと戻るイージングです。ElasticやSpringほどの激しい振動はなく、「パチン」としなやかに閉まるドアのような小気味良い感触を生み出します。特に要素の出現（scale 0→1）に使用すると、無機質なUIがまるで物理的な実体を持っているかのように錯覚させることができます。',
        code: `anime({\n  targets: '#menu',\n  scaleY: [0, 1],\n  opacity: [0, 1],\n  transformOrigin: 'top',\n  easing: 'easeOutBack',\n  duration: 350\n});`,
        tip: '💡 【実践事例】ドロップダウンメニューの展開、ツールチップ（ふきだし）の出現、カスタムセレクトボックスなど、ユーザーのアクションをトリガーとして画面の手前に飛び出してくるUIパネル全般に最適です。',
        run(n) { anime({ targets: $s(n, '.db'), scale: [.5, 1], loop: true, direction: 'alternate', easing: 'easeInOutBack', duration: 700 }) },
        realRun(n) {
            const m = $r(n, '#ddmenu' + n);
            const a = $r(n, '#ddarr' + n);
            const t = $r(n, '#ddtrig' + n);
            if (t && !t._bound) {
                t._bound = true; t.onclick = () => {
                    const isOpen = m.style.opacity === '1';
                    anime({ targets: m, opacity: isOpen ? 0 : 1, translateY: isOpen ? [-8, 0] : [0, -8], scaleY: isOpen ? [1, .8] : [.8, 1], easing: isOpen ? 'easeInBack' : 'easeOutBack', duration: 250 });
                    anime({ targets: a, rotate: isOpen ? 0 : 180, duration: 300 });
                    m.style.pointerEvents = isOpen ? 'none' : 'auto';
                }; m.style.pointerEvents = 'none';
            }
        }
    },

    {
        id: 14, cat: 'ease', title: 'easeOutExpo', en: 'Exponential Easing', tags: ['easeOutExpo', 'fast', 'deceleration'],
        stage: 'box g5', real: 'toast',
        desc: '最初が非常に速く、終点に向けて急激に減速するパワフルなイージングです。ユーザーの操作に対して「即座に反応した」というスピード感を与えつつ、最後はじっくりと定位置に収まるため視認性も確保できます。システムからの素早い応答が必要なUI部品に最適です。',
        code: `anime({\n  targets: '#notification',\n  translateX: [300, 0],\n  easing: 'easeOutExpo',\n  duration: 500\n});`,
        tip: '💡 【実践事例】OSのプッシュ通知、操作直後にスパッと現れるトーストメッセージ、ホバーで即座に展開されるツールチップなど、遅延が許されない（ユーザーを待たせたくない）入場アニメーションで使用します。',
        run(n) { anime({ targets: $s(n, '.db'), translateX: [80, 0], loop: true, direction: 'alternate', easing: 'easeOutExpo', duration: 700, endDelay: 400 }) },
        realRun(n) {
            anime.set($r(n, '.r-toast'), { translateX: 120 });
            anime({ targets: $r(n, '.r-toast'), translateX: [120, 0], easing: 'easeOutExpo', duration: 450, loop: true, direction: 'alternate', endDelay: 1600 });
        }
    },

    // ═══════════════ ⏱️ タイミング ═══════════════
    {
        id: 15, cat: 'timing', title: 'Delay', en: '遅延設定', tags: ['delay', 'timing', 'sequence'],
        stage: 'tl 15', real: 'menu',
        desc: '`delay`プロパティを使用して、アニメーションの開始タイミングを意図的に遅らせます。Webデザインにおいて、すべての要素が同時に動くことは「重たい」「うるさい」という悪印象を与えがちです。リストやグリッドの要素に対し、少しずつズレたdelay（遅延）を設定することで、視線の流れを美しくコントロールできます。',
        code: `anime({\n  targets: '.menu-item',\n  opacity: [0, 1],\n  translateX: [-20, 0],\n  delay: (el, i) => i * 100, // 要素ごとに100ms刻み\n  duration: 400\n});`,
        tip: '💡 【実践事例】ハンバーガーメニューを開いた際、内包されるナビゲーションリンクが上から順番に（数ミリ秒ずれて）フワッと現れる、リッチで洗練されたインターフェースの構築に。',
        run(n) {
            const items = [...document.querySelectorAll(`#s${n} .db`)];
            anime.set(items, { opacity: 0, translateX: -20 });
            function seq() { anime({ targets: items, opacity: [0, 1], translateX: [-20, 0], delay: anime.stagger(200), easing: 'easeOutCubic', duration: 400, complete: () => setTimeout(() => { anime.set(items, { opacity: 0, translateX: -20 }); setTimeout(seq, 400) }, 1000) }); }
            seq();
        },
        realRun(n) {
            const items = $$r(n, '.rmenu-item');
            anime.set(items, { opacity: 0, translateX: -16 });
            function sq() { anime({ targets: items, opacity: [0, 1], translateX: [-16, 0], delay: anime.stagger(80), easing: 'easeOutCubic', duration: 350, complete: () => setTimeout(() => { anime.set(items, { opacity: 0, translateX: -16 }); setTimeout(sq, 800) }, 1200) }); }
            sq();
        }
    },

    {
        id: 16, cat: 'timing', title: 'Loop & Alternate', en: 'ループと往復', tags: ['loop', 'direction', 'alternate', 'infinite'],
        stage: 'grid 3x5 g1', real: 'skeleton',
        desc: '`loop: true`で無限ループ、`direction: "alternate"`で「いってこい（往復）」のアニメーションになります。ユーザーのアクションを待たずに自律して動き続けるUI要素は、画面内で非常に強い存在感を放ちます。そのため、意図的に視線を惹きつけたい箇所か、待ち時間を紛らわす用途に限定して使用すべきです。',
        code: `anime({\n  targets: '.skeleton',\n  opacity: [0.3, 1],\n  easing: 'easeInOutSine',\n  duration: 800,\n  loop: true,\n  direction: 'alternate'\n});`,
        tip: '💡 【実践事例】データ読み込み中に表示し、ユーザーの体感待ち時間を短縮させる「スケルトンUI（骨組みのプレースホルダー）」のパルス（点滅）エフェクトや、録音中の音声波形の表現などに必須です。',
        run(n) { anime({ targets: $$r(n || 0, '.sg-dot').length ? $$r(n, 'db') : [...document.querySelectorAll(`#s${n} .sg-dot`)], scale: [.5, 1], opacity: [.2, 1], easing: 'easeInOutSine', duration: 700, loop: true, direction: 'alternate', delay: anime.stagger(50, { grid: [3, 5], from: 'center' }) }) },
        realRun(n) { anime({ targets: [$r(n, '.r-sk-av'), ...$$r(n, '.r-sk-l'), $r(n, '.r-sk-c')], opacity: [.3, 1], easing: 'easeInOutSine', duration: 700, loop: true, direction: 'alternate', delay: anime.stagger(80) }) }
    },

    {
        id: 17, cat: 'timing', title: 'Timeline', en: 'タイムライン制御', tags: ['timeline', 'sequence', 'choreography'],
        stage: 'tl 17', real: 'hero',
        desc: '`anime.timeline()`を使用すると、複数の独立したアニメーションを映画のワンシーンのように順序正しく連携（コレオグラフィ）させることができます。個別のdelayを計算する煩わしさから解放され、全体の一連の動きをひとつのブロックとして管理できるため、複雑なUI演出を設計する際のデファクトスタンダードとなっています。',
        code: `const tl = anime.timeline({ loop: true });\ntl.add({ targets: '#logo', opacity: [0, 1], scale: [.5, 1] })\n  .add({ targets: 'h1', translateY: [20, 0] }, '-=300')\n  .add({ targets: '.cta', opacity: [0, 1] });`,
        tip: '💡 【実践事例】ランディングページ（LP）のファーストビューで、「背景画像」→「キャッチコピー」→「コンバージョンボタン」の順にユーザーの視線を意図した通りに誘導する入場演出（ヒーローヘッダー）の構築に。',
        run(n) {
            const items = [...document.querySelectorAll(`#s${n} .db`)];
            anime.set(items, { opacity: 0, scale: .5 });
            function seq() {
                anime.timeline({ easing: 'easeOutExpo', complete: () => setTimeout(() => { anime.set(items, { opacity: 0, scale: .5 }); setTimeout(seq, 600) }, 800) })
                    .add({ targets: items[0], opacity: [0, 1], scale: [.5, 1], duration: 500 })
                    .add({ targets: items[1], opacity: [0, 1], translateX: [-30, 0], duration: 400 }, '-=200')
                    .add({ targets: items[2], opacity: [0, 1], rotate: [-30, 0], duration: 400 }, '-=200');
            } seq();
        },
        realRun(n) {
            const logo = $r(n, '#rhl' + n), h = $r(n, '#rhh' + n), p = $r(n, '#rhp' + n), c = $r(n, '#rhc' + n);
            function seq() {
                anime.set([logo, h, p, c], { opacity: 0, translateY: 12, scale: 1 });
                anime.set(logo, { scale: .5 });
                anime.timeline({ easing: 'easeOutCubic', endDelay: 1200, complete: () => setTimeout(seq, 600) })
                    .add({ targets: logo, opacity: [0, 1], scale: [.5, 1], duration: 400 })
                    .add({ targets: h, opacity: [0, 1], translateY: [12, 0], duration: 400 }, '-=150')
                    .add({ targets: p, opacity: [0, 1], translateY: [8, 0], duration: 350 }, '-=200')
                    .add({ targets: c, opacity: [0, 1], translateY: [8, 0], duration: 350 }, '-=200');
            } seq();
        }
    },

    {
        id: 18, cat: 'timing', title: 'Stagger', en: '波状遅延', tags: ['stagger', 'grid', 'wave', 'ripple'],
        stage: 'grid 3x5 g4', real: 'cards',
        desc: '`anime.stagger()`は、複数の要素に対して自動的に計算された遅延（ディレイ）を与える強力な関数です。単なるリスト順だけでなく、`grid`プロパティを渡すことで、指定した基準点（`from: "center"`など）から波紋のように広がる2Dの遅延エフェクトをわずか1行のコードで実現でき、圧倒的なビジュアルインパクトを生み出します。',
        code: `anime({\n  targets: '.card',\n  opacity: [0, 1],\n  translateY: [20, 0],\n  delay: anime.stagger(80, { from: 'center' })\n});`,
        tip: '💡 【実践事例】ECサイトの商品一覧タイルや画像ギャラリーの初期ロード時。グリッド状に並んだ大量のカードが、画面中央から外側へ向かって波打つように（Ripple）一斉に現れるリッチな演出に最適です。',
        run(n) {
            const dots = [...document.querySelectorAll(`#s${n} .sg-dot`)];
            anime.set(dots, { opacity: .15, scale: .4 });
            anime({ targets: dots, opacity: [.15, 1], scale: [.4, 1], borderRadius: ['4px', '50%', '4px'], easing: 'easeOutElastic(1,.5)', duration: 800, loop: true, direction: 'alternate', delay: anime.stagger(60, { grid: [3, 5], from: 'center' }) });
        },
        realRun(n) {
            anime.set($$r(n, '.r-pc'), { opacity: 0, translateY: 18 });
            anime({ targets: $$r(n, '.r-pc'), opacity: [0, 1], translateY: [18, 0], easing: 'easeOutCubic', duration: 500, delay: anime.stagger(100), loop: true, direction: 'alternate', endDelay: 1200 });
        }
    },

    {
        id: 19, cat: 'timing', title: 'Callbacks', en: 'update / complete', tags: ['update', 'complete', 'callback', 'progress'],
        stage: 'box g5', real: 'progress',
        desc: '`update` コールバック関数を使用すると、アニメーション中の「毎フレームの値」をリアルタイムで取得できます。本来アニメーション不可能な数値のカウントアップや、JavaScriptでのみ制御可能なキャンバス描画の更新など、DOMプロパティの枠を超えた高度なビジュアル表現の心臓部となる機能です。',
        code: `anime({\n  targets: { val: 0 },\n  val: 100,\n  update: (a) => {\n    const v = Math.round(a.animations[0].currentValue);\n    el.textContent = v + '%';\n  },\n  duration: 2000\n});`,
        tip: '💡 【実践事例】ファイルアップロード中の「42%…89%…」といったプログレス数値の滑らかなカウントアップや、ダッシュボードにおける売上グラフの動的な描画アニメーションに使用します。',
        run(n) {
            let obj = { v: 0 };
            const box = $s(n, '.db');
            function loop() {
                obj.v = 0;
                anime({ targets: obj, v: 100, round: 1, duration: 1800, easing: 'easeInOutQuad', update: () => { if (box) box.style.width = (obj.v * .48 + 4) + 'px'; }, complete: () => setTimeout(loop, 500) });
            } loop();
        },
        realRun(n) {
            [[`#rpf${n}_0`, `#rpp${n}_0`, 72], [`#rpf${n}_1`, `#rpp${n}_1`, 45], [`#rpf${n}_2`, `#rpp${n}_2`, 88]].forEach(([fid, pid, pct], i) => {
                const fill = $r(n, fid), pctEl = $r(n, pid); if (!fill) return;
                let obj = { v: 0 };
                anime({
                    targets: obj, v: pct, round: 1, duration: 1800, delay: i * 200, easing: 'easeInOutQuad',
                    update: () => { fill.style.width = obj.v + '%'; if (pctEl) pctEl.textContent = Math.round(obj.v) + '%'; },
                    loop: true, direction: 'alternate', endDelay: 600
                });
            });
        }
    },

    // ═══════════════ ✏️ SVG ═══════════════
    {
        id: 20, cat: 'svg', title: 'SVGパス描画', en: 'SVG Path Drawing', tags: ['stroke-dashoffset', 'SVG', 'path', 'draw'],
        stage: 'svgpath 20', real: 'sign',
        desc: 'SVGの`stroke-dashoffset`プロパティをアニメーションさせることで、線画があたかも「今、見えないペンで描かれている」かのように表示するテクニックです。無機質なWebサイトに手作りの温もりや、ストーリーテリングの要素を加えることができる洗練されたMotion Graphic手法です。',
        code: `anime({\n  targets: '#path',\n  strokeDashoffset: [anime.setDashoffset, 0],\n  easing: 'easeInOutSine',\n  duration: 2000,\n  loop: true,\n  direction: 'alternate'\n});`,
        tip: '💡 【実践事例】ブランドロゴの初回ロード時におけるリッチな自己紹介アニメーションや、決済完了時に「✔（チェックマーク）」が手書き風に描画される安心感のあるフィードバックに。',
        run(n) {
            anime.set(`#spl${n}`, { strokeDashoffset: 500 });
            const path = document.getElementById(`spm${n}`);
            if (path) { const p = anime.path(`#spm${n}`); anime({ targets: `#spb${n}`, translateX: p('x'), translateY: p('y'), easing: 'linear', duration: 1800, loop: true }); }
            anime({ targets: `#spl${n}`, strokeDashoffset: [500, 0], easing: 'easeInOutSine', duration: 1800, loop: true, direction: 'alternate' });
        },
        realRun(n) {
            anime({ targets: `#sgn${n}`, strokeDashoffset: [320, 0], easing: 'easeInOutSine', duration: 1800, loop: true, direction: 'alternate' });
        }
    },

    {
        id: 21, cat: 'svg', title: 'SVGパス追従', en: 'SVG Path Motion', tags: ['anime.path', 'motion', 'trajectory', 'SVG'],
        stage: 'svgpath 21', real: 'sign',
        desc: '`anime.path()`を使用すると、SVGで描かれた複雑な曲線（ベジェ曲線など）を「移動のレール」として取得できます。X/Y座標だけでなく、パスの接線に対する角度（`rotate`）も自動計算されるため、CSSだけでは実現不可能な滑らかな曲線軌道アニメーションをいとも簡単に実装できます。',
        code: `const path = anime.path('#route');\nanime({\n  targets: '#obj',\n  translateX: path('x'),\n  translateY: path('y'),\n  rotate: path('angle'),\n  loop: true\n});`,
        tip: '💡 【実践事例】マップアプリでの現在地から目的地までのルート案内アニメーションや、紙飛行機が画面内を八の字に飛び回るような、楽しげなマイクロインタラクションの構築に。',
        run(n) {
            const pm = document.getElementById(`spm${n}`);
            if (pm) { const p = anime.path(`#spm${n}`); anime({ targets: `#spb${n}`, translateX: p('x'), translateY: p('y'), easing: 'linear', duration: 1800, loop: true }); }
            anime.set(`#spl${n}`, { opacity: .4 });
            anime({ targets: `#spl${n}`, strokeDashoffset: [500, 0], easing: 'easeInOutSine', duration: 1800, loop: true, direction: 'alternate' });
        },
        realRun(n) {
            anime({ targets: `#sgn${n}`, strokeDashoffset: [320, 0], easing: 'linear', duration: 2000, loop: true });
        }
    },

    {
        id: 22, cat: 'svg', title: 'SVGモーフィング', en: 'SVG Morphing', tags: ['morphing', 'SVG', 'd attribute', 'icon'],
        stage: 'morph 22', real: 'morph',
        desc: 'SVGの`d`属性（パスの形状データ）を直接書き換えることで、ある図形から全く別の図形へとヌルッと変形（モーフィング）させます。※実装上の絶対ルールとして、変形前と変形後で「**アンカーポイントの数が完全に一致**」しているSVGを用意する必要があります。',
        code: `anime({\n  targets: '#path',\n  d: [\n    { value: 'M...(三本線)' },\n    { value: 'M...(✕マーク)' }\n  ],\n  easing: 'easeInOutCubic',\n  duration: 400\n});`,
        tip: '💡 【実践事例】ハンバーガーメニュー（三本線）をクリックすると「✕（閉じる）」に変形するUIや、「再生」ボタンが「一時停止」ボタンにシームレスに切り替わるメディアプレイヤーなど。',
        run(n) {
            const paths = ['M50 10 L92 35 L92 65 L50 90 L8 65 L8 35 Z', 'M50 5 L61 35 L95 35 L68 57 L79 91 L50 70 L21 91 L32 57 L5 35 L39 35 Z', 'M10 10 L90 10 L90 90 L10 90 Z', 'M50 5 A45 45 0 1 1 49.99 5 Z'];
            let mi = 0; function nm() { mi = (mi + 1) % paths.length; anime({ targets: `#mp${n}`, d: [{ value: paths[mi] }], easing: 'easeInOutCubic', duration: 900, complete: () => setTimeout(nm, 400) }); } nm();
        },
        realRun(n) {
            const btn = $r(n, '#hamBtn' + n);
            const l1 = $r(n, '#hl1_' + n), l2 = $r(n, '#hl2_' + n), l3 = $r(n, '#hl3_' + n);
            let open = false;
            if (btn && !btn._bound) {
                btn._bound = true; btn.onclick = () => {
                    open = !open;
                    if (open) {
                        anime({ targets: l1, translateY: [0, 5], rotate: [0, 45], easing: 'easeInOutQuad', duration: 300 });
                        anime({ targets: l2, opacity: [1, 0], duration: 200 });
                        anime({ targets: l3, translateY: [0, -5], rotate: [0, -45], easing: 'easeInOutQuad', duration: 300 });
                    } else {
                        anime({ targets: l1, translateY: [5, 0], rotate: [45, 0], easing: 'easeInOutQuad', duration: 300 });
                        anime({ targets: l2, opacity: [0, 1], duration: 200, delay: 100 });
                        anime({ targets: l3, translateY: [-5, 0], rotate: [-45, 0], easing: 'easeInOutQuad', duration: 300 });
                    }
                };
            }
        }
    },

    {
        id: 23, cat: 'svg', title: 'SVGストロークリング', en: 'SVG Stroke Ring', tags: ['stroke', 'ring', 'progress', 'circle'],
        stage: 'svgring2 23', real: 'svgring',
        desc: '円形SVG（`<circle>`）の`stroke-dashoffset`をアニメーションさせることで、円を描きながら進むプログレスリングを作ることができます。円周の長さ（2πr）を計算して最大のdashoffset値に設定し、それを0に向けて減らしていくのが基本原理です。直線的なプログレスバーよりもスペースを取らず、デザインに近未来的な印象を与えます。',
        code: `// r=40の円周: 2π×40 ≈ 251\nanime({\n  targets: '#ring',\n  strokeDashoffset: [251, 0],\n  easing: 'easeOutQuad',\n  duration: 1500\n});`,
        tip: '💡 【実践事例】ファイルアップロードの完了率表示、健康管理アプリの目標歩数達成度の円グラフ、あるいはユーザーのプロフィール完成度（80%等）を示すダッシュボードのインジケーターとして使われます。',
        run(n) {
            anime({ targets: `#svgr2${n}`, strokeDashoffset: [176, 0], loop: true, direction: 'alternate', easing: 'easeOutQuad', duration: 1500, endDelay: 400 });
        },
        realRun(n) {
            let obj = { v: 0 };
            anime({
                targets: obj, v: 100, round: 1, duration: 2000, easing: 'easeOutQuad', loop: true, direction: 'alternate', endDelay: 500,
                update: () => {
                    const el = $r(n, `#svgr${n}`); if (!el) return;
                    const pct = obj.v / 100;
                    el.style.strokeDashoffset = 188 * (1 - pct);
                    const pl = $r(n, `#ringpct${n}`); if (pl) pl.textContent = Math.round(obj.v) + '%';
                }
            });
        }
    },

    // ═══════════════ 💬 テキスト ═══════════════
    {
        id: 24, cat: 'text', title: '文字分割アニメーション', en: 'Character Split', tags: ['text', 'split', 'stagger', 'letter'],
        stage: 'text 24', real: 'htext',
        desc: 'テキスト全体を1文字ずつ`<span>`要素に分割し、`stagger`（遅延表示）を使って流れるように出現させます。単に文字を表示するのではなく、Y軸移動（下から上へ）と透明度変化を組み合わせることで、静的な文字情報に「生命力」と「リッチな質感」を吹き込むことができます。',
        code: `el.innerHTML = [...text].map(c => \`<span>\${c}</span>\`).join('');\nanime({\n  targets: 'span',\n  translateY: [40, 0],\n  opacity: [0, 1],\n  delay: anime.stagger(50),\n  easing: 'easeOutElastic(1, .5)'\n});`,
        tip: '💡 【実践事例】ランディングページ（LP）のメインビジュアルにおけるブランドコピーの強調や、スクロール時に見出しが現れるタイポグラフィ演出において、最も訴求力の高い手法の一つです。',
        run(n) {
            const el = $s(n, '.db-text'); if (!el) return;
            const txt = 'ANIME.JS';
            el.innerHTML = [...txt].map(c => `<span style="display:inline-block">${c}</span>`).join('');
            function seq() { anime({ targets: $s(n, '.db-text').querySelectorAll('span'), translateY: [35, 0], opacity: [0, 1], scale: [.5, 1], delay: anime.stagger(60), easing: 'easeOutElastic(1,.5)', duration: 600, endDelay: 1000, complete: () => setTimeout(seq, 1200) }); } seq();
        },
        realRun(n) {
            const el = $r(n, '#htxt' + n); if (!el) return;
            const txt = '次世代AI体験';
            function seq() {
                el.innerHTML = [...txt].map(c => `<span style="display:inline-block">${c}</span>`).join('');
                anime({ targets: el.querySelectorAll('span'), translateY: [30, 0], opacity: [0, 1], delay: anime.stagger(60), easing: 'easeOutElastic(1,.5)', duration: 600, endDelay: 1200, complete: () => setTimeout(seq, 1400) });
            } seq();
        }
    },

    {
        id: 25, cat: 'text', title: 'カウントアップ', en: 'Count Up', tags: ['countup', 'update', 'number', 'KPI'],
        stage: 'text 25', real: 'counter',
        desc: 'JavaScriptのオブジェクト（例: `{ val: 0 }`）をターゲットにし、目標数値までアニメーションさせながら`update`コールバックでDOMの中身を書き換えます。急激にパッと大きな数字を出されるよりも、スロットマシンのように数字が数え広がる演出の方が、ユーザーの脳に「その数字の大きさ・凄さ」をより深く刻み込む心理的効果があります。',
        code: `anime({\n  targets: { val: 0 },\n  val: 98540,\n  round: 1,\n  easing: 'easeOutExpo',\n  duration: 2000,\n  update: (a) => {\n    el.textContent = Math.floor(a.animations[0].currentValue).toLocaleString();\n  }\n});`,
        tip: '💡 【実践事例】SaaSの公式サイトにある「導入実績 12,500社突破！」といったKPI表示や、ユーザーのダッシュボードにおける「累計獲得ポイント」「フォロワー数」などの実績アピールに絶大な効果を発揮します。',
        run(n) {
            const el = $s(n, '.db-num'); if (!el) return;
            function loop() { let o = { v: 0 }; anime({ targets: o, v: 9823, round: 1, duration: 1800, easing: 'easeOutExpo', update: () => el.textContent = Math.floor(o.v).toLocaleString(), complete: () => setTimeout(loop, 800) }); } loop();
        },
        realRun(n) {
            const els = [[$r(n, '#cnt0_' + n), 98540], [$r(n, '#cnt1_' + n), 12500], [$r(n, '#cnt2_' + n), 4.9]];
            els.forEach(([el, target]) => { if (!el) return; let o = { v: 0 }; anime({ targets: o, v: target, round: target < 10 ? 10 : 1, duration: 2000, easing: 'easeOutExpo', loop: true, direction: 'alternate', endDelay: 800, update: () => el.textContent = target < 10 ? (o.v / 10).toFixed(1) : Math.floor(o.v).toLocaleString() }); });
        }
    },

    {
        id: 26, cat: 'text', title: 'タイプライター', en: 'Typewriter Effect', tags: ['typewriter', 'typing', 'text', 'AI'],
        stage: 'text 26', real: 'typewriter',
        desc: '文字列を分割して1文字ずつ時間を空けながらDOMに追加していくことで、あたかも「人間がタイピングしている」かのような視覚効果を作ります。文字が飛び跳ねるアニメーション（Character Split）が「装飾的」であるのに対し、こちらは「誰かが今語りかけている」という文脈（ストーリー性）をユーザーに強く意識させます。',
        code: `const txt = 'Hello, World!';\nlet i = 0;\nfunction type() {\n  el.textContent = txt.slice(0, ++i);\n  if (i < txt.length) setTimeout(type, 80);\n}type();`,
        tip: '💡 【実践事例】AIアシスタントのストリーミング応答UI（ChatGPTのような動作）、ターミナル・コマンドプロンプト風のハッカーテイストなサイトデザイン、ゲームのキャラクターのセリフ表示などで必須のテクニックです。',
        run(n) {
            const el = $s(n, '.db-type'); if (!el) return;
            const txt = 'Hello World!';
            function type(i = 0) { if (i > txt.length) { setTimeout(() => type(0), 800); return; } el.textContent = txt.slice(0, i) + (i < txt.length ? '|' : ''); setTimeout(() => type(i + 1), 90); } type();
        },
        realRun(n) {
            const el = $r(n, '#tw' + n); if (!el) return;
            const msg = 'ご質問についてお答えします。anime.jsは軽量で強力なアニメーションライブラリです。';
            function type(i = 0) { if (!el) return; if (i > msg.length) { setTimeout(() => type(0), 1500); return; } el.textContent = msg.slice(0, i) + (i < msg.length ? '▎' : ''); setTimeout(() => type(i + 1), 50); } type();
        }
    },

    {
        id: 27, cat: 'text', title: 'ワードリビール', en: 'Word Reveal', tags: ['word', 'reveal', 'clip', 'headline'],
        stage: 'text 27', real: 'htext',
        desc: 'テキストを「単語（Word）単位」で区切り、個別に表示タイミングをずらす見出しアニメーションです。1文字ずつ出現する細かすぎるアニメーションとは異なり、単語という「意味の塊」ごとに可視化されるため、ユーザーに対する情報伝達が早く、認知負荷が上がりません。プロ水準のコーポレートサイトで100%見かける鉄板の演出です。',
        code: `const words = text.split(' ');\nel.innerHTML = words.map(w => \`<span class="word"><span>\${w}</span></span>\`).join(' ');\nanime({\n  targets: '.word > span',\n  translateY: ['100%', '0%'],\n  delay: anime.stagger(100)\n});`,
        tip: '💡 【実践事例】Appleの公式サイトのような「洗練された / デザインを / あなたに」と単語ごとにリズムよく登場する力強い見出しや、スライドショーの切り替え時のテキスト出現に最適です。',
        run(n) {
            const el = $s(n, '.db-text'); if (!el) return;
            const words = ['ANIME', '.JS', '最高'];
            el.style.fontSize = '.8rem';
            function seq() {
                el.innerHTML = words.map(w => `<span style="overflow:hidden;display:inline-block;margin:0 2px"><span style="display:inline-block">${w}</span></span>`).join(' ');
                anime({ targets: [...el.querySelectorAll('span > span')], translateY: ['100%', '0%'], opacity: [0, 1], delay: anime.stagger(150), easing: 'easeOutCubic', duration: 500, endDelay: 1000, complete: () => setTimeout(seq, 1200) });
            } seq();
        },
        realRun(n) {
            const el = $r(n, '#htxt' + n); if (!el) return;
            const words = ['あなたの', 'ビジネスを', '加速する'];
            function seq() {
                el.innerHTML = words.map(w => `<span style="overflow:hidden;display:inline-block;margin:0 2px"><span style="display:inline-block">${w}</span></span>`).join(' ');
                anime({ targets: [...el.querySelectorAll('span > span')], translateY: ['100%', '0%'], delay: anime.stagger(120), easing: 'easeOutCubic', duration: 500, endDelay: 1200, complete: () => setTimeout(seq, 1400) });
            } seq();
        }
    },

    // ═══════════════ 🎛️ UIパーツ ═══════════════
    {
        id: 28, cat: 'ui', title: 'いいねボタン', en: 'Like / Heart Button', tags: ['like', 'heart', 'feedback', 'SNS'],
        stage: 'circle g4', real: 'like',
        desc: 'クリック時にスケール（大きさ）と色をダイナミックに変化させ、必要に応じて周囲にパーティクルを散らす「マイクロインタラクション」の代表格です。単なるON/OFFの切り替えではなく、ユーザーの「いいね！」というポジティブな感情の動きに対し、システム側からも同等の「喜び（バウンスや弾ける動き）」を視覚的に返すことで、ユーザーのエンゲージメント（没入感）を高めます。',
        code: `anime({\n  targets: '#heart',\n  scale: [1, 0.8, 1.3, 1],\n  easing: 'easeOutElastic(1, 0.4)',\n  duration: 600\n});\n// 周囲にheart要素を飛ばす`,
        tip: '💡 【実践事例】SNS系のリアクションボタン（Twitter/Xのいいね、Instagramのハート）や、ECサイトのお気に入り（ウィッシュリスト）追加ボタンなど、「感情が伴うアクション」のフィードバックとして実装します。',
        run(n) { anime({ targets: $s(n, '.db'), scale: [1, .8, 1.3, 1, .9, 1], easing: 'easeOutElastic(1,.4)', duration: 800, loop: true, endDelay: 600 }) },
        realRun(n) {
            const btn = $r(n, '.r-like-btn');
            const hc = $r(n, '#rh' + n);
            if (!btn || btn._bound3) return; btn._bound3 = true;
            btn.onclick = () => {
                btn.classList.toggle('on');
                anime({ targets: btn, scale: [1, .8, 1.3, 1], easing: 'easeOutElastic(1,.4)', duration: 600 });
                if (btn.classList.contains('on') && hc) {
                    for (let i = 0; i < 6; i++) {
                        const h = document.createElement('div'); h.textContent = '❤'; h.style.cssText = 'position:absolute;font-size:.7rem;pointer-events:none'; hc.appendChild(h);
                        anime({ targets: h, translateX: [(Math.random() - .5) * 50], translateY: [0, -30 - Math.random() * 20], opacity: [1, 0], duration: 600, easing: 'easeOutCubic', complete: () => h.remove() });
                    }
                }
            };
        }
    },

    {
        id: 29, cat: 'ui', title: 'プログレスバー', en: 'Progress Bar', tags: ['progress', 'bar', 'upload', 'loading'],
        stage: 'bars 8 g1', real: 'progress',
        desc: '横長のバー要素の`width`（幅）を0から目標%までアニメーションさせます。人間は完了時期が不明な待ち時間に対して強いストレスを感じるため、プログレスバーによって視覚的な「終わり」を提示することはUX上極めて重要です。`update`コールバックを併用してパーセントの数値表示も連動させると完璧です。',
        code: `anime({\n  targets: '.progress-fill',\n  width: ['0%', '72%'],\n  easing: 'easeInOutQuad',\n  duration: 1500\n});\n// update callback で%テキストも更新`,
        tip: '💡 【実践事例】重いファイルのアップロード中、時間のかかるAI生成処理中、あるいはアンケートフォームの「あと〇問で完了（達成率）」を示すインジケーターとして、ユーザーの離脱を防ぐために使用します。',
        run(n) {
            const bars = [...document.querySelectorAll(`#s${n} .bar-s`)];
            anime({ targets: bars, height: () => anime.random(25, 85), easing: 'easeInOutSine', duration: 800, loop: true, direction: 'alternate', delay: anime.stagger(60) });
        },
        realRun(n) {
            [[`#rpf${n}_0`, `#rpp${n}_0`, 75], [`#rpf${n}_1`, `#rpp${n}_1`, 42], [`#rpf${n}_2`, `#rpp${n}_2`, 93]].forEach(([fid, pid, pct], i) => {
                const fill = $r(n, fid), pctEl = $r(n, pid); if (!fill) return;
                let o = { v: 0 };
                anime({ targets: o, v: pct, round: 1, duration: 1800, delay: i * 300, easing: 'easeInOutQuad', loop: true, direction: 'alternate', endDelay: 600, update: () => { fill.style.width = o.v + '%'; if (pctEl) pctEl.textContent = Math.round(o.v) + '%'; } });
            });
        }
    },

    {
        id: 30, cat: 'ui', title: 'ドロップダウンメニュー', en: 'Dropdown Menu', tags: ['dropdown', 'menu', 'scaleY', 'opacity'],
        stage: 'box g2', real: 'dropdown',
        desc: '展開時に下へ向かって伸びるアニメーションです。`transformOrigin: "top center"`（起点を上辺にする）を指定し、`scaleY`（縦方向の拡縮）と`opacity`（透明度）を組み合わせるのが最も美しく実装しやすい定番アプローチです。`easeOutBack`のような少し弾力のあるイージングをかけると「パチン」と小気味よく開く気持ち良い感触になります。',
        code: `anime({\n  targets: '#menu',\n  opacity: [0, 1],\n  scaleY: [0.8, 1],\n  translateY: [-8, 0],\n  transformOrigin: 'top center',\n  easing: 'easeOutBack',\n  duration: 300\n});`,
        tip: '💡 【実践事例】ナビゲーションバーのサブメニュー、テーブルのカラムフィルターパネル、カスタムデザインのセレクトボックスなど、「クリックで一時的に出現させる立体的なUI部品」全般のアニメーションに。',
        run(n) { anime({ targets: $s(n, '.db'), scaleY: [.5, 1], opacity: [0, 1], loop: true, direction: 'alternate', easing: 'easeOutBack', duration: 600, endDelay: 400 }) },
        realRun(n) {
            const m = $r(n, '#ddmenu' + n), a = $r(n, '#ddarr' + n), t = $r(n, '#ddtrig' + n);
            if (!t || t._bound2) return; t._bound2 = true; m.style.pointerEvents = 'none';
            t.onclick = () => {
                const isOpen = m.style.opacity === '1';
                anime({ targets: m, opacity: isOpen ? 0 : 1, scaleY: isOpen ? [1, .8] : [.8, 1], translateY: isOpen ? [0, -8] : [-8, 0], easing: isOpen ? 'easeInBack' : 'easeOutBack', duration: 280 });
                anime({ targets: a, rotate: isOpen ? 0 : 180, duration: 280 });
                m.style.pointerEvents = isOpen ? 'none' : 'auto';
            };
        }
    },
];
