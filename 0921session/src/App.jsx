import { useState } from 'react'
import Button from './components/Button'
import Input from './components/Input'

const initialForm = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
}

export default function App() {
  const [form, setForm] = useState(initialForm)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setIsSubmitted(false)
  }

  const passwordsMatch = form.password === form.passwordConfirm
  const canSubmit = Object.values(form).every(Boolean) && passwordsMatch

  const handleSubmit = (event) => {
    event.preventDefault()
    if (canSubmit) setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-12 sm:px-8">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-white p-8 text-neutral-900 sm:p-12">
          <p className="caption inline-flex rounded-full bg-primary-100 px-3 py-1.5 text-primary-700">INPUT COMPONENT</p>
          <h1 className="title-md mt-8">재사용 가능한<br />Input 컴포넌트</h1>
          <p className="body-md mt-4 text-neutral-300">각 상태를 한 컴포넌트로 관리합니다.</p>

          <div className="mt-10 space-y-5 border-t border-neutral-100 pt-8">
            <Input label="Default" placeholder="내용을 입력하세요" state="default" />
            <Input label="Focus" placeholder="포커스 상태" state="focus" />
            <Input label="Filled" value="hong@example.com" readOnly state="filled" />
            <Input label="Disabled" placeholder="입력할 수 없습니다" disabled state="disabled" />
          </div>
        </section>

        <section className="p-8 sm:p-12">
          <div className="mb-8">
            <h2 className="title-sm">회원가입</h2>
            <p className="body-sm mt-2 text-neutral-300">정보를 입력해 계정을 만들어 주세요.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <Input label="이름" name="name" placeholder="이름을 입력하세요" value={form.name} onChange={handleChange} required />
            <Input label="이메일" name="email" type="email" placeholder="example@email.com" value={form.email} onChange={handleChange} required />
            <Input label="비밀번호" name="password" type="password" placeholder="8자 이상 입력하세요" value={form.password} onChange={handleChange} required />
            <Input
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              value={form.passwordConfirm}
              onChange={handleChange}
              required
              error={Boolean(form.passwordConfirm) && !passwordsMatch}
              helperText={form.passwordConfirm && !passwordsMatch ? '비밀번호가 일치하지 않습니다.' : '영문, 숫자, 특수문자 조합 8자 이상'}
            />
            <Button text="회원가입" type="submit" disabled={!canSubmit} />
            {isSubmitted && (
              <p className="body-sm rounded-xl bg-primary-100 px-4 py-3 text-primary-700" role="status">
                회원가입이 완료되었습니다. 환영합니다!
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  )
}
