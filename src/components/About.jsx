import Stats from './Stats.jsx'
import Services from './Services.jsx'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-top">
          <div className="about-main">
            <span className="mono-tag about-label">Обо мне</span>

            <h2 className="about-statement">
              Я не просто пишу <span className="nowrap">код —</span>
              <br />
              я довожу продукт <span className="acid">до конца</span>.
            </h2>

            <p className="about-text">
              Беру задачу от макета или идеи и веду её через весь путь:
              интерфейс на React, API на Node, данные в Supabase, деплой.
              Мне важно, чтобы каждый экран открывался быстро и работал
              без сюрпризов.
            </p>
          </div>

          <Stats />
        </div>

        <div className="about-services">
          <Services />
        </div>
      </div>

      <style>{`
        .about {
          padding: clamp(22px, 3.4vw, 47px) 0;
          border-top: 1px solid var(--line-soft);
        }
        /* heading + text on the left, numbers beside them, one shared left edge */
        .about-top {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: end;
        }
        .about-label {
          display: block;
          margin-bottom: 18px;
        }
        .about-statement {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.02;
          letter-spacing: -0.01em;
          font-size: clamp(30px, 4.4vw, 58px);
        }
        .about-text {
          margin-top: 22px;
          max-width: 56ch;
          font-size: 15px;
          line-height: 1.65;
          color: var(--grey);
        }
        .nowrap { white-space: nowrap; }
        .about-services {
          margin-top: clamp(32px, 5vw, 64px);
        }
        @media (max-width: 900px) {
          .about-top { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </section>
  )
}
