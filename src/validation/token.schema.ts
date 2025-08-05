import { z } from "zod";
export const tokenSchema = z.object({
    id: z.cuid().min(1),
    name: z.string().min(1),
    email: z.email(),
})

export type TokenPayload = z.infer<typeof tokenSchema>;