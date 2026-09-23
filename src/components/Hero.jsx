import { motion } from 'framer-motion'
import HeroVisual from './HeroVisual.jsx'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-text">
          <motion.p
            className="mono-tag hero-kicker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Frontend / Fullstack
          </motion.p>

          <h1 className="hero-title">
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
            >
              СОБИРАЮ
            </motion.span>
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              ИНТЕРФЕЙСЫ,
            </motion.span>
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              КОТОРЫЕ <span className="acid">РАБОТАЮТ</span>.
            </motion.span>
          </h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Данил — разработчик. React и Node от идеи до продакшена:
            интерфейс, API, база данных, деплой.
          </motion.p>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="hero-meta-item">
              <span className="mono-tag">Frontend</span>
              <p>React · Vite · JS</p>
            </div>
            <div className="hero-meta-item">
              <span className="mono-tag">Backend</span>
              <p>Node · Express · REST</p>
            </div>
            <div className="hero-meta-item">
              <span className="mono-tag">Данные</span>
              <p>Supabase · SQL</p>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <HeroVisual />
          <div className="hero-visual-label">
            <span className="mono-tag">procedural / canvas</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          padding-top: clamp(48px, 8vw, 96px);
          padding-bottom: clamp(40px, 6vw, 72px);
          position: relative;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          align-items: center;
        }
        .hero-kicker {
          margin-bottom: 22px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 0.92;
          letter-spacing: -0.015em;
          font-size: clamp(40px, 6.4vw, 92px);
        }
        .hl-row { display: block; }
        .hero-sub {
          margin-top: 28px;
          max-width: 46ch;
          font-size: 16px;
          line-height: 1.55;
          color: var(--grey);
        }
        .hero-meta {
          display: flex;
          gap: 36px;
          margin-top: 44px;
          padding-top: 24px;
          border-top: 1px solid var(--line-soft);
          flex-wrap: wrap;
        }
        .hero-meta-item p {
          margin-top: 6px;
          font-size: 13px;
          font-weight: 500;
        }
        .hero-visual {
          position: relative;
          height: clamp(320px, 44vw, 560px);
        }
        .hero-visual-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        .hero-visual-label {
          position: absolute;
          bottom: 6px;
          right: 6px;
        }
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-visual { order: -1; height: 300px; }
          .hero-meta { gap: 24px; }
        }
      `}</style>
    </section>
  )
}
