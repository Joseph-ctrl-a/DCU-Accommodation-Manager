import { useState, useEffect } from 'react'
import LoginPage from './components/ui/LoginPage'
import Portal from './components/ui/PortalPage/Portal'
// ─── Portal Shell ────────────────────────────────────────────────────────────

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap'
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

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
      <div
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background: '#07101e',
          color: '#dce8f5',
          minHeight: '100vh',
        }}
      >
        {loggedIn ? (
          <Portal onLogout={() => setLoggedIn(false)} />
        ) : (
          <LoginPage onLogin={() => setLoggedIn(true)} />
        )}
      </div>
    </>
  )
}
