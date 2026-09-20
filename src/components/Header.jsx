import ThemeToggle from './ThemeToggle';
import { StickyNav } from './StickyNav';

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo" data-scroll-top>
          DM
        </a>
        <StickyNav />
        <div className="header__right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}