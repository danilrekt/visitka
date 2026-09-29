/* Камера первого экрана (postpunk-v2): слайдер из main.js переключает пустые слайды,
   а здесь по активному слайду выбирается «кадр» — куда смотрит камера на снимке статуй.
   Сам проезд между кадрами делает CSS-переход (см. css/postpunk-v2.css) */
(() => {
  const cam = document.querySelector('.cam');
  if (!cam) return;
  const slider = cam.closest('.slider');
  const slides = [...slider.querySelectorAll('.slide')];
  const img = cam.querySelector('.cam__img');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LAST = slides.length - 1;

  // Подсветка направления меняется в тот же момент, что и подпись (~1.2 с после смены кадра,
  // см. .cap.is-active в CSS), — одно событие, а не два вразнобой
  const LIT_DELAY = reduced ? 0 : 1200;
  const RELIGHT = 1300; // чуть дольше самой смены подсветки (1.2 с в CSS)
  const DIM = 700;      // = .cam.is-dim в CSS: уход в затемнение перед возвратом к первому кадру
  let target = 0, litTimer, relightTimer, cutTimer;

  const setLit = i => {
    slider.classList.add('is-relighting');
    slider.dataset.lit = String(i);
    clearTimeout(relightTimer);
    relightTimer = setTimeout(() => slider.classList.remove('is-relighting'), RELIGHT);
  };

  // Сразу поставить камеру в кадр, без проезда
  const jumpTo = i => {
    cam.classList.add('no-move');
    cam.dataset.shot = String(i);
    void cam.offsetWidth; // применить позицию, пока переход выключен
    cam.classList.remove('no-move');
  };

  const sync = () => {
    const i = slides.findIndex(s => s.classList.contains('is-active'));
    // Сравниваем с целевым кадром, а не с data-shot: во время затемнения data-shot ещё старый,
    // а наблюдатель срабатывает и на классы самой камеры
    if (i < 0 || i === target) return;
    const prev = target;
    target = i;
    clearTimeout(cutTimer);

    if (prev === LAST && i === 0 && !reduced) {
      // Цикл: после «него» не едем обратно через весь снимок (выглядит как перемотка),
      // а уходим в затемнение и проявляемся уже на «ней» — история начинается заново
      cam.classList.add('is-dim');
      cutTimer = setTimeout(() => { jumpTo(0); cam.classList.remove('is-dim'); }, DIM);
    } else {
      cam.classList.remove('is-dim');
      cam.dataset.shot = String(i);
    }

    clearTimeout(litTimer);
    litTimer = setTimeout(() => setLit(i), LIT_DELAY);
  };
  new MutationObserver(sync).observe(slider.querySelector('.slider__stage'), {
    subtree: true, attributes: true, attributeFilter: ['class']
  });

  // Снимок проявляется, когда загрузился — без мелькания пустого фона
  const show = () => cam.classList.add('is-ready');
  if (img.complete) show(); else img.addEventListener('load', show, { once: true });
})();
