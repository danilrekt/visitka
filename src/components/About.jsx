import { Code2, BarChart3, GraduationCap, Heart } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const features = [
  {
    icon: Code2,
    title: 'Самостоятельная разработка',
    desc: 'Умею создавать полноценные проекты с нуля.',
  },
  {
    icon: BarChart3,
    title: 'Практический подход',
    desc: 'Делаю упор на реальные задачи и рабочие решения.',
  },
  {
    icon: GraduationCap,
    title: 'Постоянное развитие',
    desc: 'Изучаю новые технологии и улучшаю свои навыки.',
  },
  {
    icon: Heart,
    title: 'Любовь к деталям',
    desc: 'Ценю чистый код, понятную структуру и хороший UI.',
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about__inner">
          <div>
            <ScrollReveal>
              <p className="section__label">Обо мне</p>
              <h2 className="section__title">Кто я и чем занимаюсь</h2>
            </ScrollReveal>
            <ScrollReveal>
              <div className="about__text">
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
            </ScrollReveal>
          </div>
          <div className="about__cards">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title}>
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  desc={feature.desc}
                  className={`animate-in animate-in-delay-${index + 1}`}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeatureCard({ icon: Icon, title, desc, className = '' }) {
  return (
    <div className={`feature-card ${className}`}>
      <div className="feature-card__icon">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__desc">{desc}</p>
      </div>
    </div>
  );
}
