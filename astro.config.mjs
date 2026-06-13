// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeFigure from './src/utils/rehype-figure.mjs';

// Page de projet servie sous un domaine custom configuré sur le site
// utilisateur (benji07.github.io) -> URL finale : https://benjamin.leveque.me/food/
export default defineConfig({
  site: 'https://benjamin.leveque.me',
  base: '/food',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // rehypeFigure : légende + lien cliquable pour les illustrations du corps
  // (voir src/utils/rehype-figure.mjs pour la convention markdown).
  markdown: {
    rehypePlugins: [rehypeFigure],
  },
});
