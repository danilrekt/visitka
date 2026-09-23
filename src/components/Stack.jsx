const ROW_1 = ['JAVASCRIPT', 'REACT', 'VITE', 'HTML', 'CSS']
const ROW_2 = ['NODE.JS', 'EXPRESS', 'REST API', 'SUPABASE', 'SQL']
const ROW_3 = ['GIT', 'GITHUB', 'DOCKER', 'VS CODE']

function MarqueeRow({ items, reverse, accent }) {
  const doubled = [...items, ...items]
  return (
    <div className={`marquee-row ${reverse ? 'reverse' : ''}`}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className={`marquee-item ${accent ? 'accent' : ''}`}>
            {item}
            <span className="marquee-dot">×</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section className="stack" id="stack">
      <div className="wrap stack-head">
        <h2 className="section-title">Стек</h2>
        <span className="mono-tag">инструменты, с которыми работаю каждый день</span>
      </div>

      <div className="marquee-wrap">
        <MarqueeRow items={ROW_1} accent />
        <MarqueeRow items={ROW_2} reverse />
        <MarqueeRow items={ROW_3} />
      </div>

      <style>{`
        .stack {
          padding: clamp(19px, 2.7vw, 34px) 0;
          border-top: 1px solid var(--line-soft);
          overflow: hidden;
        }
        .stack-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 24px;
          margin-bottom: 32px;
        }
        @media (max-width: 700px) {
          .stack-head {
            flex-direction: column;
            gap: 8px;
            margin-bottom: 24px;
          }
        }
        .marquee-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .marquee-row {
          overflow: hidden;
          white-space: nowrap;
        }
        .marquee-track {
          display: inline-flex;
          animation: scroll-left 28s linear infinite;
        }
        .marquee-row.reverse .marquee-track {
          animation-name: scroll-right;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-item {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(32px, 6vw, 76px);
          line-height: 1;
          padding: 0 20px;
          -webkit-text-stroke: 1.4px var(--ink);
          color: transparent;
          display: inline-flex;
          align-items: center;
          gap: 20px;
        }
        .marquee-item.accent {
          -webkit-text-stroke: 0;
          color: var(--ink);
        }
        .marquee-dot {
          font-size: 0.4em;
          color: var(--acid);
          -webkit-text-stroke: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
