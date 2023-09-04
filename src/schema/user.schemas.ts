import { z } from "zod";

const userSchema = z.object({
    id: z.number().positive(),
    name: z.string().max(50),
    email: z.string().max(50).email(),
    password: z.string().max(120),
    admin: z.boolean().default(false),
});

const createUserSchema = userSchema.omit({
    id: true,
});

const userWhithoutPassword = userSchema.omit({
    password:true,
});

export { userSchema, createUserSchema, userWhithoutPassword };