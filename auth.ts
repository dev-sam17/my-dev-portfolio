import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Get allowed emails from environment variable
const getAllowedEmails = (): string[] => {
  const allowedEmails = process.env.ALLOWED_EMAILS || "";
  return allowedEmails
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user's email is in the allowed list
      const allowedEmails = getAllowedEmails();

      if (allowedEmails.length === 0) {
        // If no emails are configured, allow all (fallback for development)
        console.warn(
          "No ALLOWED_EMAILS configured. All users will be allowed."
        );
        return true;
      }

      if (user.email && allowedEmails.includes(user.email)) {
        console.log(`Access granted for: ${user.email}`);
        return true;
      }

      console.log(`Access denied for: ${user.email}`);
      return false; // This will redirect to the error page
    },
    async jwt({ token, user }) {
      // Add user info to the token
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      // Return true if user is authenticated
      return !!auth;
    },
  },
});
