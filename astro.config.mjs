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
  site: config.site.base_url || "http://examplesite.com", // URL base del sitio
  base: config.site.base_path || "/", // Ruta base
  trailingSlash: config.site.trailing_slash ? "always" : "never", // Configuración de slashes
  output: "static", // Cambiado a "static" para evitar funciones serverless

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

  adapter: vercel(), // Simplificado para usar la configuración predeterminada de Vercel
});
