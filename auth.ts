import NextAuth from "next-auth";

import { prisma } from "./utils/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Nodemailer from "next-auth/providers/nodemailer";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        const email = user.email as string;
        const name = user.name as string;

        const registeredUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!registeredUser?.id) {
          try {
            const dbRes = await prisma.user.create({
              data: {
                name: name,
                email: email,
              },
            });

            if (dbRes.id) {
              return true;
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        id: {},
        name: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const id = credentials.id as string;
        const name = credentials.name as string;

        return { email, id, name };
      },
    }),
    GitHub,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
