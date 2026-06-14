import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// PAKEISTI į tikrąjį kliento domeną (naudojama sitemap.xml ir canonical nuorodoms)
export default defineConfig({
  site: 'https://PAKEISTI-domenas.lt',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
