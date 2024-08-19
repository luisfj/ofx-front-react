import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
        idToken?: string
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string
  } 
}