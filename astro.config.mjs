import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aranzaisea.netlify.app',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-AR' } },
      filter: (p) => !p.includes('/404'),
    }),
  ],
  image: { responsiveStyles: false },
});
