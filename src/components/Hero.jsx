import { useEffect } from 'react';
import { ArrowRight, Code2, BarChart3, GraduationCap, Heart } from 'lucide-react';
import WorkspaceIllustration from './WorkspaceIllustration';

const features = [
  { icon: Code2, title: 'Самостоятельная разработка', desc: 'Умею создавать полноценные проекты с нуля.' },
  { icon: BarChart3, title: 'Практический подход', desc: 'Делаю упор на реальные задачи и рабочие решения.' },
  { icon: GraduationCap, title: 'Постоянное развитие', desc: 'Изучаю новые технологии и улучшаю свои навыки.' },
  { icon: Heart, title: 'Любовь к деталям', desc: 'Ценю чистый код, понятную структуру и хороший UI.' },
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
              Я веб-разработчик, который создаёт современные и функциональные
              веб-приложения. Мне нравится полный цикл разработки: от идеи и
              дизайна до базы данных, интеграций и деплоя.
            </p>
            <p>
              Постоянно учусь, развиваю свои навыки и стараюсь делать продукты,
              которые реально приносят пользу.
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
