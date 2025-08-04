import { z } from "zod";

export const createInterviewSetSchema = z.object({
  role: z.string().nonempty("Role is required"),
  experience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, { message: "Experience must be at least 0 years" })
    .max(50, { message: "Experience cannot exceed 50 years" }),
  importantTopics: z.string().nonempty("Important topics are required"),
  numberOfQuestions: z.number(),
});

export const updateNoteSchema = z.object({
  note: z.string().min(1, "Note cannot be empty").max(1000, "Note is too long"),
});

export const generateEplanationSchema = z.object({
  question: z.string().nonempty({ message: "Question cannot be empty" }),
});

type GenerateEplanationData = z.infer<typeof generateEplanationSchema>;

export const validateGenerateEplanation = (data: GenerateEplanationData) =>
  generateEplanationSchema.safeParse(data);

const AIQuestionsSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.string(),
  })
);

const AIExplanationSchema = z.object({
  title: z.string(),
  explanation: z.string(),
});

export type CreateInterviewSetData = z.infer<typeof createInterviewSetSchema>;
export type UpdateNoteData = z.infer<typeof updateNoteSchema>;
export type AIQuestionsData = z.infer<typeof AIQuestionsSchema>;
export type AIExplanationData = z.infer<typeof AIExplanationSchema>;

export const validateSession = (data: unknown) =>
  createInterviewSetSchema.safeParse(data);

export const validateNote = (data: unknown) => updateNoteSchema.safeParse(data);

export const validateAIQuestions = (data: unknown) =>
  AIQuestionsSchema.safeParse(data);

export const validateAIExplanation = (data: unknown) =>
  AIExplanationSchema.safeParse(data);
