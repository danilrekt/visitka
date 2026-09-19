import { useEffect, useRef, useState } from 'react';
import { Flower2, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const screenshots = [
  `${import.meta.env.BASE_URL}main.png`,
  `${import.meta.env.BASE_URL}card.png`,
  `${import.meta.env.BASE_URL}admin_crud.png`,
  `${import.meta.env.BASE_URL}admin_change.png`,
  `${import.meta.env.BASE_URL}stats.png`,
  `${import.meta.env.BASE_URL}contacts.png`,
  `${import.meta.env.BASE_URL}mobile_card.png`,
  `${import.meta.env.BASE_URL}pay.png`,
  `${import.meta.env.BASE_URL}about.png`,
];

export default function Projects() {
  const [modalSrc, setModalSrc] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !modalSrc) return undefined;

    modal.showModal();
    return () => {
      if (modal.open) modal.close();
    };
  }, [modalSrc]);

  return (
    <section id="projects" className="page-section">
      <div className="container">
        <h2 className="section__title">Проекты</h2>
        <ScrollReveal>
          <div className="project-card">
            <div className="project-card__header">
              <div className="project-card__icon">
                <Flower2 size={20} strokeWidth={1.8} />
              </div>
              <div className="project-card__meta">
                <h3 className="project-card__title">Flower Surgut</h3>
                <p className="project-card__desc">
                  Интернет-магазин свежих цветов в Сургуте — каталог букетов,
                  фильтрация по категориям, поиск, модальное окно заказа и
                  админ-панель.
                </p>
              </div>
            </div>
            <div className="project-card__screenshots">
              {screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Flower Surgut скриншот ${i + 1}`}
                  className="project-card__screen"
                  loading="lazy"
                  onClick={() => setModalSrc(src)}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
      {modalSrc && (
        <dialog
          ref={modalRef}
          className="modal"
          onCancel={() => setModalSrc(null)}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalSrc(null);
          }}
        >
          <div className="modal__content">
            <button className="modal__close" onClick={() => setModalSrc(null)} aria-label="Закрыть">
              <X size={20} />
            </button>
            <img src={modalSrc} alt="Flower Surgut скриншот" className="modal__image" />
          </div>
        </dialog>
      )}
    </section>
  );
}
