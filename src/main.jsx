import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { whenFontsReady } from './fonts.js'
import './index.css'

// При перезагрузке всегда начинаем сверху: без восстановления прокрутки и без прыжка к #якорю из адреса
if (location.hash) history.replaceState(null, '', location.pathname + location.search)
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

// первый кадр — сразу с нужными шрифтами, без перескока вёрстки (см. fonts.js)
whenFontsReady().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
