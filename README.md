# 사주분석 앱 🔮

AI 사주명리학 분석 웹앱 — Anthropic Claude API 기반

---

## 배포 방법 (Vercel 무료, 5분 완성)

### 1단계 — GitHub에 올리기

1. [github.com](https://github.com) 로그인 (없으면 가입)
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `saju-app` 입력 → **Create repository**
4. 이 폴더 전체를 GitHub에 업로드 (Upload files 버튼)

### 2단계 — Vercel 배포

1. [vercel.com](https://vercel.com) 접속 → **GitHub으로 로그인**
2. **New Project** → 방금 만든 `saju-app` 선택 → **Import**
3. **Environment Variables** 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: 본인 Anthropic API 키 붙여넣기
4. **Deploy** 클릭!

→ 배포 완료되면 `https://saju-app-xxx.vercel.app` 링크 생성!

---

## Anthropic API 키 발급

1. [console.anthropic.com](https://console.anthropic.com) 접속
2. 회원가입 후 → **API Keys** → **Create Key**
3. 키 복사해서 Vercel 환경변수에 붙여넣기

> ⚠️ API 키는 절대 코드에 직접 넣지 마세요! 환경변수로만 관리.

---

## 비용 참고

- Vercel 배포: **무료**
- Claude API: 분석 1회당 약 **$0.002~0.004** (약 3~6원)
- 월 1000명 사용 시 약 $2~4 수준

---

## 기술 스택

- **Frontend**: Next.js, React
- **AI**: Anthropic Claude (claude-haiku-4-5)
- **배포**: Vercel
