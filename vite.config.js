import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      // second page: the privacy policy, linked from the footer
      input: {
        main: 'index.html',
        privacy: 'privacy.html',
      },
    },
  },
})
