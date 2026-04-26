const SECTION_PROMPTS = {
  1: (info) => `
당신은 30년 경력 사주명리학 전문가입니다. 아래 사주 정보를 바탕으로 "사주팔자 기본구조" 섹션을 작성하세요.

[사주정보]
이름: ${info.name}${info.hanja ? ` (${info.hanja})` : ""}
성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar})
태어난 시: ${info.hour}

다음 JSON 형식으로만 반환하세요. 마크다운 없음.
{
  "pillars": {
    "year": {"gan":"천간1글자","ji":"지지1글자","gan_name":"천간이름","ji_name":"지지이름","animal":"띠","element":"오행"},
    "month": {"gan":"천간1글자","ji":"지지1글자","gan_name":"천간이름","ji_name":"지지이름","season":"계절","element":"오행"},
    "day": {"gan":"천간1글자","ji":"지지1글자","gan_name":"천간이름","ji_name":"지지이름","meaning":"일간의미","element":"오행"},
    "hour": {"gan":"천간1글자또는미상","ji":"지지1글자또는미상","gan_name":"천간이름또는미상","ji_name":"지지이름또는미상","element":"오행또는미상"}
  },
  "ohaeng": {"목":0,"화":0,"토":0,"금":0,"수":0},
  "ilgan_analysis": "일간(일천간) 상세 분석 — 타고난 기질, 에너지 방향, 핵심 특성을 400자 이상 상세하게",
  "pillar_meanings": {
    "year": "년주 의미 — 조상·부모 운과 연관, 타고난 환경 200자",
    "month": "월주 의미 — 형제·직업·사회성 200자",
    "day": "일주 의미 — 본인 자신, 배우자궁 200자",
    "hour": "시주 의미 — 자녀·말년·꿈 200자"
  },
  "balance_analysis": "오행 균형 상태 분석 — 강한 오행과 약한 오행, 이것이 삶에 미치는 영향 300자",
  "yongshin": "용신",
  "yongshin_detail": "용신 상세 설명 — 왜 이 오행이 용신인지, 용신을 강화하는 구체적 방법 300자",
  "special_stars": "특수신살 분석 — 이 사주에서 발견되는 주요 신살(도화살, 역마살, 천을귀인 등) 설명 300자"
}`,

  2: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}

"성격과 기질" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "core_personality": "핵심 성격 분석 — 이 사람의 가장 본질적인 기질과 특성, 어떤 상황에서 빛나는지 500자",
  "strengths": "타고난 강점 5가지 — 각각 항목명과 100자 설명으로",
  "weaknesses": "보완이 필요한 점 4가지 — 각각 항목명과 100자 설명, 개선 방향 포함",
  "social_style": "대인관계 스타일 — 친구관계, 직장관계, 처음 만나는 사람과의 관계에서 어떻게 행동하는지 400자",
  "stress_response": "스트레스 반응 및 극복법 — 이 사주의 사람이 스트레스를 받을 때 나타나는 패턴과 회복 방법 300자",
  "life_theme": "이 사람의 인생 키워드 3가지와 그 이유 각 150자",
  "hidden_self": "겉으로 보이는 모습과 내면의 진짜 모습 비교 분석 300자"
}`,

  3: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}

"건강과 체질" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "constitution": "체질 분석 — 이 사주의 타고난 체질 특성, 오행과 연결된 신체 에너지 패턴 400자",
  "strong_organs": "건강한 신체 부위 및 장기 — 오행 기준으로 강한 부분과 그 이유 250자",
  "weak_organs": "주의가 필요한 신체 부위 — 오행 기준으로 약한 부분, 나이대별 주의점 350자",
  "disease_tendency": "생애 주의 질환 및 건강 이슈 — 구체적인 질환명과 예방법 350자",
  "diet_advice": "이 체질에 맞는 식이요법 — 좋은 음식, 피해야 할 음식, 계절별 식이 조언 300자",
  "exercise_advice": "맞는 운동 종류와 방법 — 오행 기질에 따른 최적 운동법 250자",
  "seasonal_health": "계절별 건강 주의사항 — 봄여름가을겨울 각각 주의점 250자",
  "mental_health": "정신건강 및 감정 패턴 — 이 사주가 겪기 쉬운 심리적 어려움과 극복법 300자"
}`,

  4: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}

