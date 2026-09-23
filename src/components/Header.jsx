import { useEffect, useState } from 'react'

const LINKS = [
  { label: 'Обо мне', href: '#about' },
  { label: 'Стек', href: '#stack' },
  { label: 'Работы', href: '#work' },
  { label: 'Контакты', href: '#contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 780) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <header className="header">
        <div className="wrap header-inner">
          <a href="#top" className="logo">
            ДАНИЛ<span className="logo-deg">°</span>
          </a>

          <nav className="nav" aria-label="Основная навигация">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label="Открыть меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="burger-lines">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <nav className={`mobile-menu ${open ? 'is-open' : ''}`} aria-label="Мобильная навигация">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          padding: 20px 0;
          background: color-mix(in srgb, var(--paper) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line-soft);
        }
        .header-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
        }
        .logo {
          justify-self: start;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.01em;
        }
        .logo-deg { color: var(--acid); -webkit-text-stroke: 1px var(--ink); }
        .nav {
          grid-column: 2;
          display: flex;
          justify-content: center;
          gap: 36px;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          position: relative;
          padding-bottom: 3px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0; right: 100%;
          bottom: 0;
          height: 2px;
          background: var(--acid);
          transition: right 0.25s ease;
        }
        .nav-link:hover::after { right: 0; }

        .burger {
          display: none;
          grid-column: 3;
          justify-self: end;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1.5px solid var(--ink);
          border-radius: 50%;
          position: relative;
          z-index: 60;
        }
        .burger-lines {
          position: relative;
          width: 16px;
          height: 11px;
        }
        .burger-lines span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: var(--ink);
          transition: transform 0.25s ease, opacity 0.2s ease, top 0.25s ease;
        }
        .burger-lines span:nth-child(1) { top: 0; }
        .burger-lines span:nth-child(2) { top: 5px; }
        .burger-lines span:nth-child(3) { top: 10px; }
        .burger.is-open .burger-lines span:nth-child(1) { top: 5px; transform: rotate(45deg); }
        .burger.is-open .burger-lines span:nth-child(2) { opacity: 0; }
        .burger.is-open .burger-lines span:nth-child(3) { top: 5px; transform: rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 55;
          background: var(--paper);
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          gap: 8px;
          padding: 0 var(--edge);
          transform: translateY(-8px);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .mobile-menu.is-open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .mobile-menu a {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(32px, 10vw, 52px);
          padding: 14px 0;
          border-bottom: 1px solid var(--line-soft);
          letter-spacing: -0.01em;
        }
        .mobile-menu a:active { color: var(--acid); }

        @media (max-width: 780px) {
          .nav { display: none; }
          .burger { display: flex; }
        }
        @media (min-width: 781px) {
          .mobile-menu { display: none; }
        }
      `}</style>
    </>
  )
}
