import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': {
        target: 'http://localhost:5000', // Ваш backend
        changeOrigin: true,
        secure: false, // Отключить проверку SSL, если нужно
      },
    },
  },
})
