// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, '/api')
//       }
//     }
//   }
// })
















import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'https://edusmart-aq07.onrender.com/',
        changeOrigin: true,
        secure: false,
      }
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  }
})