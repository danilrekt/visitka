import { useEffect, useState, useRef } from 'react';
import { Menu, X, GitBranch } from 'lucide-react';

const sections = [
  { id: 'about', label: 'Обо мне' },
  { id: 'skills', label: 'Навыки' },
  { id: 'projects', label: 'Проекты' },
  { id: 'contacts', label: 'Контакты' },
];

const HEADER_OFFSET = 70;

export function StickyNav() {
  const [activeId, setActiveId] = useState('about');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleLogoClick = (e) => {
      if (e.target.closest('[data-scroll-top]')) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', ' ');
      }
    };
    document.addEventListener('click', handleLogoClick);
    return () => document.removeEventListener('click', handleLogoClick);
  }, []);

  useEffect(() => {
    const sectionElements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (sectionElements.length === 0) return;

    const updateActive = () => {
      const scrollY = window.scrollY + HEADER_OFFSET + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        const top = el.getBoundingClientRect().top + window.scrollY;
        
        if (scrollY >= top) {
          setActiveId(el.id);
          return;
        }
      }
      setActiveId(sections[0].id);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, []);

  useEffect(() => {
    if (navRef.current && indicatorRef.current) {
      const activeBtn = navRef.current.querySelector('.sticky-nav__link--active');
      if (activeBtn) {
        indicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
        indicatorRef.current.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
        indicatorRef.current.style.opacity = '1';
      }
    }
  }, [activeId]);

  const scrollTo = (id, updateHash = true) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      if (updateHash) {
        history.pushState(null, '', `#${id}`);
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sections.some(s => s.id === hash)) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top, behavior: 'instant' });
        }, 0);
      }
    }
  }, []);

  return (
    <>
      <nav className="header__nav" aria-label="Навигация по разделам" ref={navRef}>
        <div className="sticky-nav__inner">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`sticky-nav__link ${activeId === id ? 'sticky-nav__link--active' : ''}`}
              onClick={() => scrollTo(id)}
              aria-current={activeId === id ? 'location' : undefined}
            >
              {label}
            </button>
          ))}
          <span className="sticky-nav__indicator" ref={indicatorRef} />
        </div>
      </nav>

      <button
        className="header__burger"
        type="button"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
      </button>

      {isOpen && (
        <div className="header__mobile-panel" onClick={() => setIsOpen(false)}>
          <nav className="header__mobile-nav">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`header__mobile-link ${activeId === id ? 'header__mobile-link--active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(id);
                }}
              >
                {label}
              </button>
            ))}
            <a
              href="https://github.com/danilrekt"
              target="_blank"
              rel="noopener noreferrer"
              className="header__mobile-link header__mobile-link--github"
            >
              <GitBranch size={18} strokeWidth={2} />
              GitHub
            </a>
          </nav>
        </div>
      )}
    </>
  );
}