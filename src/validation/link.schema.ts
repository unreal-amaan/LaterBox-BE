import { z } from "zod";

export const createLinkSchema = z.object({
    title: z.string().min(1),
    link: z.url(),
    note: z.string().optional(),
    created_at: z.coerce.date().default(new Date()),
    isPinned: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    categoryId: z.cuid().min(1),
})

export const updateLinkSchema = z.object({
    title: z.string().optional(),
    link: z.url().optional(),
    note: z.string().optional(),
    isPinned: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
})