import { z } from "zod";

export const createCategorySchema = z.object({
    title: z.string().min(1),
    created_at: z.coerce.date().default(new Date()),
    isPinned: z.boolean().default(false),
    isPublic: z.boolean().default(true),
}) 

export const updateCategorySchema = z.object({
    title: z.string().min(1).optional(),
    isPinned: z.boolean().optional(),
    isPublic: z.boolean().optional(),
})