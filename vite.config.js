import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFileSync, existsSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'copy-index-1',
      closeBundle() {
        if (existsSync('index_1.html')) {
          copyFileSync('index_1.html', 'dist/index_1.html')
        }
      },
    },
  ],
})