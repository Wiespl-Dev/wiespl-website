import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// On GitHub Pages the site lives at https://wiespl-dev.github.io/wiespl-website/,
// so production builds use that sub-path. Locally (npm run dev) it stays at "/".
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/wiespl-website/' : '/',
  plugins: [react()],
  build: {
    // three.js is ~900 kB but loaded lazily only when a 3D scene is on screen.
    chunkSizeWarningLimit: 1000,
  },
}));
