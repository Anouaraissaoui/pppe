import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://www.aste.me',
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),
    mdx(),
    svelte()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula'
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [{ protocol: "https" }],
    domains: ['www.aste.me'],
    format: ['avif', 'webp'],
    quality: 80
  }
});