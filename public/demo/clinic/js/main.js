(() => {
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------- Появление при прокрутке ----------
     Элементы одной группы появляются по очереди с небольшой задержкой */
  if (!reduced) {
    const groups = [
      ...document.querySelectorAll('.block__head'),               // номер, заголовок, описание
      ...document.querySelectorAll('.stats, .grid, .prices, .contacts')
    ];
    const rio = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      rio.unobserve(en.target);
    }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });

    groups.forEach(g => {
      const items = g.matches('.stats') ? [g] : [...g.children];
      items.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--d', Math.min(i, 6) * .09 + 's');
        rio.observe(el);
      });
    });
  }

  /* ---------- Инфографика: кольцо прорисовывается, цифры отсчитываются ---------- */
  const stats = document.querySelector('.stats');
  if (stats && !reduced) {
    const nums = [...stats.querySelectorAll('[data-count]')];
    nums.forEach(n => (n.textContent = '0'));
    new IntersectionObserver(([en], obs) => {
      if (!en.isIntersecting) return;
      obs.disconnect();
      stats.classList.add('is-in');
      const t0 = performance.now(), dur = 2000;
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        nums.forEach(n => (n.textContent = Math.round(+n.dataset.count * e).toLocaleString('ru-RU')));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: .35 }).observe(stats);
  } else if (stats) {
    stats.classList.add('is-in');
  }

  /* ---------- Мобильное меню ---------- */
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  let onMenuChange = () => {}; // слайдер подписывается ниже, чтобы вставать на паузу
  const setMenu = open => {
    body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-hidden', String(!open));
    onMenuChange();
  };
  burger.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Прокрутка к блоку: его верхняя линия встаёт ровно под шапку ----------
     Высота шапки берётся в «прокрученном» виде (она сжимается, пока едем):
     отступы 14px (12px на мобилке) сверху и снизу + высота логотипа */
  const scrolledHeaderH = () => {
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    return (mobile ? 46 + 12 * 2 : 46 + 14 * 2);
  };
  const scrollToBlock = (el, smooth = true) => {
    const edge = el.querySelector('.block__head') || el; // линия-разделитель над заголовком блока
    const top = el.id === 'top' ? 0 : edge.getBoundingClientRect().top + window.scrollY - scrolledHeaderH();
    window.scrollTo({ top, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  };

  /* ---------- Старт страницы: сверху, либо у блока из ссылки вида index.html#contacts ---------- */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const hashTarget = location.hash.length > 1 ? document.querySelector(location.hash) : null;
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
  window.scrollTo(0, 0);
  if (hashTarget) addEventListener('load', () => scrollToBlock(hashTarget));

  /* ---------- Якоря: плавно и без # в адресе; «#» — заглушки ---------- */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault();
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) scrollToBlock(el);
  });

  /* ---------- Хедер: плашка, когда ушли со слайдера ----------
     На страницах без слайдера шапка сразу в режиме плашки (класс в разметке) */
  const header = document.querySelector('.header');
  // Граница — низ фото/видео (на мобилке под ним ещё зона с подписью)
  const heroMedia = document.querySelector('.slider__shade');
  let syncHeader = () => {};
  if (heroMedia) {
    // Шапка становится сплошной, как только её низ доходит до первого текста на слайде
    // (подпись поверх фото, текст слайда-истории) или до низа фото — что раньше
    const visibleTop = el => {
      if (!el || !el.offsetParent) return Infinity;
      return el.getBoundingClientRect().top + window.scrollY;
    };
    const onScroll = () => {
      const edge = Math.min(
        heroMedia.getBoundingClientRect().bottom + window.scrollY,
        visibleTop(document.querySelector('.slider__caps .cap.is-active')),
        visibleTop(document.querySelector('.slide.is-active .story__text'))
      );
      header.classList.toggle('is-scrolled', window.scrollY + header.offsetHeight > edge - 8);
    };
    syncHeader = onScroll;
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Карта в контактах: создаём, когда блок подъезжает к экрану ----------
     Колесо мыши и перетаскивание одним пальцем не перехватываем — страница листается как обычно */
  const mapEl = document.querySelector('.map__canvas');
  if (mapEl && window.L) {
    new IntersectionObserver(([en], obs) => {
      if (!en.isIntersecting) return;
      obs.disconnect();
      const ll = [+mapEl.dataset.lat, +mapEl.dataset.lng];
      const map = L.map(mapEl, { scrollWheelZoom: false, dragging: !L.Browser.mobile, zoomControl: false }).setView(ll, 16);
      L.control.zoom({ position: 'topright' }).addTo(map);
      map.attributionControl.setPrefix(false);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
      }).addTo(map);
      L.marker(ll, { icon: L.divIcon({ className: 'map__pin', html: '<span></span>', iconSize: [18, 18] }), keyboard: false }).addTo(map);
    }, { rootMargin: '300px 0px' }).observe(mapEl);
  }

  /* ---------- Слайдер (есть только на главной) ---------- */
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const slides = [...slider.querySelectorAll('.slide')];
  const bars = [...slider.querySelectorAll('.bar')];
  const caps = [...slider.querySelectorAll('.cap')];
  const fills = bars.map(bar => bar.querySelector('b'));
  const SWAP = reduced ? 0 : 1400; // = --swap в CSS
  let index = 0, lockUntil = 0, leaveTimer, themeTimer;
  const durOf = i => +slides[i].dataset.dur || 7000;

  const playMedia = i => slides.forEach((s, k) => {
    const v = s.querySelector('video');
    if (!v) return;
    if (k === i) {
      if (v.preload === 'none') v.preload = 'auto';
      v.loop = true;
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      // Уходящее видео не перематываем на начало посреди растворения —
      // без повтора оно просто замрёт на последнем кадре
      v.loop = false;
      setTimeout(() => { if (k !== index) v.pause(); }, SWAP);
    }
  });

  // Неактивные слайды недоступны для клика и Tab
  const setInert = i => slides.forEach((s, k) => { s.inert = k !== i; });

  // Светлый слайд — тёмные шапка, полоски и стрелки
  const setTheme = i => {
    const light = slides[i].dataset.theme === 'light';
    slider.classList.toggle('is-light', light);
    body.classList.toggle('hero-light', light);
    caps.forEach((c, k) => c.classList.toggle('is-active', k === i));
    syncHeader(); // у слайдов текст на разной высоте — граница для шапки меняется
  };

  /* Прогресс и автопереключение ведёт один таймер на requestAnimationFrame:
     полоска рисуется из того же счётчика, по которому листается слайд,
     поэтому они не могут разойтись и «зависнуть». В скрытой вкладке rAF
     не вызывается — это и есть пауза. */
  let elapsed = 0, last = performance.now(), paused = false;
  const setBars = i => bars.forEach((bar, k) => {
    bar.classList.toggle('is-active', k === i);
    bar.setAttribute('aria-selected', String(k === i));
    fills[k].style.transform = `scaleX(${k < i ? 1 : 0})`;
  });
  const tick = now => {
    const dt = Math.min(now - last, 100); // после сна вкладки не «перепрыгиваем» вперёд
    last = now;
    if (!paused && !reduced) elapsed += dt;
    const p = reduced ? 1 : Math.min(elapsed / durOf(index), 1);
    fills[index].style.transform = `scaleX(${p})`;
    if (p >= 1 && !reduced) go(index + 1, 1, true);
    requestAnimationFrame(tick);
  };

  function go(next, dir, auto = false) {
    next = (next + slides.length) % slides.length;
    if (next === index) return;
    if (!auto && performance.now() < lockUntil) return;
    lockUntil = performance.now() + 350; // короткая защита от двойного срабатывания
    elapsed = 0;
    const prev = slides[index], incoming = slides[next];

    // Старый остаётся под низом, новый проявляется поверх
    slides.forEach(s => s !== prev && s.classList.remove('is-leaving'));
    prev.classList.remove('is-active');
    prev.classList.add('is-leaving');
    incoming.classList.add('is-active');

    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => prev.classList.remove('is-leaving'), SWAP);

    index = next;
    setInert(index);
    // Старая подпись гаснет сразу, чтобы не висеть поверх нового кадра; новая появится в setTheme
    caps.forEach(c => c.classList.remove('is-active'));
    // Цвет шапки и полосок меняем в середине растворения, а не в начале
    clearTimeout(themeTimer);
    themeTimer = setTimeout(() => setTheme(index), SWAP * .45);
    setBars(index);
    playMedia(index);
  }

  // На сенсорных экранах переключаем в момент касания, не дожидаясь click;
  // click остаётся для мыши и клавиатуры (повторный вызов go() с тем же слайдом ничего не делает)
  bars.forEach((bar, i) => {
    bar.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') go(i); });
    bar.addEventListener('click', () => go(i));
  });
  slider.querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => go(index + +b.dataset.dir, +b.dataset.dir)));

  // Клавиатура
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(index + 1, 1);
    if (e.key === 'ArrowLeft') go(index - 1, -1);
  });

  // Свайп
  let startX = null, startY = 0;
  slider.addEventListener('pointerdown', e => { startX = e.clientX; startY = e.clientY; });
  slider.addEventListener('pointercancel', () => { startX = null; }); // прокрутка пальцем
  slider.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
  });

  // Пауза, когда вкладка скрыта, открыто меню или слайдер ушёл с экрана
  let inView = true;
  // (меню закрывается и кнопкой, и ссылкой, и Escape — все пути идут через setMenu)
  const syncPause = () => {
    paused = document.hidden || !inView || body.classList.contains('menu-open');
    const v = slides[index].querySelector('video');
    if (v) paused ? v.pause() : v.play().catch(() => {});
  };
  onMenuChange = syncPause;
  document.addEventListener('visibilitychange', syncPause);
  new IntersectionObserver(([en]) => { inView = en.isIntersecting; syncPause(); }, { threshold: .2 }).observe(slider);

  // Старт
  setInert(0);
  setTheme(0);
  setBars(0);
  playMedia(0);
  requestAnimationFrame(now => { last = now; tick(now); });
})();
