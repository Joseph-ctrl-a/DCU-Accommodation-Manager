import { useState } from 'react'
import LoginBackground from './LoginBackground'
import LoginForm from './LoginForm'
import styles from '../../css/LoginPage.module.css'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const setEmailClear = v => {
    setEmail(v)
    setErr('')
  }
  const setPwClear = v => {
    setPw(v)
    setErr('')
  }

  const go = () => {
    if (!email || !pw) {
      setErr('Please enter your credentials.')
      return
    }
    if (!email.includes('@mail.dcu.ie') && email !== 'demo') {
      setErr('Please use your DCU student email (@mail.dcu.ie).')
      return
    }

    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      onLogin()
    }, 900)
  }

  return (
    <div className={styles.wrapper}>
      <LoginBackground />
      <div className={`${styles.card} fu`}>
        <div className={styles.logo}>
          <span className={styles.logoText}>D</span>
        </div>
        <h1 className={styles.title}>Welcome back</h1>
        <p className={styles.subtitle}>
          Sign in to your DCU Accommodation Portal
        </p>

        <LoginForm
          email={email}
          setEmail={setEmailClear}
          pw={pw}
          setPw={setPwClear}
          err={err}
          busy={busy}
          onSubmit={go}
        />
      </div>
    </div>
  )
}

export default LoginPage
