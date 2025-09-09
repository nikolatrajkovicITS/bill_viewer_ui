import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    proxy: {
      '/api/oireachtas': {
        target: 'https://api.oireachtas.ie',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/oireachtas/, ''),
        secure: true
      }
    }
  }
});
