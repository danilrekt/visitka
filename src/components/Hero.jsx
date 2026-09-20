import { useEffect } from 'react';
import { ArrowRight, Code2, BarChart3, GraduationCap, Heart } from 'lucide-react';
import WorkspaceIllustration from './WorkspaceIllustration';

const features = [
  { icon: Code2, title: 'Сайт под вашу задачу', desc: 'Не просто шаблон, а решение, адаптированное под ваш проект и аудиторию.' },
  { icon: BarChart3, title: 'Полный цикл разработки', desc: 'От первых идей и структуры до готового сайта, который можно открыть по ссылке.' },
  { icon: GraduationCap, title: 'Современный и удобный интерфейс', desc: 'Сайт должен хорошо выглядеть и одинаково удобно работать на компьютере и телефоне.' },
  { icon: Heart, title: 'Готовый результат', desc: 'После разработки вы получаете работающий сайт, размещённый в интернете.' },
];

export function Hero() {
  useEffect(() => {
    document.title = 'Данила — Web Developer / Full-Stack Developer';
  }, []);

  return (
    <section id="about" className="page-section">
      <div className="container">
        <div className="hero__inner">
          <div>
            <p className="hero__label animate-in" style={{ animationDelay: '0s' }}>
              Привет, меня зовут
            </p>
            <h1
              className="hero__title animate-in animate-in-scale"
              style={{ animationDelay: '0.1s' }}
            >
              Данила
            </h1>
            <p className="hero__subtitle animate-in" style={{ animationDelay: '0.25s' }}>
              Web Developer / Full-Stack Developer
            </p>
            <p className="hero__desc animate-in" style={{ animationDelay: '0.4s' }}>
              Создаю современные сайты и веб-приложения —
              от интерфейса до базы данных и деплоя.
            </p>
            <div className="hero__actions animate-in" style={{ animationDelay: '0.55s' }}>
              <a href="#contacts" className="btn btn--primary btn--lg">
                Связаться
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero__illustration">
            <WorkspaceIllustration />
          </div>
        </div>

<div className="hero__about">
          <div className="hero__about-text">
            <h2 className="section__title">Обо мне</h2>
            <p>
              Я разрабатываю сайты и веб-приложения, которые помогают
              представить бизнес, услугу или проект в интернете.
            </p>
            <p>
              Работаю над проектом целиком: от структуры и интерфейса до
              функционала, базы данных и публикации сайта. Поэтому могу не
              только собрать внешний вид, но и самостоятельно реализовать
              необходимую логику внутри.
            </p>
            <p>
              В работе стараюсь найти баланс между хорошим визуалом,
              удобством для пользователя и реальной задачей бизнеса. Перед
              разработкой разбираюсь в задаче и подбираю решение, которое
              действительно имеет смысл для проекта.
            </p>
          </div>
          <div className="about__cards">
            {features.map((feature, index) => (
              <div key={feature.title} className={`feature-card animate-in animate-in-delay-${index + 1}`}>
                <div className="feature-card__icon">
                  <feature.icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
