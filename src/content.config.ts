import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Edited through Sveltia CMS (/admin) → "প্রজেক্ট". Field names must match public/admin/config.yml.
const projects = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    name_en: z.string().optional().default(""),
    order: z.number().default(99),
    status: z.enum(["upcoming", "booking", "ongoing", "ready"]),
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
    floors: z.number().optional(),
    location: z.string(),
    map_query: z.string().optional().default(""),
    bedrooms: z.string().optional().default(""),
    installment: z.string().optional().default(""),
    down_payment: z.string().optional().default(""),
    monthly: z.string().optional().default(""),
    ready_price: z.string().optional().default(""),
    tagline: z.string(),
    cover: z.string(),
    gallery: z.array(z.object({ image: z.string(), caption: z.string().optional().default("") })).default([]),
    floor_plans: z
      .array(
        z.object({
          size: z.number(),
          label: z.string().optional().default(""),
          beds: z.string().optional().default(""),
          baths: z.string().optional().default(""),
          rooms: z.string().optional().default(""),
          image: z.string(),
        }),
      )
      .default([]),
    features: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
