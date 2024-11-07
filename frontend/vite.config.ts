import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// biome-ignore lint/style/noDefaultExport: https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 8062,
    proxy: {
      '/api': 'https://kaka.intern.dev.nav.no',
    },
  },
});
