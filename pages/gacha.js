import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

const CARDS = [
  // N
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
  // R
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
  // SR
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
  // SSR
  { id:"SSR01", grade:"SSR", name:"招福猫", desc:"焦らなくても、幸せは近づいている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR02", grade:"SSR", name:"福梟の囁き", desc:"夜が静かなのは、幸運が近づいているから。", fortune:"恋愛運★★★★☆" },
  { id:"SSR03", grade:"SSR", name:"星札烏", desc:"迷う夜でも、星は道を知っている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR04", grade:"SSR", name:"花灯流し", desc:"流した想いは、光になって届く。", fortune:"恋愛運★★★★☆" },
  { id:"SSR05", grade:"SSR", name:"桜守り", desc:"春の風は、優しい縁を運んでくる。", fortune:"恋愛運★★★★☆" },
  { id:"SSR06", grade:"SSR", name:"月兎の祈り", desc:"月は今夜も、あなたを見守っている。", fortune:"恋愛運★★★★☆" },
  { id:"SSR07", grade:"SSR", name:"鈴守結願", desc:"鈴の音は、縁を呼び寄せる。", fortune:"恋愛運★★★★☆" },
  // UR
  { id:"UR01", grade:"UR", name:"奉納神楽", desc:"福は風に乗る。", fortune:"魅力運・人気運" },
  { id:"UR02", grade:"UR", name:"月光祈願", desc:"月は静かに見守る。", fortune:"恋愛運・良縁運" },
  { id:"UR03", grade:"UR", name:"紅糸結願", desc:"見えない糸でも、心と心はつながっている。", fortune:"恋愛運・縁結び運" },
];

