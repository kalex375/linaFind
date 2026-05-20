import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

const base = process.env.GITHUB_PAGES === 'true' ? '/linaFind/' : '/';

export default defineConfig({
  base,
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
        start_url: base,
        icons: [
          {
            src: `${base}pwa-icon.svg`,
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,mp3,ogg,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        navigateFallback: `${base}index.html`,
      },
    }),
  ],
});
