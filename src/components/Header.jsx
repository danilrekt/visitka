import ThemeToggle from './ThemeToggle';

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          DM
        </a>
        <div className="header__right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}