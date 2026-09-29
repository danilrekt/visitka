import { useEffect, useRef, useState } from 'react'

// «Рентген»: макет сайта, под которым ползунком открывается то, что нельзя
// потрогать, — код сервера, база и деплой. Продолжает заголовок из «Обо мне».
const clamp = (v) => Math.min(100, Math.max(0, v))

export default function Flow() {
  const boxRef = useRef(null)
  // посередине; на телефоне левее — чтобы код справа было видно сразу
  const base = typeof window !== 'undefined' && window.innerWidth <= 700 ? 38 : 50
  const [pos, setPos] = useState(base)
  const dragging = useRef(false)
  const touched = useRef(false) // после первого касания подсказка-покачивание не нужна

  const moveTo = (clientX) => {
    const r = boxRef.current.getBoundingClientRect()
    setPos(clamp(((clientX - r.left) / r.width) * 100))
  }

  // При первом появлении ручка качается влево-вправо — видно, что её можно тянуть
  useEffect(() => {
    const box = boxRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (now) => {
        if (touched.current) return
        const t = Math.min((now - t0) / 1800, 1)
        setPos(base - Math.sin(t * Math.PI * 2) * 22 * (1 - t))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(box)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [base])

  const onPointerDown = (e) => {
    touched.current = true
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    moveTo(e.clientX)
  }
  const onPointerMove = (e) => {
    if (dragging.current) moveTo(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 20 : 5
    if (e.key === 'ArrowLeft') setPos((p) => clamp(p - step))
    else if (e.key === 'ArrowRight') setPos((p) => clamp(p + step))
    else return
    touched.current = true
    e.preventDefault()
  }

  return (
    <section className="flow">
      <div className="wrap">
        <h2 className="section-title flow-title">Что под капотом</h2>

        <div
          className="xray"
          ref={boxRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* то, что нельзя потрогать: справа сервер (виден сразу), слева база и деплой — проявляются, если тянуть влево */}
          <div className="xray-layer xray-code" aria-hidden="true">
            <div className="xray-cols">
              <div>
                <h4>База · SQLite</h4>
                <table>
                  <thead>
                    <tr><th>id</th><th>букет</th><th>статус</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1</td><td>45 роз</td><td>оплачен</td></tr>
                    <tr><td>2</td><td>Ирисы</td><td>в работе</td></tr>
                    <tr><td>3</td><td>Тюльпаны</td><td>новый</td></tr>
                  </tbody>
                </table>
                <h4 className="xray-deploy-title">Деплой</h4>
                <p className="xray-deploy"><span className="k">✓</span> build · <span className="k">✓</span> tests · <span className="k">✓</span> online</p>
              </div>
              <div>
                <h4>Сервер · Node + Express</h4>
                <pre>
                  <span className="k">app</span>.post(<span className="s">'/api/orders'</span>, <span className="k">async</span> (req, res) =&gt; {'{'}
                  {'\n'}  <span className="c">{'// проверяю заказ'}</span>
                  {'\n'}  <span className="k">const</span> order = validate(req.body)
                  {'\n'}  <span className="k">await</span> db.insert(<span className="s">'orders'</span>, order)
                  {'\n'}  res.json({'{'} ok: <span className="k">true</span> {'}'})
                  {'\n'}{'}'})
                </pre>
              </div>
            </div>
          </div>

          {/* то, что видно */}
          <div
            className="xray-layer xray-ui"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden="true"
          >
            <div className="xray-nav">
              <span className="xray-logo">Flower Surgut</span>
              <span className="xray-links"><i /><i /><i /></span>
            </div>
            <div className="xray-hero">
              <div>
                <div className="xray-h">Свежие <em>букеты</em></div>
                <i className="xray-line" />
                <i className="xray-line xray-line--short" />
                <span className="xray-btn">Заказать</span>
              </div>
              <div className="xray-card"><i /><i /><i /></div>
            </div>
          </div>

          <div
            className="xray-handle"
            style={{ left: `${pos}%` }}
            role="slider"
            tabIndex={0}
            aria-label="Сдвинуть рентген: что видно и что под капотом"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            onKeyDown={onKeyDown}
          >
            <span aria-hidden="true">⇆</span>
          </div>

          <span className="xray-label xray-label--l">То, что видно</span>
          <span className="xray-label xray-label--r">То, что нельзя потрогать</span>
        </div>

        <p className="mono-tag xray-hint">← тяните ползунок →</p>
      </div>

      <style>{`
        .flow {
          padding: clamp(19px, 2.7vw, 34px) 0;
          border-top: 1px solid var(--line-soft);
        }
        .flow-title { margin-bottom: 32px; }

        .xray {
          position: relative;
          height: clamp(340px, 30vw, 400px);
          border: 1.5px solid var(--ink);
          overflow: hidden;
          user-select: none;
          cursor: ew-resize;
          /* по горизонтали — ползунок, по вертикали страница листается как обычно */
          touch-action: pan-y;
        }
        .xray-layer { position: absolute; inset: 0; padding: 22px; }

        .xray-code {
          background: var(--ink);
          color: #cfcfc6;
          font: 13px/1.7 ui-monospace, 'SFMono-Regular', Consolas, monospace;
        }
        .xray-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 26px;
          margin-top: 6px;
        }
        .xray-code h4 {
          font: 700 11px var(--font-text);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--acid);
          margin: 0 0 8px;
        }
        .xray-code pre { margin: 0; font: inherit; white-space: pre-wrap; }
        .xray-code .k { color: var(--acid); }
        .xray-code .s { color: #e7b3ff; }
        .xray-code .c { color: #77776f; }
        .xray-code table { border-collapse: collapse; width: 100%; font-size: 12px; }
        .xray-code td, .xray-code th { border: 1px solid #333; padding: 4px 8px; text-align: left; }
        .xray-code th { color: var(--acid); font-weight: 600; }
        .xray-deploy-title { margin-top: 18px !important; }
        .xray-deploy { margin: 0; }

        .xray-ui { background: #fff; color: var(--ink); }
        .xray-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--line-soft);
          padding-bottom: 12px;
        }
        .xray-logo { font: 800 15px var(--font-display); text-transform: uppercase; }
        .xray-links i { display: inline-block; width: 54px; height: 8px; background: #ddd; margin-left: 12px; }
        .xray-hero {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 26px;
          margin-top: 30px;
        }
        .xray-h {
          font: 800 clamp(28px, 3.2vw, 40px)/1 var(--font-display);
          text-transform: uppercase;
        }
        .xray-h em { font-style: normal; background: var(--acid); padding: 0 0.08em; }
        .xray-line { display: block; height: 8px; background: #e6e6e6; margin-top: 12px; width: 80%; }
        .xray-line--short { width: 55%; }
        .xray-btn {
          display: inline-block;
          margin-top: 22px;
          background: var(--ink);
          color: var(--paper);
          font: 700 13px var(--font-display);
          padding: 12px 18px;
          text-transform: uppercase;
        }
        .xray-card {
          border: 1px solid var(--line-soft);
          height: 210px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
        }
        .xray-card i { display: block; height: 34px; background: #f0efe9; }
        .xray-card i:last-child { width: 60%; }

        .xray-handle {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 0;
          border-left: 2px solid var(--acid);
          outline: none;
        }
        .xray-handle span {
          position: absolute;
          top: 50%;
          left: -23px;
          width: 44px;
          height: 44px;
          margin-top: -22px;
          border-radius: 50%;
          background: var(--acid);
          border: 2px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font: 800 16px var(--font-display);
          color: var(--ink);
        }
        .xray-handle:focus-visible span { box-shadow: 0 0 0 4px var(--paper), 0 0 0 6px var(--ink); }

        .xray-label {
          position: absolute;
          bottom: 12px;
          font: 600 11px var(--font-text);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 8px;
          pointer-events: none;
        }
        .xray-label--l { left: 12px; background: var(--paper); color: var(--ink); }
        .xray-label--r { right: 12px; background: var(--acid); color: var(--ink); }
        .xray-hint { margin-top: 12px; }

        @media (max-width: 700px) {
          .xray { height: 480px; }
          .xray-layer { padding: 16px; }
          .xray-cols { grid-template-columns: 1fr; gap: 16px; }
          /* код начинается сразу за ползунком (он на 38%), чтобы строки читались целиком */
          .xray-code { font-size: 11px; padding-left: calc(38% + 18px); }
          .xray-hero { grid-template-columns: 1fr; margin-top: 22px; }
          .xray-card { height: 120px; }
          .xray-links i { width: 28px; margin-left: 8px; }
          .xray-label { font-size: 10px; }
        }
      `}</style>
    </section>
  )
}
