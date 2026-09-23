import { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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

  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (isOpen) setIndex(0)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
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
          <button className="gallery-close" onClick={onClose} aria-label="Закрыть галерею">
            <X size={18} strokeWidth={2} />
          </button>
        </div>
        <div className="gallery-stage">
          <button className="gallery-nav" onClick={prev} aria-label="Предыдущий кадр">
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <div className="gallery-frame">
            <img src={item.src} alt={`${title} — ${item.label}`} />
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
        .gallery-close:hover { background: var(--acid); border-color: var(--acid); color: var(--ink); }
        .gallery-stage { flex: 1; display: flex; align-items: center; justify-content: center; gap: 16px; padding: 0 var(--edge); min-height: 0; }
        .gallery-nav { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid rgba(250,249,246,.4); color: var(--paper); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .gallery-nav:hover { background: var(--acid); border-color: var(--acid); color: var(--ink); }
        .gallery-frame { max-width: min(900px, 80vw); max-height: 70vh; display: flex; align-items: center; justify-content: center; }
        .gallery-frame img { max-width: 100%; max-height: 70vh; object-fit: contain; border: 1px solid rgba(250,249,246,.15); }
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
