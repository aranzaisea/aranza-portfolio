import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cases = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cases' }),
  schema: z.object({
    case: z.string(),
    lang: z.enum(['en', 'es']),
    titleA: z.string(),
    titleB: z.string(),
    lead: z.string(),
    statusNote: z.string().optional(),
    summary: z.object({ problem: z.string(), role: z.string(), team: z.string(), client: z.string(), timeline: z.string() }),
    metrics: z.array(z.object({ v: z.string(), l: z.string(), note: z.string().optional() })).default([]),
    legend: z.boolean().default(true),
    footnote: z.string().optional(),
  }),
});

export const collections = { cases };