const GRADE_CONFIG = {
  N:   { prob: 0.55, color: "#9a8a70", bg: "rgba(154,138,112,0.15)", border: "rgba(154,138,112,0.4)", label: "N" },
  R:   { prob: 0.28, color: "#c9a96e", bg: "rgba(201,169,110,0.15)", border: "rgba(201,169,110,0.5)", label: "R" },
  SR:  { prob: 0.12, color: "#a78bfa", bg: "rgba(167,139,250,0.15)", border: "rgba(167,139,250,0.5)", label: "SR" },
  SSR: { prob: 0.04, color: "#f87171", bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.5)", label: "SSR" },
  UR:  { prob: 0.01, color: "#ffd700", bg: "rgba(255,215,0,0.18)", border: "rgba(255,215,0,0.7)", label: "UR" },
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

function getToday() {
  return new Date().toDateString();
}

export default function Gacha() {
  const [phase, setPhase] = useState("ready"); // ready | spinning | result
  const [card, setCard] = useState(null);
  const [usedToday, setUsedToday] = useState(false);

  useEffect(() => {
    const last = localStorage.getItem("gacha_last_date");
    if (last === getToday()) setUsedToday(true);
  }, []);

  const pull = () => {
    if (usedToday) return;
    setPhase("spinning");
    setTimeout(() => {
      const drawn = drawCard();
      setCard(drawn);
      setPhase("result");
      localStorage.setItem("gacha_last_date", getToday());
      setUsedToday(true);
    }, 2000);
  };

  const cfg = card ? GRADE_CONFIG[card.grade] : null;

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
          color: #e8dcc8; padding: 48px 20px 80px;
          display: flex; flex-direction: column; align-items: center;
        }
        .header { text-align: center; margin-bottom: 40px; }
        .header-title {
          font-family: 'Shippori Mincho', serif;
          font-size: clamp(28px, 6vw, 48px);
          color: #f5eedd; letter-spacing: 10px; margin-bottom: 8px;
        }
        .header-sub { font-size: 12px; color: #6a5a45; letter-spacing: 3px; }
        .back-link {
          display: inline-block; margin-bottom: 32px;
          font-size: 12px; color: #5a4a38; letter-spacing: 2px;
          text-decoration: none; border-bottom: 1px solid #3a2a1e;
          padding-bottom: 2px;
        }

        /* READY */
        .ready-wrap { text-align: center; max-width: 420px; width: 100%; }
        .card-back-preview {
          width: 200px; height: 300px; margin: 0 auto 32px;
          background: linear-gradient(135deg, #1a0a2e, #0a1528);
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 48px;
          box-shadow: 0 0 60px rgba(201,169,110,0.1);
        }
        .free-note { font-size: 12px; color: #5a4a38; letter-spacing: 2px; margin-bottom: 24px; }
        .free-note span { color: #c9a96e; }
        .used-note { font-size: 13px; color: #5a4a38; letter-spacing: 2px; margin-bottom: 24px; }

        .btn-pull {
          width: 100%; padding: 18px;
          border-radius: 14px; border: 1px solid rgba(201,169,110,0.7);
          background: linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.06));
          color: #c9a96e;
          font-family: 'Shippori Mincho', serif; font-size: 16px;
          letter-spacing: 6px; cursor: pointer; transition: all 0.35s;
        }
        .btn-pull:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(201,169,110,0.32), rgba(201,169,110,0.12));
          box-shadow: 0 0 40px rgba(201,169,110,0.18);
        }
        .btn-pull:disabled { opacity: 0.4; cursor: not-allowed; }

        /* SPINNING */
        .spin-wrap { text-align: center; padding: 60px 20px; }
        .moon-spin {
          width: 80px; height: 80px;
          border: 2px solid rgba(201,169,110,0.15);
          border-top-color: #c9a96e;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 28px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin-text { font-size: 13px; color: #6a5a45; letter-spacing: 3px; }

        /* RESULT */
        .result-wrap { text-align: center; max-width: 420px; width: 100%; }
        .result-card {
          border-radius: 24px; padding: 40px 32px;
          margin-bottom: 24px;
          animation: fadeUp 0.6s ease;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .result-grade {
          font-size: 11px; letter-spacing: 6px;
          margin-bottom: 16px;
        }
        .result-icon { font-size: 56px; margin-bottom: 20px; }
        .result-name {
          font-family: 'Shippori Mincho', serif;
          font-size: 28px; letter-spacing: 6px;
          margin-bottom: 14px;
        }
        .result-desc {
          font-size: 13px; line-height: 1.9;
          margin-bottom: 16px; opacity: 0.8;
        }
        .result-fortune {
          font-size: 12px; letter-spacing: 2px;
          padding: 6px 18px; border-radius: 20px;
          border: 1px solid; display: inline-block;
        }
        .ur-glow { box-shadow: 0 0 60px rgba(255,215,0,0.3); }

        .btn-again {
          width: 100%; padding: 16px;
          border-radius: 14px; border: 1px solid rgba(201,169,110,0.3);
          background: transparent; color: #7a6a55;
          font-family: 'Noto Serif JP', serif; font-size: 13px;
          letter-spacing: 3px; cursor: pointer; transition: all 0.2s;
          margin-bottom: 12px;
        }
        .btn-again:hover { border-color: #c9a96e; color: #c9a96e; }
        .tomorrow-note { font-size: 11px; color: #3a2a1e; letter-spacing: 2px; }
      `}</style>

      <div className="app">
        <Link href="/" className="back-link">← 鑑定に戻る</Link>

        <div className="header">
          <div className="header-title">🪷 縁起物ガチャ</div>
          <div className="header-sub">◈ 蓮花が選んだお守りカード · N/R/SR/SSR/UR ◈</div>
        </div>

        {/* READY */}
        {phase === "ready" && (
          <div className="ready-wrap">
            <div className="card-back-preview">🎴</div>
            {usedToday
              ? <div className="used-note">本日の無料ガチャは使用済みです。<br/>明日また引けます。</div>
              : <div className="free-note">本日の無料ガチャ <span>残り1回</span></div>
            }
            <button className="btn-pull" onClick={pull} disabled={usedToday}>
              {usedToday ? "明日また引く" : "カードを引く 🎴"}
            </button>
          </div>
        )}

        {/* SPINNING */}
        {phase === "spinning" && (
          <div className="spin-wrap">
            <div className="moon-spin" />
            <div className="spin-text">蓮花がカードを選んでいます…</div>
          </div>
        )}

        {/* RESULT */}
        {phase === "result" && card && cfg && (
          <div className="result-wrap">
            <div className={`result-card ${card.grade === "UR" ? "ur-glow" : ""}`}
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <div className="result-grade" style={{ color: cfg.color }}>
                ◈ {cfg.label} ◈
              </div>
              <div className="result-icon">🪷</div>
              <div className="result-name" style={{ color: cfg.color }}>{card.name}</div>
              <div className="result-desc" style={{ color: "#c8baa8" }}>{card.desc}</div>
              <div className="result-fortune" style={{ color: cfg.color, borderColor: cfg.border }}>
                💕 {card.fortune}
              </div>
            </div>

            <button className="btn-again" onClick={() => setPhase("ready")}>
              カードを確認する
            </button>
            <div className="tomorrow-note">次の無料ガチャは明日</div>
          </div>
        )}
      </div>
    </>
  );
}
