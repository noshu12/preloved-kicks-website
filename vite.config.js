import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'firebase': ['firebase/app', 'firebase/firestore'],
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'helmet': ['react-helmet-async'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});