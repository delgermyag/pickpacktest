import { verify } from "argon2";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { loginSchema } from "./validation/auth";

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Email'
                },
                password: {
                    label: 'Password',
                    type: 'text'
                }
            },
            authorize: async(credentials, request) => {
                const creds = await loginSchema.parseAsync(credentials);

                const user = await prisma.user.findUnique({
                    where: { email: creds.email }
                });

                if(await verify(user?.password!, creds.password)) {
                    return {
                        id: user?.id!,
                        email: user?.email!
                    }
                } else {
                    return null;
                }

            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if(user) {
                token.id = user.id;
                token.email = user.email;
            };

            return token;
        },
        session: async ({ session, token }) => {
            if(token) {
                session.id = token.id;
            };

            return session;
        },
        redirect: async ({ url, baseUrl }) => {
            if(url.startsWith("/")) {
                return `${baseUrl}${url}`;
            } else if(url.startsWith("/admin")) {
                return `${baseUrl}/admin`;
            } else if(new URL(url).origin === baseUrl) {
                return url;
            } else {
                return baseUrl;
            };
        },
    },
    secret: process.env.SECRET,
    jwt: {
        maxAge: 24 * 60 * 60
    },
    pages: {
        signIn: '/login',
    },
};