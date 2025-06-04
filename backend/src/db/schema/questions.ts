import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { users } from "./users";
import { sessions } from "./sessions";

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  sessionId: uuid("session_id").references(() => sessions.id, {
    onDelete: "cascade",
  }),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  note: text("note"),
  isPinned: boolean("is_pinned").default(false),

  ...timestamps,
});
