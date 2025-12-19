import { z } from 'zod'

export const registerPostRequstBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3),
})

export const loginPostRequstBodySchema = z.object({
    email: z.string(),
    password: z.string(),
})