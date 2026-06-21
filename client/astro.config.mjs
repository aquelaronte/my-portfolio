// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Bebas Neue",
      cssVariable: "--font-bebas-neue",
    },
    {
      provider: fontProviders.google(),
      name: "Space Mono",
      cssVariable: "--font-space-mono",
    },
  ],

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    plugins: [tailwindcss()]
  },

  output: "server",
  adapter: cloudflare(),
});
