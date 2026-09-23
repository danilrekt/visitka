import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'

const SERVICES = [
  {
    n: '01',
    title: 'Интерфейсы',
    desc: 'React-приложения и сайты: от лендинга до сложной админки.',
  },
  {
    n: '02',
    title: 'Веб-продукты',
    desc: 'Полный цикл: фронтенд, бэкенд, база данных, деплой.',
  },
  {
    n: '03',
    title: 'API и бэкенд',
    desc: 'Node/Express, REST API, интеграции, Supabase.',
  },
  {
    n: '04',
    title: 'Поддержка и рефакторинг',
    desc: 'Разбор существующего проекта, ускорение, чистка кода.',
  },
]

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="services-head">
          <h2 className="section-title">С чем помогаю</h2>
          <span className="mono-tag">04 направления</span>
        </div>

        <div className="services-list">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              className="service-row"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="service-n mono-tag">{s.n}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ArrowUpRight
                className="service-arrow"
                size={22}
                strokeWidth={1.75}
                style={{ opacity: active === i ? 1 : 0 }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services {
          padding: clamp(19px, 2.7vw, 34px) 0;
          border-top: 1px solid var(--line-soft);
        }
        .services-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 24px;
        }
        .section-title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(24px, 3vw, 34px);
        }
        .service-row {
          display: grid;
          grid-template-columns: 60px 1fr 2fr 40px;
          align-items: center;
          gap: 24px;
          padding: 26px 0;
          border-top: 1px solid var(--line-soft);
          transition: padding-left 0.3s ease;
        }
        .service-row:last-child {
          border-bottom: 1px solid var(--line-soft);
        }
        .service-row:hover {
          padding-left: 12px;
          background: color-mix(in srgb, var(--acid) 8%, transparent);
        }
        .service-n { color: var(--grey-light); }
        .service-title {
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(18px, 2vw, 24px);
        }
        .service-desc {
          font-size: 14px;
          color: var(--grey);
          line-height: 1.5;
        }
        .service-arrow {
          transition: opacity 0.25s ease;
          justify-self: end;
        }
        @media (max-width: 780px) {
          .service-row {
            grid-template-columns: 40px 1fr;
            grid-template-areas:
              "n title"
              "desc desc";
            row-gap: 8px;
          }
          .service-n { grid-area: n; }
          .service-title { grid-area: title; }
          .service-desc { grid-area: desc; }
          .service-arrow { display: none; }
        }
      `}</style>
    </section>
  )
}
