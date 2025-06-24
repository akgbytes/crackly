import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  avatar: text("avatar").default(
    "https://res.cloudinary.com/dmnh10etf/image/upload/v1750270944/default_epnleu.png"
  ),

  ...timestamps,
});

export type User = InferSelectModel<typeof users>;
