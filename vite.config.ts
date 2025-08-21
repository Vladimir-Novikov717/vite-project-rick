import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; //  Импортируем модуль path

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') //  Указывает, что @ = папка src
    }
  }
});