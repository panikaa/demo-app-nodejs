import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/employees': 'http://localhost:3000',
      '/system': 'http://localhost:3000',
      '/metrics': 'http://localhost:3000'
    }
  }
})
