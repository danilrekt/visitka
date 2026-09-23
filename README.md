# Данил — сайт-визитка

React + Vite. Запуск:

```bash
npm install
npm run dev
```

Продакшен-сборка:

```bash
npm run build
npm run preview
```

## Структура

- `src/App.jsx` — сборка секций
- `src/components/Hero.jsx` + `HeroVisual.jsx` — главный экран и canvas-визуал (процедурная wireframe-скульптура, реагирует на курсор)
- `src/components/Stats.jsx` — блок с показателями
- `src/components/About.jsx` — editorial-секция "обо мне"
- `src/components/Services.jsx` — список направлений с hover
- `src/components/Stack.jsx` — marquee со стеком технологий
- `src/components/Projects.jsx` — асимметричная сетка проектов
- `src/components/Flow.jsx` — процесс работы (5 шагов)
- `src/components/Contact.jsx` — финальный экран

## Что стоит доделать перед публикацией

1. Заменить плейсхолдеры проектов (`src/components/Projects.jsx`) на реальные кейсы и подключить настоящие изображения вместо тёмных плашек-заглушек.
2. Указать реальные ссылки на Telegram / GitHub / LinkedIn и почту в `src/components/Contact.jsx`.
3. При желании — заменить `Archivo Expanded` на другой выразительный display-шрифт (условия лицензии Google Fonts позволяют коммерческое использование, но проверь начертания под кириллицу — не все display-гарнитуры одинаково хорошо рисуют русские буквы).
4. Прогнать Lighthouse / проверить на реальных устройствах 375–430px.

## Дизайн-система

- Цвета: `--ink #0a0a0a`, `--paper #faf9f6`, `--acid #c8ff3e`, `--grey #6f6f6b`
- Шрифты: Archivo Expanded (display) + Inter (текст)
- Один акцент — кислотный лайм, используется точечно (CTA, подсветка слова, разделители)
