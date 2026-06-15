import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const GITHUB_BASE = "https://raw.githubusercontent.com/chaei7775/saju-app/main";

const IMAGE_MAP = {
  N01:"N01.png", N02:"N02.png", N03:"N03.png", N04:"N04.png", N05:"N05.png",
  N06:"N06.png", N08:"N08.png", N09:"N09.png", N10:"N10.png", N11:"N11.png",
  N12:"N12.png", N13:"N13.png", N14:"N14.png", N15:"N15.png", N16:"N16.png",
  N17:"N17.png", N18:"N18.png", N20a:"N20.png", N20b:"N20.png", N20c:"N20.png",
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

// 연화 이미지
const YEONHWA = {
  idle:   `${GITHUB_BASE}/113.png`, // 정면
  offer:  `${GITHUB_BASE}/111.png`, // 손 내밀기
  result: `${GITHUB_BASE}/112.png`, // 두루마리
};

const CARDS = [
  { id:"N01", grade:"N", name:"桜の花びら", desc:"春の訪れを告げる桜の花びら。", fortune:"静穏運" },
  { id:"N02", grade:"N", name:"小石", desc:"川辺で見つけた、まあるい小さな石。", fortune:"安定運" },
  { id:"N03", grade:"N", name:"どんぐり", desc:"森で拾った、ひとつのどんぐり。", fortune:"縁起運" },
  { id:"N04", grade:"N", name:"落ち葉", desc:"秋風に舞い落ちた、ひとひらの葉。", fortune:"流れ運" },
  { id:"N05", grade:"N", name:"若葉", desc:"春の訪れを感じさせる、やわらかな若葉。", fortune:"成長運" },
  { id:"N06", grade:"N", name:"桜花びら", desc:"ひらりと舞い落ちた、桜の花びら。", fortune:"縁結び運" },
  { id:"N08", grade:"N", name:"小石", desc:"川辺で見つけた、まるい小石。", fortune:"安定運" },
  { id:"N09", grade:"N", name:"松ぼっくり", desc:"森の中で見つけた、小さな松ぼっくり。", fortune:"忍耐運" },
  { id:"N10", grade:"N", name:"鳥の羽根", desc:"道で見つけた、きれいな鳥の羽根。", fortune:"自由運" },
  { id:"N11", grade:"N", name:"すみれ", desc:"野原で見つけた、かわいらしいすみれ。", fortune:"恋愛運" },
  { id:"N12", grade:"N", name:"タンポポの綿毛", desc:"そっと風に乗り、遠くへ旅立つ小さな希望。", fortune:"希望運" },
  { id:"N13", grade:"N", name:"新芽", desc:"小さな命が、静かに息づいている。", fortune:"再生運" },
  { id:"N14", grade:"N", name:"花の蕾", desc:"もうすぐ、美しい花が咲くだろう。", fortune:"開花運" },
  { id:"N15", grade:"N", name:"三つ葉", desc:"幸運の予感が、そっと近づいてくる。", fortune:"幸運運" },
  { id:"N16", grade:"N", name:"銀杏の葉", desc:"秋の訪れを告げる、黄金色の扇。", fortune:"金運" },
  { id:"N17", grade:"N", name:"紅葉", desc:"山々を染める、秋の炎。", fortune:"情熱運" },
  { id:"N18", grade:"N", name:"松葉", desc:"凛とした香りが、心を澄ませてくれる。", fortune:"浄化運" },
  { id:"N20a", grade:"N", name:"貝殻のかけら", desc:"波に磨かれ、優しい形を残している。", fortune:"癒し運" },
  { id:"N20b", grade:"N", name:"水滴", desc:"光を映す一粒のしずく、静かに輝く。", fortune:"直感運" },
  { id:"N20c", grade:"N", name:"稲穂のひと粒", desc:"大地の恵みを宿し、静かに実る。", fortune:"実り運" },
  { id:"N26", grade:"N", name:"苔の欠片", desc:"小さな緑が、静かに時を重ねてきた証。", fortune:"継続運" },
  { id:"N27", grade:"N", name:"種英", desc:"風に揺られ、旅を終えた小さな舟。", fortune:"旅運" },
  { id:"N28", grade:"N", name:"柳の葉", desc:"水辺に揺れた、風のしるし。", fortune:"柔軟運" },
  { id:"N29", grade:"N", name:"蜘蛛の糸", desc:"朝露にきらめく、儚きつながり。", fortune:"縁運" },
  { id:"N30", grade:"N", name:"狗尾草の穂", desc:"道ばたで揺れる、やさしい手ざわり。", fortune:"癒し運" },
  { id:"R01", grade:"R", name:"四葉守り", desc:"四つの葉に幸せを宿すクローバーの守り。", fortune:"幸運運" },
  { id:"R02", grade:"R", name:"福鯉", desc:"力強く泳ぐ鯉の姿は、困難を乗り越え幸運を掴む象徴。", fortune:"飛躍運" },
  { id:"R03", grade:"R", name:"流星標本", desc:"夜空を駆けた流星の欠片を封じた標本。", fortune:"願望運" },
  { id:"R04", grade:"R", name:"福猫", desc:"招き上げた手で幸運を呼び、福と笑顔をもたらす猫の置物。", fortune:"招福運" },
  { id:"R05", grade:"R", name:"厄除守", desc:"災いや厄を祓い、持ち主を清らかな運気で守るお守り。", fortune:"厄除運" },
  { id:"R06", grade:"R", name:"月結び", desc:"月の力で縁を結び、良きご縁や幸運を呼び寄せるお守り。", fortune:"良縁運" },
  { id:"R07", grade:"R", name:"願い羽", desc:"願いをのせて空へと舞う羽根。", fortune:"祈願運" },
  { id:"R08", grade:"R", name:"星砂瓶", desc:"夜空の星の砂を閉じ込めた瓶。", fortune:"夢運" },
  { id:"R09", grade:"R", name:"折鶴", desc:"千羽の想いを込めて折られた鶴。", fortune:"祈り運" },
  { id:"R10", grade:"R", name:"白狐面", desc:"白き狐の霊力を宿す面。", fortune:"霊力運" },
  { id:"R11", grade:"R", name:"月結び", desc:"月の力で縁を結び、願いを優しく包み込むお守り。", fortune:"縁結び運" },
  { id:"R12", grade:"R", name:"福巾着", desc:"福を集める巾着。", fortune:"財運" },
  { id:"R13", grade:"R", name:"桜守り札", desc:"桜の花が魔を祓い、穏やかな日々と幸運をもたらす守り札。", fortune:"守護運" },
  { id:"R14", grade:"R", name:"星鍵", desc:"星の導きを宿した鍵。未来への扉を開くといわれている。", fortune:"開運" },
  { id:"R15", grade:"R", name:"招福鈴", desc:"優しい音色が幸運を呼び込み、持ち主を災いから守ってくれる鈴。", fortune:"招福運" },
  { id:"R16", grade:"R", name:"雨雫玉", desc:"雨の恵みが結晶化したしずくの玉。", fortune:"浄化運" },
  { id:"R17", grade:"R", name:"月時計", desc:"月の満ち欠けを刻む不思議な時計。", fortune:"時運" },
  { id:"R18", grade:"R", name:"風鈴", desc:"涼やかな音色で厄を払い、持ち主に清らかな運気を運ぶ風鈴。", fortune:"清運" },
  { id:"R19", grade:"R", name:"金魚灯", desc:"水の中を優雅に舞う金魚の灯り。", fortune:"繁栄運" },
  { id:"R20", grade:"R", name:"月兎", desc:"月の兎は、静かに願いを聞き届ける。", fortune:"祈願運" },
  { id:"SR01", grade:"SR", name:"蛍の子", desc:"小さな光を集め、夜を照らす静かな子。", fortune:"静穏運・希望運" },
  { id:"SR02", grade:"SR", name:"月雫の子", desc:"月の雫は、静かに夜を彩り、すべてを包み込む。", fortune:"癒し運・守護運" },
  { id:"SR03", grade:"SR", name:"芽吹きの子", desc:"小さな芽は、静かに育ち、やがて大きな希望となる。", fortune:"癒し運・成長運" },
  { id:"SR04", grade:"SR", name:"狐火の子", desc:"炎は悪戯心を照らし、いたずらは縁を結ぶ。", fortune:"人気運・変化運" },
  { id:"SR05", grade:"SR", name:"鈴猫の子", desc:"鈴の音を響かせ、幸運をさらっていく気まぐれでいたずら好きな子。", fortune:"招福運・悪戯運" },
  { id:"SR06", grade:"SR", name:"蓮華の子", desc:"蓮は清らかな心を育む。", fortune:"恋愛運・良縁運" },
  { id:"SR07", grade:"SR", name:"蜜守りの子", desc:"小さな優しさが、甘い縁を運ぶ。", fortune:"恋愛運・良縁運" },
  { id:"SR08", grade:"SR", name:"白梟の子", desc:"知恵は、縁を静かに導く。", fortune:"恋愛運・良縁運" },
  { id:"SR09", grade:"SR", name:"雨灯りの子", desc:"小さな灯りは、想いを照らす。", fortune:"恋愛運・良縁運" },
  { id:"SR10", grade:"SR", name:"紙鶴の娘", desc:"願いは風に乗り、想いは遠くへ届く。", fortune:"恋愛運・良縁運" },
  { id:"SR11", grade:"SR", name:"鹿角の童", desc:"森は、優しい縁を育てる。", fortune:"恋愛運・良縁運" },
  { id:"SR12", grade:"SR", name:"蜜守りの子", desc:"蜜は優しさを運び、みんなを笑顔にする。", fortune:"恋愛運・良縁運" },
  { id:"SR13", grade:"SR", name:"蓮華童子", desc:"静かな願いは、水面を渡る。", fortune:"恋愛運・心願成就" },
  { id:"SR14", grade:"SR", name:"蜜守りの子", desc:"蜜は自然の恵み、みんなを笑顔にする！", fortune:"恋愛運・良縁運" },
  { id:"SR15", grade:"SR", name:"星梟の子", desc:"星の知恵を静かに読み解き、夜を見守る、物静かな子。", fortune:"学業運・知恵運" },
  { id:"SSR01", grade:"SSR", name:"招福猫", desc:"焦らなくても、幸せは近づいている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR02", grade:"SSR", name:"福梟の囁き", desc:"夜が静かなのは、幸運が近づいているから。", fortune:"恋愛運★★★★☆" },
  { id:"SSR03", grade:"SSR", name:"星札烏", desc:"迷う夜でも、星は道を知っている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR04", grade:"SSR", name:"花灯流し", desc:"流した想いは、光になって届く。", fortune:"恋愛運★★★★☆" },
  { id:"SSR05", grade:"SSR", name:"桜守り", desc:"春の風は、優しい縁を運んでくる。", fortune:"恋愛運★★★★☆" },
  { id:"SSR06", grade:"SSR", name:"月兎の祈り", desc:"月は今夜も、あなたを見守っている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR07", grade:"SSR", name:"鈴守結願", desc:"鈴の音は、縁を呼び寄せる。", fortune:"恋愛運★★★★☆" },
  { id:"UR01", grade:"UR", name:"奉納神楽", desc:"福は風に乗る。", fortune:"魅力運・人気運" },
  { id:"UR02", grade:"UR", name:"月光祈願", desc:"月は静かに見守る。", fortune:"恋愛運・良縁運" },
  { id:"UR03", grade:"UR", name:"紅糸結願", desc:"見えない糸でも、心と心はつながっている。", fortune:"恋愛運・縁結び運" },
];

const GRADE_CONFIG = {
  N:   { color: "#9a8a70", bg: "rgba(154,138,112,0.15)", border: "rgba(154,138,112,0.4)", label: "N" },
  R:   { color: "#c9a96e", bg: "rgba(201,169,110,0.15)", border: "rgba(201,169,110,0.5)", label: "R" },
  SR:  { color: "#a78bfa", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.5)", label: "SR" },
  SSR: { color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.5)", label: "SSR" },
  UR:  { color: "#ffd700", bg: "rgba(255,215,0,0.18)",  border: "rgba(255,215,0,0.7)",   label: "UR" },
};

function drawCard() {
  const r = Math.random();
  let grade = "N";
  if (r < 0.01) grade = "UR";
  else if (r < 0.05) grade = "SSR";
  else if (r < 0.17) grade = "SR";
  else if (r < 0.45) grade = "R";
  const pool = CARDS.filter(c => c.grade === grade);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getToday() { return new Date().toDateString(); }

export default function Gacha() {
  const [phase, setPhase] = useState("ready"); // ready | spinning | result
  const [card, setCard] = useState(null);
  const [usedToday, setUsedToday] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [yeonhwaImg, setYeonhwaImg] = useState(YEONHWA.idle);
  const [yeonhwaMsg, setYeonhwaMsg] = useState("あなたの縁を読みます…");
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("gacha_last_date");
    if (last === getToday()) setUsedToday(true);
  }, []);

  const pull = () => {
    if (usedToday) return;
    setPhase("spinning");
    setCardVisible(false);
    setImgError(false);

    // 1. 손 내밀기
    setYeonhwaImg(YEONHWA.offer);
    setYeonhwaMsg("운명의 패를 고르고 있습니다…");

    setTimeout(() => {
      // 2. 두루마리 읽기
      setYeonhwaImg(YEONHWA.result);
      setYeonhwaMsg("점괘가 나타났습니다…");
    }, 1000);

    setTimeout(() => {
      const drawn = drawCard();
      setCard(drawn);
      setPhase("result");
      setCardVisible(true);
      localStorage.setItem("gacha_last_date", getToday());
      setUsedToday(true);
      setYeonhwaMsg("蓮花があなたに告げます");
    }, 2200);
  };

  const reset = () => {
    setPhase("ready");
    setCard(null);
    setCardVisible(false);
    setYeonhwaImg(YEONHWA.idle);
    setYeonhwaMsg("あなたの縁を読みます…");
  };

  const cfg = card ? GRADE_CONFIG[card.grade] : null;
  const imgSrc = card ? `${GITHUB_BASE}/${IMAGE_MAP[card.id]}` : null;

  return (
    <>
      <Head>
        <title>縁起物ガチャ — 연화 蓮花</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07050f; font-family: 'Noto Serif JP', serif; }
        .app {
          min-height: 100vh;
          background: radial-gradient(ellipse at 20% 10%, #1e0a2e 0%, transparent 55%),
                      radial-gradient(ellipse at 80% 90%, #0a1528 0%, transparent 55%),
                      radial-gradient(ellipse at 50% 50%, #0f0718 0%, #07050f 80%);
          color: #e8dcc8; padding: 40px 20px 80px;
          display: flex; flex-direction: column; align-items: center;
        }
        .back-link { display: inline-block; margin-bottom: 24px; font-size: 12px; color: #5a4a38; letter-spacing: 2px; text-decoration: none; border-bottom: 1px solid #3a2a1e; padding-bottom: 2px; }
        .header { text-align: center; margin-bottom: 32px; }
        .header-title { font-family: 'Shippori Mincho', serif; font-size: clamp(24px,6vw,42px); color: #f5eedd; letter-spacing: 10px; margin-bottom: 6px; }
        .header-sub { font-size: 11px; color: #6a5a45; letter-spacing: 3px; }

        /* 연화 영역 */
        .yeonhwa-wrap {
          position: relative; width: 100%; max-width: 360px;
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 28px;
        }
        .yeonhwa-img {
          width: 220px; height: 280px; object-fit: cover;
          border-radius: 20px;
          border: 1px solid rgba(201,169,110,0.25);
          box-shadow: 0 0 40px rgba(167,139,250,0.15);
          transition: all 0.5s ease;
        }
        .yeonhwa-img.offer { transform: scale(1.03); box-shadow: 0 0 60px rgba(201,169,110,0.3); }
        .yeonhwa-img.result { box-shadow: 0 0 50px rgba(167,139,250,0.25); }
        .yeonhwa-msg {
          margin-top: 12px; font-size: 12px; color: #a78baa;
          letter-spacing: 2px; text-align: center;
          min-height: 20px; transition: opacity 0.4s;
        }

        /* 뽑기 버튼 */
        .btn-area { width: 100%; max-width: 360px; margin-bottom: 28px; }
        .free-note { font-size: 12px; color: #5a4a38; letter-spacing: 2px; margin-bottom: 16px; text-align: center; }
        .free-note span { color: #c9a96e; }
        .used-note { font-size: 13px; color: #5a4a38; letter-spacing: 2px; margin-bottom: 16px; text-align: center; }
        .btn-pull { width: 100%; padding: 18px; border-radius: 14px; border: 1px solid rgba(201,169,110,0.7); background: linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.06)); color: #c9a96e; font-family: 'Shippori Mincho', serif; font-size: 16px; letter-spacing: 6px; cursor: pointer; transition: all 0.35s; }
        .btn-pull:hover:not(:disabled) { background: linear-gradient(135deg, rgba(201,169,110,0.32), rgba(201,169,110,0.12)); box-shadow: 0 0 40px rgba(201,169,110,0.18); }
        .btn-pull:disabled { opacity: 0.4; cursor: not-allowed; }

        /* 카드 결과 */
        .result-wrap { width: 100%; max-width: 360px; }
        .result-card {
          border-radius: 24px; padding: 28px 24px; margin-bottom: 20px;
          animation: fadeUp 0.6s ease;
          opacity: 0; animation-fill-mode: forwards;
        }
        .result-card.visible { opacity: 1; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .result-grade { font-size: 11px; letter-spacing: 6px; margin-bottom: 14px; text-align: center; }
        .card-image { width: 160px; height: 230px; margin: 0 auto 18px; border-radius: 14px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; }
        .card-image-fallback { font-size: 48px; }
        .result-name { font-family: 'Shippori Mincho', serif; font-size: 22px; letter-spacing: 6px; margin-bottom: 10px; text-align: center; }
        .result-desc { font-size: 13px; line-height: 1.9; margin-bottom: 14px; opacity: 0.8; text-align: center; }
        .result-fortune { font-size: 12px; letter-spacing: 2px; padding: 6px 16px; border-radius: 20px; border: 1px solid; display: inline-block; }
        .fortune-wrap { text-align: center; margin-bottom: 4px; }
        .ur-glow { box-shadow: 0 0 60px rgba(255,215,0,0.3); }
        .btn-again { width: 100%; padding: 14px; border-radius: 14px; border: 1px solid rgba(201,169,110,0.3); background: transparent; color: #7a6a55; font-family: 'Noto Serif JP', serif; font-size: 13px; letter-spacing: 3px; cursor: pointer; transition: all 0.2s; margin-bottom: 10px; }
        .btn-again:hover { border-color: #c9a96e; color: #c9a96e; }
        .tomorrow-note { font-size: 11px; color: #3a2a1e; letter-spacing: 2px; text-align: center; }

        /* 파티클 */
        .petal { position: fixed; pointer-events: none; font-size: 14px; animation: fall linear infinite; opacity: 0.4; }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 0.4; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
      `}</style>

      <div className="app">
        {/* 벚꽃 파티클 */}
        {["10%","25%","40%","60%","75%","90%"].map((l,i) => (
          <div key={i} className="petal" style={{ left: l, animationDuration: `${6+i*1.5}s`, animationDelay: `${i*0.8}s` }}>🌸</div>
        ))}

        <Link href="/" className="back-link">← 鑑定に戻る</Link>

        <div className="header">
          <div className="header-title">🪷 縁起物ガチャ</div>
          <div className="header-sub">◈ 蓮花が選んだお守りカード ◈</div>
        </div>

        {/* 연화 캐릭터 */}
        <div className="yeonhwa-wrap">
          <img
            src={yeonhwaImg}
            alt="연화"
            className={`yeonhwa-img ${phase === "spinning" ? "offer" : phase === "result" ? "result" : ""}`}
          />
          <div className="yeonhwa-msg">{yeonhwaMsg}</div>
        </div>

        {/* 뽑기 버튼 */}
        {(phase === "ready" || phase === "spinning") && (
          <div className="btn-area">
            {usedToday
              ? <div className="used-note">本日の無料ガチャは使用済みです。<br/>明日また引けます。</div>
              : <div className="free-note">本日の無料ガチャ <span>残り1回</span></div>
            }
            <button className="btn-pull" onClick={pull} disabled={usedToday || phase === "spinning"}>
              {phase === "spinning" ? "蓮花が読んでいます…" : usedToday ? "明日また引く" : "カードを引く 🎴"}
            </button>
          </div>
        )}

        {/* 결과 카드 */}
        {phase === "result" && card && cfg && (
          <div className="result-wrap">
            <div className={`result-card ${card.grade === "UR" ? "ur-glow" : ""} ${cardVisible ? "visible" : ""}`}
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <div className="result-grade" style={{ color: cfg.color }}>◈ {cfg.label} ◈</div>
              <div className="card-image" style={{ border: `2px solid ${cfg.border}` }}>
                {!imgError
                  ? <img src={imgSrc} alt={card.name} onError={() => setImgError(true)} />
                  : <div className="card-image-fallback">🪷</div>
                }
              </div>
              <div className="result-name" style={{ color: cfg.color }}>{card.name}</div>
              <div className="result-desc" style={{ color: "#c8baa8" }}>{card.desc}</div>
              <div className="fortune-wrap">
                <div className="result-fortune" style={{ color: cfg.color, borderColor: cfg.border }}>
                  💕 {card.fortune}
                </div>
              </div>
            </div>
            <button className="btn-again" onClick={reset}>もう一度引く</button>
            <div className="tomorrow-note">次の無料ガチャは明日</div>
          </div>
        )}
      </div>
    </>
  );
}
