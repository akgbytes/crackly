import { z } from "zod";

export const createSessionSchema = z.object({
  role: z.string().nonempty("Role is required"),
  experience: z
    .number({ invalid_type_error: "Experience must be a number" })
    .min(0, { message: "Experience must be at least 0 years" })
    .max(50, { message: "Experience cannot exceed 50 years" }),
  importantTopics: z.string().nonempty("Important topics are required"),
  description: z.string().optional(),
});

export type CreateSessionData = z.infer<typeof createSessionSchema>;

export const validateSession = (data: CreateSessionData) =>
  createSessionSchema.safeParse(data);
