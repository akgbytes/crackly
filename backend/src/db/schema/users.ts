import { pgTable, uuid, text } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  avatar: text("avatar").default("https://avatar.iran.liara.run/public/48"),
  ...timestamps,
});
