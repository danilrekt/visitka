// Шрифты раздаются с самого сайта (раньше — Google Fonts): без лишних DNS/TLS до Google,
// который из России часто медленный. Только кириллица и латиница и только нужные начертания.
import '@fontsource/onest/cyrillic-700.css'
import '@fontsource/onest/cyrillic-800.css'
import '@fontsource/onest/cyrillic-900.css'
import '@fontsource/onest/latin-700.css'
import '@fontsource/onest/latin-800.css'
import '@fontsource/onest/latin-900.css'
import '@fontsource/inter/cyrillic-400.css'
import '@fontsource/inter/cyrillic-500.css'
import '@fontsource/inter/cyrillic-600.css'
import '@fontsource/inter/cyrillic-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'

const FONT_WAIT_MS = 1500

// Ждём шрифты первого экрана, прежде чем рисовать страницу: иначе она сначала встаёт
// запасным шрифтом, а потом, когда приходит Onest, заголовки меняют размер и вся вёрстка
// (и кот, чья высота считается от текста) прыгает. Дольше FONT_WAIT_MS не ждём —
// на совсем плохом канале лучше показать запасной шрифт, чем пустую страницу.
export function whenFontsReady() {
  if (!document.fonts?.load) return Promise.resolve()
  const sample = 'АБВ abc'
  return Promise.race([
    Promise.all([
      document.fonts.load(`800 1em Onest`, sample),
      document.fonts.load(`700 1em Onest`, sample),
      // только то, что задаёт размеры первого экрана (они же в preload в index.html);
      // мелкие подписи Inter 600/700 догрузятся без заметного сдвига
      document.fonts.load(`400 1em Inter`, sample),
    ]).catch(() => {}),
    new Promise((r) => setTimeout(r, FONT_WAIT_MS)),
  ])
}
