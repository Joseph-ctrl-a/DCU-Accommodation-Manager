// ─── Login ──────────────────────────────────────────────────────────────────

import { useState } from "react";
import {Shield, AlertCircle} from "lucide-react";
import styles from "../css/LoginPage.module.css"
import { Lbl, Inp } from "./uiPrimitives";
export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const go = () => {
    if (!email || !pw) {
      setErr("Please enter your credentials.");
      return;
    }
    if (!email.includes("@mail.dcu.ie") && email !== "demo") {
      setErr("Please use your DCU student email (@mail.dcu.ie).");
      return;
    }

    setErr("");
    setBusy(true);

    setTimeout(() => {
      setBusy(false);
      onLogin();
    }, 900);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid} />
      <div className={styles.glow} />

      <div className={`${styles.card} fu`}>
        <div className={styles.logo}>
          <span className={styles.logoText}>D</span>
        </div>

        <h1 className={styles.title}>Welcome back</h1>

        <p className={styles.subtitle}>
          Sign in to your DCU Accommodation Portal
        </p>

        <div style={{ marginBottom: 14 }}>
          <Lbl>Student Email</Lbl>
          <Inp
            type="email"
            placeholder="student@mail.dcu.ie"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr("");
            }}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />
        </div>

        <div style={{ marginBottom: 22 }}>
          <Lbl>Password</Lbl>
          <Inp
            type="password"
            placeholder="••••••••"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setErr("");
            }}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />
        </div>

        {err && (
          <div className={styles.error}>
            <AlertCircle size={14} />
            {err}
          </div>
        )}

        <button
          onClick={go}
          disabled={busy}
          className={styles.primaryBtn}
          style={{
            background: busy
              ? "rgba(201,162,39,.45)"
              : "linear-gradient(135deg,#c9a227,#e8c56a)",
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "Signing in…" : "Sign In"}
        </button>

        <button onClick={go} className={styles.secondaryBtn}>
          <Shield size={13} />
          Continue with DCU SSO
        </button>

        <p className={styles.footer}>
          Demo: use any @mail.dcu.ie address + any password
        </p>
      </div>
    </div>
  );
}
export default LoginPage