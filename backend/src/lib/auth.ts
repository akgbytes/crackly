import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { user, account, session, verification } from "../db/schema/users";
import { env } from "../configs/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  cookieOptions: {
    sameSite: "None",
    secure: true,
  },
  advanced: {
    cookies: {
      session_token: {
        name: "crackly_session",
      },
    },
  },
  session: {
    cookieCache: { enabled: true, maxAge: 10 * 60 },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [env.CLIENT_URL],
});
