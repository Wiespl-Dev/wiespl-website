import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js is ~900 kB but loaded lazily only when a 3D scene is on screen.
    chunkSizeWarningLimit: 1000,
  },
});
