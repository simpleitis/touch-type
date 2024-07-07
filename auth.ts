import NextAuth from "next-auth";

import { prisma } from "./utils/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";

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
  ...authConfig,
  pages: {
    signIn: "/login",
  },
});
