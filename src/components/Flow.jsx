const STEPS = [
  { n: '01', title: 'Задача', desc: 'Разбираю цель, ограничения, контекст.' },
  { n: '02', title: 'Структура', desc: 'Архитектура данных и интерфейса.' },
  { n: '03', title: 'Дизайн', desc: 'Композиция, типографика, состояния.' },
  { n: '04', title: 'Код', desc: 'React + Node, чистая реализация.' },
  { n: '05', title: 'Результат', desc: 'Деплой, проверка, передача.' },
]

export default function Flow() {
  return (
    <section className="flow">
      <div className="wrap">
        <h2 className="section-title flow-title">Как я работаю</h2>

        <div className="flow-row">
          {STEPS.map((s, i) => (
            <div className="flow-step" key={s.n}>
              <div className="flow-step-top">
                <span className="mono-tag">{s.n}</span>
                {i < STEPS.length - 1 && <span className="flow-arrow">→</span>}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .flow {
          padding: clamp(56px, 8vw, 100px) 0;
          border-top: 1px solid var(--line-soft);
        }
        .flow-title { margin-bottom: 32px; }
        .flow-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }
        .flow-step {
          padding-top: 18px;
          border-top: 2px solid var(--ink);
        }
        .flow-step:nth-child(odd) { border-top-color: var(--acid); }
        .flow-step-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .flow-arrow {
          color: var(--grey-light);
          font-size: 14px;
        }
        .flow-step h3 {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(16px, 1.5vw, 20px);
          margin-bottom: 8px;
        }
        .flow-step p {
          font-size: 13px;
          color: var(--grey);
          line-height: 1.5;
        }
        @media (max-width: 900px) {
          .flow-row { grid-template-columns: repeat(2, 1fr); }
          .flow-arrow { display: none; }
        }
      `}</style>
    </section>
  )
}
