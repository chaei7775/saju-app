import { useState } from "react";
import Head from "next/head";

const HOUR_OPTIONS = [
  { value: "모름", label: "모름 / 미상" },
  { value: "자시(밤 11시~새벽 1시)", label: "자시 (밤 11~새벽 1시)" },
  { value: "축시(새벽 1~3시)", label: "축시 (새벽 1~3시)" },
  { value: "인시(새벽 3~5시)", label: "인시 (새벽 3~5시)" },
  { value: "묘시(새벽 5~7시)", label: "묘시 (새벽 5~7시)" },
  { value: "진시(아침 7~9시)", label: "진시 (아침 7~9시)" },
  { value: "사시(오전 9~11시)", label: "사시 (오전 9~11시)" },
  { value: "오시(오전 11~오후 1시)", label: "오시 (오전 11~오후 1시)" },
  { value: "미시(오후 1~3시)", label: "미시 (오후 1~3시)" },
  { value: "신시(오후 3~5시)", label: "신시 (오후 3~5시)" },
  { value: "유시(오후 5~7시)", label: "유시 (오후 5~7시)" },
  { value: "술시(오후 7~9시)", label: "술시 (오후 7~9시)" },
  { value: "해시(오후 9~11시)", label: "해시 (오후 9~11시)" },
];

const SECTIONS_META = [
  { id: 1, title: "사주팔자 기본구조", sub: "四柱八字 基本構造" },
  { id: 2, title: "성격과 기질", sub: "性格 氣質 分析" },
  { id: 3, title: "건강과 체질", sub: "健康 體質 分析" },
  { id: 4, title: "재물운과 직업운", sub: "財物 職業 運勢" },
  { id: 5, title: "연애와 결혼운", sub: "緣愛 結婚 運勢" },
  { id: 6, title: "대운과 세운", sub: "大運 歲運 分析" },
  { id: 7, title: "종합조언과 개운법", sub: "綜合 開運法" },
];

const OHAENG_COLORS = { 목: "#2d6a2d", 화: "#c0392b", 토: "#c8860a", 금: "#7d3c98", 수: "#1a5276" };
const OHAENG_KO = { 목: "木", 화: "火", 토: "土", 금: "金", 수: "水" };

