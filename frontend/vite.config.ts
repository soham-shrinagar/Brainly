// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    watch: {
      usePolling: true, // Helpful for WSL/Docker
    },
    hmr: true, // Ensure hot reload is enabled
  },
})
