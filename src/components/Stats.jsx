const STATS = [
  { value: '5', label: 'технологий в стеке', suffix: '' },
  { value: '3', label: 'года в разработке', suffix: '+' },
  { value: '100', label: 'фокус на результат', suffix: '%' },
  { value: '', label: 'открыт к идеям', symbol: '∞' },
]

// 2×2 grid of headline numbers, shown inside the About section
export default function Stats() {
  return (
    <div className="stats">
      <div className="stats-grid">
        {STATS.map((s, i) => (
          <div className="stat" key={i}>
            <div className="stat-value">
              {s.symbol || s.value}
              {s.suffix && <span className="stat-suffix">{s.suffix}</span>}
            </div>
            <div className="mono-tag">{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px 20px;
        }
        .stat {
          border-left: 1px solid var(--line-soft);
          padding-left: 20px;
        }
        .stat:nth-child(odd) { border-left: none; padding-left: 0; }
        .stat-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1;
          margin-bottom: 10px;
        }
        .stat-suffix { color: var(--acid); -webkit-text-stroke: 1px var(--ink); }
      `}</style>
    </div>
  )
}
