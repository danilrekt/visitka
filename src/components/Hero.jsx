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

  // прокрутка к разделу без #якоря в адресе — как в меню шапки
  const goTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-text" ref={textRef}>
          <h1 className="hero-title">
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.05 }}
            >
              ИНТЕРФЕЙСЫ,
            </motion.span>
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
            >
              КОТОРЫЕ
            </motion.span>
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.25 }}
            >
              ХОЧЕТСЯ
            </motion.span>
            <motion.span
              className="hl-row"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.35 }}
            >
              <span className="acid">ПОТРОГАТЬ</span>.
            </motion.span>
          </h1>

          <motion.p
            ref={subRef}
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Данил — fullstack-разработчик. Сайты и сервисы на React и Node.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.6 }}
          >
            <a href="#work" className="hero-btn" onClick={(e) => goTo(e, '#work')}>
              Смотреть работы <span aria-hidden="true">↓</span>
            </a>
            <a href="#contact" className="hero-link" onClick={(e) => goTo(e, '#contact')}>
              Написать
            </a>
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
          line-height: 0.98;
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
        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 18px 30px;
          margin-top: 36px;
        }
        .hero-btn,
        .hero-link {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 26px;
          background: var(--ink);
          color: var(--paper);
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .hero-btn:hover,
        .hero-btn:focus-visible { background: var(--acid); color: var(--ink); }
        .hero-link {
          padding: 3px 4px;
          margin-left: -4px;
          border-bottom: 2px solid var(--acid);
          transition: background-color 0.2s ease;
        }
        /* как «Открыть живое демо»: салатовый только заливкой под чёрным текстом */
        .hero-link:hover,
        .hero-link:focus-visible { background: var(--acid); }
        .hero-visual {
          position: relative;
          height: clamp(320px, 44vw, 560px);
        }
        /* кот чуть правее (вместе с подсказкой); на телефоне стоит по центру — не двигаем */
        @media (min-width: 901px) {
          .hero-visual { translate: 20px 0; }
        }
        /* sits in the gap between the cat's ears, arrow pointing at its head */
        .hero-poke {
          position: absolute;
          /* от верха нарисованного кота (HeroVisual ставит --cat-top/--cat-h), а не от рамки */
          top: calc(var(--cat-top, 0px) + var(--cat-h, 100%) * 0.03);
          left: 50%;
          translate: -50% 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        /* салатовая плашка — тот же акцент, что у «РАБОТАЮТ» в заголовке */
        .hero-poke-text {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: clamp(14px, 1.2vw, 17px);
          line-height: 1;
          color: var(--ink);
          background: var(--acid);
          padding: 6px 10px;
          white-space: nowrap;
          transform: rotate(-4deg);
        }
        .hero-poke-arrow {
          width: clamp(32px, 3.6vw, 52px);
          margin-top: 2px;
        }
        /* на десктопе подпись выше — ближе к кончикам ушей */
        @media (min-width: 901px) {
          .hero-poke { top: calc(var(--cat-top, 0px) + var(--cat-h, 100%) * 0.03 - 14px); }
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
          .hero-actions { margin-top: 28px; gap: 16px 24px; }
        }
      `}</style>
    </section>
  )
}
