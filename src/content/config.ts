import { defineCollection, z } from 'astro:content';

const legals = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  legals,
};
