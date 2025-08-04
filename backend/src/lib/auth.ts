import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { user, account, session, verification } from "../db/schema/users";

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
});
