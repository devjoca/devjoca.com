import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import mdx from '@astrojs/mdx';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
export default defineConfig({
  site: 'https://devjoca.com/', // Use to generate your sitemap and canonical URLs in your final build.å
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'nord',
    },
  },
  integrations: [
    mdx(),
    react(),
    tailwind({}),
    sitemap(),
    robotsTxt(),
    astroImageTools,
  ],
});
