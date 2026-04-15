import { Shield, AlertCircle } from 'lucide-react'
import { Lbl, Inp } from '../uiPrimitives'
import styles from '../../css/LoginPage.module.css'

function LoginForm({ email, setEmail, pw, setPw, err, busy, onSubmit }) {
  const handleKey = e => e.key === 'Enter' && onSubmit()

  return (
    <>
      <div className={styles.fieldWrapper}>
        <Lbl>Student Email</Lbl>
        <Inp
          type="email"
          placeholder="student@mail.dcu.ie"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
          onKeyDown={handleKey}
        />
      </div>

      <div className={styles.fieldWrapperLast}>
        <Lbl>Password</Lbl>
        <Inp
          type="password"
          placeholder="••••••••"
          value={pw}
          onChange={e => {
            setPw(e.target.value)
          }}
          onKeyDown={handleKey}
        />
      </div>

      {err && (
        <div className={styles.error}>
          <AlertCircle size={14} /> {err}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={busy}
        className={styles.primaryBtn}
        style={{
          background: busy
            ? 'rgba(201,162,39,.45)'
            : 'linear-gradient(135deg,#c9a227,#e8c56a)',
          cursor: busy ? 'wait' : 'pointer',
        }}
      >
        {busy ? 'Signing in…' : 'Sign In'}
      </button>

      <button onClick={onSubmit} className={styles.secondaryBtn}>
        <Shield size={13} /> Continue with DCU SSO
      </button>

      <p className={styles.footer}>
        Demo: use any @mail.dcu.ie address + any password
      </p>
    </>
  )
}

export default LoginForm
