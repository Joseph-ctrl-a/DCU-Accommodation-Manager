import { useState, useEffect } from "react";
import {
  Home, FileText, CreditCard, Users, Wrench, LogOut,
  Bell, Plus, CheckCircle, AlertCircle, X,
  Shield, MapPin, ChevronRight
} from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────────────────────
const DATA = {
  student: {
    name: "Alex Murphy", id: "22334455",
    email: "alex.murphy2@mail.dcu.ie",
    room: "Block C — Room 14", complex: "Larkfield Apartments",
    checkIn: "09 Sep 2024", checkOut: "31 May 2025",
    balance: 180, initials: "AM",
  },
  payments: [
    { id: "PAY-001", type: "Semester 1 Rent",   amount: 2850, date: "01 Sep 2024", status: "paid",    method: "Debit Card" },
    { id: "PAY-002", type: "Semester 2 Rent",   amount: 2850, date: "15 Jan 2025", status: "paid",    method: "Debit Card" },
    { id: "PAY-003", type: "Utility — Feb",     amount: 85,   date: "01 Feb 2025", status: "paid",    method: "Online Banking" },
    { id: "PAY-004", type: "Utility — Mar",     amount: 95,   date: "01 Mar 2025", status: "paid",    method: "Online Banking" },
    { id: "PAY-005", type: "Utility — Apr",     amount: 180,  date: "01 Apr 2025", status: "pending", method: "—" },
  ],
  guests: [
    { id: "G-001", name: "Emma Walsh",    arrival: "20 Jan 2025", departure: "21 Jan 2025", nights: 1, status: "approved" },
    { id: "G-002", name: "Liam Murphy",   arrival: "14 Feb 2025", departure: "15 Feb 2025", nights: 1, status: "approved" },
    { id: "G-003", name: "Sarah O'Brien", arrival: "10 Mar 2025", departure: "13 Mar 2025", nights: 3, status: "rejected", reason: "Exam period restriction" },
    { id: "G-004", name: "Tom Brennan",   arrival: "20 Apr 2025", departure: "21 Apr 2025", nights: 1, status: "pending" },
  ],
  tickets: [
    { id: "MT-001", issue: "Broken heating unit",   location: "Bedroom",     urgency: "urgent",     status: "resolved",    date: "05 Nov 2024" },
    { id: "MT-002", issue: "Faulty door lock",       location: "Front Door",  urgency: "urgent",     status: "in-progress", date: "18 Jan 2025" },
    { id: "MT-003", issue: "Leaking tap",            location: "Bathroom",    urgency: "non-urgent", status: "scheduled",   date: "22 Feb 2025" },
    { id: "MT-004", issue: "Window latch broken",    location: "Living Room", urgency: "non-urgent", status: "pending",     date: "01 Mar 2025" },
  ],
};

// ─── Status colour map ──────────────────────────────────────────────────────
const SC = {
  paid:         { bg: "rgba(34,197,94,.12)",   text: "#4ade80" },
  pending:      { bg: "rgba(234,179,8,.12)",   text: "#fcd34d" },
  overdue:      { bg: "rgba(239,68,68,.12)",   text: "#fca5a5" },
  approved:     { bg: "rgba(34,197,94,.12)",   text: "#4ade80" },
  rejected:     { bg: "rgba(239,68,68,.12)",   text: "#fca5a5" },
  resolved:     { bg: "rgba(34,197,94,.12)",   text: "#4ade80" },
  "in-progress":{ bg: "rgba(59,130,246,.12)",  text: "#93c5fd" },
  scheduled:    { bg: "rgba(234,179,8,.12)",   text: "#fcd34d" },
};

// ─── Shared primitives ──────────────────────────────────────────────────────
const Badge = ({ s, label }) => {
  const c = SC[s] || { bg: "rgba(255,255,255,.06)", text: "#6b8bb0" };
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500, whiteSpace: "nowrap" }}>
      {label || s}
    </span>
  );
};

const Lbl = ({ children }) => (
  <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.9px", color: "#3a5a78", marginBottom: 8 }}>{children}</p>
);

const Inp = ({ style, ...props }) => (
  <input {...props} style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(201,162,39,.18)", borderRadius: 10, padding: "11px 14px", color: "#dce8f5", fontFamily: "inherit", fontSize: 14, outline: "none", transition: "border-color .2s", ...style }} />
);

