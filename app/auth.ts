import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;

        return {
          email: email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
