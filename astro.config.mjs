// @ts-ignore
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';
import solidJs from '@astrojs/solid-js';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://LJS360d.github.io',
  // base: '/rh-docs/',
  image: {
    remotePatterns: [{ protocol: 'https' }],
    domains: ['img.pokemondb.net'],
  },

  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'solid',
        autoInstall: true,
        jsx: "preact"
      }),
    ]
  },

  integrations: [solidJs(), icon()]
});