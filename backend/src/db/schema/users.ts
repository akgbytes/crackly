import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),

  avatar: text("avatar").default("https://avatar.iran.liara.run/public/48"),

  isVerified: boolean("is_verified").default(false),

  verificationToken: text("verification_token"),
  verificationTokenExpiry: timestamp("verification_token_expiry"),

  resetPasswordToken: text("reset_password_token"),
  resetPasswordExpiry: timestamp("reset_password_expiry"),

  refreshToken: text("refresh_token"),

  ...timestamps,
});

export type User = InferSelectModel<typeof users>;
