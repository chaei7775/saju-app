import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const GITHUB_BASE = "https://raw.githubusercontent.com/chaei7775/saju-app/main";

const IMAGE_MAP = {
  N01:"N01.png", N02:"N02.png", N03:"N03.png", N04:"N04.png", N05:"N05.png",
  N06:"N06.png", N08:"N08.png", N09:"N09.png", N10:"N10.png", N11:"N11.png",
  N12:"N12.png", N13:"N13.png", N14:"N14.png", N15:"N15.png", N16:"N16.png",
  N17:"N17.png", N18:"N18.png", N20a:"N20a.png", N20b:"N20b.png", N20c:"N20c.png",
  N26:"N26.png", N27:"N27.png", N28:"N28.png", N29:"N29.png", N30:"N30.png",
  R01:"R01.png", R02:"R02.png", R03:"R03.png", R04:"R04.png", R05:"R05.png",
  R06:"R06.png", R07:"R07.png", R08:"R08.png", R09:"R09.png", R10:"R10.png",
  R11:"R11.png", R12:"R12.png", R13:"R13.png", R14:"R14.png", R15:"R15.png",
  R16:"R16.png", R17:"R17.png", R18:"R18.png", R19:"R19.png", R20:"R20.png",
  SR01:"Sr01.png", SR02:"Sr02.png", SR03:"Sr03.png", SR04:"Sr04.png", SR05:"Sr05.png",
  SR06:"Sr06.png", SR07:"Sr07.png", SR08:"Sr08.png", SR09:"Sr09.png", SR10:"Sr10.png",
  SR11:"Sr11.png", SR12:"Sr12.png", SR13:"Sr13.png", SR14:"Sr14.png", SR15:"Sr15.png",
  SSR01:"Ssr01.png", SSR02:"Ssr02.png", SSR03:"Ssr03.png", SSR04:"Ssr04.png",
  SSR05:"Ssr05.png", SSR06:"Ssr06.png", SSR07:"Ssr07.png",
  UR01:"Ur01.png", UR02:"Ur02.png", UR03:"Ur03.png",
};

const YEONHWA = {
  idle:   `${GITHUB_BASE}/113.png`,
  offer:  `${GITHUB_BASE}/111.png`,
  result: `${GITHUB_BASE}/112.png`,
};

