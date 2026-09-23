import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroVisual from './HeroVisual.jsx'

const ease = [0.16, 1, 0.3, 1]

export default function Hero() {
  const [catActive, setCatActive] = useState(false)
  // the hint first shows up once the cat has assembled; after that it reacts instantly
  const [hintIntroDone, setHintIntroDone] = useState(false)
  const [visualHeight, setVisualHeight] = useState(null)
  const textRef = useRef(null)
  const subRef = useRef(null)

  // On desktop the cat spans from the top of the text column down to the last
  // line of the intro paragraph, so its chin lines up with that line.
  useLayoutEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px)')
    const measure = () => {
      if (!desktop.matches) return setVisualHeight(null)
      const top = textRef.current.getBoundingClientRect().top
      const bottom = subRef.current.getBoundingClientRect().bottom
      setVisualHeight(Math.round(bottom - top))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(textRef.current)
    desktop.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      desktop.removeEventListener('change', measure)
    }
  }, [])

  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-text" ref={textRef}>
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
            ref={subRef}
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

        <div className="hero-visual" style={visualHeight ? { height: visualHeight } : undefined}>
          <HeroVisual onActiveChange={setCatActive} />
          <motion.div
            className="hero-poke"
            aria-hidden="true"
            initial={{ opacity: 0, y: -6 }}
            animate={catActive ? { opacity: 0, y: 0 } : { opacity: 1, y: 0 }}
            transition={
              !hintIntroDone
                ? { duration: 0.4, ease, delay: 1.2 }
                : { duration: catActive ? 0 : 0.12 }
            }
            onAnimationComplete={() => setHintIntroDone(true)}
          >
            <span className="hero-poke-text">потрогать котика</span>
            <svg className="hero-poke-arrow" viewBox="0 0 48 60" fill="none">
              <g strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 4 C 40 12, 6 30, 26 52 M17 45 L 26 52 L 31 42" stroke="var(--ink)" strokeWidth="5" />
                <path d="M14 4 C 40 12, 6 30, 26 52 M17 45 L 26 52 L 31 42" stroke="var(--acid)" strokeWidth="2.6" />
              </g>
            </svg>
          </motion.div>
        </div>
      </div>

      <style>{`
        .hero {
          padding-top: clamp(16px, 2.7vw, 32px);
          padding-bottom: clamp(14px, 2vw, 24px);
          position: relative;
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 24px;
          align-items: start;
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
        /* sits in the gap between the cat's ears, arrow pointing at its head */
        .hero-poke {
          position: absolute;
          top: 3%;
          left: 50%;
          translate: -50% 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .hero-poke-text {
          font-family: 'Caveat', cursive;
          font-weight: 700;
          font-size: clamp(20px, 2vw, 28px);
          line-height: 1;
          white-space: nowrap;
          transform: rotate(-4deg);
        }
        .hero-poke-arrow {
          width: clamp(32px, 3.6vw, 52px);
          margin-top: 2px;
        }
        .hero-visual-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
          }
          .hero-visual { order: -1; height: 340px; }
          .hero-meta {
            display: grid;
            gap: 10px;
            margin-top: 28px;
            padding-top: 18px;
          }
          .hero-meta-item {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            gap: 16px;
          }
          .hero-meta-item p { margin-top: 0; text-align: right; }
        }
      `}</style>
    </section>
  )
}
