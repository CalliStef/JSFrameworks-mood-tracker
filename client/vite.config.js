import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
          target: "http://localhost:8080"
      } // any request starts with /api will be forwarded to the express server
    }
  },
  plugins: [react()]
})
