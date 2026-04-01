import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? 'https://cdn.nav.no/klage/kaka/' : '/',
  plugins: [tsconfigPaths(), react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.VERSION ?? 'local'),
  },
  server: {
    port: 8062,
    proxy: {
      '/api': 'https://kaka.intern.dev.nav.no',
    },
  },
}));