const CARDS = [
  { id:"N01", grade:"N", name:"桜の花びら", desc:"春の訪れを告げる桜の花びら。", fortune:"縁が静かに芽吹いています。" },
  { id:"N02", grade:"N", name:"小石", desc:"川辺で見つけた、まあるい小さな石。", fortune:"足元を固めるときです。" },
  { id:"N03", grade:"N", name:"どんぐり", desc:"森で拾った、ひとつのどんぐり。", fortune:"小さな幸運が転がってきます。" },
  { id:"N04", grade:"N", name:"落ち葉", desc:"秋風に舞い落ちた、ひとひらの葉。", fortune:"手放すことで道が開けます。" },
  { id:"N05", grade:"N", name:"若葉", desc:"春の訪れを感じさせる、やわらかな若葉。", fortune:"新しい始まりの予感。" },
  { id:"N06", grade:"N", name:"桜花びら", desc:"ひらりと舞い落ちた、桜の花びら。", fortune:"美しい出会いが近づいています。" },
  { id:"N08", grade:"N", name:"小石", desc:"川辺で見つけた、まるい小石。", fortune:"地道な努力が実を結びます。" },
  { id:"N09", grade:"N", name:"松ぼっくり", desc:"森の中で見つけた、小さな松ぼっくり。", fortune:"可能性を秘めた時期です。" },
  { id:"N10", grade:"N", name:"鳥の羽根", desc:"道で見つけた、きれいな鳥の羽根。", fortune:"自由への扉が開かれています。" },
  { id:"N11", grade:"N", name:"すみれ", desc:"野原で見つけた、かわいらしいすみれ。", fortune:"素直な心が幸運を呼びます。" },
  { id:"N12", grade:"N", name:"タンポポの綿毛", desc:"そっと風に乗り、遠くへ旅立つ小さな希望。", fortune:"願いは風に乗って届きます。" },
  { id:"N13", grade:"N", name:"新芽", desc:"小さな命が、静かに息づいている。", fortune:"芽吹きの時を待ちましょう。" },
  { id:"N14", grade:"N", name:"花の蕾", desc:"もうすぐ、美しい花が咲くだろう。", fortune:"開花まであと少し。" },
  { id:"N15", grade:"N", name:"三つ葉", desc:"幸運の予感が、そっと近づいてくる。", fortune:"幸運の兆しが見えています。" },
  { id:"N16", grade:"N", name:"銀杏の葉", desc:"秋の訪れを告げる、黄金色の扇。", fortune:"実りの季節が来ています。" },
  { id:"N17", grade:"N", name:"紅葉", desc:"山々を染める、秋の炎。", fortune:"変化を恐れずに進みましょう。" },
  { id:"N18", grade:"N", name:"松葉", desc:"凛とした香りが、心を澄ませてくれる。", fortune:"清らかな心で判断を。" },
  { id:"N20a", grade:"N", name:"貝殻のかけら", desc:"波に磨かれ、優しい形を残している。", fortune:"経験が貴方を磨いています。" },
  { id:"N20b", grade:"N", name:"水滴", desc:"光を映す一粒のしずく、静かに輝く。", fortune:"純粋な気持ちが大切です。" },
  { id:"N20c", grade:"N", name:"稲穂のひと粒", desc:"大地の恵みを宿し、静かに実る。", fortune:"着実な歩みが成果を生みます。" },
  { id:"N26", grade:"N", name:"苔の欠片", desc:"小さな緑が、静かに時を重ねてきた証。", fortune:"時間をかけて育むものがあります。" },
  { id:"N27", grade:"N", name:"種英", desc:"風に揺られ、旅を終えた小さな舟。", fortune:"旅の終わりに宝が待っています。" },
  { id:"N28", grade:"N", name:"柳の葉", desc:"水辺に揺れた、風のしるし。", fortune:"柔軟さが運気を高めます。" },
  { id:"N29", grade:"N", name:"蜘蛛の糸", desc:"朝露にきらめく、儚きつながり。", fortune:"細い縁も大切にしましょう。" },
  { id:"N30", grade:"N", name:"狗尾草の穂", desc:"道ばたで揺れる、やさしい手ざわり。", fortune:"身近な幸福に気づいて。" },
  { id:"R01", grade:"R", name:"四葉守り", desc:"四葉のクローバーを閉じ込めた守り。", fortune:"幸運があなたを包んでいます。" },
  { id:"R02", grade:"R", name:"福鯉", desc:"金色に輝く、縁起の良い鯉。", fortune:"豊かな流れが来ています。" },
  { id:"R03", grade:"R", name:"流星標本", desc:"瓶に封じられた流れ星のかけら。", fortune:"願いが叶う兆しです。" },
  { id:"R04", grade:"R", name:"福猫", desc:"手を挙げて招く、白い招き猫。", fortune:"良縁と幸運を招きます。" },
  { id:"R05", grade:"R", name:"厄除守", desc:"赤い糸で結ばれた、厄除けの守り。", fortune:"厄が払われ道が開けます。" },
  { id:"R06", grade:"R", name:"月結び", desc:"月明かりに結ばれた縁の糸。", fortune:"深い縁が結ばれています。" },
  { id:"R07", grade:"R", name:"願い羽", desc:"天へと届ける、白い羽根。", fortune:"真心の願いが天に届きます。" },
  { id:"R08", grade:"R", name:"星砂瓶", desc:"星の形をした砂を集めた小瓶。", fortune:"小さな奇跡が積み重なります。" },
  { id:"R09", grade:"R", name:"折鶴", desc:"丁寧に折られた、白い鶴。", fortune:"誠実さが幸運を呼びます。" },
  { id:"R10", grade:"R", name:"白狐面", desc:"白狐の神聖な仮面。", fortune:"神の加護があります。" },
  { id:"R11", grade:"R", name:"月結び", desc:"月光に照らされた縁の結び目。", fortune:"絆がより深まります。" },
  { id:"R12", grade:"R", name:"福巾着", desc:"金糸で刺繍された幸運の巾着。", fortune:"財運が上昇しています。" },
  { id:"R13", grade:"R", name:"桜守り札", desc:"桜の花びらを封じた守り札。", fortune:"美しい縁が訪れます。" },
  { id:"R14", grade:"R", name:"星鍵", desc:"星型の飾りが付いた銀の鍵。", fortune:"新しい扉が開かれます。" },
  { id:"R15", grade:"R", name:"招福鈴", desc:"澄んだ音色の、小さな金鈴。", fortune:"幸福を呼ぶ音色が響きます。" },
  { id:"R16", grade:"R", name:"雨雫玉", desc:"雨粒を閉じ込めた、透明な玉。", fortune:"涙の後に虹が輝きます。" },
  { id:"R17", grade:"R", name:"月時計", desc:"月の満ち欠けを示す懐中時計。", fortune:"時機が熟してきています。" },
  { id:"R18", grade:"R", name:"風鈴", desc:"涼やかな音を立てる、夏の風鈴。", fortune:"爽やかな変化が来ます。" },
  { id:"R19", grade:"R", name:"金魚灯", desc:"金魚型の美しい提灯。", fortune:"明るい未来が照らされています。" },
  { id:"R20", grade:"R", name:"月兎", desc:"月で餅をつく、白い兎。", fortune:"粘り強さが実を結びます。" },
  { id:"SR01", grade:"SR", name:"蛍の子", desc:"夜に光る、魂を宿した蛍。", fortune:"光の中に導きがあります。" },
  { id:"SR02", grade:"SR", name:"月雫の子", desc:"月の雫から生まれた精霊。", fortune:"感受性が高まっています。" },
  { id:"SR03", grade:"SR", name:"芽吹きの子", desc:"大地から芽吹いた命の精霊。", fortune:"成長の時が来ています。" },
  { id:"SR04", grade:"SR", name:"狐火の子", desc:"青白い狐火を纏う精霊。", fortune:"直感を信じてください。" },
  { id:"SR05", grade:"SR", name:"鈴猫の子", desc:"鈴を付けた神聖な猫の精霊。", fortune:"良い知らせが届きます。" },
  { id:"SR06", grade:"SR", name:"蓮華の子", desc:"蓮の花から生まれた清らかな精霊。", fortune:"純粋な心で進みましょう。" },
  { id:"SR07", grade:"SR", name:"蜜守りの子", desc:"花の蜜を守る精霊。", fortune:"甘い縁が近づいています。" },
  { id:"SR08", grade:"SR", name:"白梟の子", desc:"白いフクロウの姿をした知恵の精霊。", fortune:"賢明な判断が吉を呼びます。" },
  { id:"SR09", grade:"SR", name:"雨灯りの子", desc:"雨の中で光る提灯の精霊。", fortune:"試練の中に光があります。" },
  { id:"SR10", grade:"SR", name:"紙鶴の娘", desc:"折鶴から生まれた美しい精霊。", fortune:"誠実な心が奇跡を起こします。" },
  { id:"SR11", grade:"SR", name:"鹿角の童", desc:"鹿の角を持つ森の精霊。", fortune:"自然の力があなたを守ります。" },
  { id:"SR12", grade:"SR", name:"蜜守りの子", desc:"甘い蜜を運ぶ精霊。", fortune:"豊かな恵みが訪れます。" },
  { id:"SR13", grade:"SR", name:"蓮華童子", desc:"蓮の花に座る神聖な童子。", fortune:"悟りの光が差し込みます。" },
  { id:"SR14", grade:"SR", name:"蜜守りの子", desc:"花園を守る精霊の童子。", fortune:"大切なものを守る力が宿ります。" },
  { id:"SR15", grade:"SR", name:"星梟の子", desc:"星空を飛ぶ梟の精霊。", fortune:"高みを目指す時です。" },
  { id:"SSR01", grade:"SSR", name:"招福猫", desc:"天界から遣わされた招福の神猫。", fortune:"大いなる幸運が訪れます。" },
  { id:"SSR02", grade:"SSR", name:"福梟の巫女", desc:"星を読む梟を従えた神秘の巫女。", fortune:"運命の扉が開かれます。" },
  { id:"SSR03", grade:"SSR", name:"星札烏", desc:"天界の文を運ぶ神聖な烏。", fortune:"天からの啓示が届きます。" },
  { id:"SSR04", grade:"SSR", name:"花灯流し", desc:"千の願いを流す幻の灯籠流し。", fortune:"深い願いが成就します。" },
  { id:"SSR05", grade:"SSR", name:"桜守り", desc:"桜の精霊を従えた春の守り神。", fortune:"最高の縁が結ばれます。" },
  { id:"SSR06", grade:"SSR", name:"月兎の巫", desc:"月兎を従えた月光の巫女。", fortune:"月の加護があなたを包みます。" },
  { id:"SSR07", grade:"SSR", name:"鈴守結び", desc:"神の鈴で縁を結ぶ守護神。", fortune:"神聖な縁が今結ばれています。" },
  { id:"UR01", grade:"UR", name:"奉納神楽", desc:"神々に捧げる、魂の神楽舞。", fortune:"神が直接あなたの縁を結びます。" },
  { id:"UR02", grade:"UR", name:"月光祈願", desc:"月光の中で行われる秘儀の祈り。", fortune:"宇宙の力があなたに宿ります。" },
  { id:"UR03", grade:"UR", name:"紅糸結願", desc:"運命の赤い糸が今、結ばれる。", fortune:"魂の伴侶との出会いが訪れます。" },
];