const Sel = ({ children, style, ...props }) => (
  <select {...props} style={{ width: "100%", background: "#0d1b2e", border: "1px solid rgba(201,162,39,.18)", borderRadius: 10, padding: "11px 14px", color: "#dce8f5", fontFamily: "inherit", fontSize: 14, outline: "none", cursor: "pointer", ...style }}>
    {children}
  </select>
);

const Txta = ({ style, ...props }) => (
  <textarea {...props} style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(201,162,39,.18)", borderRadius: 10, padding: "11px 14px", color: "#dce8f5", fontFamily: "inherit", fontSize: 14, outline: "none", minHeight: 90, resize: "vertical", ...style }} />
);

const Card = ({ children, style, className }) => (
  <div className={className} style={{ background: "#0d1b2e", border: "1px solid rgba(201,162,39,.1)", borderRadius: 14, padding: 24, ...style }}>
    {children}
  </div>
);

const GoldBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ background: "linear-gradient(135deg,#c9a227,#e8c56a)", border: "none", borderRadius: 10, padding: "11px 20px", color: "#07101e", fontFamily: "inherit", fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, transition: "opacity .2s,transform .15s", ...style }}
    onMouseOver={e => e.currentTarget.style.opacity = "0.88"}
    onMouseOut={e => e.currentTarget.style.opacity = "1"}
    onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
  >
    {children}
  </button>
);

const GhostBtn = ({ children, onClick, style }) => (
  <button onClick={onClick} style={{ background: "transparent", border: "1px solid rgba(255,255,255,.1)", borderRadius: 9, padding: "10px 18px", color: "#5a7a9a", fontFamily: "inherit", fontSize: 13.5, cursor: "pointer", transition: "all .15s", ...style }}
    onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "#8aa8c0"; }}
    onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.1)"; e.currentTarget.style.color = "#5a7a9a"; }}
  >
    {children}
  </button>
);

const TH = ({ children }) => (
  <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.7px", color: "#2e4a62", borderBottom: "1px solid rgba(255,255,255,.05)", whiteSpace: "nowrap" }}>
    {children}
  </th>
);

const PageHeader = ({ title, sub, action }) => (
  <div className="fu" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
    <div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "#e8f0ff", marginBottom: 6 }}>{title}</h1>
      <p style={{ fontSize: 14, color: "#3a5a78" }}>{sub}</p>
    </div>
    {action}
  </div>
);

