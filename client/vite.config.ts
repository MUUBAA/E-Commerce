import { defineConfig } from 'vite'
import plugin from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl';
import { fileURLToPath } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin(), basicSsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      "/swagger": {
        target: "https://localhost:5200/",
        secure: false,
        changeOrigin: true,
      },

      "^/auth/.*": {
        target: "https://localhost:5200/",
        secure: false,
        changeOrigin: true,
      },
      "^/users/.*": {
        target: "https://localhost:5200/",
        secure: false,
        changeOrigin: true,
      },
      "^/product/.*": {
        target: "https://localhost:5200/",
        secure: false,
        changeOrigin: true,
      },
      "^/cart/.*": {
        target: "https://localhost:5200/",
        secure: false,
        changeOrigin: true,
      },
    },
    port: 5015
  }
})
