import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "./helper";

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  role: text("role").notNull(),
  experience: text("experience").notNull(),
  importantTopics: text("important_topics").notNull(),
  ...timestamps,
});
