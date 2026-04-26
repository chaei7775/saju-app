import { useState } from "react";
import Head from "next/head";

const HOUR_OPTIONS = [
  { value: "모름", label: "모름 / 미상" },
  { value: "자시(밤 11시~새벽 1시)", label: "자시 (밤 11시~새벽 1시)" },
  { value: "축시(새벽 1시~3시)", label: "축시 (새벽 1시~3시)" },
  { value: "인시(새벽 3시~5시)", label: "인시 (새벽 3시~5시)" },
  { value: "묘시(새벽 5시~7시)", label: "묘시 (새벽 5시~7시)" },
  { value: "진시(아침 7시~9시)", label: "진시 (아침 7시~9시)" },
  { value: "사시(오전 9시~11시)", label: "사시 (오전 9시~11시)" },
  { value: "오시(오전 11시~오후 1시)", label: "오시 (오전 11시~오후 1시)" },
  { value: "미시(오후 1시~3시)", label: "미시 (오후 1시~3시)" },
  { value: "신시(오후 3시~5시)", label: "신시 (오후 3시~5시)" },
  { value: "유시(오후 5시~7시)", label: "유시 (오후 5시~7시)" },
  { value: "술시(오후 7시~9시)", label: "술시 (오후 7시~9시)" },
  { value: "해시(오후 9시~11시)", label: "해시 (오후 9시~11시)" },
];

const OHAENG_COLORS = { 목: "#4ade80", 화: "#f87171", 토: "#fbbf24", 금: "#a78bfa", 수: "#60a5fa" };
const OHAENG_EMOJI = { 목: "🌿", 화: "🔥", 토: "🪨", 금: "⚙️", 수: "💧" };

const SECTIONS = [
  { key: "name_analysis", label: "성명학 · 이름 분석", color: "#a09080" },
  { key: "personality", label: "성격 분석", color: "#a78bfa" },
  { key: "health", label: "건강운", color: "#4ade80" },
  { key: "wealth", label: "재물운", color: "#fbbf24" },
  { key: "career", label: "직업 · 적성", color: "#60a5fa" },
  { key: "love", label: "연애 · 결혼운", color: "#f87171" },
  { key: "luck_2026", label: "2026년 올해 운세", color: "#c9a96e" },
  { key: "advice", label: "인생 조언 · 개운법", color: "#94a3b8" },
];

