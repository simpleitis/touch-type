import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export default {
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
} satisfies NextAuthConfig;
