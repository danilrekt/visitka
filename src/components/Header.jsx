import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="mobile-menu open" role="dialog" aria-label="Мобильное меню">
      <button
        type="button"
        className="mobile-menu__close"
        onClick={onClose}
        aria-label="Закрыть меню"
      >
        <X size={24} />
      </button>
      <a href="#contacts" className="mobile-menu__link" onClick={onClose}>
        Контакты
      </a>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#" className="header__logo">
          DM
        </a>
        <div className="header__right">
          <a href="#contacts" className="header__nav-link header__nav-link--cta">
            Контакты
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
