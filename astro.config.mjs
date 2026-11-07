import { appWorker } from "./cloudflare.config.ts";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1 } from "@emdash-cms/cloudflare";
import { defineConfig, fontProviders } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    auxiliaryWorkers: [{ config: appWorker }],
  }),
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  integrations: [
    react(),
    emdash({
      database: d1({ binding: "DB", session: "auto", coalesce: true }),
      images: false,
    }),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Anton",
      cssVariable: "--font-brutalist",
      weights: [400],
      fallbacks: ["Impact", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-heading",
      weights: [400, 500, 600, 700],
      fallbacks: ["serif"],
    },
  ],
  devToolbar: { enabled: false },
});
