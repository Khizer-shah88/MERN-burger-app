import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({

  server: {
    host: 'localhost', // Allow external connections
    port:   5173 ,// Default port, adjust if different
    proxy: {
      '/api': {
        target: 'https://mern-burger-app.onrender.com', // Deployed backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if needed
      },
    },
  },
  plugins: [
    react(), 
    tailwindcss()
  ],
  resolve: {  
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@nextui-org/react': '@nextui-org/react',
    },
  },
})