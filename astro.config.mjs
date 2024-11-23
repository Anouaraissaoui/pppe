import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://aste.me',
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    speedInsights: {
      enabled: true,
    },
    imageService: true,
    devImageService: 'sharp',
  }),
  vite: {
    ssr: {
      noExternal: ['astro-icon'],
    },
  },
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://aste.me/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily'
          };
        }
        if (item.url.includes('/blog/')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'weekly'
          };
        }
        if (item.url.includes('/pricing')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'daily'
          };
        }
        return {
          ...item,
          priority: 0.7,
          changefreq: 'weekly'
        };
      },
      filter: (page) => !page.includes('/private/')
    }),
    mdx(),
    svelte()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
});