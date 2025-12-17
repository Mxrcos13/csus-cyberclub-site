import { defineCollection, z } from 'astro:content';

const writeups = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum(['web', 'crypto', 'pwn', 'reverse', 'forensics', 'misc']),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    ctf: z.string().optional(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  writeups,
};
