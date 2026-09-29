import Services from './Services.jsx'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-top">
          <div className="about-main">
            <span className="mono-tag about-label">Обо мне</span>

            <h2 className="about-statement">
              А то, что нельзя потрогать,
              <br />
              <span className="acid">тоже делаю я</span>.
            </h2>

            <p className="about-text">
              Сервер, база данных и деплой. Их не видно — зато сразу
              заметно, когда они сделаны плохо.
            </p>
          </div>
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
        }
      `}</style>
    </section>
  )
}
