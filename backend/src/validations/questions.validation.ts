import { z } from "zod";

export const createQuestionsSchema = z.object({
  sessionId: z.string().uuid("Invalid session ID"),
  questions: z
    .array(
      z.object({
        question: z.string().nonempty("Question is required"),
        answer: z.string().nonempty("Answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

export const updateNoteSchema = z.object({
  note: z.string().min(1, "Note cannot be empty").max(1000, "Note is too long"),
});

export type UpdateNoteData = z.infer<typeof updateNoteSchema>;

export type CreateQuestionsData = z.infer<typeof createQuestionsSchema>;

export const validateQuestions = (data: CreateQuestionsData) =>
  createQuestionsSchema.safeParse(data);

export const validateNote = (data: UpdateNoteData) =>
  updateNoteSchema.safeParse(data);
