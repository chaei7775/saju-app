import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

const PAYPAL_CLIENT_ID = "AbzuG1qJF_aNUTmXnfBIm15uBtcTtrMpkh_pdftQvOukOFvxfl1bXWpV2nbVk2qhkW6x84p5QoyRahzE";
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
  N:   { color: "#9a8a70", bg: "rgba(154,138,112,0.15)", border: "rgba(154,138,112,0.4)", label: "N",   glow: "rgba(154,138,112,0.3)" },
  R:   { color: "#c9a96e", bg: "rgba(201,169,110,0.15)", border: "rgba(201,169,110,0.5)", label: "R",   glow: "rgba(201,169,110,0.5)" },
  SR:  { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.5)", label: "SR",  glow: "rgba(167,139,250,0.6)" },
  SSR: { color: "#f87171", bg: "rgba(248,113,113,0.18)", border: "rgba(248,113,113,0.6)", label: "SSR", glow: "rgba(248,113,113,0.7)" },
  UR:  { color: "#ffd700", bg: "rgba(255,215,0,0.18)",   border: "rgba(255,215,0,0.8)",   label: "UR",  glow: "rgba(255,215,0,0.9)" },
};

const PACKAGES = [
  { id:"single", label:"1回", count:1, baseJPY:100, discountJPY:70, usd:"0.67", usdDiscount:"0.47" },
  { id:"ten",    label:"10回", count:10, baseJPY:900, discountJPY:630, usd:"6.00", usdDiscount:"4.20" },
];

// 카드 뒷면 디자인 (등급별 색상)
const CARD_BACK_COLORS = {
  N:   ["#2a2018", "#3d3025"],
  R:   ["#1a1505", "#2d2208"],
  SR:  ["#0d0820", "#1a1035"],
  SSR: ["#200808", "#350f0f"],
  UR:  ["#1a1400", "#302500"],
};

