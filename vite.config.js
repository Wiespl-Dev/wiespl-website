import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Two builds:
//   npm run build        → for wiespl.com on HostGator (site at "/", contact form uses send-mail.php)
//   npm run build:pages  → for the GitHub Pages preview at https://wiespl-dev.github.io/wiespl-website/
export default defineConfig(({ command, mode }) => ({
  base: command === 'build' && mode === 'pages' ? '/wiespl-website/' : '/',
  plugins: [react()],
  build: {
    // three.js is ~900 kB but loaded lazily only when a 3D scene is on screen.
    chunkSizeWarningLimit: 1000,
  },
}));
