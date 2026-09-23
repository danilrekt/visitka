export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about-inner">
        <div className="about-label">
          <span className="mono-tag">Обо мне</span>
          <hr className="hairline about-rule" />
        </div>

        <h2 className="about-statement">
          Я не просто пишу код —
          <br />
          я довожу продукт <span className="acid">до конца</span>.
        </h2>

        <div className="about-body">
          <p>
            Беру задачу от макета или идеи и веду её через весь путь:
            интерфейс на React, API на Node, данные в Supabase, деплой.
            Мне важно, чтобы каждый экран открывался быстро и работал
            без сюрпризов.
          </p>
          <p className="about-body-secondary">
            Работаю один или в связке с командой — как fullstack-разработчик
            или как frontend-специалист внутри более крупного проекта.
          </p>
        </div>
      </div>

      <style>{`
        .about {
          padding: clamp(64px, 10vw, 140px) 0;
        }
        .about-inner {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 40px;
        }
        .about-label {
          padding-top: 8px;
        }
        .about-rule {
          margin-top: 16px;
        }
        .about-statement {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.02;
          letter-spacing: -0.01em;
          font-size: clamp(30px, 4.4vw, 58px);
          max-width: 16ch;
        }
        .about-body {
          grid-column: 2;
          margin-top: 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 900px;
        }
        .about-body p {
          font-size: 15px;
          line-height: 1.65;
          color: var(--grey);
        }
        @media (max-width: 780px) {
          .about-inner { grid-template-columns: 1fr; }
          .about-body { grid-column: 1; grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>
    </section>
  )
}
