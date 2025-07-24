import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow external connections (Render requires this for production)
    port: 5173, // Default port for local development
    proxy: {
      '/api': {
        target: 'https://mern-burger-app.onrender.com', // Local backend for development
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for src/ directory
      '@nextui-org/react': '@nextui-org/react', // Ensure NextUI imports work
    },
  },
  build: {
    outDir: 'dist', // Ensure output directory is dist/
    sourcemap: false, // Disable sourcemaps for production to reduce bundle size
  },
});