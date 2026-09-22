# 회원가입 페이지

React와 Tailwind CSS로 만든 회원가입 페이지입니다. Figma에서 정의한 Color, Typography, Button, Input 디자인 시스템을 코드에 적용했습니다.

## 화면

### Figma 디자인 시스템

<img width="577" height="516" alt="스크린샷 2026-09-22 오전 11 24 52" src="https://github.com/user-attachments/assets/56607bbb-e959-470c-80df-8bb322528384" />


### 회원가입 페이지

> 제출 전 실행 화면 캡처를 아래에 추가합니다.

<img width="1072" height="775" alt="스크린샷 2026-09-22 오전 11 25 03" src="https://github.com/user-attachments/assets/350ee088-92fc-4aa1-8148-a23bc89c5ef7" />


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