function drawCard(pityCount) {
  const r = Math.random();
  let grade = "N";
  if (pityCount >= 99)       grade = "UR";
  else if (pityCount >= 49)  grade = "SSR";
  else if (pityCount >= 9)   grade = "SR";
  else if (r < 0.01)         grade = "UR";
  else if (r < 0.05)         grade = "SSR";
  else if (r < 0.17)         grade = "SR";
  else if (r < 0.45)         grade = "R";
  const pool = CARDS.filter(c => c.grade === grade);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getToday() { return new Date().toISOString().slice(0, 10); }

// ── 10장 카드 선택 연출 ──────────────────────────────────────
function TenCardSelect({ cards, onAllFlipped }) {
  const [flipped, setFlipped] = useState(Array(10).fill(false));
  const [revealed, setRevealed] = useState(Array(10).fill(false));
  const [selectedCard, setSelectedCard] = useState(null);
  const allFlippedRef = useRef(false);

  const handleFlip = (idx) => {
    if (flipped[idx]) return;
    const newFlipped = [...flipped];
    newFlipped[idx] = true;
    setFlipped(newFlipped);

    // 뒤집히는 애니메이션 후 앞면 표시
    setTimeout(() => {
      const newRevealed = [...revealed];
      newRevealed[idx] = true;
      setRevealed(newRevealed);
      setSelectedCard(cards[idx]);
    }, 300);

    // 모두 뒤집혔는지 확인
    const allDone = newFlipped.every(Boolean);
    if (allDone && !allFlippedRef.current) {
      allFlippedRef.current = true;
      setTimeout(() => onAllFlipped(cards), 800);
    }
  };

  const handleFlipAll = () => {
    cards.forEach((_, idx) => {
      setTimeout(() => handleFlip(idx), idx * 120);
    });
  };

  const cfg = selectedCard ? GRADE_CONFIG[selectedCard.grade] : null;

  // 카드 위치 (2행 5열 배치)
  const positions = Array.from({ length: 10 }, (_, i) => ({
    row: Math.floor(i / 5),
    col: i % 5,
  }));

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.92)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      animation: "overlayIn 0.4s ease",
    }}>
      {/* 상단 안내 */}
      <div style={{
        fontSize: 13, color: "#9a8a70", letterSpacing: 3,
        marginBottom: 24, textAlign: "center",
        animation: "fadeInUp 0.5s ease both",
      }}>
        カードを選んでください
      </div>

      {/* 카드 그리드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 10,
        padding: "0 16px",
        maxWidth: 380,
        width: "100%",
      }}>
        {cards.map((card, idx) => {
          const cfg = GRADE_CONFIG[card.grade];
          const isFlipped = flipped[idx];
          const isRevealed = revealed[idx];

          return (
            <div
              key={idx}
              onClick={() => handleFlip(idx)}
              style={{
                perspective: "600px",
                cursor: isFlipped ? "default" : "pointer",
                animation: `cardFloat 0.6s ${idx * 0.06}s ease both`,
              }}
            >
              <div style={{
                position: "relative",
                width: "100%",
                paddingBottom: "145%",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}>
                {/* 카드 뒷면 */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #1a0f2e, #0d0820)",
                  border: "1px solid rgba(167,139,250,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: isFlipped ? "none" : "0 0 12px rgba(167,139,250,0.15)",
                  transition: "box-shadow 0.3s",
                }}>
                  <div style={{
                    width: "60%", height: "60%",
                    border: "1px solid rgba(167,139,250,0.3)",
                    borderRadius: 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, opacity: 0.6,
                  }}>🪷</div>
                </div>

                {/* 카드 앞면 */}
                <div style={{
                  position: "absolute", inset: 0,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  borderRadius: 8,
                  overflow: "hidden",
                  border: `1px solid ${cfg.border}`,
                  boxShadow: isRevealed ? `0 0 16px ${cfg.glow}` : "none",
                }}>
                  <img
                    src={`${GITHUB_BASE}/${IMAGE_MAP[card.id]}`}
                    alt={card.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* 등급 뱃지 */}
                  {isRevealed && (
                    <div style={{
                      position: "absolute", top: 4, right: 4,
                      background: cfg.bg,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                      borderRadius: 4,
                      fontSize: 9, fontWeight: 700,
                      padding: "1px 4px",
                      letterSpacing: 1,
                      animation: "fadeInUp 0.3s ease both",
                    }}>{cfg.label}</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 선택된 카드 이름 표시 */}
      <div style={{
        marginTop: 20, height: 40,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {selectedCard && cfg && (
          <div style={{
            fontSize: 14, color: cfg.color, letterSpacing: 2,
            animation: "fadeInUp 0.3s ease both",
          }}>
            {selectedCard.name}
          </div>
        )}
      </div>

      {/* 전체 뒤집기 버튼 */}
      <button
        onClick={handleFlipAll}
        style={{
          marginTop: 8,
          background: "transparent",
          border: "1px solid rgba(167,139,250,0.4)",
          color: "#a78bfa",
          fontSize: 13,
          padding: "8px 24px",
          borderRadius: 20,
          cursor: "pointer",
          letterSpacing: 2,
          fontFamily: "'Shippori Mincho', serif",
          animation: "fadeInUp 0.5s 0.8s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        すべて開く
      </button>
    </div>
  );
}

// ── 결과 요약 화면 ────────────────────────────────────────────
function ResultSummary({ cards, onClose }) {
  // 최고 등급 카드 찾기
  const gradeOrder = ["UR", "SSR", "SR", "R", "N"];
  const best = cards.reduce((a, b) =>
    gradeOrder.indexOf(a.grade) < gradeOrder.indexOf(b.grade) ? a : b
  );
  const bestCfg = GRADE_CONFIG[best.grade];

  // 등급별 집계
  const counts = { UR: 0, SSR: 0, SR: 0, R: 0, N: 0 };
  cards.forEach(c => counts[c.grade]++);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,0.95)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      animation: "overlayIn 0.4s ease",
      padding: "0 20px",
    }}>
      {/* 최고 등급 강조 */}
      <div style={{
        fontSize: 11, color: "#9a8a70", letterSpacing: 4,
        marginBottom: 12, animation: "fadeInUp 0.5s ease both",
      }}>結果発表</div>

      <div style={{
        fontSize: 22, fontWeight: 700, color: bestCfg.color,
        letterSpacing: 3, marginBottom: 4,
        animation: "fadeInUp 0.5s 0.2s ease both", opacity: 0,
        animationFillMode: "forwards",
        textShadow: `0 0 20px ${bestCfg.glow}`,
      }}>
        {best.name}
      </div>

      <div style={{
        fontSize: 11, color: bestCfg.color, letterSpacing: 2,
        background: bestCfg.bg, border: `1px solid ${bestCfg.border}`,
        padding: "3px 12px", borderRadius: 20, marginBottom: 20,
        animation: "fadeInUp 0.5s 0.3s ease both", opacity: 0,
        animationFillMode: "forwards",
      }}>
        {bestCfg.label} BEST
      </div>

      {/* 10장 미니 카드 */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5,1fr)",
        gap: 6, maxWidth: 320, width: "100%", marginBottom: 20,
        animation: "fadeInUp 0.5s 0.4s ease both", opacity: 0,
        animationFillMode: "forwards",
      }}>
        {cards.map((card, idx) => {
          const cfg = GRADE_CONFIG[card.grade];
          return (
            <div key={idx} style={{
              paddingBottom: "145%", position: "relative",
              borderRadius: 6, overflow: "hidden",
              border: `1px solid ${cfg.border}`,
              boxShadow: `0 0 8px ${cfg.glow}`,
            }}>
              <img
                src={`${GITHUB_BASE}/${IMAGE_MAP[card.id]}`}
                alt={card.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{
                position: "absolute", bottom: 2, left: 0, right: 0,
                textAlign: "center", fontSize: 8, color: cfg.color,
                background: "rgba(0,0,0,0.6)", padding: "1px 0",
              }}>{cfg.label}</div>
            </div>
          );
        })}
      </div>

      {/* 등급 집계 */}
      <div style={{
        display: "flex", gap: 12, marginBottom: 24,
        animation: "fadeInUp 0.5s 0.5s ease both", opacity: 0,
        animationFillMode: "forwards",
      }}>
        {gradeOrder.filter(g => counts[g] > 0).map(g => (
          <div key={g} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: GRADE_CONFIG[g].color }}>{counts[g]}</div>
            <div style={{ fontSize: 10, color: "#9a8a70", letterSpacing: 1 }}>{g}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#e8dcc8",
          fontSize: 13, padding: "10px 32px",
          borderRadius: 20, cursor: "pointer",
          letterSpacing: 2, fontFamily: "'Shippori Mincho', serif",
          animation: "fadeInUp 0.5s 0.6s ease both", opacity: 0,
          animationFillMode: "forwards",
        }}
      >
        閉じる
      </button>
    </div>
  );
}

