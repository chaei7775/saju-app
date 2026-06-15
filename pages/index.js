import { useState } from "react";
import Head from "next/head";

const HOUR_OPTIONS = [
  { value: "不明", label: "わからない" },
  { value: "子時(23時〜1時)", label: "子の刻（23時〜1時）" },
  { value: "丑時(1時〜3時)", label: "丑の刻（1時〜3時）" },
  { value: "寅時(3時〜5時)", label: "寅の刻（3時〜5時）" },
  { value: "卯時(5時〜7時)", label: "卯の刻（5時〜7時）" },
  { value: "辰時(7時〜9時)", label: "辰の刻（7時〜9時）" },
  { value: "巳時(9時〜11時)", label: "巳の刻（9時〜11時）" },
  { value: "午時(11時〜13時)", label: "午の刻（11時〜13時）" },
  { value: "未時(13時〜15時)", label: "未の刻（13時〜15時）" },
  { value: "申時(15時〜17時)", label: "申の刻（15時〜17時）" },
  { value: "酉時(17時〜19時)", label: "酉の刻（17時〜19時）" },
  { value: "戌時(19時〜21時)", label: "戌の刻（19時〜21時）" },
  { value: "亥時(21時〜23時)", label: "亥の刻（21時〜23時）" },
];

const OHAENG_COLORS = { 木: "#4ade80", 火: "#f87171", 土: "#fbbf24", 金: "#c9a96e", 水: "#60a5fa" };
const OHAENG_EMOJI = { 木: "🌿", 火: "🔥", 土: "🪨", 金: "✨", 水: "💧" };

