/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/usermanagement',

  server: {
    port: 3004,
    host: 'localhost',
  },

  preview: {
    port: 3004,
    host: 'localhost',
  },
  define: {
    'process.env': {
      REACT_APP_API_SERVER: 'http://64.227.147.2:8000/',
      HRMS: 'http://localhost:3000/',
      INVENTORY: 'http://localhost:3001/',
      ACCOUNTS: 'http://localhost:3002/',
      OPERATIONS: 'http://localhost:3003/',

    },
  },
  plugins: [react(), svgr(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
