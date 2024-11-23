import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://aste.me',
  output: 'server',
  adapter: vercel(),
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'daily',
      priority: 0.9,
      lastmod: new Date(),
      serialize(item) {
        // Customize URLs priority based on their path
        if (item.url === 'https://aste.me/') {
          // Homepage gets highest priority
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily'
          };
        }
        if (item.url.includes('/blog/')) {
          // Blog posts get medium-high priority
          return {
            ...item,
            priority: 0.8,
            changefreq: 'weekly'
          };
        }
        if (item.url.includes('/pricing')) {
          // Pricing page gets high priority
          return {
            ...item,
            priority: 0.9,
            changefreq: 'daily'
          };
        }
        // Default values for other pages
        return {
          ...item,
          priority: 0.7,
          changefreq: 'weekly'
        };
      },
      filter: (page) => {
        // Exclude certain pages from sitemap
        const excludePatterns = [
          '/404',           // Error pages
          '/thank-you',     // Thank you pages
          '/admin',         // Admin pages
          '/api/',         // API endpoints
          '/draft/'        // Draft posts
        ];
        return !excludePatterns.some(pattern => page.includes(pattern));
      }
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