import {
  checkIfRegistered,
  createUser,
} from "@/app/authHelpers/credentialLogin";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const registeredUser = checkIfRegistered(credentials);

        // If no error and we have user data, return it
        if (!!registeredUser) {
          return registeredUser;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
});

export { handler as GET, handler as POST };
