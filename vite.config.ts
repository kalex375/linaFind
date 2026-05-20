import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/**/*.svg', 'assets/**/*.png', 'assets/**/*.jpg', 'assets/**/*.mp3', 'assets/**/*.ogg'],
      manifest: {
        name: 'Lina Find',
        short_name: 'LinaFind',
        description: 'Offline find-the-object game for children.',
        theme_color: '#f8c94a',
        background_color: '#fff8df',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/',
        icons: [
          {
            src: '/pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,mp3,ogg,woff2}'],
        navigateFallback: '/index.html',
      },
    }),
  ],
});