"재물운과 직업운" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "wealth_pattern": "재물 기질 분석 — 이 사주의 돈을 버는 방식, 돈과의 관계 패턴 400자",
  "wealth_timing": "재물이 들어오는 시기 패턴 — 어떤 나이대, 어떤 상황에서 돈이 잘 들어오는지 300자",
  "wealth_caution": "재물 관련 주의사항 — 잃기 쉬운 상황, 피해야 할 투자·지출 패턴 300자",
  "career_aptitude": "직업 적성 분석 — 타고난 재능과 연결되는 직종 분야, 왜 맞는지 400자",
  "best_jobs": "추천 직업군 Top 5 — 각각 직업명과 이유 150자",
  "business_potential": "사업 가능성 분석 — 직장형인지 사업형인지, 사업한다면 어떤 분야가 맞는지 350자",
  "career_caution": "직업·사업에서 주의할 점 — 실패 패턴과 예방법 250자",
  "financial_advice": "재물 관리 및 재테크 조언 — 이 사주에 맞는 돈 관리법 250자"
}`,

  5: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}

"연애와 결혼운" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "love_style": "연애 스타일 분석 — 사랑을 표현하는 방식, 관계에서의 역할과 패턴 400자",
  "ideal_partner": "이상적인 배우자 유형 — 오행·성격·직업·띠 기준으로 잘 맞는 타입 350자",
  "incompatible": "조심해야 할 상대 유형 — 충돌이 생기기 쉬운 성격·띠 유형과 그 이유 250자",
  "marriage_timing": "결혼 적령기 및 인연이 오는 시기 분석 300자",
  "marriage_life": "결혼 후 가정생활 패턴 — 부부 관계, 가정에서의 역할, 배우자와의 관계 350자",
  "children": "자녀운 분석 — 자녀와의 관계, 자녀 수 경향, 자녀로 인한 기쁨과 주의점 250자",
  "love_caution": "연애·결혼에서 반복되는 패턴과 주의사항 300자",
  "compatibility_signs": "궁합 좋은 띠 Top 3와 이유, 피하면 좋은 띠 Top 2와 이유"
}`,

  6: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}
오늘: 2026년 4월

"대운과 세운" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "current_daewoon": "현재 대운 분석 — 지금 흐르고 있는 대운의 특성과 영향 400자",
  "daewoon_flow": [
    {"period": "20대", "theme": "이 시기 대운 키워드", "detail": "200자 설명"},
    {"period": "30대", "theme": "이 시기 대운 키워드", "detail": "200자 설명"},
    {"period": "40대", "theme": "이 시기 대운 키워드", "detail": "200자 설명"},
    {"period": "50대", "theme": "이 시기 대운 키워드", "detail": "200자 설명"},
    {"period": "60대이후", "theme": "이 시기 대운 키워드", "detail": "200자 설명"}
  ],
  "lucky_years": "앞으로 5년 내 가장 좋은 해와 그 이유 300자",
  "caution_years": "주의가 필요한 해와 준비사항 250자",
  "year_2026": {
    "overall": "2026년 전체 운세 흐름 300자",
    "months": [
      {"month": "4월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "5월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "6월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "7월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "8월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "9월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "10월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "11월", "fortune": "운세 키워드와 100자 설명"},
      {"month": "12월", "fortune": "운세 키워드와 100자 설명"}
    ]
  }
}`,

  7: (info) => `
당신은 30년 경력 사주명리학 전문가입니다.

[사주정보]
이름: ${info.name}, 성별: ${info.gender === "female" ? "여성" : "남성"}
생년월일: ${info.year}년 ${info.month}월 ${info.day}일 (${info.calendar}), 시: ${info.hour}

"종합조언과 개운법" 섹션을 다음 JSON으로 반환하세요. 마크다운 없음.
{
  "life_mission": "이 사람의 타고난 인생 미션과 방향성 — 사주가 보여주는 이 생의 과제 400자",
  "golden_advice": "이 사주를 가진 사람에게 드리는 핵심 인생 조언 3가지 — 각각 제목과 250자 설명",
  "lucky_elements": {
    "colors": "행운의 색깔 3가지와 이유",
    "directions": "좋은 방향(동서남북) 과 그 이유",
    "numbers": "행운의 숫자와 이유",
    "materials": "몸에 지니면 좋은 소재나 보석"
  },
  "daily_practice": "매일 실천할 수 있는 개운법 5가지 — 구체적이고 실용적으로 각 100자",
  "caution_habits": "이 사주가 반드시 피해야 할 습관이나 행동 패턴 4가지",
  "environment": "살기 좋은 환경 조건 — 방향, 인테리어 색상, 주거 스타일 250자",
  "closing_message": "따뜻하고 희망적인 마무리 메시지 300자"
}`
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { birthInfo, section } = req.body;

  try {
    const prompt = SECTION_PROMPTS[section](birthInfo);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 4096,
        system: "당신은 사주명리학 전문가입니다. 반드시 요청된 JSON 형식만 반환하고 마크다운 백틱이나 다른 텍스트는 절대 포함하지 마세요.",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const raw = data.content?.find((c) => c.type === "text")?.text || "";
    const clean = raw.replace(/```json|```/g, "").trim();
    const start = clean.indexOf("{");
    const end = clean.lastIndexOf("}");
    const parsed = JSON.parse(clean.slice(start, end + 1));

    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
