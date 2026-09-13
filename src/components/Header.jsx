import ThemeToggle from './ThemeToggle';

function RobotIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="4" x2="12" y2="7" />
      <circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" />
      <rect x="5" y="7" width="14" height="10" rx="2.5" />
      <circle cx="9" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <line x1="9" y1="15.5" x2="15" y2="15.5" />
      <rect x="7" y="17" width="10" height="5" rx="1.5" />
      <line x1="11" y1="19.5" x2="11" y2="21" />
      <line x1="13" y1="19.5" x2="13" y2="21" />
    </svg>
  );
}

export function Header() {
  const handleSwitch = (e) => {
    e.preventDefault();
    const link = e.currentTarget.getAttribute('href');
    document.body.classList.add('page-exit');

    const overlay = document.createElement('div');
    overlay.className = 'page-overlay';
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add('page-overlay--visible');
    });

    setTimeout(() => {
      window.location.href = link;
    }, 350);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          DM
        </a>
        <div className="header__right">
          <a href="index_1.html" className="header__switch" title="Перейти в альтернативную версию" onClick={handleSwitch}>
            <RobotIcon />
            <span>v2</span>
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}