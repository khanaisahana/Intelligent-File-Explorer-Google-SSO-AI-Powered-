import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


export default {
  server: {
    port: 5174,
    proxy: {
      "/auth": "http://localhost:8000",
    },
  },
};