export default function Premium() {
  const [form, setForm] = useState({ name: "", hanja: "", gender: "female", year: "", month: "", day: "", hour: "모름", calendar: "양력" });
  const [step, setStep] = useState("form");
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  const [sections, setSections] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const generate = async () => {
    if (!form.name || !form.year || !form.month || !form.day) {
      setError("이름과 생년월일은 필수입력이에요!");
      return;
    }
    setError("");
    setStep("loading");
    setSections({});
    const results = {};

    for (let i = 1; i <= 7; i++) {
      setCurrentSection(SECTIONS_META[i - 1].title);
      setProgress(Math.round(((i - 1) / 7) * 100));
      try {
        const res = await fetch("/api/premium-section", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ birthInfo: form, section: i }),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        results[i] = data;
        setSections({ ...results });
      } catch (e) {
        setError(`섹션 ${i} 오류: ${e.message}`);
        setStep("form");
        return;
      }
    }

    setProgress(100);
    setStep("result");
  };

  const s = sections;
  const maxOhaeng = s[1] ? Math.max(...Object.values(s[1].ohaeng)) : 1;

  return (
    <>
      <Head>
        <title>사주팔자 정밀분석 보고서</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0ece4; font-family: 'Noto Serif KR', serif; }

        /* ── SCREEN STYLES ── */
        .screen-wrap { min-height: 100vh; background: #f0ece4; padding: 40px 20px; }

        .s-header { text-align: center; margin-bottom: 40px; }
        .s-header h1 { font-size: 28px; font-weight: 300; color: #2c1810; letter-spacing: 4px; }
        .s-header .sub { font-size: 12px; color: #8a6040; letter-spacing: 2px; margin-top: 8px; }

        .form-card { max-width: 540px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px; box-shadow: 0 4px 30px rgba(0,0,0,0.08); }
        .form-title { font-size: 11px; letter-spacing: 4px; color: #c9a96e; margin-bottom: 24px; text-transform: uppercase; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 12px; color: #8a7060; margin-bottom: 8px; letter-spacing: 1px; }
        .form-note { font-size: 10px; color: #b0a090; margin-left: 6px; }
        .form-input, .form-select { width: 100%; border: 1px solid #e0d5c5; border-radius: 10px; padding: 12px 16px; font-family: 'Noto Serif KR', serif; font-size: 15px; color: #2c1810; background: #faf8f5; outline: none; transition: border-color 0.2s; }
        .form-input:focus, .form-select:focus { border-color: #c9a96e; }
        .date-row { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; }
        .toggle-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .toggle-btn { padding: 12px; border-radius: 10px; border: 1px solid #e0d5c5; background: #faf8f5; color: #8a7060; font-family: 'Noto Serif KR', serif; font-size: 14px; cursor: pointer; transition: all 0.2s; }
        .toggle-btn.active { border-color: #c9a96e; background: #fdf5e0; color: #8a6020; }
        .btn-generate { width: 100%; margin-top: 28px; padding: 16px; border-radius: 12px; border: none; background: linear-gradient(135deg, #2c1810, #5c3020); color: #f0e0c0; font-family: 'Noto Serif KR', serif; font-size: 16px; letter-spacing: 4px; cursor: pointer; transition: all 0.3s; }
        .btn-generate:hover { background: linear-gradient(135deg, #3c2820, #7c4030); }
        .error-msg { color: #c0392b; font-size: 13px; margin-top: 10px; text-align: center; }

        .loading-wrap { max-width: 500px; margin: 80px auto; text-align: center; }
        .progress-bar-bg { height: 4px; background: #e0d5c5; border-radius: 2px; overflow: hidden; margin: 20px 0; }
        .progress-bar-fill { height: 100%; background: linear-gradient(90deg, #c9a96e, #8a6020); transition: width 0.5s ease; border-radius: 2px; }
        .loading-section { font-size: 14px; color: #8a6040; letter-spacing: 2px; }
        .loading-pct { font-size: 28px; font-weight: 300; color: #2c1810; margin: 12px 0 4px; }

        .btn-row { display: flex; gap: 12px; margin: 30px auto; max-width: 720px; justify-content: center; }
        .btn-back { padding: 12px 28px; border-radius: 10px; border: 1px solid #c0b0a0; background: transparent; color: #8a7060; font-family: 'Noto Serif KR', serif; font-size: 13px; cursor: pointer; }
        .btn-pdf { padding: 12px 36px; border-radius: 10px; border: none; background: linear-gradient(135deg, #2c1810, #5c3020); color: #f0e0c0; font-family: 'Noto Serif KR', serif; font-size: 14px; letter-spacing: 3px; cursor: pointer; }

        /* ── PRINT / PDF STYLES ── */
        .report { max-width: 720px; margin: 0 auto; background: white; }

        /* Cover */
        .cover { background: linear-gradient(160deg, #1a0a05 0%, #3c1810 50%, #1a0a05 100%); color: #f0e0c0; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 60px 40px; position: relative; page-break-after: always; }
        .cover-deco { font-size: 13px; letter-spacing: 8px; color: #c9a96e; margin-bottom: 60px; }
        .cover-title { font-size: 48px; font-weight: 300; letter-spacing: 10px; line-height: 1.3; margin-bottom: 16px; }
        .cover-title span { color: #c9a96e; }
        .cover-subtitle { font-size: 14px; letter-spacing: 4px; color: #a08060; margin-bottom: 80px; }
        .cover-name { font-size: 36px; font-weight: 300; letter-spacing: 10px; color: #f0e0c0; margin-bottom: 12px; }
        .cover-hanja { font-size: 22px; color: #c9a96e; letter-spacing: 6px; margin-bottom: 20px; }
        .cover-info { font-size: 13px; color: #a08060; letter-spacing: 2px; line-height: 2; }
        .cover-bottom { position: absolute; bottom: 40px; font-size: 11px; color: #6a5040; letter-spacing: 3px; }
        .cover-border { position: absolute; inset: 20px; border: 1px solid rgba(201,169,110,0.3); pointer-events: none; }

        /* TOC */
        .toc-page { padding: 60px 50px; page-break-after: always; min-height: 80vh; }
        .toc-title { font-size: 13px; letter-spacing: 6px; color: #c9a96e; margin-bottom: 40px; text-align: center; }
        .toc-item { display: flex; align-items: baseline; border-bottom: 1px dotted #ddd; padding: 14px 0; }
        .toc-num { font-size: 11px; color: #c9a96e; width: 40px; flex-shrink: 0; }
        .toc-name { font-size: 16px; color: #2c1810; flex: 1; }
        .toc-sub { font-size: 11px; color: #a09080; margin-left: 10px; }

        /* Section pages */
        .section-page { padding: 60px 50px; page-break-before: always; }
        .section-header { margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #2c1810; }
        .section-num { font-size: 11px; letter-spacing: 4px; color: #c9a96e; margin-bottom: 8px; }
        .section-title-ko { font-size: 28px; font-weight: 400; color: #2c1810; letter-spacing: 4px; }
        .section-title-hj { font-size: 13px; color: #a09080; letter-spacing: 3px; margin-top: 4px; }

        /* Content blocks */
        .content-block { margin-bottom: 36px; }
        .block-title { font-size: 13px; font-weight: 600; color: #2c1810; letter-spacing: 2px; margin-bottom: 12px; padding-left: 12px; border-left: 3px solid #c9a96e; }
        .block-text { font-size: 13px; color: #3a2820; line-height: 2.2; font-family: 'Noto Sans KR', sans-serif; font-weight: 300; }

        /* Pillar table */
        .pillar-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .pillar-table th { background: #2c1810; color: #f0e0c0; padding: 14px; text-align: center; font-size: 12px; letter-spacing: 2px; font-weight: 400; }
        .pillar-table td { border: 1px solid #e0d0c0; padding: 16px; text-align: center; }
        .pillar-char { font-size: 36px; color: #2c1810; line-height: 1; }
        .pillar-char.gan { color: #8a6020; }
        .pillar-char-name { font-size: 11px; color: #8a7060; margin-top: 4px; }
        .pillar-element { display: inline-block; font-size: 10px; padding: 2px 8px; border-radius: 10px; margin-top: 6px; color: white; }

        /* Ohaeng chart */
        .ohaeng-chart { margin: 20px 0; }
        .ohaeng-row { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .ohaeng-label { width: 60px; font-size: 13px; color: #2c1810; text-align: right; }
        .ohaeng-bar-bg { flex: 1; height: 10px; background: #f0ece4; border-radius: 5px; overflow: hidden; }
        .ohaeng-bar-fill { height: 100%; border-radius: 5px; }
        .ohaeng-num { width: 24px; font-size: 12px; color: #8a7060; }

        /* Month table */
        .month-table { width: 100%; border-collapse: collapse; font-size: 12px; }
        .month-table th { background: #f5f0e8; color: #2c1810; padding: 10px; text-align: center; font-weight: 500; border: 1px solid #e0d0c0; }
        .month-table td { border: 1px solid #e0d0c0; padding: 10px 14px; color: #3a2820; line-height: 1.8; font-family: 'Noto Sans KR', sans-serif; font-weight: 300; font-size: 12px; }
        .month-table .month-name { font-weight: 600; text-align: center; background: #faf5ec; }

        /* Daewoon */
        .daewoon-item { border-left: 3px solid #c9a96e; padding: 16px 20px; margin-bottom: 16px; background: #faf8f5; border-radius: 0 8px 8px 0; }
        .daewoon-period { font-size: 11px; color: #c9a96e; letter-spacing: 2px; margin-bottom: 4px; }
        .daewoon-theme { font-size: 16px; color: #2c1810; margin-bottom: 8px; }
        .daewoon-text { font-size: 12px; color: #5a4838; line-height: 1.9; font-family: 'Noto Sans KR', sans-serif; font-weight: 300; }

        /* Lucky elements */
        .lucky-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
        .lucky-item { background: #faf5ec; border: 1px solid #e8dcc8; border-radius: 10px; padding: 16px; }
        .lucky-item-title { font-size: 10px; letter-spacing: 2px; color: #c9a96e; margin-bottom: 8px; }
        .lucky-item-val { font-size: 13px; color: #2c1810; line-height: 1.8; }

        /* Strengths/Weaknesses list */
        .sw-item { display: flex; gap: 12px; margin-bottom: 16px; align-items: flex-start; }
        .sw-num { width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; margin-top: 2px; }
        .sw-num.strength { background: #2c1810; color: #f0e0c0; }
        .sw-num.weakness { background: #e0d0c0; color: #2c1810; }
        .sw-text { font-size: 13px; color: #3a2820; line-height: 1.9; font-family: 'Noto Sans KR', sans-serif; font-weight: 300; }

        /* Closing */
        .closing-page { background: linear-gradient(160deg, #1a0a05, #3c1810); color: #f0e0c0; padding: 80px 60px; text-align: center; page-break-before: always; min-height: 50vh; display: flex; flex-direction: column; justify-content: center; }
        .closing-deco { font-size: 11px; letter-spacing: 6px; color: #c9a96e; margin-bottom: 40px; }
        .closing-msg { font-size: 16px; line-height: 2.5; color: #e0cdb0; font-weight: 300; max-width: 500px; margin: 0 auto 40px; }
        .closing-name { font-size: 24px; letter-spacing: 6px; color: #c9a96e; }
        .closing-foot { margin-top: 60px; font-size: 10px; color: #5a4030; letter-spacing: 3px; }

        @media print {
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .closing-page { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>

      {/* ── SCREEN UI ── */}
      {step === "form" && (
        <div className="screen-wrap no-print">
          <div className="s-header">
            <h1>사주팔자 정밀분석</h1>
            <div className="sub">◈ 프리미엄 보고서 생성 · 20~30페이지 ◈</div>
          </div>
          <div className="form-card">
            <div className="form-title">생년월일 정보 입력</div>

            <div className="form-group">
              <label className="form-label">이름 (한글)</label>
              <input className="form-input" name="name" placeholder="예: 홍길동" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">한자 이름 <span className="form-note">선택 — 입력 시 성명학 분석 포함</span></label>
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
            <button className="btn-generate" onClick={generate}>✦ 정밀분석 보고서 생성</button>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="screen-wrap no-print">
          <div className="loading-wrap">
            <div style={{ fontSize: 13, letterSpacing: 4, color: "#8a6040", marginBottom: 8 }}>◈ 분석 중 ◈</div>
            <div className="loading-pct">{progress}%</div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="loading-section">{currentSection} 분석 중...</div>
            <div style={{ marginTop: 24, fontSize: 12, color: "#b0a090" }}>약 2~3분 소요됩니다</div>
          </div>
        </div>
      )}

      {step === "result" && s[1] && (
        <>
          {/* Print button */}
          <div className="btn-row no-print">
            <button className="btn-back" onClick={() => { setStep("form"); setSections({}); }}>다시 생성</button>
            <button className="btn-pdf" onClick={() => window.print()}>📄 PDF 저장</button>
          </div>

          <div className="report">
            {/* ── COVER ── */}
            <div className="cover">
              <div className="cover-border" />
              <div className="cover-deco">◈ 사주명리학 정밀분석 보고서 ◈</div>
              <div className="cover-title">사주<span>팔자</span><br />정밀분석</div>
              <div className="cover-subtitle">四柱八字 精密分析 報告書</div>
              <div className="cover-name">{form.name}</div>
              {form.hanja && <div className="cover-hanja">{form.hanja}</div>}
              <div className="cover-info">
                {form.year}년 {form.month}월 {form.day}일 ({form.calendar})<br />
                {form.gender === "female" ? "여성" : "남성"} · {form.hour}<br /><br />
                {s[1]?.pillars && (
                  <>
                    {s[1].pillars.year.gan}{s[1].pillars.year.ji}&nbsp;
                    {s[1].pillars.month.gan}{s[1].pillars.month.ji}&nbsp;
                    {s[1].pillars.day.gan}{s[1].pillars.day.ji}&nbsp;
                    {s[1].pillars.hour.gan}{s[1].pillars.hour.ji}
                  </>
                )}
              </div>
              <div className="cover-bottom">2026년 · AI 사주명리학 분석</div>
            </div>

            {/* ── TOC ── */}
            <div className="toc-page">
              <div className="toc-title">◈ 목 차 ◈</div>
              {SECTIONS_META.map((sec, i) => (
                <div key={i} className="toc-item">
                  <div className="toc-num">0{sec.id}</div>
                  <div className="toc-name">{sec.title}</div>
                  <div className="toc-sub">{sec.sub}</div>
                </div>
              ))}
            </div>

            {/* ── SECTION 1: 사주팔자 기본구조 ── */}
            {s[1] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 01</div>
                  <div className="section-title-ko">사주팔자 기본구조</div>
                  <div className="section-title-hj">四柱八字 基本構造</div>
                </div>

                {/* 사주팔자표 */}
                <div className="content-block">
                  <div className="block-title">사주팔자 원국</div>
                  <table className="pillar-table">
                    <thead>
                      <tr>
                        {["시주 時柱", "일주 日柱", "월주 月柱", "년주 年柱"].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {["hour", "day", "month", "year"].map((k) => (
                          <td key={k}>
                            <div className="pillar-char gan">{s[1].pillars[k].gan}</div>
                            <div className="pillar-char-name">{s[1].pillars[k].gan_name}</div>
                            <div className="pillar-element" style={{ background: OHAENG_COLORS[s[1].pillars[k].element] || "#888" }}>
                              {s[1].pillars[k].element}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {["hour", "day", "month", "year"].map((k) => (
                          <td key={k}>
                            <div className="pillar-char">{s[1].pillars[k].ji}</div>
                            <div className="pillar-char-name">{s[1].pillars[k].ji_name}</div>
                            <div style={{ fontSize: 11, color: "#8a7060", marginTop: 4 }}>
                              {s[1].pillars[k].animal || s[1].pillars[k].season || s[1].pillars[k].meaning || ""}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 오행 분포 */}
                <div className="content-block">
                  <div className="block-title">오행 분포</div>
                  <div className="ohaeng-chart">
                    {Object.entries(s[1].ohaeng).map(([key, val]) => (
                      <div key={key} className="ohaeng-row">
                        <div className="ohaeng-label">{OHAENG_KO[key]} {key}</div>
                        <div className="ohaeng-bar-bg">
                          <div className="ohaeng-bar-fill" style={{ width: `${(val / maxOhaeng) * 100}%`, background: OHAENG_COLORS[key] }} />
                        </div>
                        <div className="ohaeng-num">{val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="block-text" style={{ marginTop: 12 }}>{s[1].balance_analysis}</div>
                </div>

                <div className="content-block">
                  <div className="block-title">일간 분석 — 나는 어떤 사람인가</div>
                  <div className="block-text">{s[1].ilgan_analysis}</div>
                </div>

                <div className="content-block">
                  <div className="block-title">각 기둥의 의미</div>
                  {["year", "month", "day", "hour"].map((k) => (
                    <div key={k} style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#8a6020", marginBottom: 6 }}>
                        {k === "year" ? "년주 — 뿌리와 조상" : k === "month" ? "월주 — 사회와 직업" : k === "day" ? "일주 — 나와 배우자" : "시주 — 자녀와 말년"}
                      </div>
                      <div className="block-text">{s[1].pillar_meanings[k]}</div>
                    </div>
                  ))}
                </div>

                <div className="content-block">
                  <div className="block-title">용신 — {s[1].yongshin}</div>
                  <div className="block-text">{s[1].yongshin_detail}</div>
                </div>

                <div className="content-block">
                  <div className="block-title">특수신살 분석</div>
                  <div className="block-text">{s[1].special_stars}</div>
                </div>
              </div>
            )}

            {/* ── SECTION 2: 성격과 기질 ── */}
            {s[2] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 02</div>
                  <div className="section-title-ko">성격과 기질</div>
                  <div className="section-title-hj">性格 氣質 分析</div>
                </div>
                <div className="content-block">
                  <div className="block-title">핵심 성격</div>
                  <div className="block-text">{s[2].core_personality}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">타고난 강점</div>
                  {Array.isArray(s[2].strengths) ? s[2].strengths.map((item, i) => (
                    <div key={i} className="sw-item">
                      <div className="sw-num strength">{i + 1}</div>
                      <div className="sw-text">{item}</div>
                    </div>
                  )) : <div className="block-text">{s[2].strengths}</div>}
                </div>
                <div className="content-block">
                  <div className="block-title">보완이 필요한 점</div>
                  {Array.isArray(s[2].weaknesses) ? s[2].weaknesses.map((item, i) => (
                    <div key={i} className="sw-item">
                      <div className="sw-num weakness">{i + 1}</div>
                      <div className="sw-text">{item}</div>
                    </div>
                  )) : <div className="block-text">{s[2].weaknesses}</div>}
                </div>
                <div className="content-block">
                  <div className="block-title">대인관계 스타일</div>
                  <div className="block-text">{s[2].social_style}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">스트레스 반응과 극복법</div>
                  <div className="block-text">{s[2].stress_response}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">겉모습 vs 내면</div>
                  <div className="block-text">{s[2].hidden_self}</div>
                </div>
              </div>
            )}

            {/* ── SECTION 3: 건강과 체질 ── */}
            {s[3] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 03</div>
                  <div className="section-title-ko">건강과 체질</div>
                  <div className="section-title-hj">健康 體質 分析</div>
                </div>
                {[
                  ["체질 분석", "constitution"], ["건강한 부위", "strong_organs"],
                  ["주의 부위 및 장기", "weak_organs"], ["생애 주의 질환", "disease_tendency"],
                  ["맞는 식이요법", "diet_advice"], ["추천 운동", "exercise_advice"],
                  ["계절별 건강 주의", "seasonal_health"], ["정신건강", "mental_health"]
                ].map(([title, key]) => (
                  <div key={key} className="content-block">
                    <div className="block-title">{title}</div>
                    <div className="block-text">{s[3][key]}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── SECTION 4: 재물과 직업 ── */}
            {s[4] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 04</div>
                  <div className="section-title-ko">재물운과 직업운</div>
                  <div className="section-title-hj">財物 職業 運勢</div>
                </div>
                {[
                  ["재물 기질", "wealth_pattern"], ["재물이 들어오는 시기", "wealth_timing"],
                  ["재물 주의사항", "wealth_caution"], ["직업 적성 분석", "career_aptitude"],
                  ["추천 직업군", "best_jobs"], ["사업 가능성", "business_potential"],
                  ["직업·사업 주의점", "career_caution"], ["재테크 조언", "financial_advice"]
                ].map(([title, key]) => (
                  <div key={key} className="content-block">
                    <div className="block-title">{title}</div>
                    <div className="block-text">{s[4][key]}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── SECTION 5: 연애와 결혼 ── */}
            {s[5] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 05</div>
                  <div className="section-title-ko">연애와 결혼운</div>
                  <div className="section-title-hj">緣愛 結婚 運勢</div>
                </div>
                {[
                  ["연애 스타일", "love_style"], ["이상적인 배우자", "ideal_partner"],
                  ["조심해야 할 상대", "incompatible"], ["결혼 적령기 및 인연", "marriage_timing"],
                  ["결혼 후 가정생활", "marriage_life"], ["자녀운", "children"],
                  ["연애·결혼 주의사항", "love_caution"], ["궁합", "compatibility_signs"]
                ].map(([title, key]) => (
                  <div key={key} className="content-block">
                    <div className="block-title">{title}</div>
                    <div className="block-text">{s[5][key]}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── SECTION 6: 대운과 세운 ── */}
            {s[6] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 06</div>
                  <div className="section-title-ko">대운과 세운</div>
                  <div className="section-title-hj">大運 歲運 分析</div>
                </div>
                <div className="content-block">
                  <div className="block-title">현재 대운 분석</div>
                  <div className="block-text">{s[6].current_daewoon}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">생애 대운 흐름</div>
                  {Array.isArray(s[6].daewoon_flow) && s[6].daewoon_flow.map((d, i) => (
                    <div key={i} className="daewoon-item">
                      <div className="daewoon-period">{d.period}</div>
                      <div className="daewoon-theme">{d.theme}</div>
                      <div className="daewoon-text">{d.detail}</div>
                    </div>
                  ))}
                </div>
                <div className="content-block">
                  <div className="block-title">행운의 해</div>
                  <div className="block-text">{s[6].lucky_years}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">주의해야 할 해</div>
                  <div className="block-text">{s[6].caution_years}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">2026년 운세</div>
                  <div className="block-text" style={{ marginBottom: 16 }}>{s[6].year_2026?.overall}</div>
                  {s[6].year_2026?.months && (
                    <table className="month-table">
                      <thead><tr><th>월</th><th>운세</th></tr></thead>
                      <tbody>
                        {s[6].year_2026.months.map((m, i) => (
                          <tr key={i}>
                            <td className="month-name">{m.month}</td>
                            <td>{m.fortune}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            )}

            {/* ── SECTION 7: 종합조언 ── */}
            {s[7] && (
              <div className="section-page">
                <div className="section-header">
                  <div className="section-num">◈ 07</div>
                  <div className="section-title-ko">종합조언과 개운법</div>
                  <div className="section-title-hj">綜合 開運法</div>
                </div>
                <div className="content-block">
                  <div className="block-title">이 생의 미션</div>
                  <div className="block-text">{s[7].life_mission}</div>
                </div>
                <div className="content-block">
                  <div className="block-title">핵심 인생 조언</div>
                  <div className="block-text">{
                    Array.isArray(s[7].golden_advice)
                      ? s[7].golden_advice.map((a, i) => <div key={i} style={{ marginBottom: 12 }}>{a}</div>)
                      : s[7].golden_advice
                  }</div>
                </div>
                <div className="content-block">
                  <div className="block-title">행운의 요소</div>
                  <div className="lucky-grid">
                    {s[7].lucky_elements && Object.entries(s[7].lucky_elements).map(([key, val]) => (
                      <div key={key} className="lucky-item">
                        <div className="lucky-item-title">{key === "colors" ? "행운의 색" : key === "directions" ? "좋은 방향" : key === "numbers" ? "행운의 숫자" : "행운의 소재"}</div>
                        <div className="lucky-item-val">{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="content-block">
                  <div className="block-title">매일 실천하는 개운법</div>
                  <div className="block-text">{
                    Array.isArray(s[7].daily_practice)
                      ? s[7].daily_practice.map((p, i) => <div key={i} className="sw-item"><div className="sw-num strength">{i + 1}</div><div className="sw-text">{p}</div></div>)
                      : s[7].daily_practice
                  }</div>
                </div>
                <div className="content-block">
                  <div className="block-title">피해야 할 습관</div>
                  <div className="block-text">{
                    Array.isArray(s[7].caution_habits)
                      ? s[7].caution_habits.map((c, i) => <div key={i} className="sw-item"><div className="sw-num weakness">{i + 1}</div><div className="sw-text">{c}</div></div>)
                      : s[7].caution_habits
                  }</div>
                </div>
              </div>
            )}

            {/* ── CLOSING ── */}
            {s[7] && (
              <div className="closing-page">
                <div className="closing-deco">◈ 마무리 ◈</div>
                <div className="closing-msg">{s[7].closing_message}</div>
                <div className="closing-name">{form.name}{form.hanja ? ` · ${form.hanja}` : ""}</div>
                <div className="closing-foot">사주명리학 정밀분석 보고서 · 2026년 · AI 분석</div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
