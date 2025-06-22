import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { SessionStrategy } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace this with your own user lookup logic
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          return { id: "1", name: "Demo User", email: "user@example.com" };
        }
        return null;
      }
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
