// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Caveat",
      cssVariable: "--font-caveat",
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});