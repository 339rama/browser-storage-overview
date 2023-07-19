import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  plugins: [react()],
  css: {preprocessorOptions: {
    scss: {
      uniqueId: false,
    }
  }}
})