// ── 결제 모달 ────────────────────────────────────────────────
function PaymentModal({ onClose, onSuccess, hasSajuDiscount }) {
  const paypalRef1 = useRef(null);
  const paypalRef10 = useRef(null);

  useEffect(() => {
    if (!window.paypal) return;
    const price1 = hasSajuDiscount ? "0.47" : "0.67";
    const price10 = hasSajuDiscount ? "4.20" : "6.00";
    const label1 = hasSajuDiscount ? "1回 70円（占い割引）" : "1回 100円";
    const label10 = hasSajuDiscount ? "10回 630円（占い割引）" : "10回 900円";

    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: price1, currency_code: "USD" }, description: label1 }]
      }),
      onApprove: (data, actions) => actions.order.capture().then(() => { onSuccess(1); onClose(); }),
    }).render(paypalRef1.current);

    window.paypal.Buttons({
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: price10, currency_code: "USD" }, description: label10 }]
      }),
      onApprove: (data, actions) => actions.order.capture().then(() => { onSuccess(10); onClose(); }),
    }).render(paypalRef10.current);
  }, []);

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{background:"#1a1025",borderRadius:"24px 24px 0 0",padding:"28px 20px 48px",width:"100%",maxWidth:480}} onClick={e=>e.stopPropagation()}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:18,fontWeight:700,color:"#e8dcc8",letterSpacing:2}}>🪷 追加ガチャ</div>
          {hasSajuDiscount && <div style={{fontSize:12,color:"#a78bfa",marginTop:6,letterSpacing:1}}>✨ 占い割引 30% OFF 適用中</div>}
        </div>
        <div style={{marginBottom:20}}>
          <div style={{fontSize:13,color:"#9a8a70",marginBottom:8,letterSpacing:1}}>
            {hasSajuDiscount ? "1回 70円" : "1回 100円"}
          </div>
          <div ref={paypalRef1}/>
        </div>
        <div>
          <div style={{fontSize:13,color:"#9a8a70",marginBottom:8,letterSpacing:1}}>
            {hasSajuDiscount ? "10回 630円" : "10回 900円"}
          </div>
          <div ref={paypalRef10}/>
        </div>
        <button onClick={onClose} style={{width:"100%",marginTop:16,padding:"10px",background:"transparent",border:"1px solid rgba(255,255,255,0.15)",borderRadius:12,color:"#9a8a70",fontSize:13,cursor:"pointer"}}>閉じる</button>
      </div>
    </div>
  );
}

