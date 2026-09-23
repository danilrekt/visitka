const EMAIL = 'danilrekt1234@gmail.com'
const UPDATED = '24 сентября 2026 г.'

export default function Privacy() {
  return (
    <>
      <header className="privacy-header">
        <div className="wrap privacy-header-inner">
          <a href="./" className="privacy-logo">
            ДАНИЛ<span className="privacy-logo-deg">°</span>
          </a>
          <a href="./" className="privacy-back">← На главную</a>
        </div>
      </header>

      <main className="wrap privacy">
        <span className="mono-tag">Редакция от {UPDATED}</span>
        <h1 className="privacy-title">Политика конфиденциальности</h1>

        <section>
          <h2>1. Кто обрабатывает данные</h2>
          <p>
            Эта политика описывает, какие данные собирает этот сайт-портфолио, зачем
            и как ими распоряжаться. Она составлена в соответствии с Федеральным
            законом № 152-ФЗ «О персональных данных».
          </p>
          <p>
            Оператор — владелец сайта Данил. По всем вопросам о данных пишите на{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2>2. Какие данные собираются</h2>
          <p><strong>Автоматически, через Яндекс Метрику:</strong></p>
          <ul>
            <li>файлы cookie и обезличенный идентификатор посетителя;</li>
            <li>IP-адрес и примерное местоположение (город, страна);</li>
            <li>тип устройства, браузер, операционная система, разрешение экрана;</li>
            <li>откуда вы пришли на сайт, какие разделы смотрели, клики по ссылкам и время на сайте.</li>
          </ul>
          <p>
            Запись действий на странице (Вебвизор) не ведётся. Имя, телефон и почту
            сайт сам не собирает — на нём нет форм.
          </p>
          <p><strong>Добровольно, если вы напишете мне</strong> на почту или в Telegram:</p>
          <ul>
            <li>имя или никнейм, адрес почты или аккаунт Telegram;</li>
            <li>то, что вы сами укажете в сообщении.</li>
          </ul>
        </section>

        <section>
          <h2>3. Зачем</h2>
          <ul>
            <li>понимать, сколько людей заходит на сайт и откуда, чтобы делать его лучше;</li>
            <li>отвечать на ваши сообщения и обсуждать задачи.</li>
          </ul>
          <p>Данные не используются для рекламы и не продаются.</p>
        </section>

        <section>
          <h2>4. Основание и согласие</h2>
          <p>
            Продолжая пользоваться сайтом с включёнными cookie, вы соглашаетесь на
            сбор обезличенной статистики, описанной выше. Отправляя сообщение, вы
            соглашаетесь на обработку данных, которые в нём указали, чтобы я мог
            ответить. Согласие можно отозвать в любой момент — см. раздел 7.
          </p>
        </section>

        <section>
          <h2>5. Яндекс Метрика</h2>
          <p>
            Статистику собирает сервис Яндекс Метрика (ООО «ЯНДЕКС») по своим{' '}
            <a href="https://yandex.ru/legal/metrica_termsofuse/" target="_blank" rel="noreferrer">
              условиям использования
            </a>
            . Мне доступны только сводные отчёты, а не данные конкретного человека.
          </p>
          <p>Чтобы статистика о вас не собиралась, можно:</p>
          <ul>
            <li>запретить cookie для этого сайта в настройках браузера;</li>
            <li>
              установить{' '}
              <a href="https://yandex.ru/support/metrica/general/opt-out.html" target="_blank" rel="noreferrer">
                блокировщик Яндекс Метрики
              </a>{' '}
              или любой блокировщик трекеров.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Хранение и передача</h2>
          <p>
            Статистика хранится в Яндекс Метрике в сроки, установленные сервисом.
            Переписка хранится, пока нужна для общения, и удаляется по вашей просьбе.
          </p>
          <p>
            Третьим лицам данные не передаются, кроме сервисов, без которых сайт и
            связь не работают: Яндекс Метрики, почты и Telegram.
          </p>
        </section>

        <section>
          <h2>7. Ваши права</h2>
          <p>Вы можете:</p>
          <ul>
            <li>узнать, какие ваши данные у меня есть;</li>
            <li>попросить их исправить или удалить;</li>
            <li>отозвать согласие на обработку.</li>
          </ul>
          <p>
            Для этого напишите на <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Отвечу в
            течение 10 рабочих дней.
          </p>
        </section>

        <section>
          <h2>8. Изменения</h2>
          <p>
            Политика может обновляться. Актуальная версия всегда на этой странице,
            дата редакции указана вверху.
          </p>
        </section>
      </main>

      <footer className="wrap privacy-foot">
        <span className="mono-tag">© {new Date().getFullYear()} Данил</span>
      </footer>

      <style>{`
        .privacy-header {
          padding: 20px 0;
          border-bottom: 1px solid var(--line-soft);
        }
        .privacy-header-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
        }
        .privacy-logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.01em;
        }
        .privacy-logo-deg { color: var(--acid); -webkit-text-stroke: 1px var(--ink); }
        .privacy-back {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .privacy-back:hover { color: var(--grey); }

        .privacy > * { max-width: 760px; }
        .privacy {
          padding-top: clamp(32px, 5vw, 64px);
          padding-bottom: clamp(32px, 5vw, 64px);
        }
        .privacy-title {
          font-family: var(--font-display);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.02;
          letter-spacing: -0.01em;
          font-size: clamp(30px, 4.4vw, 52px);
          margin: 14px 0 clamp(24px, 4vw, 40px);
        }
        .privacy section + section {
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid var(--line-soft);
        }
        .privacy h2 {
          font-family: var(--font-display);
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(16px, 1.6vw, 20px);
          margin: 0 0 12px;
        }
        .privacy p,
        .privacy li {
          font-size: 15px;
          line-height: 1.65;
          color: var(--grey);
        }
        .privacy p + p,
        .privacy ul + p,
        .privacy p + ul { margin-top: 10px; }
        .privacy ul { margin: 0; padding-left: 20px; }
        .privacy li + li { margin-top: 4px; }
        .privacy strong { color: var(--ink); font-weight: 600; }
        .privacy a {
          color: var(--ink);
          text-decoration: underline;
          text-decoration-color: var(--acid);
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }
        .privacy-foot {
          padding-top: 24px;
          padding-bottom: 32px;
          border-top: 1px solid var(--line-soft);
        }
      `}</style>
    </>
  )
}
