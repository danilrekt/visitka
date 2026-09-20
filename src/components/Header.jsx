import ThemeToggle from './ThemeToggle';
import { StickyNav } from './StickyNav';

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <StickyNav />
        <div className="header__right">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}