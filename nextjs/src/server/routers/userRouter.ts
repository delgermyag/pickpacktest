import trpc from "@trpc/server";
import { Context } from "../context";
import { signUpSchema } from "@/common/validation/auth";
import { hash } from "argon2";

export const userRouter = trpc.router<Context>().mutation('signup', {
    input: signUpSchema,
    resolve: async ({ input, ctx }) => {
        const { email, username, password } = input;

        const hashedPass = hash(password);

        const result = await ctx.prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPass
            }
        });

        return {
            status: 201,
            message: "User created",
            result: result.username
        };
    },
});

export type ServerRouter = typeof userRouter;