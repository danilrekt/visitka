import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Flower2, X } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const screenshots = [
  { src: 'main.png', label: 'Главная', description: 'Главная страница магазина' },
  { src: 'card.png', label: 'Каталог', description: 'Каталог и карточки товаров' },
  { src: 'admin_crud.png', label: 'Админ-панель', description: 'Управление товарами' },
  { src: 'admin_change.png', label: 'Админ-панель', description: 'Редактирование товара' },
  { src: 'stats.png', label: 'Статистика', description: 'Статистика магазина' },
  { src: 'contacts.png', label: 'Контакты', description: 'Контактная информация' },
  { src: 'mobile_card.png', label: 'Mobile', description: 'Мобильная версия карточки товара' },
  { src: 'pay.png', label: 'Оплата', description: 'Оформление заказа' },
  { src: 'about.png', label: 'О проекте', description: 'Информация о магазине' },
].map((screenshot) => ({
  ...screenshot,
  src: `${import.meta.env.BASE_URL}${screenshot.src}`,
}));

function getScreenshotLabel(screenshot) {
  return `${screenshot.label}: ${screenshot.description}`;
}

function Lightbox({ screenshot, index, total, onClose, onPrevious, onNext }) {
  const [isTall, setIsTall] = useState(false);
  const [isWideMobile, setIsWideMobile] = useState(false);
  const dialogRef = useRef(null);
  const gestureRef = useRef({});

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  const handlePointerDown = (event) => {
    gestureRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startTime: Date.now(),
    };
  };

  const handlePointerUp = (event) => {
    const gesture = gestureRef.current;
    if (typeof gesture.startX !== 'number') return;

    const distanceX = event.clientX - gesture.startX;
    const distanceY = event.clientY - gesture.startY;
    const duration = Date.now() - gesture.startTime;

    if (duration < 500 && Math.abs(distanceX) > 60 && Math.abs(distanceX) > Math.abs(distanceY)) {
      if (distanceX < 0) onNext();
      else onPrevious();
    }

    gestureRef.current = {};
  };

  const handleImageLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const aspectRatio = naturalHeight / naturalWidth;
    setIsTall(aspectRatio >= 2.4);
    setIsWideMobile(naturalWidth >= 750 && aspectRatio < 2.4);
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal__content"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button className="modal__close" onClick={onClose} aria-label="Закрыть галерею">
          <X size={20} />
        </button>
        <button className="modal__nav modal__nav--previous" onClick={onPrevious} aria-label="Предыдущее изображение">
          <ChevronLeft size={28} />
        </button>
        <div
          className={`modal__image-stage${isTall ? ' modal__image-stage--tall' : ''}${isWideMobile ? ' modal__image-stage--wide-mobile' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <img
            src={screenshot.src}
            alt={getScreenshotLabel(screenshot)}
            className={`modal__image${isTall ? ' modal__image--tall' : ''}${isWideMobile ? ' modal__image--wide-mobile' : ''}`}
            onLoad={handleImageLoad}
            draggable="false"
          />
        </div>
        <button className="modal__nav modal__nav--next" onClick={onNext} aria-label="Следующее изображение">
          <ChevronRight size={28} />
        </button>
        <div className="modal__caption">
          <strong>{screenshot.label}</strong>
          <span>{screenshot.description}</span>
          <small>{index + 1} / {total}</small>
        </div>
      </div>
    </dialog>
  );
}

function getNextIndex(index, total, direction) {
  return (index + direction + total) % total;
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openScreenshot = (index) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);
  const activeScreenshot = activeIndex === null ? null : screenshots[activeIndex];

  const showPrevious = () => {
    setActiveIndex((index) => getNextIndex(index, screenshots.length, -1));
  };

  const showNext = () => {
    setActiveIndex((index) => getNextIndex(index, screenshots.length, 1));
  };

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
              {screenshots.map((screenshot, i) => (
                <img
                  key={screenshot.src}
                  src={screenshot.src}
                  alt={getScreenshotLabel(screenshot)}
                  className="project-card__screen"
                  loading="lazy"
                  onClick={() => openScreenshot(i)}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
      {activeScreenshot && (
        <Lightbox
          key={activeIndex}
          screenshot={activeScreenshot}
          index={activeIndex}
          total={screenshots.length}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </section>
  );
}
