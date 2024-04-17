import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define the base path of the application
  base: '/',
  resolve: {
    alias: {
      '@components': '/src/components',
      '@utils': '/src/utils',
      '@assets': '/src/assets',
      '@store': '/src/store',
      '@pages': '/src/pages',
    },
  },
});
