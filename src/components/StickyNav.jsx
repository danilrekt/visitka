import { useEffect, useState, useRef } from 'react';
import { Menu, X } from 'lucide-react';

const sections = [
  { id: 'home', label: 'D' },
  { id: 'skills', label: 'Навыки' },
  { id: 'projects', label: 'Проекты' },
  { id: 'contacts', label: 'Контакты' },
];

const HEADER_OFFSET = 70;

export function StickyNav() {
  const [activeId, setActiveId] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollEndTimerRef = useRef(null);

  useEffect(() => {
    const handleLogoClick = (e) => {
      if (e.target.closest('[data-scroll-top]')) {
        e.preventDefault();
        setActiveId('home');
        isScrollingRef.current = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        history.pushState(null, '', ' ');
      }
    };
    document.addEventListener('click', handleLogoClick);
    return () => document.removeEventListener('click', handleLogoClick);
  }, []);

  useEffect(() => {
    const sectionElements = sections
      .filter(({ id }) => id !== 'home')
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const updateActive = () => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY + HEADER_OFFSET + 100;

      if (window.scrollY < HEADER_OFFSET) {
        setActiveId('home');
        return;
      }

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        const top = el.getBoundingClientRect().top + window.scrollY;

        if (scrollY >= top) {
          setActiveId(el.id);
          return;
        }
      }
      setActiveId('home');
    };

    const onScroll = () => {
      updateActive();

      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 600);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
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
    isScrollingRef.current = true;
    if (id === 'home') {
      setActiveId('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (updateHash) {
        history.pushState(null, '', '#home');
      }
      setIsOpen(false);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      setActiveId(id);
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      if (updateHash) {
        history.pushState(null, '', `#${id}`);
      }
      setIsOpen(false);
    }
  };

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
              {id === 'home' ? <span className="sticky-nav__logo">D</span> : label}
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
                {id === 'home' ? (
                  <>
                    <span className="header__mobile-logo">D</span> (Обо мне)
                  </>
                ) : label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}