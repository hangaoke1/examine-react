import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    assetsDir: '',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [reactRefresh()],
});
