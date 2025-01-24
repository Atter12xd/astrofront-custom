import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: config.site?.base_url || "http://localhost:3000",
  base: config.site?.base_path || "/",
  trailingSlash: config.site?.trailing_slash ? "always" : "never",
  output: "server",

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },

  integrations: [
    react(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },

  adapter: vercel({
    runtime: "nodejs18.x", // Asegúrate de que el entorno de Vercel está configurado para usar Node.js 18.x
  }),
});
