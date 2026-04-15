import { SC } from "../../data/constants";
import styles from "../css/uiPrimitives.module.css"
import clsx from "clsx";

// ─── Badge (kept dynamic because it depends on runtime data) ────────────────
export const Badge = ({ s, label }) => {
  const c = SC[s] || { bg: "rgba(255,255,255,.06)", text: "#6b8bb0" };

  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {label || s}
    </span>
  );
};

// ─── Label ───────────────────────────────────────────────────────────────────
export const Lbl = ({ children }) => (
  <p className={styles.Lbl}>{children}</p>
);

// ─── Input ───────────────────────────────────────────────────────────────────
export const Inp = (props) => (
  <input {...props} className={styles.Inp} />
);

// ─── Select ──────────────────────────────────────────────────────────────────
export const Sel = ({ children, ...props }) => (
  <select {...props} className={styles.Sel}>
    {children}
  </select>
);

// ─── Textarea ───────────────────────────────────────────────────────────────
export const Txta = (props) => (
  <textarea {...props} className={styles.Txta} />
);

// ─── Card ────────────────────────────────────────────────────────────────────
export const Card = ({ children, className, style }) => (
  <div className={clsx(styles.Card, className)} style={style}>
    {children}
  </div>
);

// ─── Primary button (gold) ──────────────────────────────────────────────────
export const GoldBtn = ({ children, onClick, className, style }) => (
  <button
    onClick={onClick}
    className={clsx(styles.GoldBtn, className)}
    style={style}
  >
    {children}
  </button>
);

// ─── Secondary button (ghost) ───────────────────────────────────────────────
export const GhostBtn = ({ children, onClick, className, style }) => (
  <button
    onClick={onClick}
    className={clsx(styles.GhostBtn, className)}
    style={style}
  >
    {children}
  </button>
);

// ─── Table header cell ──────────────────────────────────────────────────────
export const TH = ({ children }) => (
  <th className={styles.TH}>{children}</th>
);

// ─── Page header ─────────────────────────────────────────────────────────────
export const PageHeader = ({ title, sub, action }) => (
  <div className={styles.PageHeader}>
    <div>
      <h1
        style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 28,
          fontWeight: 700,
          color: "#e8f0ff",
          marginBottom: 6,
        }}
      >
        {title}
      </h1>
      <p style={{ fontSize: 14, color: "#3a5a78" }}>{sub}</p>
    </div>
    {action}
  </div>
);