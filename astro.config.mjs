import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://aste.me',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    },
    imageService: true,
    imagesConfig: {
      domains: ['aste.me'],
      sizes: [320, 640, 1280],
      formats: ['webp']
    }
  }),
  integrations: [
    tailwind({
      config: { path: './tailwind.config.mjs' }
    }),
    sitemap(),
    mdx(),
    svelte()
  ]
});