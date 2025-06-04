import { pgTable, text, integer, uuid, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { timestamps } from "./helper";

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    experience: integer("experience").notNull(),
    importantTopics: text("important_topics").notNull(),
    description: text("description"),
    ...timestamps,
  },
  (table) => ({
    uniqueUserRole: unique().on(table.userId, table.role),
  })
);