const GRADE_CONFIG = {
  N:   { color: "#9a8a70", bg: "rgba(154,138,112,0.15)", border: "rgba(154,138,112,0.4)", label: "N" },
  R:   { color: "#c9a96e", bg: "rgba(201,169,110,0.15)", border: "rgba(201,169,110,0.5)", label: "R" },
  SR:  { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.5)", label: "SR" },
  SSR: { color: "#f87171", bg: "rgba(248,113,113,0.18)", border: "rgba(248,113,113,0.6)", label: "SSR" },
  UR:  { color: "#ffd700", bg: "rgba(255,215,0,0.18)",   border: "rgba(255,215,0,0.8)",   label: "UR" },
};

function drawCard() {
  const r = Math.random();
  let grade = "N";
  if (r < 0.01)      grade = "UR";
  else if (r < 0.05) grade = "SSR";
  else if (r < 0.17) grade = "SR";
  else if (r < 0.45) grade = "R";
  const pool = CARDS.filter(c => c.grade === grade);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getToday() { return new Date().toISOString().slice(0, 10); }

// ── 등급별 연출 CSS 애니메이션 ──────────────────────────────
const REVEAL_STYLES = `
  /* 공통 */
  .reveal-overlay {
    position: fixed; inset: 0; z-index: 100;
    display: flex; align-items: center; justify-content: center;
    background: rgba(0,0,0,0.85);
    animation: overlayIn 0.3s ease;
  }
  @keyframes overlayIn { from { opacity:0 } to { opacity:1 } }

  .reveal-box {
    position: relative;
    display: flex; flex-direction: column; align-items: center;
    gap: 16px;
  }

  /* 카드 이미지 */
  .reveal-card-img {
    width: 200px; height: 280px;
    border-radius: 16px;
    object-fit: cover;
  }

  /* ── R: 오망성 회전 ── */
  .pentagram {
    position: absolute;
    width: 260px; height: 260px;
    top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .pentagram svg {
    width: 100%; height: 100%;
    animation: pentaSpin 1.2s ease-out forwards;
  }
  @keyframes pentaSpin {
    0%   { transform: rotate(0deg) scale(0.4); opacity: 0; }
    40%  { opacity: 1; }
    80%  { transform: rotate(360deg) scale(1.1); opacity: 1; }
    100% { transform: rotate(400deg) scale(1); opacity: 0; }
  }
  .r-card-in {
    animation: rCardIn 0.5s 0.9s ease both;
  }
  @keyframes rCardIn {
    from { transform: scale(0.6) rotate(-10deg); opacity: 0; }
    to   { transform: scale(1) rotate(0deg); opacity: 1; }
  }

  /* ── UR: 산산조각 후 재조립 ── */
  .ur-shatter-wrap {
    position: relative; width: 200px; height: 280px;
  }
  .shard {
    position: absolute;
    background: #ffd700;
    border-radius: 2px;
    animation: shardOut 0.6s ease-out forwards, shardIn 0.5s 1.0s ease forwards;
    opacity: 0;
  }
  @keyframes shardOut {
    0%   { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
    100% { opacity: 0; transform: translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(0.3); }
  }
  @keyframes shardIn {
    0%   { opacity: 0; transform: translate(var(--tx),var(--ty)) rotate(var(--rot)) scale(0.3); }
    100% { opacity: 1; transform: translate(0,0) rotate(0deg) scale(1); }
  }
  .ur-img-in {
    animation: urImgIn 0.6s 1.5s ease both;
    opacity: 0;
  }
  @keyframes urImgIn {
    from { opacity: 0; filter: brightness(3); transform: scale(1.1); }
    to   { opacity: 1; filter: brightness(1); transform: scale(1); }
  }
  .ur-glow-ring {
    position: absolute; inset: -20px;
    border-radius: 20px;
    box-shadow: 0 0 60px 20px rgba(255,215,0,0.6);
    animation: urGlow 2s 1.5s ease-in-out infinite alternate;
    pointer-events: none;
  }
  @keyframes urGlow {
    from { box-shadow: 0 0 40px 10px rgba(255,215,0,0.5); }
    to   { box-shadow: 0 0 80px 30px rgba(255,215,0,0.9); }
  }

  /* ── SSR: 칼 빛 + 금 ── */
  .ssr-slash {
    position: absolute;
    top: 50%; left: -10%;
    width: 120%; height: 3px;
    background: linear-gradient(90deg, transparent, #fff, #ffd700, #fff, transparent);
    transform: translateY(-50%) rotate(var(--angle));
    animation: slashMove 0.25s var(--delay) ease-out forwards;
    opacity: 0;
    pointer-events: none;
    filter: blur(1px);
  }
  @keyframes slashMove {
    0%   { opacity: 0; transform: translateY(-50%) rotate(var(--angle)) scaleX(0); }
    30%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(calc(-50% + var(--shift))) rotate(var(--angle)) scaleX(1.2); }
  }
  .crack-line {
    position: absolute;
    background: linear-gradient(var(--dir), transparent 0%, #ffd700 50%, transparent 100%);
    animation: crackForm 0.3s var(--cdelay) ease forwards, crackFade 0.5s 1.2s ease forwards;
    opacity: 0;
    pointer-events: none;
  }
  @keyframes crackForm {
    from { opacity: 0; }
    to   { opacity: 0.8; }
  }
  @keyframes crackFade {
    from { opacity: 0.8; filter: brightness(2); }
    to   { opacity: 0; filter: brightness(1); }
  }
  .ssr-img-in {
    animation: ssrImgIn 0.7s 1.4s cubic-bezier(0.34,1.56,0.64,1) both;
    opacity: 0;
  }
  @keyframes ssrImgIn {
    from { opacity: 0; transform: scale(0.7); filter: brightness(4) saturate(0); }
    to   { opacity: 1; transform: scale(1);   filter: brightness(1) saturate(1); }
  }

  /* 등급 뱃지 */
  .reveal-grade {
    font-size: 11px; letter-spacing: 4px;
    font-weight: 700; padding: 4px 14px;
    border-radius: 20px;
    animation: fadeInUp 0.5s 1.8s ease both;
  }
  .reveal-name {
    font-size: 22px; font-weight: 700;
    letter-spacing: 2px;
    animation: fadeInUp 0.5s 2.0s ease both;
    opacity: 0;
  }
  .reveal-fortune {
    font-size: 13px; text-align: center;
    max-width: 260px; line-height: 1.8;
    animation: fadeInUp 0.5s 2.2s ease both;
    opacity: 0;
    color: #e8dcc8;
  }
  .reveal-close {
    margin-top: 8px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: #e8dcc8; font-size: 13px;
    padding: 8px 28px; border-radius: 20px;
    cursor: pointer; letter-spacing: 2px;
    animation: fadeInUp 0.5s 2.5s ease both;
    opacity: 0;
    transition: border-color 0.2s;
  }
  .reveal-close:hover { border-color: rgba(255,255,255,0.5); }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// ── R 연출: 오망성 ──────────────────────────────────────────
function RevealR({ card, imgSrc, cfg, onClose }) {
  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-box" onClick={e => e.stopPropagation()}>
        <div style={{ position:"relative", width:200, height:280 }}>
          <div className="pentagram">
            <svg viewBox="0 0 100 100">
              <polygon
                points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
                fill="none"
                stroke={cfg.color}
                strokeWidth="2"
                opacity="0.9"
              />
            </svg>
          </div>
          <img src={imgSrc} className="reveal-card-img r-card-in" alt={card.name} />
        </div>
        <div className="reveal-grade" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </div>
        <div className="reveal-name" style={{ color: cfg.color }}>{card.name}</div>
        <div className="reveal-fortune">💮 {card.fortune}</div>
        <button className="reveal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

// ── UR 연출: 산산조각 후 재조립 ────────────────────────────
function RevealUR({ card, imgSrc, cfg, onClose }) {
  const shards = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    tx: `${(Math.random() - 0.5) * 300}px`,
    ty: `${(Math.random() - 0.5) * 300}px`,
    rot: `${(Math.random() - 0.5) * 720}deg`,
    w: `${20 + Math.random() * 40}px`,
    h: `${20 + Math.random() * 40}px`,
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
    delay: `${Math.random() * 0.3}s`,
  }));

  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-box" onClick={e => e.stopPropagation()}>
        <div className="ur-shatter-wrap">
          {shards.map(s => (
            <div key={s.id} className="shard" style={{
              width: s.w, height: s.h,
              top: s.top, left: s.left,
              "--tx": s.tx, "--ty": s.ty, "--rot": s.rot,
              animationDelay: s.delay,
            }} />
          ))}
          <div className="ur-glow-ring" />
          <img src={imgSrc} className="reveal-card-img ur-img-in" alt={card.name}
            style={{ position:"absolute", top:0, left:0 }} />
        </div>
        <div className="reveal-grade" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </div>
        <div className="reveal-name" style={{ color: cfg.color }}>{card.name}</div>
        <div className="reveal-fortune">✨ {card.fortune}</div>
        <button className="reveal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

// ── SSR 연출: 칼 빛 + 금 ───────────────────────────────────
function RevealSSR({ card, imgSrc, cfg, onClose }) {
  const slashes = [
    { angle: "-15deg", delay: "0s",    shift: "-20px" },
    { angle:  "10deg", delay: "0.2s",  shift:  "15px" },
    { angle: "-5deg",  delay: "0.4s",  shift: "-10px" },
  ];
  const cracks = [
    { dir: "135deg", top:"20%", left:"30%", w:"2px", h:"60px", cdelay:"0.3s" },
    { dir: "160deg", top:"40%", left:"55%", w:"2px", h:"80px", cdelay:"0.5s" },
    { dir: "120deg", top:"10%", left:"60%", w:"2px", h:"50px", cdelay:"0.65s" },
    { dir: "145deg", top:"60%", left:"20%", w:"2px", h:"70px", cdelay:"0.45s" },
  ];

  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-box" onClick={e => e.stopPropagation()}>
        <div style={{ position:"relative", width:200, height:280 }}>
          {slashes.map((s, i) => (
            <div key={i} className="ssr-slash" style={{
              "--angle": s.angle, "--delay": s.delay, "--shift": s.shift,
            }} />
          ))}
          {cracks.map((c, i) => (
            <div key={i} className="crack-line" style={{
              top: c.top, left: c.left,
              width: c.w, height: c.h,
              "--dir": c.dir, "--cdelay": c.cdelay,
            }} />
          ))}
          <img src={imgSrc} className="reveal-card-img ssr-img-in" alt={card.name} />
        </div>
        <div className="reveal-grade" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </div>
        <div className="reveal-name" style={{ color: cfg.color }}>{card.name}</div>
        <div className="reveal-fortune">🔥 {card.fortune}</div>
        <button className="reveal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

// ── 기본 연출 (N/SR) ───────────────────────────────────────
function RevealBasic({ card, imgSrc, cfg, onClose }) {
  return (
    <div className="reveal-overlay" onClick={onClose}>
      <div className="reveal-box" onClick={e => e.stopPropagation()}>
        <img src={imgSrc} className="reveal-card-img r-card-in" alt={card.name} />
        <div className="reveal-grade" style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
          {cfg.label}
        </div>
        <div className="reveal-name" style={{ color: cfg.color }}>{card.name}</div>
        <div className="reveal-fortune">🌸 {card.fortune}</div>
        <button className="reveal-close" onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

export default function Gacha() {
  const [phase, setPhase] = useState("ready");
  const [card, setCard] = useState(null);
  const [usedToday, setUsedToday] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [yeonhwaImg, setYeonhwaImg] = useState(YEONHWA.idle);
  const [yeonhwaMsg, setYeonhwaMsg] = useState("あなたの縁を読みます…");
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("gacha_last_date");
    if (last === getToday()) setUsedToday(true);
  }, []);

  const pull = () => {
    if (usedToday) return;
    setPhase("spinning");
    setImgError(false);
    setShowReveal(false);

    setYeonhwaImg(YEONHWA.offer);
    setYeonhwaMsg("運命の牌を選んでいます…");

    setTimeout(() => {
      setYeonhwaImg(YEONHWA.result);
      setYeonhwaMsg("占卦が現れました…");
    }, 1000);

    setTimeout(() => {
      const drawn = drawCard();
      setCard(drawn);
      setPhase("result");
      setShowReveal(true);
      localStorage.setItem("gacha_last_date", getToday());
      setUsedToday(true);
      setYeonhwaMsg("蓮花があなたに告げます…");
    }, 2200);
  };

  const reset = () => {
    setPhase("ready");
    setCard(null);
    setShowReveal(false);
    setYeonhwaImg(YEONHWA.idle);
    setYeonhwaMsg("あなたの縁を読みます…");
  };

  const cfg = card ? GRADE_CONFIG[card.grade] : null;
  const imgSrc = card ? `${GITHUB_BASE}/${IMAGE_MAP[card.id]}` : "";

  function renderReveal() {
    if (!showReveal || !card) return null;
    const props = { card, imgSrc, cfg, onClose: reset };
    if (card.grade === "UR")  return <RevealUR {...props} />;
    if (card.grade === "SSR") return <RevealSSR {...props} />;
    if (card.grade === "R")   return <RevealR {...props} />;
    return <RevealBasic {...props} />;
  }

  return (
    <>
      <Head>
        <title>縁起物ガチャ — 연화 蓮花</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07050f; font-family: 'Shippori Mincho', serif; }
        .app {
          min-height: 100vh;
          background: radial-gradient(ellipse at 20% 20%, rgba(120,40,140,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(40,20,80,0.25) 0%, transparent 60%),
                      radial-gradient(ellipse at 50% 50%, rgba(7,5,15,1) 0%, rgba(7,5,15,1) 100%);
          color: #e8dcc8;
          padding: 40px 20px 60px;
          display: flex; flex-direction: column; align-items: center;
        }
        .back-link { display:inline-block; color:#9a8a70; font-size:12px; letter-spacing:2px; text-decoration:none; margin-bottom:24px; align-self:flex-start; }
        .header { text-align:center; margin-bottom:32px; }
        .header-title { font-family:'Shippori Mincho',serif; font-size:26px; letter-spacing:6px; color:#e8dcc8; }
        .header-sub { font-size:11px; color:#9a8a70; letter-spacing:3px; margin-top:6px; }
        .yeonhwa-wrap { position:relative; width:100%; display:flex; flex-direction:column; align-items:center; margin-bottom:28px; }
        .yeonhwa-img { width:220px; height:280px; object-fit:cover; border-radius:20px; border:1px solid rgba(201,169,110,0.3); box-shadow:0 0 40px rgba(167,139,250,0.15); transition:all 0.5s ease; }
        .yeonhwa-img.offer { transform:scale(1.03); }
        .yeonhwa-img.result { box-shadow:0 0 60px rgba(201,169,110,0.3); }
        .yeonhwa-msg { margin-top:12px; font-size:12px; color:#9a8a70; letter-spacing:2px; text-align:center; min-height:20px; transition:opacity 0.3s; }
        .btn-area { width:100%; max-width:300px; text-align:center; }
        .free-note { font-size:12px; color:#9a8a70; margin-bottom:10px; }
        .free-note span { color:#c9a96e; }
        .used-note { font-size:13px; color:#9a8a70; margin-bottom:10px; }
        .btn-pull { width:100%; padding:14px; background:linear-gradient(135deg,rgba(120,40,140,0.6),rgba(60,20,80,0.8)); border:1px solid rgba(167,139,250,0.4); border-radius:12px; color:#e8dcc8; font-family:'Shippori Mincho',serif; font-size:16px; letter-spacing:3px; cursor:pointer; transition:all 0.2s; }
        .btn-pull:hover:not(:disabled) { border-color:rgba(167,139,250,0.8); box-shadow:0 0 20px rgba(167,139,250,0.2); }
        .btn-pull:disabled { opacity:0.4; cursor:not-allowed; }
        .petal { position:fixed; pointer-events:none; top:-20px; font-size:14px; animation:fall linear infinite; opacity:0.6; }
        @keyframes fall { 0%{transform:translateY(0) rotate(0deg); opacity:0.6;} 100%{transform:translateY(110vh) rotate(360deg); opacity:0;} }
        ${REVEAL_STYLES}
      `}</style>

      <div className="app">
        {["10%","25%","40%","60%","75%","90%"].map((l, i) => (
          <div key={i} className="petal" style={{ left:l, animationDuration:`${6+i*2}s`, animationDelay:`${i*1.5}s` }}>🌸</div>
        ))}

        <Link href="/" className="back-link">← 戻る</Link>

        <div className="header">
          <div className="header-title">縁起物ガチャ</div>
          <div className="header-sub">◈ 蓮花が縁を結ぶ ◈</div>
        </div>

        <div className="yeonhwa-wrap">
          <img
            src={yeonhwaImg}
            alt="연화"
            className={`yeonhwa-img ${phase}`}
            onError={() => {}}
          />
          <div className="yeonhwa-msg">{yeonhwaMsg}</div>
        </div>

        {(phase === "ready" || phase === "spinning") && (
          <div className="btn-area">
            {usedToday
              ? <div className="used-note">今日の占いは済んでいます。また明日…</div>
              : <div className="free-note">本日の縁結び <span>無料</span></div>
            }
            <button className="btn-pull" onClick={pull} disabled={usedToday || phase === "spinning"}>
              {phase === "spinning" ? "蓮花が読んでいます…" : "縁を結ぶ"}
            </button>
          </div>
        )}

        {renderReveal()}
      </div>
    </>
  );
}
