import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
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
  ],
  pages: {
    signIn: "/login",
  },
});
