import { MessageCircle, Mail } from 'lucide-react';

const contacts = [
  {
    name: 'Telegram',
    desc: 'Написать в Telegram',
    icon: MessageCircle,
    href: 'https://t.me/danilrekt',
  },
  {
    name: 'Email',
    desc: 'Написать на почту',
    icon: Mail,
    href: 'mailto:danilrekt1234@gmail.com',
  },
];

export default function Contact() {
  return (
    <section id="contacts" className="page-section">
      <div className="container">
        <h2 className="section__title">Контакты</h2>
        <p className="contact__desc">
          Если у вас есть проект, идея или просто хотите обсудить сотрудничество —
          я всегда открыт к диалогу.
        </p>
        <div className="contact__cards">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.name}
                href={contact.href}
                className={`feature-card animate-in animate-in-delay-${index + 1}`}
              >
                <div className="feature-card__icon">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="feature-card__title">{contact.name}</h3>
                  <p className="feature-card__desc">{contact.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
