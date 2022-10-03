import trpc from "@trpc/server";
import { userRouter } from "./userRouter";
import { Context } from "../context";

const createRouter = () => {
    return trpc.router<Context>();
};

export const appRouter = createRouter()
    .merge('user', userRouter);

export type AppRouter = typeof appRouter;