export default function Home() {
  const [form, setForm] = useState({ name: "", hanja: "", gender: "female", year: "", month: "", day: "", hour: "모름", calendar: "양력" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("form");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const analyze = async () => {
    if (!form.name || !form.year || !form.month || !form.day) {
      setError("이름과 생년월일은 필수입력이에요!");
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
    } catch (e) {
      setError(`오류: ${e.message}`);
      setStep("form");
    } finally {
      setLoading(false);
    }
  };

  const maxOhaeng = result ? Math.max(...Object.values(result.ohaeng)) : 1;

  return (
    <>
      <Head>
        <title>사주분석 · Secret Glow</title>
        <meta name="description" content="생년월일시로 알아보는 나의 사주 분석" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&family=Hahmlet:wght@300;400;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #06060e; font-family: 'Noto Serif KR', serif; }

        .app { min-height: 100vh; background: radial-gradient(ellipse at 30% 20%, #1a0a2e 0%, #06060e 60%), radial-gradient(ellipse at 70% 80%, #0d1a2e 0%, transparent 60%); color: #e8dcc8; padding: 48px 20px; }

        .header { text-align: center; margin-bottom: 48px; }
        .header-deco { font-size: 11px; letter-spacing: 6px; color: #c9a96e; margin-bottom: 16px; }
        .header h1 { font-family: 'Hahmlet', serif; font-size: clamp(28px, 5vw, 48px); font-weight: 300; color: #f0e6d0; letter-spacing: 8px; }
        .header h1 span { color: #c9a96e; }
        .header-sub { margin-top: 12px; font-size: 13px; color: #8a7a65; letter-spacing: 2px; }

        .divider { display: flex; align-items: center; gap: 12px; margin: 20px auto; max-width: 300px; }
        .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, #c9a96e55, transparent); }
        .divider-dot { width: 4px; height: 4px; border-radius: 50%; background: #c9a96e; }

        .form-card { max-width: 560px; margin: 0 auto; background: rgba(255,255,255,0.03); border: 1px solid rgba(201,169,110,0.2); border-radius: 24px; padding: 40px; }
        .form-section-title { font-size: 11px; letter-spacing: 4px; color: #c9a96e; margin-bottom: 20px; text-transform: uppercase; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; color: #a09080; letter-spacing: 1px; margin-bottom: 8px; }
        .form-note { font-size: 10px; color: #6a6055; margin-left: 8px; }
        .form-input, .form-select { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(201,169,110,0.25); border-radius: 10px; padding: 12px 16px; color: #e8dcc8; font-family: 'Noto Serif KR', serif; font-size: 15px; outline: none; transition: border-color 0.2s; }
        .form-input:focus, .form-select:focus { border-color: #c9a96e; }
        .form-select option { background: #1a1025; }
        .date-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .toggle-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .toggle-btn { padding: 12px; border-radius: 10px; border: 1px solid rgba(201,169,110,0.25); background: rgba(255,255,255,0.03); color: #a09080; font-family: 'Noto Serif KR', serif; font-size: 14px; cursor: pointer; transition: all 0.2s; letter-spacing: 1px; }
        .toggle-btn.active { border-color: #c9a96e; background: rgba(201,169,110,0.12); color: #c9a96e; }
        .error-msg { color: #f87171; font-size: 13px; margin-top: 8px; text-align: center; }
        .btn-analyze { width: 100%; margin-top: 28px; padding: 16px; border-radius: 12px; border: 1px solid #c9a96e; background: linear-gradient(135deg, rgba(201,169,110,0.15), rgba(201,169,110,0.05)); color: #c9a96e; font-family: 'Noto Serif KR', serif; font-size: 16px; font-weight: 500; letter-spacing: 4px; cursor: pointer; transition: all 0.3s; }
        .btn-analyze:hover { background: linear-gradient(135deg, rgba(201,169,110,0.3), rgba(201,169,110,0.1)); box-shadow: 0 0 30px rgba(201,169,110,0.2); }

        .loading-wrap { text-align: center; padding: 80px 20px; }
        .spinner { width: 60px; height: 60px; border: 2px solid rgba(201,169,110,0.2); border-top-color: #c9a96e; border-radius: 50%; animation: spin 1.2s linear infinite; margin: 0 auto 24px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text { font-size: 14px; color: #8a7a65; letter-spacing: 3px; animation: pulse 1.5s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }

        .result-wrap { max-width: 720px; margin: 0 auto; }
        .result-header { text-align: center; margin-bottom: 36px; }
        .result-name { font-family: 'Hahmlet', serif; font-size: 28px; font-weight: 300; color: #f0e6d0; letter-spacing: 8px; margin-bottom: 6px; }
        .result-meta { font-size: 12px; color: #6a6055; margin-bottom: 8px; }
        .result-summary { font-size: 14px; color: #c9a96e; font-style: italic; }

        .pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 28px; }
        @media (max-width: 480px) { .pillars-grid { grid-template-columns: repeat(2, 1fr); } }
        .pillar-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(201,169,110,0.2); border-radius: 16px; padding: 20px 12px; text-align: center; }
        .pillar-label { font-size: 10px; color: #8a7a65; letter-spacing: 2px; margin-bottom: 12px; }
        .pillar-gan { font-family: 'Hahmlet', serif; font-size: 32px; color: #c9a96e; line-height: 1; }
        .pillar-ji { font-family: 'Hahmlet', serif; font-size: 32px; color: #e8dcc8; line-height: 1; }
        .pillar-sub { font-size: 10px; color: #6a6055; margin-top: 8px; }

        .section-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(201,169,110,0.15); border-radius: 20px; padding: 28px; margin-bottom: 16px; }
        .section-title { font-size: 11px; letter-spacing: 4px; color: #c9a96e; margin-bottom: 20px; text-transform: uppercase; }

        .ohaeng-bars { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .ohaeng-row { display: flex; align-items: center; gap: 12px; }
        .ohaeng-label { width: 48px; font-size: 13px; color: #a09080; text-align: right; flex-shrink: 0; }
        .ohaeng-bar-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
        .ohaeng-bar-fill { height: 100%; border-radius: 4px; }
        .ohaeng-val { width: 20px; font-size: 12px; color: #6a6055; text-align: right; flex-shrink: 0; }
        .ohaeng-comment { font-size: 13px; color: #9a8a75; line-height: 1.8; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .yongshin-badge { display: inline-block; padding: 6px 16px; border: 1px solid #c9a96e; border-radius: 20px; font-size: 13px; color: #c9a96e; margin-top: 12px; }

        .section-tag { display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 11px; letter-spacing: 1px; margin-bottom: 14px; border: 1px solid; }
        .analysis-text { font-size: 14px; color: #c8baa8; line-height: 2; }

        .btn-row { display: flex; gap: 12px; margin-top: 28px; justify-content: center; flex-wrap: wrap; }
        .btn-secondary { padding: 12px 28px; border-radius: 10px; border: 1px solid rgba(201,169,110,0.3); background: transparent; color: #8a7a65; font-family: 'Noto Serif KR', serif; font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: all 0.2s; }
        .btn-secondary:hover { border-color: #c9a96e; color: #c9a96e; }
        .btn-primary { padding: 12px 32px; border-radius: 10px; border: 1px solid #c9a96e; background: linear-gradient(135deg, rgba(201,169,110,0.2), rgba(201,169,110,0.05)); color: #c9a96e; font-family: 'Noto Serif KR', serif; font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: all 0.3s; }
        .btn-primary:hover { background: linear-gradient(135deg, rgba(201,169,110,0.35), rgba(201,169,110,0.1)); }

        .footer { text-align: center; margin-top: 60px; font-size: 11px; color: #3a3530; letter-spacing: 2px; }

        @media print {
          body { background: white; }
          .app { background: white; color: #1a1a1a; padding: 20px; }
          .no-print { display: none !important; }
          .header h1 { color: #1a1a1a; } .header-deco { color: #8a6020; } .header-sub { color: #666; }
          .result-name { color: #1a1a1a; } .result-summary { color: #8a6020; }
          .pillar-card { background: #f8f5f0; border: 1px solid #d4a849; }
          .pillar-gan { color: #8a6020; } .pillar-ji { color: #1a1a1a; }
          .section-card { background: #f8f5f0; border: 1px solid #ddd; break-inside: avoid; }
          .section-title { color: #8a6020; }
          .ohaeng-bar-bg { background: #e8e0d0; } .ohaeng-comment { color: #444; }
          .analysis-text { color: #333; }
          .yongshin-badge { border-color: #8a6020; color: #8a6020; }
          .divider-dot { background: #d4a849; }
        }
      `}</style>

      <div className="app">
        <div className="header">
          <div className="header-deco">◈ 사주 명리학 ◈</div>
          <h1>사주<span>분석</span></h1>
          <div className="header-sub">생년월일시로 알아보는 나의 운명</div>
          <div className="divider">
            <div className="divider-line" />
            <div className="divider-dot" />
            <div className="divider-line" />
          </div>
        </div>

        {step === "form" && (
          <div className="form-card">
            <div className="form-section-title">생년월일 정보 입력</div>

            <div className="form-group">
              <label className="form-label">이름 (한글)</label>
              <input className="form-input" name="name" placeholder="예: 홍길동" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">
                한자 이름 <span className="form-note">선택 — 입력 시 성명학 분석 포함</span>
              </label>
              <input className="form-input" name="hanja" placeholder="예: 洪吉童 (모르면 비워두세요)" value={form.hanja} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label">성별</label>
              <div className="toggle-row">
                {["female", "male"].map((g) => (
                  <button key={g} className={`toggle-btn ${form.gender === g ? "active" : ""}`} onClick={() => setForm((f) => ({ ...f, gender: g }))}>
                    {g === "female" ? "♀ 여성" : "♂ 남성"}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">양력 / 음력</label>
              <div className="toggle-row">
                {["양력", "음력"].map((c) => (
                  <button key={c} className={`toggle-btn ${form.calendar === c ? "active" : ""}`} onClick={() => setForm((f) => ({ ...f, calendar: c }))}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">생년월일</label>
              <div className="date-row">
                <input className="form-input" name="year" placeholder="년도 (예: 1993)" value={form.year} onChange={handleChange} maxLength={4} />
                <input className="form-input" name="month" placeholder="월" value={form.month} onChange={handleChange} maxLength={2} />
                <input className="form-input" name="day" placeholder="일" value={form.day} onChange={handleChange} maxLength={2} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">태어난 시 (시주)</label>
              <select className="form-select" name="hour" value={form.hour} onChange={handleChange}>
                {HOUR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {error && <div className="error-msg">{error}</div>}
            <button className="btn-analyze" onClick={analyze}>사주 분석하기</button>
          </div>
        )}

        {step === "loading" && (
          <div className="loading-wrap">
            <div className="spinner" />
            <div className="loading-text">사주를 분석하는 중...</div>
          </div>
        )}

        {step === "result" && result && (
          <div className="result-wrap">
            <div className="result-header">
              <div className="result-name">{form.name}{form.hanja && ` · ${form.hanja}`}</div>
              <div className="result-meta">{form.year}년 {form.month}월 {form.day}일 · {form.gender === "female" ? "여" : "남"} · {form.calendar}</div>
              <div className="result-summary">{result.ilgan_type} — {result.summary}</div>
            </div>

            <div className="section-card">
              <div className="section-title">◈ 사주팔자 四柱八字</div>
              <div className="pillars-grid">
                {["year", "month", "day", "hour"].map((k) => {
                  const p = result.pillars[k];
                  return (
                    <div key={k} className="pillar-card">
                      <div className="pillar-label">{p.label}</div>
                      <div className="pillar-gan">{p.gan}</div>
                      <div className="pillar-ji">{p.ji}</div>
                      <div className="pillar-sub">{p.animal || p.season || p.meaning || ""}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="section-card">
              <div className="section-title">◈ 오행 분포 五行</div>
              <div className="ohaeng-bars">
                {Object.entries(result.ohaeng).map(([key, val]) => (
                  <div key={key} className="ohaeng-row">
                    <div className="ohaeng-label">{OHAENG_EMOJI[key]} {key}</div>
                    <div className="ohaeng-bar-bg">
                      <div className="ohaeng-bar-fill" style={{ width: `${(val / maxOhaeng) * 100}%`, background: OHAENG_COLORS[key], opacity: 0.7 }} />
                    </div>
                    <div className="ohaeng-val">{val}</div>
                  </div>
                ))}
              </div>
              <div className="ohaeng-comment">{result.ohaeng_comment}</div>
              <div><span className="yongshin-badge">✦ 용신 · {result.yongshin}</span></div>
            </div>

            {SECTIONS.map(({ key, label, color }) => (
              <div key={key} className="section-card">
                <div className="section-title">◈ {label}</div>
                <span className="section-tag" style={{ color, borderColor: color, background: `${color}15` }}>{label}</span>
                <div className="analysis-text">{result[key]}</div>
              </div>
            ))}

            <div className="btn-row no-print">
              <button className="btn-secondary" onClick={() => { setStep("form"); setResult(null); }}>다시 분석</button>
              <button className="btn-primary" onClick={() => window.print()}>📄 PDF 저장</button>
            </div>
          </div>
        )}

        <div className="footer">◈ AI 사주 명리학 분석 · 2026 ◈</div>
      </div>
    </>
  );
}