// ─── Login ──────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pw,    setPw]    = useState("");
  const [err,   setErr]   = useState("");
  const [busy,  setBusy]  = useState(false);

  const go = () => {
    if (!email || !pw) { setErr("Please enter your credentials."); return; }
    if (!email.includes("@mail.dcu.ie") && email !== "demo") {
      setErr("Please use your DCU student email (@mail.dcu.ie)."); return;
    }
    setErr(""); setBusy(true);
    setTimeout(() => { setBusy(false); onLogin(); }, 900);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#07101e", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,162,39,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(201,162,39,.045) 1px,transparent 1px)", backgroundSize: "58px 58px" }} />
      {/* ambient glow */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)", width: 700, height: 450, background: "radial-gradient(ellipse,rgba(201,162,39,.07) 0%,transparent 65%)", pointerEvents: "none" }} />

      <div className="fu" style={{ background: "#0d1b2e", border: "1px solid rgba(201,162,39,.22)", borderRadius: 20, padding: "44px 44px", width: 420, position: "relative", zIndex: 1 }}>
        {/* Logo mark */}
        <div style={{ width: 46, height: 46, background: "linear-gradient(135deg,#c9a227,#e8c56a)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#07101e" }}>D</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#e8f0ff", marginBottom: 5 }}>Welcome back</h1>
        <p style={{ fontSize: 13.5, color: "#4a6a8a", marginBottom: 32 }}>Sign in to your DCU Accommodation Portal</p>

        <div style={{ marginBottom: 14 }}>
          <Lbl>Student Email</Lbl>
          <Inp type="email" placeholder="student@mail.dcu.ie" value={email}
            onChange={e => { setEmail(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && go()} />
        </div>

        <div style={{ marginBottom: 22 }}>
          <Lbl>Password</Lbl>
          <Inp type="password" placeholder="••••••••" value={pw}
            onChange={e => { setPw(e.target.value); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && go()} />
        </div>

        {err && (
          <div className="fi" style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#fca5a5", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <AlertCircle size={14} /> {err}
          </div>
        )}

        <button onClick={go} disabled={busy}
          style={{ width: "100%", padding: 13, background: busy ? "rgba(201,162,39,.45)" : "linear-gradient(135deg,#c9a227,#e8c56a)", border: "none", borderRadius: 10, color: "#07101e", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: busy ? "wait" : "pointer", marginBottom: 12, transition: "opacity .2s" }}>
          {busy ? "Signing in…" : "Sign In"}
        </button>

        <button onClick={go}
          style={{ width: "100%", padding: 11, background: "transparent", border: "1px solid rgba(255,255,255,.08)", borderRadius: 9, color: "#5a7a9a", fontFamily: "inherit", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all .15s" }}
          onMouseOver={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.18)"}
          onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"}
        >
          <Shield size={13} /> Continue with DCU SSO
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#1e3a52", marginTop: 20 }}>
          Demo: use any @mail.dcu.ie address + any password
        </p>
      </div>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",   Icon: Home,     label: "Dashboard" },
  { id: "application", Icon: FileText, label: "Application" },
  { id: "payments",    Icon: CreditCard,label: "Payments" },
  { id: "guests",      Icon: Users,    label: "Guest Requests" },
  { id: "maintenance", Icon: Wrench,   label: "Maintenance" },
];

function Sidebar({ page, setPage, onLogout }) {
  const openCount = DATA.tickets.filter(t => t.status !== "resolved").length;
  return (
    <div style={{ width: 244, minHeight: "100vh", background: "#09131f", borderRight: "1px solid rgba(201,162,39,.08)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
      {/* brand */}
      <div style={{ padding: "22px 22px 18px", borderBottom: "1px solid rgba(201,162,39,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, background: "linear-gradient(135deg,#c9a227,#e8c56a)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, color: "#07101e" }}>D</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: "#e8f0ff", lineHeight: 1.2 }}>DCU</div>
            <div style={{ fontSize: 10.5, color: "#2a4460", letterSpacing: ".4px" }}>Accommodation</div>
          </div>
        </div>
      </div>

      {/* nav */}
      <nav style={{ flex: 1, padding: "10px 10px" }}>
        <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.1px", color: "#1e3a52", padding: "12px 10px 6px" }}>Navigation</div>
        {NAV.map(({ id, Icon, label }) => {
          const active = page === id;
          return (
            <div key={id} onClick={() => setPage(id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 9, cursor: "pointer", marginBottom: 2, transition: "all .15s", background: active ? "rgba(201,162,39,.1)" : "transparent", color: active ? "#c9a227" : "#4a6a8a", fontSize: 13.5, fontWeight: active ? 500 : 400 }}
              onMouseOver={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,.03)"; }}
              onMouseOut={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <Icon size={15} />
              <span style={{ flex: 1 }}>{label}</span>
              {id === "maintenance" && openCount > 0 && (
                <span style={{ background: "#c9a227", color: "#07101e", borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{openCount}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* user */}
      <div style={{ borderTop: "1px solid rgba(201,162,39,.06)", padding: "14px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 9 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(201,162,39,.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#c9a227", flexShrink: 0 }}>
            {DATA.student.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#c8daea", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{DATA.student.name}</div>
            <div style={{ fontSize: 11, color: "#2a4460" }}>{DATA.student.id}</div>
          </div>
          <button onClick={onLogout}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#2e4a62", padding: 4, borderRadius: 6, display: "flex", transition: "color .15s" }}
            onMouseOver={e => e.currentTarget.style.color = "#fca5a5"}
            onMouseOut={e => e.currentTarget.style.color = "#2e4a62"}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard() {
  const { student, payments, tickets, guests } = DATA;
  const openTickets  = tickets.filter(t => t.status !== "resolved").length;
  const pendingGuests = guests.filter(g => g.status === "pending").length;
  const nextPay      = payments.find(p => p.status === "pending");

  const stats = [
    { label: "Room",          value: "Block C — 14",         sub: student.complex,                            Icon: MapPin,    col: "#c9a227" },
    { label: "Balance Due",   value: `€${student.balance}`,  sub: nextPay ? `Due ${nextPay.date}` : "Clear",  Icon: CreditCard,col: nextPay ? "#fcd34d" : "#4ade80" },
    { label: "Open Tickets",  value: openTickets,             sub: `${openTickets} unresolved`,                Icon: Wrench,    col: openTickets  ? "#fca5a5" : "#4ade80" },
    { label: "Guest Requests",value: pendingGuests,           sub: `${pendingGuests} awaiting`,                Icon: Users,     col: pendingGuests ? "#93c5fd" : "#4ade80" },
  ];

  return (
    <>
      <PageHeader title={`Good afternoon, ${student.name.split(" ")[0]}`} sub="Here's an overview of your accommodation account." />

      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {stats.map(({ label, value, sub, Icon, col }) => (
          <Card key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.8px", color: "#3a5a78" }}>{label}</span>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${col}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={col} />
              </div>
            </div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#e8f0ff", marginBottom: 3 }}>{value}</div>
            <div style={{ fontSize: 11.5, color: "#2e4a62" }}>{sub}</div>
          </Card>
        ))}
      </div>

      <div className="fu3" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Recent payments */}
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff" }}>Recent Transactions</h3>
            <span style={{ fontSize: 12, color: "#c9a227", cursor: "pointer", fontWeight: 500 }}>View all →</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Description","Date","Amount","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {[...payments].reverse().slice(0, 3).map(p => (
                <tr key={p.id}>
                  <td style={{ padding: "12px 12px", fontSize: 13, color: "#a8c0d6", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.type}</td>
                  <td style={{ padding: "12px 12px", fontSize: 12.5, color: "#3a5a78", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.date}</td>
                  <td style={{ padding: "12px 12px", fontSize: 13, fontWeight: 500, color: "#c8daea", borderBottom: "1px solid rgba(255,255,255,.03)" }}>€{p.amount}</td>
                  <td style={{ padding: "12px 12px", borderBottom: "1px solid rgba(255,255,255,.03)" }}><Badge s={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Room info */}
        <Card>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff", marginBottom: 18 }}>Room Details</h3>
          {[
            { k: "Complex",   v: student.complex },
            { k: "Room",      v: student.room },
            { k: "Check-in",  v: student.checkIn },
            { k: "Check-out", v: student.checkOut },
            { k: "Status",    v: <Badge s="approved" label="Active Resident" /> },
          ].map(({ k, v }) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <span style={{ fontSize: 12.5, color: "#3a5a78" }}>{k}</span>
              <span style={{ fontSize: 13, color: "#a8c0d6" }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Tickets */}
      <Card className="fu4">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff" }}>Maintenance Tickets</h3>
          <span style={{ fontSize: 12, color: "#c9a227", cursor: "pointer", fontWeight: 500 }}>View all →</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {tickets.map(t => (
            <div key={t.id} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)", borderTop: `2px solid ${t.urgency === "urgent" ? "#ef444466" : "#3b82f666"}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px", color: t.urgency === "urgent" ? "#fca5a5" : "#93c5fd" }}>{t.urgency}</span>
                <Badge s={t.status} />
              </div>
              <p style={{ fontSize: 13, color: "#c8daea", fontWeight: 400, marginBottom: 4 }}>{t.issue}</p>
              <p style={{ fontSize: 12, color: "#3a5a78" }}>{t.location}</p>
              <p style={{ fontSize: 11, color: "#1e3a52", marginTop: 6 }}>{t.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

// ─── Application ────────────────────────────────────────────────────────────
function ApplicationPage() {
  const [step, setStep]         = useState(1);
  const [form, setForm]         = useState({ ppsn: "", year: "", type: "", complex: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const STEPS = ["Personal Details", "Room Preferences", "Review & Submit"];

  const stepEls = [];
  STEPS.forEach((s, i) => {
    const done   = step > i + 1;
    const active = step === i + 1;
    stepEls.push(
      <div key={`s${i}`} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: done ? "#22c55e" : active ? "rgba(201,162,39,.14)" : "rgba(255,255,255,.04)", border: `2px solid ${done ? "#22c55e" : active ? "#c9a227" : "rgba(255,255,255,.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done ? "#fff" : active ? "#c9a227" : "#3a5a78", flexShrink: 0 }}>
          {done ? <CheckCircle size={13} /> : i + 1}
        </div>
        <span style={{ fontSize: 13, fontWeight: active ? 500 : 400, color: done ? "#4ade80" : active ? "#c9a227" : "#3a5a78", whiteSpace: "nowrap" }}>{s}</span>
      </div>
    );
    if (i < STEPS.length - 1)
      stepEls.push(<div key={`d${i}`} style={{ flex: 1, height: 1, background: "rgba(255,255,255,.06)", margin: "0 12px" }} />);
  });

  if (submitted) return (
    <>
      <PageHeader title="Accommodation Application" sub="Apply for student accommodation for the 2025/2026 academic year." />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 340, textAlign: "center" }}>
        <div className="fu" style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
          <CheckCircle size={30} color="#4ade80" />
        </div>
        <h2 className="fu2" style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: "#e8f0ff", marginBottom: 8 }}>Application Submitted</h2>
        <p className="fu3" style={{ fontSize: 14, color: "#3a5a78", maxWidth: 400, marginBottom: 26 }}>Your accommodation application for 2025/2026 has been received. You will be notified within 10 working days.</p>
        <GhostBtn className="fu4" onClick={() => { setSubmitted(false); setStep(1); }}>Submit Another</GhostBtn>
      </div>
    </>
  );

  return (
    <>
      <PageHeader title="Accommodation Application" sub="Apply for student accommodation for the 2025/2026 academic year." />
      <div className="fu2" style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>{stepEls}</div>

      <Card className="fu3" style={{ maxWidth: 620 }}>
        {step === 1 && (
          <>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#e8f0ff", marginBottom: 22 }}>Personal Details</h3>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <Lbl>Full Name</Lbl>
                <Inp value={DATA.student.name} readOnly style={{ opacity: .55 }} />
              </div>
              <div>
                <Lbl>Student ID</Lbl>
                <Inp value={DATA.student.id} readOnly style={{ opacity: .55 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <Lbl>PPS Number</Lbl>
                  <Inp placeholder="1234567T" value={form.ppsn} onChange={e => upd("ppsn", e.target.value)} />
                </div>
                <div>
                  <Lbl>Year of Study</Lbl>
                  <Sel value={form.year} onChange={e => upd("year", e.target.value)}>
                    <option value="">Select…</option>
                    <option>Year 1</option><option>Year 2</option><option>Year 3</option><option>Year 4</option><option>Postgraduate</option>
                  </Sel>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <GoldBtn onClick={() => setStep(2)}>Continue <ChevronRight size={14} /></GoldBtn>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#e8f0ff", marginBottom: 22 }}>Room Preferences</h3>
            <div style={{ display: "grid", gap: 16 }}>
              <div>
                <Lbl>Accommodation Type</Lbl>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {["Single En-Suite", "Twin Room", "Studio Apartment", "Accessible Room"].map(t => (
                    <div key={t} onClick={() => upd("type", t)} style={{ border: `1px solid ${form.type === t ? "#c9a227" : "rgba(201,162,39,.14)"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", background: form.type === t ? "rgba(201,162,39,.07)" : "transparent", transition: "all .15s" }}>
                      <p style={{ fontSize: 13.5, color: form.type === t ? "#c9a227" : "#8aa8c0", fontWeight: form.type === t ? 500 : 400 }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Lbl>Preferred Complex</Lbl>
                <Sel value={form.complex} onChange={e => upd("complex", e.target.value)}>
                  <option value="">No preference</option>
                  <option>Larkfield Apartments</option>
                  <option>Hampstead Avenue</option>
                  <option>Albert College Park</option>
                  <option>Cedarwood Road</option>
                </Sel>
              </div>
              <div>
                <Lbl>Additional Notes</Lbl>
                <Txta placeholder="Special requirements, medical needs, or preferences…" value={form.notes} onChange={e => upd("notes", e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <GhostBtn onClick={() => setStep(1)}>← Back</GhostBtn>
              <GoldBtn onClick={() => setStep(3)}>Review <ChevronRight size={14} /></GoldBtn>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: "#e8f0ff", marginBottom: 22 }}>Review & Submit</h3>
            <div style={{ background: "rgba(255,255,255,.025)", borderRadius: 10, padding: "4px 16px", marginBottom: 20 }}>
              {[
                { k: "Full Name",    v: DATA.student.name },
                { k: "Student ID",  v: DATA.student.id },
                { k: "PPS Number",  v: form.ppsn || "—" },
                { k: "Year",        v: form.year || "—" },
                { k: "Room Type",   v: form.type || "No preference" },
                { k: "Complex",     v: form.complex || "No preference" },
                { k: "Notes",       v: form.notes || "None" },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                  <span style={{ fontSize: 12.5, color: "#3a5a78" }}>{k}</span>
                  <span style={{ fontSize: 13, color: "#a8c0d6", maxWidth: 280, textAlign: "right" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.15)", borderRadius: 10, padding: "13px 16px", marginBottom: 22, fontSize: 13, color: "#a88c3a", lineHeight: 1.6 }}>
              A non-refundable application fee of <strong style={{ color: "#c9a227" }}>€50</strong> will be charged to your account on submission.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <GhostBtn onClick={() => setStep(2)}>← Back</GhostBtn>
              <GoldBtn onClick={() => setSubmitted(true)}>Submit Application</GoldBtn>
            </div>
          </>
        )}
      </Card>
    </>
  );
}

// ─── Payments ───────────────────────────────────────────────────────────────
function PaymentsPage() {
  const { payments } = DATA;
  const [modal, setModal] = useState(false);
  const [method, setMethod] = useState("card");
  const [done,   setDone]  = useState(false);

  const totalPaid    = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "pending").reduce((s, p) => s + p.amount, 0);
  const total        = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <PageHeader
        title="Payments & Fees"
        sub="Manage your accommodation payments and view transaction history."
        action={<GoldBtn onClick={() => setModal(true)}><Plus size={14} /> Make Payment</GoldBtn>}
      />

      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Paid",    value: `€${totalPaid}`,    col: "#4ade80" },
          { label: "Balance Due",   value: `€${totalPending}`, col: "#fcd34d" },
          { label: "Total Charged", value: `€${total}`,        col: "#e8f0ff" },
        ].map(({ label, value, col }) => (
          <Card key={label}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".8px", color: "#3a5a78", marginBottom: 10 }}>{label}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, color: col }}>{value}</div>
          </Card>
        ))}
      </div>

      <Card className="fu3">
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff", marginBottom: 18 }}>Transaction History</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Reference","Description","Date","Method","Amount","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}
                onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "13px 12px", fontSize: 11.5, color: "#2e4a62", fontFamily: "monospace", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.id}</td>
                <td style={{ padding: "13px 12px", fontSize: 13.5, color: "#c8daea", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.type}</td>
                <td style={{ padding: "13px 12px", fontSize: 12.5, color: "#5a7a9a", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.date}</td>
                <td style={{ padding: "13px 12px", fontSize: 12.5, color: "#5a7a9a", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{p.method}</td>
                <td style={{ padding: "13px 12px", fontSize: 14, fontWeight: 600, color: "#e8f0ff", borderBottom: "1px solid rgba(255,255,255,.03)" }}>€{p.amount}</td>
                <td style={{ padding: "13px 12px", borderBottom: "1px solid rgba(255,255,255,.03)" }}><Badge s={p.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Payment Modal */}
      {modal && !done && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,16,30,.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="fu" style={{ background: "#0d1b2e", border: "1px solid rgba(201,162,39,.22)", borderRadius: 18, padding: 32, width: 420 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#e8f0ff" }}>Make a Payment</h3>
              <button onClick={() => setModal(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "#3a5a78", display: "flex" }}><X size={18} /></button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <Lbl>Payment Type</Lbl>
              <Sel>
                <option>Utility — Apr 2025 (€180)</option>
                <option>Late Fee (€30)</option>
              </Sel>
            </div>
            <div style={{ marginBottom: 20 }}>
              <Lbl>Payment Method</Lbl>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {[["card","Debit Card"],["bank","Bank Transfer"],["online","Online Banking"]].map(([id, lbl]) => (
                  <div key={id} onClick={() => setMethod(id)} style={{ border: `1px solid ${method === id ? "#c9a227" : "rgba(201,162,39,.15)"}`, borderRadius: 9, padding: "12px 8px", cursor: "pointer", textAlign: "center", background: method === id ? "rgba(201,162,39,.07)" : "transparent", transition: "all .15s" }}>
                    <p style={{ fontSize: 12, color: method === id ? "#c9a227" : "#5a7a9a", fontWeight: method === id ? 600 : 400 }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 9, padding: "13px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#5a7a9a" }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#e8f0ff" }}>€180.00</span>
            </div>
            <GoldBtn onClick={() => setDone(true)} style={{ width: "100%", justifyContent: "center" }}>Confirm Payment</GoldBtn>
          </div>
        </div>
      )}

      {modal && done && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(7,16,30,.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div className="fu" style={{ background: "#0d1b2e", border: "1px solid rgba(34,197,94,.2)", borderRadius: 18, padding: 44, width: 360, textAlign: "center" }}>
            <div style={{ width: 66, height: 66, borderRadius: "50%", background: "rgba(34,197,94,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckCircle size={30} color="#4ade80" />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: "#e8f0ff", marginBottom: 8 }}>Payment Successful</h3>
            <p style={{ fontSize: 13.5, color: "#3a5a78", marginBottom: 24 }}>€180.00 processed. A receipt has been sent to your DCU email address.</p>
            <GhostBtn onClick={() => { setModal(false); setDone(false); }}>Done</GhostBtn>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Guests ─────────────────────────────────────────────────────────────────
function GuestsPage() {
  const [guests, setGuests] = useState(DATA.guests);
  const [form, setForm]     = useState({ name: "", arrival: "", departure: "" });
  const [ok,  setOk]        = useState(false);
  const [err, setErr]       = useState("");

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.name || !form.arrival || !form.departure) { setErr("Please fill in all fields."); return; }
    setGuests(g => [...g, { id: `G-00${g.length + 1}`, name: form.name, arrival: form.arrival, departure: form.departure, nights: 1, status: "pending" }]);
    setForm({ name: "", arrival: "", departure: "" });
    setErr(""); setOk(true);
    setTimeout(() => setOk(false), 3500);
  };

  return (
    <>
      <PageHeader title="Guest Requests" sub="Register overnight guests at least 24 hours in advance. Maximum 1 guest per night, 3 nights per month." />

      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        {/* Form */}
        <Card>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff", marginBottom: 20 }}>Register a Guest</h3>
          {ok && (
            <div className="fi" style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#4ade80", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={13} /> Request submitted for approval.
            </div>
          )}
          {err && (
            <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#fca5a5", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={13} /> {err}
            </div>
          )}
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <Lbl>Guest Full Name</Lbl>
              <Inp placeholder="First & Last name" value={form.name} onChange={e => { upd("name", e.target.value); setErr(""); }} />
            </div>
            <div>
              <Lbl>Arrival Date</Lbl>
              <Inp type="date" value={form.arrival} onChange={e => upd("arrival", e.target.value)} style={{ colorScheme: "dark" }} />
            </div>
            <div>
              <Lbl>Departure Date</Lbl>
              <Inp type="date" value={form.departure} onChange={e => upd("departure", e.target.value)} style={{ colorScheme: "dark" }} />
            </div>
          </div>
          <div style={{ background: "rgba(201,162,39,.06)", border: "1px solid rgba(201,162,39,.12)", borderRadius: 8, padding: "11px 14px", margin: "16px 0", fontSize: 12.5, color: "#7a6230", lineHeight: 1.65 }}>
            Guests must be registered at least <strong style={{ color: "#c9a227" }}>24 hours</strong> before arrival. Overnight stays are not permitted during exam periods.
          </div>
          <GoldBtn onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Submit Request</GoldBtn>
        </Card>

        {/* Log */}
        <Card className="fu3">
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff", marginBottom: 18 }}>Guest Log</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Guest Name","Arrival","Departure","Nights","Status"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {guests.map(g => (
                <tr key={g.id}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,.02)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "13px 12px", fontSize: 13.5, color: "#c8daea", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                    <div style={{ fontWeight: 400 }}>{g.name}</div>
                    {g.reason && <div style={{ fontSize: 11.5, color: "#fca5a5", marginTop: 3 }}>{g.reason}</div>}
                  </td>
                  <td style={{ padding: "13px 12px", fontSize: 13, color: "#5a7a9a", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{g.arrival}</td>
                  <td style={{ padding: "13px 12px", fontSize: 13, color: "#5a7a9a", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{g.departure}</td>
                  <td style={{ padding: "13px 12px", fontSize: 13.5, color: "#a8c0d6", borderBottom: "1px solid rgba(255,255,255,.03)" }}>{g.nights}</td>
                  <td style={{ padding: "13px 12px", borderBottom: "1px solid rgba(255,255,255,.03)" }}><Badge s={g.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
}

// ─── Maintenance ─────────────────────────────────────────────────────────────
function MaintenancePage() {
  const [tickets, setTickets] = useState(DATA.tickets);
  const [form, setForm]       = useState({ issue: "", location: "", urgency: "non-urgent", desc: "" });
  const [ok,  setOk]          = useState(false);
  const [err, setErr]         = useState("");

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (!form.issue || !form.location) { setErr("Please fill the required fields."); return; }
    setTickets(t => [{ id: `MT-00${t.length + 1}`, issue: form.issue, location: form.location, urgency: form.urgency, status: "pending", date: "15 Apr 2025" }, ...t]);
    setForm({ issue: "", location: "", urgency: "non-urgent", desc: "" });
    setErr(""); setOk(true);
    setTimeout(() => setOk(false), 3500);
  };

  return (
    <>
      <PageHeader title="Maintenance Requests" sub="Report bedroom or apartment issues to the facilities team." />

      <div className="fu2" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16 }}>
        {/* Form */}
        <Card>
          <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 600, color: "#e8f0ff", marginBottom: 20 }}>Submit a Ticket</h3>
          {ok && (
            <div className="fi" style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#4ade80", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={13} /> Ticket submitted successfully.
            </div>
          )}
          {err && (
            <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#fca5a5", marginBottom: 14 }}>{err}</div>
          )}
          <div style={{ display: "grid", gap: 14 }}>
            <div>
              <Lbl>Issue Title *</Lbl>
              <Inp placeholder="e.g. Broken heating unit" value={form.issue} onChange={e => { upd("issue", e.target.value); setErr(""); }} />
            </div>
            <div>
              <Lbl>Location *</Lbl>
              <Sel value={form.location} onChange={e => upd("location", e.target.value)}>
                <option value="">Select location…</option>
                <option>Bedroom</option><option>Bathroom</option><option>Kitchen</option>
                <option>Living Room</option><option>Front Door</option><option>Common Area</option><option>Other</option>
              </Sel>
            </div>
            <div>
              <Lbl>Urgency</Lbl>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["urgent","Urgent","#fca5a5"],["non-urgent","Non-Urgent","#93c5fd"]].map(([id, lbl, col]) => (
                  <div key={id} onClick={() => upd("urgency", id)} style={{ border: `1px solid ${form.urgency === id ? col : "rgba(255,255,255,.08)"}`, borderRadius: 9, padding: "12px 14px", cursor: "pointer", background: form.urgency === id ? `${col}12` : "transparent", transition: "all .15s", textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: form.urgency === id ? col : "#5a7a9a", fontWeight: form.urgency === id ? 600 : 400 }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Lbl>Description</Lbl>
              <Txta placeholder="Describe the issue in detail…" value={form.desc} onChange={e => upd("desc", e.target.value)} />
            </div>
          </div>
          <GoldBtn onClick={submit} style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>Submit Ticket</GoldBtn>
        </Card>

        {/* Ticket list */}
        <div className="fu3" style={{ display: "grid", gap: 10, alignContent: "start" }}>
          {tickets.map(t => (
            <div key={t.id} style={{ background: "#0d1b2e", border: "1px solid rgba(201,162,39,.08)", borderLeft: `3px solid ${t.urgency === "urgent" ? "#ef4444" : "#3b82f6"}`, borderRadius: "2px 12px 12px 2px", padding: "16px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: "#e8f0ff", marginBottom: 3 }}>{t.issue}</p>
                  <p style={{ fontSize: 12.5, color: "#3a5a78" }}>{t.location} &nbsp;·&nbsp; {t.date}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <Badge s={t.status} />
                  <span style={{ fontSize: 11, color: t.urgency === "urgent" ? "#fca5a5" : "#93c5fd", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".5px" }}>{t.urgency}</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "#1e3a52", marginTop: 8, fontFamily: "monospace" }}>{t.id}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Portal Shell ────────────────────────────────────────────────────────────
const PAGES = { dashboard: Dashboard, application: ApplicationPage, payments: PaymentsPage, guests: GuestsPage, maintenance: MaintenancePage };

function Portal({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const Page = PAGES[page];
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar page={page} setPage={setPage} onLogout={onLogout} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ height: 60, background: "#09131f", borderBottom: "1px solid rgba(201,162,39,.07)", display: "flex", alignItems: "center", padding: "0 32px", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ fontSize: 13, color: "#2e4a62" }}>
            <span style={{ color: "#c9a227", fontWeight: 500 }}>DCU</span> / Accommodation Portal
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={16} color="#3a5a78" />
              <div style={{ position: "absolute", top: -3, right: -3, width: 7, height: 7, background: "#c9a227", borderRadius: "50%", border: "2px solid #09131f" }} />
            </div>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(201,162,39,.14)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#c9a227" }}>
              {DATA.student.initials}
            </div>
          </div>
        </div>
        {/* Page content — key forces remount for animations */}
        <div key={page} style={{ flex: 1, overflowY: "auto", padding: 32 }}>
          <Page />
        </div>
      </div>
    </div>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #07101e; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,162,39,.2); border-radius: 3px; }
        @keyframes fu { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fi { from { opacity: 0; } to { opacity: 1; } }
        .fu  { animation: fu .5s cubic-bezier(.22,1,.36,1) both; }
        .fu2 { animation: fu .5s .08s cubic-bezier(.22,1,.36,1) both; }
        .fu3 { animation: fu .5s .16s cubic-bezier(.22,1,.36,1) both; }
        .fu4 { animation: fu .5s .24s cubic-bezier(.22,1,.36,1) both; }
        .fi  { animation: fi .3s ease both; }
      `}</style>
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: "#07101e", color: "#dce8f5", minHeight: "100vh" }}>
        {loggedIn
          ? <Portal onLogout={() => setLoggedIn(false)} />
          : <LoginPage onLogin={() => setLoggedIn(true)} />
        }
      </div>
    </>
  );
}
