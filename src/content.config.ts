import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().default(''),
    publishedAt: z.coerce.date().nullish(),
    cover: z.string().nullish(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().default(''),
    cover: z.string().nullish(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdoc}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
  }),
});

export const collections = { posts, services, pages };
