// @ts-ignore
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://LJS360d.github.io',
  // base: '/rh-docs/',

  vite: {
    plugins: [
      tailwindcss(),
      Icons({ compiler: 'solid', autoInstall: true }),
    ],
  },

  // Solid is a build-time renderer only: nothing uses a `client:*` directive,
  // so no framework runtime ships.
  integrations: [solidJs()],
});
