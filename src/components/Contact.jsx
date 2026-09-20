import { MessageCircle, Mail, ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const processSteps = [
  { text: 'РАССКАЖИТЕ', delay: 0 },
  { text: 'ОБСУДИМ', delay: 100 },
  { text: 'РЕШИМ', delay: 200 },
  { text: 'СДЕЛАЕМ', delay: 300 },
];

const contacts = [
  {
    name: 'Написать в Telegram →',
    href: 'https://t.me/danilrekt',
    icon: MessageCircle,
    primary: true,
  },
  {
    name: 'Написать на Email →',
    href: 'mailto:danilrekt1234@gmail.com',
    icon: Mail,
    primary: false,
  },
];

export default function Contact() {
  return (
    <section id="contacts" className="page-section contact">
      <div className="container">
        <ScrollReveal>
          <h2 className="section__title contact__title">Контакты</h2>
        </ScrollReveal>
        <ScrollReveal className="contact__desc-reveal">
          <h3 className="contact__main-heading">Есть проект или идея?</h3>
        </ScrollReveal>
        <ScrollReveal className="contact__process-reveal" style={{ transitionDelay: '100ms' }}>
          <div className="contact__process" role="list" aria-label="Процесс работы">
            {processSteps.map((step, index) => (
              <div key={step.text} style={{ display: 'contents' }}>
                <div
                  className={`contact__process-step ${index === processSteps.length - 1 ? 'contact__process-step--last' : ''}`}
                  style={{ animationDelay: `${step.delay}ms` }}
                  role="listitem"
                >
                  <span className="contact__process-text">{step.text}</span>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="contact__process-arrow" aria-hidden="true">↓</div>
                )}
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal className="contact__code-reveal" style={{ transitionDelay: '400ms' }}>
          <div className="contact__code">let&rsquo;s_work_together()</div>
        </ScrollReveal>
        <ScrollReveal className="contact__cards-reveal" style={{ transitionDelay: '500ms' }}>
          <div className="contact__cta-group">
            {contacts.map((contact, index) => (
              <a
                key={contact.name}
                href={contact.href}
                className={`contact__cta ${contact.primary ? 'contact__cta--primary' : 'contact__cta--secondary'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <span className="contact__cta-text">{contact.name}</span>
                <ArrowRight size={18} strokeWidth={2} className="contact__cta-arrow" />
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}