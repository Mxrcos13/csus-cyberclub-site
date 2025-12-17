// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://yourusername.github.io',
  // Remove base if deploying to root or custom domain
  // base: '/cyberclub-site',
  vite: {
    plugins: [tailwindcss()]
  }
});