export default function Home() {
  const [form, setForm] = useState({
    name: "", gender: "female",
    year: "", month: "", day: "", hour: "不明", calendar: "新暦"
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("form");
  const [hasUsedFree, setHasUsedFree] = useState(false);
  const [showGacha, setShowGacha] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const analyze = async () => {
    if (!form.name || !form.year || !form.month || !form.day) {
      setError("お名前と生年月日は必須項目です");
      return;
    }
    if (hasUsedFree) {
      setStep("paywall");
      return;
    }
    setError("");
    setLoading(true);
    setStep("loading");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
      setStep("result");
      setHasUsedFree(true);
    } catch (e) {
      setError(`エラー: ${e.message}`);
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const maxOhaeng = result ? Math.max(...Object.values(result.ohaeng)) : 1;

  return (
    <>
      <Head>
        <title>연화 蓮花 — 韓国四柱鑑定</title>
        <meta name="description" content="韓国の伝統四柱命理学で、あなたの縁と愛を読み解きます" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;700&family=Shippori+Mincho:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07050f; font-family: 'Noto Serif JP', serif; }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 20% 10%, #1e0a2e 0%, transparent 55%),
            radial-gradient(ellipse at 80% 90%, #0a1528 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, #0f0718 0%, #07050f 80%);
          color: #e8dcc8;
          padding: 48px 20px 80px;
        }

        /* ── HEADER ── */
        .header { text-align: center; margin-bottom: 52px; }
        .header-eyebrow {
          font-size: 10px; letter-spacing: 8px; color: #c9a96e;
          margin-bottom: 20px; text-transform: uppercase;
        }
        .header-title {
          font-family: 'Shippori Mincho', serif;
          font-size: clamp(36px, 7vw, 64px);
          font-weight: 400; color: #f5eedd;
          letter-spacing: 16px; line-height: 1.1;
        }
        .header-title .accent { color: #c9a96e; }
        .header-hanzi {
          font-size: 13px; letter-spacing: 6px;
          color: #8a7a65; margin-top: 10px;
        }
        .header-sub {
          margin-top: 18px; font-size: 13px;
          color: #7a6a55; letter-spacing: 2px; line-height: 1.8;
        }
        .lotus-divider {
          display: flex; align-items: center;
          gap: 14px; margin: 28px auto; max-width: 260px;
        }
        .lotus-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, #c9a96e44, transparent);
        }
        .lotus-icon { color: #c9a96e; font-size: 16px; }

        /* ── FORM ── */
        .form-card {
          max-width: 540px; margin: 0 auto;
          background: rgba(201,169,110,0.04);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 28px; padding: 44px 36px;
        }
        .form-label {
          display: block; font-size: 11px;
          color: #9a8a70; letter-spacing: 3px;
          margin-bottom: 10px; text-transform: uppercase;
        }
        .form-group { margin-bottom: 24px; }
        .form-input, .form-select {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,169,110,0.22);
          border-radius: 12px; padding: 14px 18px;
          color: #e8dcc8;
          font-family: 'Noto Serif JP', serif; font-size: 15px;
          outline: none; transition: border-color 0.25s;
        }
        .form-input:focus, .form-select:focus { border-color: rgba(201,169,110,0.6); }
        .form-input::placeholder { color: #4a4035; }
        .form-select option { background: #1a1025; }
        .date-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .toggle-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .toggle-btn {
          padding: 13px; border-radius: 12px;
          border: 1px solid rgba(201,169,110,0.22);
          background: rgba(255,255,255,0.02);
          color: #7a6a55;
          font-family: 'Noto Serif JP', serif; font-size: 14px;
          cursor: pointer; transition: all 0.2s; letter-spacing: 1px;
        }
        .toggle-btn.active {
          border-color: #c9a96e;
          background: rgba(201,169,110,0.12);
          color: #c9a96e;
        }
        .error-msg { color: #f87171; font-size: 13px; margin-top: 10px; text-align: center; }

        .btn-analyze {
          width: 100%; margin-top: 32px; padding: 18px;
          border-radius: 14px; border: 1px solid rgba(201,169,110,0.7);
          background: linear-gradient(135deg, rgba(201,169,110,0.18), rgba(201,169,110,0.06));
          color: #c9a96e;
          font-family: 'Shippori Mincho', serif; font-size: 16px;
          font-weight: 500; letter-spacing: 6px; cursor: pointer;
          transition: all 0.35s;
        }
        .btn-analyze:hover {
          background: linear-gradient(135deg, rgba(201,169,110,0.32), rgba(201,169,110,0.12));
          box-shadow: 0 0 40px rgba(201,169,110,0.18);
        }
        .free-badge {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; margin-top: 14px;
          font-size: 11px; color: #6a5a45; letter-spacing: 2px;
        }
        .free-badge span { color: #c9a96e; }

        /* ── LOADING ── */
        .loading-wrap { text-align: center; padding: 100px 20px; }
        .moon-spin {
          width: 64px; height: 64px;
          border: 1.5px solid rgba(201,169,110,0.15);
          border-top-color: #c9a96e;
          border-radius: 50%;
          animation: spin 1.4s linear infinite;
          margin: 0 auto 28px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-name {
          font-family: 'Shippori Mincho', serif;
          font-size: 18px; color: #c9a96e; letter-spacing: 6px;
          margin-bottom: 12px;
        }
        .loading-text {
          font-size: 12px; color: #6a5a45; letter-spacing: 3px;
          animation: pulse 1.8s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        /* ── RESULT ── */
        .result-wrap { max-width: 700px; margin: 0 auto; }

        .result-hero { text-align: center; margin-bottom: 40px; }
        .result-name {
          font-family: 'Shippori Mincho', serif;
          font-size: 32px; font-weight: 400;
          color: #f5eedd; letter-spacing: 10px; margin-bottom: 8px;
        }
        .result-meta { font-size: 12px; color: #6a5a45; margin-bottom: 14px; }
        .result-summary {
          font-size: 14px; color: #c9a96e;
          font-style: italic; line-height: 1.8;
          max-width: 500px; margin: 0 auto;
        }

        .card {
          background: rgba(201,169,110,0.03);
          border: 1px solid rgba(201,169,110,0.14);
          border-radius: 22px; padding: 32px;
          margin-bottom: 16px;
        }
        .card-title {
          font-size: 10px; letter-spacing: 5px;
          color: #c9a96e; margin-bottom: 24px;
          text-transform: uppercase;
        }

        /* pillars */
        .pillars-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 12px; margin-bottom: 8px;
        }
        @media(max-width:480px){ .pillars-grid { grid-template-columns: repeat(2,1fr); } }
        .pillar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(201,169,110,0.18);
          border-radius: 16px; padding: 20px 10px;
          text-align: center;
        }
        .pillar-lbl { font-size: 9px; color: #6a5a45; letter-spacing: 2px; margin-bottom: 10px; }
        .pillar-gan { font-family: 'Shippori Mincho', serif; font-size: 30px; color: #c9a96e; }
        .pillar-ji { font-family: 'Shippori Mincho', serif; font-size: 30px; color: #e8dcc8; }
        .pillar-sub { font-size: 9px; color: #5a4a38; margin-top: 8px; }

        /* ohaeng */
        .ohaeng-bars { display: flex; flex-direction: column; gap: 12px; margin-bottom: 18px; }
        .ohaeng-row { display: flex; align-items: center; gap: 12px; }
        .ohaeng-lbl { width: 46px; font-size: 12px; color: #9a8a70; text-align: right; flex-shrink: 0; }
        .ohaeng-track { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
        .ohaeng-fill { height: 100%; border-radius: 3px; opacity: 0.75; }
        .ohaeng-num { width: 18px; font-size: 11px; color: #5a4a38; text-align: right; flex-shrink: 0; }
        .ohaeng-comment {
          font-size: 13px; color: #9a8a75; line-height: 1.9;
          padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.04);
        }
        .yongshin-pill {
          display: inline-block; padding: 6px 18px;
          border: 1px solid #c9a96e; border-radius: 20px;
          font-size: 12px; color: #c9a96e; margin-top: 14px;
        }

        /* love section highlight */
        .love-card {
          background: linear-gradient(135deg, rgba(248,113,113,0.06), rgba(201,169,110,0.04));
          border: 1px solid rgba(248,113,113,0.2);
        }
        .love-title { color: #f87171 !important; }
        .love-text { font-size: 14px; color: #c8baa8; line-height: 2.1; }
        .love-highlight {
          display: inline-block; padding: 3px 12px;
          background: rgba(248,113,113,0.1);
          border-radius: 6px; color: #f8a0a0;
          font-size: 12px; margin-bottom: 14px;
        }

        .analysis-text { font-size: 14px; color: #c0b0a0; line-height: 2.1; }
        .section-badge {
          display: inline-block; padding: 4px 14px;
          border-radius: 20px; font-size: 11px;
          letter-spacing: 1px; margin-bottom: 14px;
          border: 1px solid; opacity: 0.85;
        }

        /* ── GACHA CTA ── */
        .gacha-cta {
          margin-top: 8px;
          background: linear-gradient(135deg, rgba(248,113,113,0.08), rgba(201,169,110,0.08));
          border: 1px solid rgba(201,169,110,0.3);
          border-radius: 22px; padding: 36px 32px;
          text-align: center;
        }
        .gacha-cta-eyebrow {
          font-size: 10px; letter-spacing: 5px;
          color: #c9a96e; margin-bottom: 14px;
        }
        .gacha-cta-title {
          font-family: 'Shippori Mincho', serif;
          font-size: 22px; color: #f5eedd;
          letter-spacing: 4px; margin-bottom: 12px;
        }
        .gacha-cta-desc {
          font-size: 13px; color: #9a8a70;
          line-height: 1.9; margin-bottom: 26px;
        }
        .btn-gacha {
          display: inline-block; padding: 16px 40px;
          border-radius: 14px;
          border: 1px solid rgba(248,113,113,0.6);
          background: linear-gradient(135deg, rgba(248,113,113,0.18), rgba(201,169,110,0.08));
          color: #f8a0a0;
          font-family: 'Shippori Mincho', serif; font-size: 15px;
          letter-spacing: 4px; cursor: pointer; transition: all 0.3s;
          text-decoration: none;
        }
        .btn-gacha:hover {
          background: linear-gradient(135deg, rgba(248,113,113,0.3), rgba(201,169,110,0.15));
          box-shadow: 0 0 40px rgba(248,113,113,0.15);
        }
        .gacha-free-note {
          margin-top: 12px; font-size: 11px;
          color: #5a4a35; letter-spacing: 2px;
        }
        .gacha-free-note span { color: #c9a96e; }

        /* ── PAYWALL ── */
        .paywall-wrap { max-width: 500px; margin: 0 auto; text-align: center; padding: 60px 20px; }
        .paywall-icon { font-size: 48px; margin-bottom: 24px; }
        .paywall-title {
          font-family: 'Shippori Mincho', serif;
          font-size: 24px; color: #f5eedd;
          letter-spacing: 4px; margin-bottom: 14px;
        }
        .paywall-desc { font-size: 14px; color: #8a7a65; line-height: 1.9; margin-bottom: 32px; }
        .btn-pay {
          display: block; width: 100%; padding: 18px;
          border-radius: 14px; border: 1px solid #c9a96e;
          background: linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.06));
          color: #c9a96e;
          font-family: 'Shippori Mincho', serif; font-size: 16px;
          letter-spacing: 4px; cursor: pointer; margin-bottom: 14px;
          transition: all 0.3s;
        }
        .btn-pay:hover {
          background: linear-gradient(135deg, rgba(201,169,110,0.35), rgba(201,169,110,0.1));
        }
        .btn-back {
          background: none; border: none;
          color: #5a4a38; font-size: 13px;
          letter-spacing: 2px; cursor: pointer;
          text-decoration: underline; text-underline-offset: 4px;
        }

        /* ── BUTTONS ── */
        .btn-row { display: flex; gap: 12px; margin-top: 32px; justify-content: center; flex-wrap: wrap; }
        .btn-secondary {
          padding: 12px 28px; border-radius: 10px;
          border: 1px solid rgba(201,169,110,0.25);
          background: transparent; color: #7a6a55;
          font-family: 'Noto Serif JP', serif; font-size: 13px;
          letter-spacing: 2px; cursor: pointer; transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: #c9a96e; color: #c9a96e; }

        .footer {
          text-align: center; margin-top: 70px;
          font-size: 10px; color: #2e2820; letter-spacing: 4px;
        }
      `}</style>

      <div className="app">

        {/* HEADER */}
        <div className="header">
          <div className="header-eyebrow">◈ 韓国四柱命理学 ◈</div>
          <div className="header-title">연화<span className="accent">蓮花</span></div>
          <div className="header-hanzi">韓国の巫女が、あなたの縁を読み解く</div>
          <div className="header-sub">
            生年月日から導き出す、あなただけの恋愛運・縁結び鑑定
          </div>
          <div className="lotus-divider">
            <div className="lotus-line" />
            <span className="lotus-icon">🪷</span>
            <div className="lotus-line" />
          </div>
        </div>

        {/* FORM */}
        {step === "form" && (
          <div className="form-card">
            <div className="form-group">
              <label className="form-label">お名前</label>
              <input
                className="form-input" name="name"
                placeholder="例：田中さくら"
                value={form.name} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">性別</label>
              <div className="toggle-row">
                {[["female","♀ 女性"],["male","♂ 男性"]].map(([v,l]) => (
                  <button key={v}
                    className={`toggle-btn ${form.gender===v?"active":""}`}
                    onClick={() => setForm(f=>({...f,gender:v}))}>{l}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">暦</label>
              <div className="toggle-row">
                {["新暦","旧暦"].map(c => (
                  <button key={c}
                    className={`toggle-btn ${form.calendar===c?"active":""}`}
                    onClick={() => setForm(f=>({...f,calendar:c}))}>{c}</button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">生年月日</label>
              <div className="date-row">
                <input className="form-input" name="year" placeholder="年（例：1993）" value={form.year} onChange={handleChange} maxLength={4} />
                <input className="form-input" name="month" placeholder="月" value={form.month} onChange={handleChange} maxLength={2} />
                <input className="form-input" name="day" placeholder="日" value={form.day} onChange={handleChange} maxLength={2} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">生まれた時間（時柱）</label>
              <select className="form-select" name="hour" value={form.hour} onChange={handleChange}>
                {HOUR_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button className="btn-analyze" onClick={analyze}>
              縁を鑑定する
            </button>
            <div className="free-badge">
              🪷 初回鑑定 <span>無料</span> · 連花があなたの縁を読み解きます
            </div>
          </div>
        )}

        {/* LOADING */}
        {step === "loading" && (
          <div className="loading-wrap">
            <div className="moon-spin" />
            <div className="loading-name">{form.name}</div>
            <div className="loading-text">蓮花が四柱を読み解いています…</div>
          </div>
        )}

        {/* PAYWALL */}
        {step === "paywall" && (
          <div className="paywall-wrap">
            <div className="paywall-icon">🔮</div>
            <div className="paywall-title">さらに深く鑑定する</div>
            <div className="paywall-desc">
              2回目以降の鑑定は有料となります。<br />
              蓮花があなたの恋愛運・縁結び・理想の相手を<br />
              さらに詳しく読み解きます。
            </div>
            <button className="btn-pay">¥500 で鑑定を続ける</button>
            <button className="btn-back" onClick={() => setStep("form")}>戻る</button>
          </div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <div className="result-wrap">

            <div className="result-hero">
              <div className="result-name">{form.name}</div>
              <div className="result-meta">
                {form.year}年 {form.month}月 {form.day}日 · {form.gender==="female"?"女性":"男性"} · {form.calendar}
              </div>
              <div className="result-summary">{result.ilgan_type} — {result.summary}</div>
            </div>

            {/* 四柱 */}
            <div className="card">
              <div className="card-title">◈ 四柱八字</div>
              <div className="pillars-grid">
                {["year","month","day","hour"].map(k => {
                  const p = result.pillars[k];
                  return (
                    <div key={k} className="pillar">
                      <div className="pillar-lbl">{p.label}</div>
                      <div className="pillar-gan">{p.gan}</div>
                      <div className="pillar-ji">{p.ji}</div>
                      <div className="pillar-sub">{p.animal||p.season||p.meaning||""}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 五行 */}
            <div className="card">
              <div className="card-title">◈ 五行バランス</div>
              <div className="ohaeng-bars">
                {Object.entries(result.ohaeng).map(([k,v]) => (
                  <div key={k} className="ohaeng-row">
                    <div className="ohaeng-lbl">{OHAENG_EMOJI[k]} {k}</div>
                    <div className="ohaeng-track">
                      <div className="ohaeng-fill" style={{width:`${(v/maxOhaeng)*100}%`,background:OHAENG_COLORS[k]}} />
                    </div>
                    <div className="ohaeng-num">{v}</div>
                  </div>
                ))}
              </div>
              <div className="ohaeng-comment">{result.ohaeng_comment}</div>
              <div><span className="yongshin-pill">✦ 用神 · {result.yongshin}</span></div>
            </div>

            {/* 恋愛運 HIGHLIGHT */}
            <div className="card love-card">
              <div className="card-title love-title">◈ 恋愛運 · 縁結び</div>
              <div className="love-highlight">💕 あなたの恋愛パターン</div>
              <div className="love-text">{result.love}</div>
            </div>

            {/* 相性 */}
            <div className="card">
              <div className="card-title">◈ 理想の相手 · 相性</div>
              <div className="analysis-text">{result.ideal_partner}</div>
            </div>

            {/* 今年の縁 */}
            <div className="card">
              <div className="card-title">◈ 2026年 縁と恋愛の流れ</div>
              <div className="analysis-text">{result.luck_2026}</div>
            </div>

            {/* 性格 */}
            <div className="card">
              <div className="card-title">◈ 性格 · 気質</div>
              <div className="analysis-text">{result.personality}</div>
            </div>

            {/* 開運アドバイス */}
            <div className="card">
              <div className="card-title">◈ 開運アドバイス</div>
              <div className="analysis-text">{result.advice}</div>
            </div>

            {/* GACHA CTA */}
            <div className="gacha-cta">
              <div className="gacha-cta-eyebrow">◈ 縁起物ガチャ ◈</div>
              <div className="gacha-cta-title">🪷 恋愛運を引き寄せる<br/>お守りを引いてみませんか？</div>
              <div className="gacha-cta-desc">
                蓮花が選んだ縁起物が、あなたの恋愛運を高めます。<br />
                N・R・SR・SSR・URの5段階、全70種のお守りカード。<br />
                今日の無料ガチャが待っています。
              </div>
              <a href="/gacha" className="btn-gacha">今日の無料ガチャを引く 🎴</a>
              <div className="gacha-free-note">毎日1回 <span>無料</span></div>
            </div>

            <div className="btn-row">
              <button className="btn-secondary" onClick={() => { setStep("form"); setResult(null); }}>
                もう一度鑑定する
              </button>
            </div>
          </div>
        )}

        <div className="footer">◈ 연화 蓮花 · 韓国四柱命理学鑑定 · 2026 ◈</div>
      </div>
    </>
  );
}
