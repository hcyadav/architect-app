import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "./mongodb";
import User from "../models/User";

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
          await connectToDatabase();

          // Use findOneAndUpdate with upsert to atomically create or update
          // This avoids duplicate key errors entirely
          await User.findOneAndUpdate(
            { email },
            {
              $set: {
                name: user.name || (profile as any)?.name || "User",
                image: user.image || (profile as any)?.picture,
              },
              $setOnInsert: {
                email: email,
                role: "user",
              },
            },
            { upsert: true, new: true }
          );

          console.log("DEBUG: User upserted successfully:", email);
          return true;
        } catch (error) {
          // Log the error but DO NOT block sign-in
          // The user can still sign in, they just might not have a DB record yet
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
          await connectToDatabase();
          const dbUser = await User.findOne({ email: token.email });
          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser._id.toString();
          } else {
            token.role = "user";
          }
        } catch (err) {
          console.error("JWT Sync Error:", err);
          // Keep existing token data if DB lookup fails
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
