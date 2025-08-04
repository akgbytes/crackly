import { pgTable, text, integer, uuid, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./users";
import { timestamps } from "./helper";

export const interviewSet = pgTable(
  "interview_set",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    experience: integer("experience").notNull(),
    importantTopics: text("important_topics").notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex("uniqueRolePerUser").on(table.userId, table.role)]
);
