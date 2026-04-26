export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, hanja, gender, year, month, day, hour, calendar } = req.body;

  const prompt = `
이름: ${name}${hanja ? ` (한자: ${hanja})` : " (한자 미입력)"}
성별: ${gender === "female" ? "여성" : "남성"}
생년월일: ${year}년 ${month}월 ${day}일 (${calendar})
태어난 시: ${hour}
오늘 날짜: 2026년 4월 26일

위 정보를 바탕으로 사주명리학 + 성명학 분석을 해주세요.
반드시 아래 JSON 형식만 반환하고 마크다운 백틱이나 설명은 절대 포함하지 마세요.

{
  "pillars": {
    "year": { "gan": "천간(1글자)", "ji": "지지(1글자)", "label": "년주", "animal": "띠동물" },
    "month": { "gan": "천간(1글자)", "ji": "지지(1글자)", "label": "월주", "season": "계절" },
    "day": { "gan": "천간(1글자)", "ji": "지지(1글자)", "label": "일주", "meaning": "일간 의미" },
    "hour": { "gan": "천간(1글자 또는 미상)", "ji": "지지(1글자 또는 미상)", "label": "시주" }
  },
  "ohaeng": { "목": 숫자, "화": 숫자, "토": 숫자, "금": 숫자, "수": 숫자 },
  "ohaeng_comment": "오행 균형 코멘트 (2문장)",
  "yongshin": "용신",
  "ilgan_type": "일간 유형명",
  "summary": "사주 한줄 요약",
  "name_analysis": "성명학 분석 (2문장)",
  "personality": "성격 분석 (2~3문장)",
  "health": "건강운 (2문장)",
  "wealth": "재물운 (2문장)",
  "career": "직업/적성 (2문장)",
  "love": "연애·결혼운 (2문장)",
  "luck_2026": "2026년 운세 (2~3문장)",
  "advice": "인생 조언 및 개운법 (2문장)"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        system:
          "당신은 30년 경력의 사주명리학 전문가입니다. 오직 요청된 JSON 형식만 반환하고 다른 텍스트는 절대 포함하지 않습니다.",
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