export default function Gacha() {
  const [phase, setPhase] = useState("ready"); // ready | spinning | selecting | result
  const [drawnCards, setDrawnCards] = useState([]);
  const [usedToday, setUsedToday] = useState(false);
  const [freeCount, setFreeCount] = useState(0);
  const [pityCount, setPityCount] = useState(0);
  const [yeonhwaImg, setYeonhwaImg] = useState(YEONHWA.idle);
  const [yeonhwaMsg, setYeonhwaMsg] = useState("あなたの縁を読みます…");
  const [showPayment, setShowPayment] = useState(false);
  const [hasSajuDiscount, setHasSajuDiscount] = useState(false);
  const [paypalReady, setPaypalReady] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("gacha_last_date");
    const joined = localStorage.getItem("gacha_joined");
    const free = parseInt(localStorage.getItem("gacha_free_count") || "0");
    const pity = parseInt(localStorage.getItem("gacha_pity") || "0");
    const sajuDate = localStorage.getItem("saju_used_date");

    if (last === getToday()) setUsedToday(true);
    if (!joined) {
      localStorage.setItem("gacha_joined", "true");
      localStorage.setItem("gacha_free_count", "3");
      setFreeCount(3);
    } else {
      setFreeCount(free);
    }
    setPityCount(pity);
    if (sajuDate === getToday()) setHasSajuDiscount(true);
  }, []);

  const doGacha = (count = 1) => {
    setPhase("spinning");
    setYeonhwaImg(YEONHWA.offer);
    setYeonhwaMsg("運命の牌を選んでいます…");

    setTimeout(() => {
      setYeonhwaImg(YEONHWA.result);
      setYeonhwaMsg("蓮花があなたに告げます…");
    }, 800);

    setTimeout(() => {
      // 10장 뽑기 (1장이어도 10장 연출)
      const drawCount = 10;
      let newPity = pityCount;
      const cards = Array.from({ length: drawCount }, () => {
        newPity++;
        return drawCard(newPity);
      });
      // count가 1이면 첫 번째 카드만 실제 결과, 나머지는 더미
      setPityCount(count === 1 ? pityCount + 1 : newPity);
      localStorage.setItem("gacha_pity", String(count === 1 ? pityCount + 1 : newPity));
      localStorage.setItem("gacha_last_date", getToday());
      setUsedToday(true);
      setDrawnCards(cards);
      setPhase("selecting");
    }, 1600);
  };

  const pull = () => {
    if (freeCount > 0) {
      const newCount = freeCount - 1;
      setFreeCount(newCount);
      localStorage.setItem("gacha_free_count", String(newCount));
      doGacha(1);
    } else if (!usedToday) {
      doGacha(1);
    }
  };

  const onPaymentSuccess = (count) => {
    doGacha(count);
  };

  const handleAllFlipped = (cards) => {
    setShowResult(true);
  };

  const reset = () => {
    setPhase("ready");
    setDrawnCards([]);
    setShowResult(false);
    setYeonhwaImg(YEONHWA.idle);
    setYeonhwaMsg("あなたの縁を読みます…");
  };

  const canFreePlay = freeCount > 0 || !usedToday;
  const nextSR = 10 - (pityCount % 10);
  const nextSSR = 50 - (pityCount % 50);
  const nextUR = 100 - (pityCount % 100);

  return (
    <>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`}
        onLoad={() => setPaypalReady(true)}
      />
      <Head>
        <title>縁起物ガチャ — 연화 蓮花</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#07050f;font-family:'Shippori Mincho',serif;}
        .app{min-height:100vh;background:radial-gradient(ellipse at 20% 20%,rgba(120,40,140,0.18) 0%,transparent 60%),radial-gradient(ellipse at 80% 80%,rgba(40,20,80,0.25) 0%,transparent 60%),#07050f;color:#e8dcc8;padding:40px 20px 60px;display:flex;flex-direction:column;align-items:center;}
        .back-link{display:inline-block;color:#9a8a70;font-size:12px;letter-spacing:2px;text-decoration:none;margin-bottom:24px;align-self:flex-start;}
        .header{text-align:center;margin-bottom:32px;}
        .header-title{font-size:26px;letter-spacing:6px;color:#e8dcc8;}
        .header-sub{font-size:11px;color:#9a8a70;letter-spacing:3px;margin-top:6px;}
        .yeonhwa-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;margin-bottom:28px;}
        .yeonhwa-img{width:220px;height:280px;object-fit:cover;border-radius:20px;border:1px solid rgba(201,169,110,0.3);box-shadow:0 0 40px rgba(167,139,250,0.15);transition:all 0.5s ease;}
        .yeonhwa-msg{margin-top:12px;font-size:12px;color:#9a8a70;letter-spacing:2px;text-align:center;min-height:20px;}
        .btn-area{width:100%;max-width:300px;text-align:center;}
        .free-note{font-size:12px;color:#9a8a70;margin-bottom:6px;}
        .free-note span{color:#c9a96e;}
        .discount-badge{font-size:11px;color:#a78bfa;margin-bottom:8px;letter-spacing:1px;}
        .used-note{font-size:13px;color:#9a8a70;margin-bottom:10px;}
        .btn-pull{width:100%;padding:14px;background:linear-gradient(135deg,rgba(120,40,140,0.6),rgba(60,20,80,0.8));border:1px solid rgba(167,139,250,0.4);border-radius:12px;color:#e8dcc8;font-family:'Shippori Mincho',serif;font-size:16px;letter-spacing:3px;cursor:pointer;transition:all 0.2s;margin-bottom:10px;}
        .btn-pull:hover:not(:disabled){border-color:rgba(167,139,250,0.8);box-shadow:0 0 20px rgba(167,139,250,0.2);}
        .btn-pull:disabled{opacity:0.4;cursor:not-allowed;}
        .btn-pay{width:100%;padding:12px;background:linear-gradient(135deg,rgba(201,169,110,0.3),rgba(150,100,50,0.4));border:1px solid rgba(201,169,110,0.5);border-radius:12px;color:#c9a96e;font-family:'Shippori Mincho',serif;font-size:14px;letter-spacing:2px;cursor:pointer;transition:all 0.2s;}
        .btn-pay:hover{border-color:rgba(201,169,110,0.9);box-shadow:0 0 20px rgba(201,169,110,0.2);}
        .pity-info{margin-top:16px;font-size:11px;color:#5a4a5a;letter-spacing:1px;text-align:center;line-height:1.8;}
        .petal{position:fixed;pointer-events:none;top:-20px;font-size:14px;animation:fall linear infinite;opacity:0.6;}
        @keyframes fall{0%{transform:translateY(0) rotate(0deg);opacity:0.6}100%{transform:translateY(110vh) rotate(360deg);opacity:0}}
        @keyframes overlayIn{from{opacity:0}to{opacity:1}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes cardFloat{from{opacity:0;transform:translateY(20px) scale(0.9)}to{opacity:1;transform:translateY(0) scale(1)}}
      `}</style>

      <div className="app">
        {["10%","25%","40%","60%","75%","90%"].map((l,i)=>(
          <div key={i} className="petal" style={{left:l,animationDuration:`${6+i*2}s`,animationDelay:`${i*1.5}s`}}>🌸</div>
        ))}

        <Link href="/" className="back-link">← 戻る</Link>

        <div className="header">
          <div className="header-title">縁起物ガチャ</div>
          <div className="header-sub">◈ 蓮花が縁を結ぶ ◈</div>
        </div>

        <div className="yeonhwa-wrap">
          <img src={yeonhwaImg} alt="연화" className="yeonhwa-img"/>
          <div className="yeonhwa-msg">{yeonhwaMsg}</div>
        </div>

        {(phase === "ready" || phase === "spinning") && (
          <div className="btn-area">
            {freeCount > 0 && (
              <div className="free-note">新規特典 残り<span>{freeCount}回</span> 無料</div>
            )}
            {freeCount === 0 && !usedToday && (
              <div className="free-note">本日の縁結び <span>無料</span></div>
            )}
            {freeCount === 0 && usedToday && (
              <div className="used-note">今日の無料占いは済んでいます。また明日…</div>
            )}
            {hasSajuDiscount && (
              <div className="discount-badge">✨ 占い割引 30% OFF 適用中</div>
            )}
            <button className="btn-pull" onClick={pull} disabled={!canFreePlay || phase==="spinning"}>
              {phase==="spinning" ? "蓮花が読んでいます…" : "縁を結ぶ（無料）"}
            </button>
            <button className="btn-pay" onClick={()=>setShowPayment(true)}>
              💎 追加ガチャ {hasSajuDiscount ? "70円〜" : "100円〜"}
            </button>
            <div className="pity-info">
              SR確定まで{nextSR}回 / SSR確定まで{nextSSR}回 / UR確定まで{nextUR}回
            </div>
          </div>
        )}

        {/* 10장 카드 선택 연출 */}
        {phase === "selecting" && !showResult && (
          <TenCardSelect cards={drawnCards} onAllFlipped={handleAllFlipped} />
        )}

        {/* 결과 요약 */}
        {showResult && (
          <ResultSummary cards={drawnCards} onClose={reset} />
        )}

        {showPayment && paypalReady && (
          <PaymentModal
            onClose={()=>setShowPayment(false)}
            onSuccess={onPaymentSuccess}
            hasSajuDiscount={hasSajuDiscount}
          />
        )}
      </div>
    </>
  );
}

