import { ArrowUpRight } from 'lucide-react'

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div>
          <span className="mono-tag contact-kicker">Есть задача?</span>
          <h2 className="contact-title">
            ДАВАЙТЕ
            <br />
            <span className="acid">СОБЕРЁМ</span> ЕЁ.
          </h2>
        </div>

        <div className="contact-right">
          <a href="mailto:danilrekt1234@gmail.com" className="contact-email">
            danilrekt1234@gmail.com
            <ArrowUpRight size={28} strokeWidth={1.75} />
          </a>

          <div className="contact-links">
            <a href="https://t.me/danilrekt" target="_blank" rel="noreferrer">Telegram — @danilrekt</a>
          </div>
        </div>
      </div>

      <div className="wrap contact-foot">
        <span className="mono-tag">© 2026 Данил</span>
      </div>

      <style>{`
        .contact {
          background: var(--ink);
          color: var(--paper);
          padding: clamp(19px, 3vw, 40px) 0 32px;
          margin-top: clamp(14px, 2vw, 27px);
        }
        .contact-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          flex-wrap: wrap;
          padding-bottom: clamp(48px, 7vw, 90px);
        }
        .contact-kicker {
          color: var(--grey-light);
          display: block;
          margin-bottom: 20px;
        }
        .contact-title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 0.94;
          letter-spacing: -0.01em;
          font-size: clamp(44px, 8vw, 108px);
        }
        .contact-right {
          text-align: right;
        }
        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(18px, 2vw, 26px);
          border-bottom: 2px solid var(--acid);
          padding-bottom: 6px;
        }
        .contact-links {
          display: flex;
          gap: 20px;
          justify-content: flex-end;
          margin-top: 24px;
        }
        .contact-links a {
          font-size: 13px;
          font-weight: 500;
          color: var(--grey-light);
        }
        .contact-links a:hover { color: var(--acid); }
        .contact-foot {
          display: flex;
          justify-content: flex-start;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .contact-foot .mono-tag { color: var(--grey-light); }
        @media (max-width: 700px) {
          .contact-inner { flex-direction: column; align-items: flex-start; }
          .contact-right { text-align: left; }
          .contact-links { justify-content: flex-start; }
        }
      `}</style>
    </section>
  )
}
