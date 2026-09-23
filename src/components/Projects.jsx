import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import ProjectGallery, { FLOWER_SURGUT_GALLERY } from './ProjectGallery.jsx'

const PROJECTS = [
  {
    tag: 'Веб-разработка',
    stack: 'REACT / VITE / SUPABASE',
    title: 'Flower Surgut',
    desc: 'Каталог и заказ цветов с каталогом на 60+ позиций и собственной админ-панелью для управления товарами.',
    size: 'large',
    hasGallery: true,
    thumbnail: 'projects/flower-surgut/main.jpg',
  },
]

export default function Projects() {
  const [galleryOpen, setGalleryOpen] = useState(false)

  return (
    <section className="projects" id="work">
      <div className="wrap">
        <div className="projects-head">
          <h2 className="section-title">Избранные проекты</h2>
          <span className="mono-tag">избранный кейс</span>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p) => (
            <article
              className={`project-card size-${p.size} ${p.hasGallery ? 'project-card--live' : ''}`}
              key={p.title}
              role={p.hasGallery ? 'button' : undefined}
              tabIndex={p.hasGallery ? 0 : undefined}
              onClick={p.hasGallery ? () => setGalleryOpen(true) : undefined}
              onKeyDown={
                p.hasGallery
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setGalleryOpen(true)
                      }
                    }
                  : undefined
              }
            >
              <div
                className={`project-media ${p.thumbnail ? 'project-media--photo' : ''}`}
                style={p.thumbnail ? { backgroundImage: `url(${p.thumbnail})` } : undefined}
                aria-hidden="true"
              >
                <span className="project-media-label">{p.title}</span>
              </div>
              <div className="project-info">
                <div className="project-info-top">
                  <h3>{p.title}</h3>
                  <ArrowUpRight size={20} strokeWidth={1.75} />
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-meta">
                  <span className="mono-tag">{p.tag}</span>
                  <span className="mono-tag">{p.stack}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectGallery
        title="Flower Surgut"
        images={FLOWER_SURGUT_GALLERY}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
      />

      <style>{`
        .projects {
          padding: clamp(56px, 8vw, 100px) 0;
          border-top: 1px solid var(--line-soft);
        }
        .projects-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 32px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .projects-grid:has(.project-card:only-child) {
          grid-template-columns: 1fr;
          max-width: 640px;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .size-large { grid-column: span 2; grid-row: span 2; }
        .size-wide { grid-column: span 3; }
        .size-small { grid-column: span 1; }

        .project-media {
          aspect-ratio: 4 / 3;
          background: var(--ink);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 20px;
        }
        .size-large .project-media { aspect-ratio: 1 / 1; }
        .size-wide .project-media { aspect-ratio: 21 / 9; }

        .project-media::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--acid) 35%, transparent), transparent 55%),
            repeating-linear-gradient(115deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 26px);
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-media::before {
          transform: scale(1.06);
        }
        .project-media-label {
          position: relative;
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          color: var(--paper);
          font-size: clamp(16px, 1.6vw, 22px);
          -webkit-text-stroke: 0;
        }
        .project-media--photo {
          background-size: cover;
          background-position: center top;
        }
        .project-media--photo::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0) 45%, rgba(10,10,10,.82) 100%);
        }
        .project-card--live { cursor: pointer; }
        .project-gallery-hint {
          color: var(--ink);
          display: inline-block;
          margin-top: 4px;
          transition: color 0.2s ease;
        }
        .project-card--live:hover .project-gallery-hint { color: var(--acid); }

        .project-info-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .project-info-top h3 {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          font-size: clamp(18px, 1.8vw, 24px);
        }
        .project-desc {
          font-size: 14px;
          color: var(--grey);
          line-height: 1.55;
          max-width: 50ch;
        }
        .project-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 860px) {
          .projects-grid { grid-template-columns: 1fr; }
          .size-large, .size-wide, .size-small { grid-column: span 1; grid-row: auto; }
        }
      `}</style>
    </section>
  )
}
