import { Fragment, useState } from 'react';
import { Flower2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

const desktopScreenshots = [
  { src: 'main.png', label: 'Главная', description: 'Главная страница магазина' },
  { src: 'card.png', label: 'Каталог', description: 'Каталог и карточки товаров' },
  { src: 'about.png', label: 'О проекте', description: 'Информация о магазине' },
  { src: 'contacts.png', label: 'Контакты', description: 'Контактная информация' },
  { src: 'pay.png', label: 'Оплата', description: 'Оформление заказа' },
  { src: 'stats.png', label: 'Статистика', description: 'Статистика магазина' },
  { src: 'admin_crud.png', label: 'Админ-панель', description: 'Управление товарами' },
  { src: 'admin_change.png', label: 'Админ-панель', description: 'Редактирование товара' },
];

const mobileScreenshots = [
  { src: 'mobile_main.png', label: 'Mobile', description: 'Мобильная версия главной страницы' },
  { src: 'mobile_card.png', label: 'Mobile', description: 'Мобильная версия карточки товара' },
  { src: 'mobile_about.png', label: 'Mobile', description: 'Мобильная версия раздела о магазине' },
  { src: 'mobile_admin.png', label: 'Mobile', description: 'Мобильная версия админ-панели' },
  { src: 'mobile_contacts.png', label: 'Mobile', description: 'Мобильная версия контактов' },
  { src: 'mobile_pay.png', label: 'Mobile', description: 'Мобильная версия оформления заказа' },
];

const screenshots = [...mobileScreenshots, ...desktopScreenshots].map((screenshot) => ({
  ...screenshot,
  src: `${import.meta.env.BASE_URL}${screenshot.src}`,
}));

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const slides = screenshots.map(({ src, label, description }) => ({
    src,
    title: label,
    description,
  }));

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
                <Fragment key={screenshot.src}>
                  {i === 0 && (
                    <div className="project-card__divider" aria-hidden="true">
                      <span>Mobile</span>
                    </div>
                  )}
                  {i === mobileScreenshots.length && (
                    <div className="project-card__divider" aria-hidden="true">
                      <span>Desktop</span>
                    </div>
                  )}
                  <img
                    src={screenshot.src}
                    alt={`${screenshot.label}: ${screenshot.description}`}
                    className={`project-card__screen${screenshot.src.includes('/mobile_') ? ' project-card__screen--mobile' : ''}`}
                    loading="lazy"
                    onClick={() => setActiveIndex(i)}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
      <Lightbox
        open={activeIndex !== null}
        close={() => setActiveIndex(null)}
        index={activeIndex ?? 0}
        slides={slides}
        plugins={[Captions, Counter, Zoom]}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        carousel={{ imageFit: 'contain', padding: 0, spacing: 0 }}
        controller={{ closeOnBackdropClick: true }}
        portal={{ root: () => document.documentElement }}
      />
    </section>
  );
}
