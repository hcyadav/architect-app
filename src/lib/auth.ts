import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("DEBUG: Sign-In Attempt", {
        email: user.email,
        provider: account?.provider,
      });

      if (account?.provider === "google") {
        const email = user.email || (profile as any)?.email;

        if (!email) {
          console.error("DEBUG: No email found in Google profile");
          return false;
        }

        try {
          // Use upsert to atomically create or update
          await prisma.user.upsert({
            where: { email },
            update: {
              name: user.name || (profile as any)?.name || "User",
              image: user.image || (profile as any)?.picture,
            },
            create: {
              email,
              name: user.name || (profile as any)?.name || "User",
              image: user.image || (profile as any)?.picture,
              role: "user",
            },
          });

          console.log("DEBUG: User upserted successfully:", email);
          return true;
        } catch (error) {
          console.error("DEBUG: DB Error during signIn (non-blocking):", error);
          return true;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Always refresh role from DB on every token refresh
      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
          } else {
            token.role = "user";
          }
        } catch (err) {
          console.error("JWT Sync Error:", err);
          if (!token.role) {
            token.role = "user";
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
