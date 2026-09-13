import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFileSync, existsSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'copy-static',
      closeBundle() {
        const files = ['index_1.html', 'IMG_0033.jpeg']
        files.forEach((f) => {
          if (existsSync(f)) {
            copyFileSync(f, `dist/${f}`)
          }
        })
      },
    },
  ],
})