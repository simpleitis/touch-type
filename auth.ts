import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { prisma } from "./utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          const dbRes = await prisma.user.create({
            data: {
              name: name,
              email: email,
            },
          });
        }
      }
      return true; // Allow sign in
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
  ],
  pages: {
    // signIn: "/login",
  },
});
