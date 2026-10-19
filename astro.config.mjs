import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    react(),
    markdoc(),
    // Admin UI and API routes need a server; keep them out of static builds.
    process.env.NODE_ENV === 'development' && keystatic(),
  ],
});
