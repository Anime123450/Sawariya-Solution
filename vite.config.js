import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
      '@components': path.resolve(__dirname, "./src/components")
    }
  },
  optimizeDeps: {
    requirePlugins: ['react', 'react-dom', 'react-router-dom', '@reduxjs/toolkit']
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    hot: !process.env.NODE_ENV || process.env.NODE_ENV !== 'production'
  },
  css: {
    devSourcemap: true,
    modules: {
      auto: true,
      localesPath: false
    }
  }
});
