import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { timestamps } from "./helper";
import { user } from "./users";
import { interviewSetTable } from "./interviewSet";

export const questionsTable = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  interviewSetId: uuid("interview_set_id").references(
    () => interviewSetTable.id,
    {
      onDelete: "cascade",
    }
  ),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  note: text("note"),
  isPinned: boolean("is_pinned").default(false),

  ...timestamps,
});
