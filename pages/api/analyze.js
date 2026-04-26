export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, hanja, gender, year, month, day, hour, calendar } = req.body;

  const prompt = `이름: ${name}${hanja ? ` (한자: ${hanja})` : ""}
성별: ${gender === "female" ? "여성" : "남성"}
생년월일: ${year}년 ${month}월 ${day}일 (${calendar})
태어난 시: ${hour}
오늘: 2026년 4월

사주명리학 분석을 아래 JSON 형식으로만 반환하세요. 백틱이나 다른 텍스트 절대 포함하지 마세요.

{
  "pillars": {
    "year": {"gan":"천간1글자","ji":"지지1글자","label":"년주","animal":"띠"},
    "month": {"gan":"천간1글자","ji":"지지1글자","label":"월주","season":"계절"},
    "day": {"gan":"천간1글자","ji":"지지1글자","label":"일주","meaning":"일간의미"},
    "hour": {"gan":"천간또는미상","ji":"지지또는미상","label":"시주"}
  },
  "ohaeng": {"목":0,"화":0,"토":0,"금":0,"수":0},
  "ohaeng_comment": "오행 균형 코멘트 2문장",
  "yongshin": "용신",
  "ilgan_type": "일간 유형명",
  "summary": "사주 한줄 요약",
  "name_analysis": "성명학 분석 2문장",
  "personality": "성격 분석 2~3문장",
  "health": "건강운 2문장",
  "wealth": "재물운 2문장",
  "career": "직업적성 2문장",
  "love": "연애결혼운 2문장",
  "luck_2026": "2026년 운세 2~3문장",
  "advice": "인생조언 개운법 2문장"
}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 2048,
        messages: [
          { role: "system", content: "당신은 사주명리학 전문가입니다. 반드시 JSON만 반환하고 다른 텍스트는 절대 포함하지 마세요." },
          { role: "user", content: prompt }
        ],
      }),
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const raw = data.choices?.[0]?.message?.content || "";
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    const parsed = JSON.parse(raw.slice(start, end + 1));
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
