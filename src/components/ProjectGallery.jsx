import { useEffect, useState, useCallback, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

const MAX_SCALE = 4
const CLICK_SCALE = 2.5
const WHEEL_STEP = 1.15
const NO_ZOOM = { s: 1, x: 0, y: 0 }

const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

export const FLOWER_SURGUT_GALLERY = [
  { label: 'Каталог', src: 'projects/flower-surgut/main.jpg' },
  { label: 'Карточка товара', src: 'projects/flower-surgut/card.jpg' },
  { label: 'О магазине', src: 'projects/flower-surgut/about.jpg' },
  { label: 'Доставка и оплата', src: 'projects/flower-surgut/pay.jpg' },
  { label: 'Контакты', src: 'projects/flower-surgut/contacts.jpg' },
  { label: 'Админ-панель', src: 'projects/flower-surgut/admin_crud.jpg' },
  { label: 'Статистика', src: 'projects/flower-surgut/stats.jpg' },
  { label: 'Мобильная версия — каталог', src: 'projects/flower-surgut/mobile_main.jpg' },
  { label: 'Мобильная версия — карточка', src: 'projects/flower-surgut/mobile_card.jpg' },
  { label: 'Мобильная версия — о магазине', src: 'projects/flower-surgut/mobile_about.jpg' },
  { label: 'Мобильная версия — доставка', src: 'projects/flower-surgut/mobile_pay.jpg' },
  { label: 'Мобильная версия — контакты', src: 'projects/flower-surgut/mobile_contacts.jpg' },
  { label: 'Мобильная версия — админка', src: 'projects/flower-surgut/mobile_admin.jpg' },
]

export default function ProjectGallery({ title, images, isOpen, onClose }) {
  const [index, setIndex] = useState(0)
  const [zoom, setZoom] = useState(NO_ZOOM)
  const [dragging, setDragging] = useState(false)
  const imgRef = useRef(null)
  const pointers = useRef(new Map())
  const gesture = useRef(null)

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (isOpen) setIndex(0)
  }, [isOpen])

  useEffect(() => {
    setZoom(NO_ZOOM)
  }, [index, isOpen])

  // keep the zoomed picture from being dragged past its own edges
  const limit = (s, x, y) => {
    const img = imgRef.current
    if (!img || s <= 1.01) return NO_ZOOM
    const maxX = (img.offsetWidth * (s - 1)) / 2
    const maxY = (img.offsetHeight * (s - 1)) / 2
    return { s, x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) }
  }

  // scale to `s` while keeping the point under (clientX, clientY) in place
  const zoomAt = (from, s, clientX, clientY) => {
    const rect = imgRef.current.parentElement.getBoundingClientRect()
    const px = clientX - (rect.left + rect.width / 2)
    const py = clientY - (rect.top + rect.height / 2)
    const next = clamp(s, 1, MAX_SCALE)
    const k = next / from.s
    return limit(next, px - (px - from.x) * k, py - (py - from.y) * k)
  }

  const toggleZoom = (clientX, clientY) => {
    if (zoom.s > 1) return setZoom(NO_ZOOM)
    const rect = imgRef.current.parentElement.getBoundingClientRect()
    setZoom(zoomAt(zoom, CLICK_SCALE, clientX ?? rect.left + rect.width / 2, clientY ?? rect.top + rect.height / 2))
  }

  const midpoint = () => {
    const [a, b] = [...pointers.current.values()]
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, d: Math.hypot(a.x - b.x, a.y - b.y) || 1 }
  }

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 1) {
      gesture.current = { type: 'pan', x: e.clientX, y: e.clientY, from: zoom, moved: false }
    } else if (pointers.current.size === 2) {
      gesture.current = { type: 'pinch', start: midpoint(), from: zoom }
    }
  }

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const g = gesture.current
    if (!g) return
    if (g.type === 'pan') {
      const dx = e.clientX - g.x
      const dy = e.clientY - g.y
      if (!g.moved && Math.hypot(dx, dy) > 4) {
        g.moved = true
        setDragging(true)
      }
      if (g.moved && g.from.s > 1) setZoom(limit(g.from.s, g.from.x + dx, g.from.y + dy))
    } else if (g.type === 'pinch' && pointers.current.size === 2) {
      const now = midpoint()
      setDragging(true)
      const scaled = zoomAt(g.from, g.from.s * (now.d / g.start.d), g.start.x, g.start.y)
      setZoom(limit(scaled.s, scaled.x + now.x - g.start.x, scaled.y + now.y - g.start.y))
    }
  }

  const onPointerUp = (e) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.delete(e.pointerId)
    const g = gesture.current
    if (pointers.current.size === 1) {
      // one finger left after a pinch: carry on panning from where it is
      const [p] = pointers.current.values()
      gesture.current = { type: 'pan', x: p.x, y: p.y, from: zoom, moved: true }
      return
    }
    if (pointers.current.size === 0) {
      if (g?.type === 'pan' && !g.moved && e.type === 'pointerup') toggleZoom(e.clientX, e.clientY)
      gesture.current = null
      setDragging(false)
    }
  }

  const onWheel = (e) => {
    const s = e.deltaY < 0 ? zoom.s * WHEEL_STEP : zoom.s / WHEEL_STEP
    setZoom(zoomAt(zoom, s, e.clientX, e.clientY))
  }

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === '+' || e.key === '=') setZoom((z) => (z.s > 1 ? z : { ...z, s: CLICK_SCALE }))
      if (e.key === '-') setZoom(NO_ZOOM)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, next, prev, onClose])

  if (!isOpen) return null

  const item = images[index]

  return (
    <div className="gallery-modal is-open" role="dialog" aria-modal="true" aria-label={`Галерея проекта ${title}`}>
      <div className="gallery-backdrop" onClick={onClose} />
      <div className="gallery-body">
        <div className="gallery-head">
          <span className="gallery-title">{title}</span>
          <div className="gallery-actions">
            <button
              className="gallery-close"
              onClick={() => toggleZoom()}
              aria-label={zoom.s > 1 ? 'Уменьшить' : 'Увеличить'}
            >
              {zoom.s > 1 ? <ZoomOut size={18} strokeWidth={2} /> : <ZoomIn size={18} strokeWidth={2} />}
            </button>
            <button className="gallery-close" onClick={onClose} aria-label="Закрыть галерею">
              <X size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="gallery-stage">
          <button className="gallery-nav" onClick={prev} aria-label="Предыдущий кадр">
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div
            className={`gallery-frame ${zoom.s > 1 ? 'is-zoomed' : ''} ${dragging ? 'is-dragging' : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onWheel={onWheel}
          >
            <img
              ref={imgRef}
              src={item.src}
              alt={`${title} — ${item.label}`}
              draggable={false}
              style={{ transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.s})` }}
            />
          </div>
          <button className="gallery-nav" onClick={next} aria-label="Следующий кадр">
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
        <div className="gallery-foot">
          <span className="gallery-caption">
            {index + 1} / {images.length} — {item.label}
          </span>
          <div className="gallery-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`gallery-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gallery-modal { position: fixed; inset: 0; z-index: 100; }
        .gallery-backdrop { position: absolute; inset: 0; background: rgba(10,10,10,.92); }
        .gallery-body { position: relative; height: 100%; display: flex; flex-direction: column; padding: env(safe-area-inset-top,0px) 0 env(safe-area-inset-bottom,0px); }
        .gallery-head { display: flex; justify-content: space-between; align-items: center; padding: 20px var(--edge); }
        .gallery-title { font-family: var(--font-display); font-weight: 800; text-transform: uppercase; color: var(--paper); font-size: 16px; letter-spacing: .02em; }
        .gallery-close { width: 40px; height: 40px; border-radius: 50%; border: 1.5px solid var(--paper); color: var(--paper); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gallery-actions { display: flex; gap: 10px; }
        .gallery-close:hover { background: var(--acid); border-color: var(--acid); color: var(--ink); }
        .gallery-stage { flex: 1; display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0 var(--edge); min-height: 0; }
        .gallery-nav { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(250,249,246,.4); color: var(--paper); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gallery-nav:hover { background: var(--acid); border-color: var(--acid); color: var(--ink); }
        .gallery-frame { max-width: min(900px, 80vw); max-height: 70vh; display: flex; align-items: center; justify-content: center; overflow: hidden; touch-action: none; border: 1px solid rgba(250,249,246,.15); }
        .gallery-frame img { max-width: 100%; max-height: 70vh; object-fit: contain; display: block; user-select: none; -webkit-user-drag: none; cursor: zoom-in; transition: transform .25s ease; }
        .gallery-frame.is-zoomed img { cursor: grab; }
        .gallery-frame.is-dragging img { cursor: grabbing; transition: none; }
        .gallery-foot { padding: 18px var(--edge) 28px; display: flex; flex-direction: column; align-items: center; gap: 14px; }
        .gallery-caption { color: var(--grey-light); font-size: 13px; }
        .gallery-dots { display: flex; gap: 8px; }
        .gallery-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(250,249,246,.3); cursor: pointer; transition: background .2s ease, transform .2s ease; }
        .gallery-dot.is-active { background: var(--acid); transform: scale(1.3); }
        @media (max-width: 700px) {
          .gallery-stage { padding: 0 8px; gap: 6px; }
          .gallery-nav { width: 36px; height: 36px; }
          .gallery-frame { max-width: 92vw; }
        }
      `}</style>
    </div>
  )
}
