import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind(), react()],
  image: {
    remotePatterns: [{ protocol: "https" }],
    domains: ["img.pokemondb.net"],
  }
});