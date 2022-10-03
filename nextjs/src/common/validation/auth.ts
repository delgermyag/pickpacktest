import z from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(8),
    password: z.string().max(255)
});

export const signUpSchema = loginSchema.extend({
    username: z.string().max(255)
});

export type ULogin = z.infer<typeof loginSchema>;
export type USignUp = z.infer<typeof signUpSchema>;