# 회원가입 페이지

React와 Tailwind CSS로 만든 회원가입 페이지입니다. Figma에서 정의한 Color, Typography, Button, Input 디자인 시스템을 코드에 적용했습니다.

## 화면

### Figma 디자인 시스템

<img width="798" height="689" alt="스크린샷 2026-09-28 오후 4 33 37" src="https://github.com/user-attachments/assets/59677042-2b79-4a2d-9620-275026f30431" />


### 회원가입 페이지

> 제출 전 실행 화면 캡처를 아래에 추가합니다.

<img width="1800" height="2912" alt="screencapture-localhost-5173-2026-09-28-16_31_43" src="https://github.com/user-attachments/assets/c59814f6-7c4f-4d1e-8f10-40295dea98a9" />



## 구현 내용

- 이름, 이메일, 비밀번호, 비밀번호 확인 입력창
- 회원가입 버튼
- 재사용 가능한 `Input` 컴포넌트
  - `default`
  - `focus`
  - `filled`
  - `disabled`
- 재사용 가능한 `Button` 컴포넌트
  - `default`, `hover`, `active`, `disabled`
- Tailwind CSS 기반 스타일링
- 비밀번호 일치 여부 확인 및 회원가입 완료 메시지

## 디자인 토큰

- Primary: `primary-100` ~ `primary-900`
- Neutral: `neutral-100` ~ `neutral-900`
- Typography: `title-lg`, `title-md`, `title-sm`, `body-lg`, `body-md`, `body-sm`, `caption`

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 터미널에 표시된 주소(기본값: `http://localhost:5173`)를 열어 확인할 수 있습니다.

## 프로젝트 구조

```text
src/
├── components/
│   ├── Button.jsx
│   └── Input.jsx
├── App.jsx
└── index.css
```
