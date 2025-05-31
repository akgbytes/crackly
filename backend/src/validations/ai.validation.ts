import { z } from "zod";

export const interviewQuestionSchema = z.object({
  role: z.string().nonempty({ message: "Role cannot be empty" }),
  experience: z
    .number({ invalid_type_error: "Experience field must be a number" })
    .min(0, { message: "Experience must be at least 0 years" })
    .max(50, { message: "Experience cannot exceed 50 years" }),

  importantTopics: z
    .string()
    .nonempty({ message: "Important topics cannot be empty" }),
  numberOfQuestions: z
    .number({ invalid_type_error: "Number of questions must be a number" })
    .min(1, { message: "At least 1 question is required" })
    .max(25, { message: "Maximum 25 questions allowed" }),
});

export const conceptExplanationSchema = z.object({
  question: z.string().nonempty({ message: "Question cannot be empty" }),
});

type InterviewQuestionData = z.infer<typeof interviewQuestionSchema>;
type ConceptExplanationData = z.infer<typeof conceptExplanationSchema>;

export const validateInterviewQuestion = (data: InterviewQuestionData) =>
  interviewQuestionSchema.safeParse(data);

export const validateConceptExplanation = (data: ConceptExplanationData) =>
  conceptExplanationSchema.safeParse(data);
