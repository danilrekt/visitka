import { useState } from 'react'

const TG = 'https://t.me/danilrekt'
const EMAIL = 'danilrekt1234@gmail.com'
const TG_HANDLE = '@danilrekt'

// Telegram — главный способ связи: салатовая часть заголовка сама ведёт в чат.
// Ниже две карточки: и Telegram-ник, и почта копируются по клику (не всем нужен почтовый клиент).
export default function Contact() {
  const [copied, setCopied] = useState(null) // 'tg' | 'email' | null

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // запасной способ, если буфер обмена недоступен (старый браузер, нет прав)
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setCopied(key)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <h2 className="contact-title">
          Тронуло?
          <br />
          <a className="contact-tg" href={TG} target="_blank" rel="noreferrer">
            Напишите в{' '}
            {/* самолётик не отрывается от слова «Telegram» при переносе */}
            <span className="contact-nowrap">
              Telegram
              {/* самолётик в чёрном круге — как иконка на кнопке, с отступом от края плашки */}
              <span className="contact-plane-circle" aria-hidden="true">
                <svg className="contact-plane" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.9 3.6 18.7 19c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.2-8.3c.4-.4-.1-.6-.6-.2L6.2 12.7l-4.9-1.5c-1.1-.3-1.1-1 .2-1.5L20.5 2.4c.9-.3 1.6.2 1.4 1.2z" />
                </svg>
              </span>
            </span>
          </a>
        </h2>

        <div className="contact-cards">
          <button
            type="button"
            className={`contact-card ${copied === 'tg' ? 'is-done' : ''}`}
            onClick={() => copy(TG_HANDLE, 'tg')}
          >
            <span className="contact-card-label">
              {copied === 'tg' ? 'Скопировано ✓' : 'Telegram · нажмите, чтобы скопировать'}
            </span>
            <span className="contact-card-value">{TG_HANDLE}</span>
            <span className="contact-card-icon" aria-hidden="true">{copied === 'tg' ? '✓' : '⧉'}</span>
          </button>
          <button
            type="button"
            className={`contact-card ${copied === 'email' ? 'is-done' : ''}`}
            onClick={() => copy(EMAIL, 'email')}
          >
            <span className="contact-card-label">
              {copied === 'email' ? 'Скопировано ✓' : 'Почта · нажмите, чтобы скопировать'}
            </span>
            <span className="contact-card-value">{EMAIL}</span>
            <span className="contact-card-icon" aria-hidden="true">{copied === 'email' ? '✓' : '⧉'}</span>
          </button>
        </div>
      </div>

      <div className="wrap contact-foot">
        <span className="mono-tag">© 2026 Данил</span>
        <a href="privacy.html" className="mono-tag contact-privacy">Политика конфиденциальности</a>
      </div>

      <style>{`
        .contact {
          background: var(--ink);
          color: var(--paper);
          padding: clamp(19px, 3vw, 40px) 0 32px;
          margin-top: clamp(14px, 2vw, 27px);
        }
        .contact-inner {
          padding-bottom: clamp(48px, 7vw, 90px);
        }
        .contact-title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.1; /* у Д в Onest ножки ниже строки — иначе плашка их закрывает */
          letter-spacing: -0.01em;
          font-size: clamp(40px, 6.4vw, 92px); /* «Напишите в Telegram» с иконкой — в одну строку на десктопе */
        }
        .contact-nowrap { white-space: nowrap; }
        /* плашка переносится вместе со словами — на узком экране «в Telegram» уходит на свою строку */
        .contact-tg {
          color: var(--ink);
          background: var(--acid);
          padding: 0 0.14em 0 0.1em;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          transition: background-color 0.25s ease;
        }
        .contact-plane-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 0.74em;
          height: 0.74em;
          margin-left: 0.22em;
          border-radius: 50%;
          background: var(--ink);
          color: var(--acid);
          vertical-align: 0.15em; /* по центру заглавных букв */
          overflow: hidden;
        }
        .contact-plane {
          width: 52%;
          height: 52%;
          margin-left: -6%; /* визуальный центр самолётика левее его рамки */
          transition: transform 0.45s cubic-bezier(0.3, 1.4, 0.5, 1);
        }
        .contact-tg:hover,
        .contact-tg:focus-visible { background: var(--paper); }
        /* самолётик качается внутри круга и никуда не упирается */
        .contact-tg:hover .contact-plane,
        .contact-tg:focus-visible .contact-plane { transform: translate(8%, -8%) rotate(-10deg) scale(1.08); }

        .contact-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 32px;
        }
        .contact-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 260px;
          padding: 18px 64px 18px 20px;
          border: 1.5px solid #3a3a3a;
          background: none;
          color: var(--paper);
          text-align: left;
          font: inherit;
          transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .contact-card-label {
          font: 600 11px var(--font-text);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--grey-light);
        }
        .contact-card-value {
          font: 700 clamp(17px, 1.6vw, 21px) var(--font-display);
        }
        .contact-card-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          width: 34px;
          height: 34px;
          margin-top: -17px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #222;
          color: var(--acid);
          font: 700 16px var(--font-display);
          transition: transform 0.3s ease, background-color 0.2s ease, color 0.2s ease;
        }
        .contact-card:hover,
        .contact-card:focus-visible { border-color: var(--acid); }
        .contact-card:hover .contact-card-icon,
        .contact-card:focus-visible .contact-card-icon { background: var(--acid); color: var(--ink); transform: rotate(-12deg) scale(1.08); }
        .contact-card.is-done { border-color: var(--acid); }
        .contact-card.is-done .contact-card-label { color: var(--acid); }
        .contact-card.is-done .contact-card-icon { background: var(--acid); color: var(--ink); }

        .contact-foot {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .contact-foot .mono-tag { color: var(--grey-light); }
        .contact-foot .contact-privacy:hover { color: var(--acid); }
        @media (max-width: 700px) {
          .contact-title { line-height: 1.12; }
          .contact-card { width: 100%; min-width: 0; }
        }
      `}</style>
    </section>
  )
}
