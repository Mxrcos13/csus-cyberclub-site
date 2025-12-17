// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://Mxrcos13.github.io',
  base: '/csus-cyberclub-site',
  vite: {
    plugins: [tailwindcss()]
  }
});