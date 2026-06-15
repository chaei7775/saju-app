export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, gender, year, month, day, hour, calendar } = req.body;

  const prompt = `名前: ${name}
性別: ${gender === "female" ? "女性" : "男性"}
生年月日: ${year}年 ${month}月 ${day}日 (${calendar === "新暦" ? "陽暦" : "陰暦"})
生まれた時間: ${hour}
今日: 2026年6月

あなたは韓国四柱命理学の専門家です。以下のJSON形式のみで返答してください。マークダウンや余分なテキストは絶対に含めないでください。

{
  "pillars": {
    "year": {"gan":"天干1文字","ji":"地支1文字","label":"年柱","animal":"干支"},
    "month": {"gan":"天干1文字","ji":"地支1文字","label":"月柱","season":"季節"},
    "day": {"gan":"天干1文字","ji":"地支1文字","label":"日柱","meaning":"日干の意味"},
    "hour": {"gan":"天干または不明","ji":"地支または不明","label":"時柱"}
  },
  "ohaeng": {"木":0,"火":0,"土":0,"金":0,"水":0},
  "ohaeng_comment": "五行バランスのコメント（日本語、2〜3文）",
  "yongshin": "用神（漢字1〜2文字）",
  "ilgan_type": "日干タイプ名（日本語）",
  "summary": "四柱ひと言まとめ（日本語、1文）",
  "personality": "性格・気質の分析（日本語、3〜4文）恋愛における性格の傾向も含める",
  "love": "恋愛運・縁結び分析（日本語、4〜5文）恋愛スタイル、どんな恋をしやすいか、今の恋愛運の流れ、注意点を含める",
  "ideal_partner": "理想の相手・相性分析（日本語、3〜4文）相性の良い干支・性格タイプ・出会いのヒントを含める",
  "luck_2026": "2026年の縁と恋愛運（日本語、4〜5文）今年出会いのチャンスがある時期、どんな縁が来るか、注意すべき時期を含める",
  "advice": "開運アドバイス（日本語、3〜4文）恋愛運を高める具体的な方法、ラッキーカラー、お守りになるものを含める"
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
        max_tokens: 2500,
        temperature: 0,
        messages: [
          {
            role: "system",
            content: "あなたは韓国四柱命理学の専門家です。必ずJSONのみ返答し、マークダウンや余分なテキストは絶対に含めないでください。"
          },
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
