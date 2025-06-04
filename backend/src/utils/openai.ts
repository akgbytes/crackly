import { OpenAI } from "openai";
import { env } from "../configs/env";
import {
  generateConceptExplanationPrompt,
  generateInterviewQuestionsPrompt,
} from "./prompts";
import { cleanJson } from "./cleanJson";
import { CustomError } from "./CustomError";
import { ResponseStatus } from "./constants";
import { handleZodError } from "./handleZodError";
import {
  validateAIExplanation,
  validateAIQuestions,
} from "../validations/sessions.validation";

export const openai = new OpenAI({
  apiKey: env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

interface GenerateAIQuestionsParams {
  role: string;
  experience: number;
  importantTopics: string;
  numberOfQuestions: number;
}

export const generateAIQuestions = async (data: GenerateAIQuestionsParams) => {
  const prompt = generateInterviewQuestionsPrompt(
    data.role,
    data.experience,
    data.importantTopics,
    data.numberOfQuestions
  );

  const rawText = await getAIResponse(prompt);

  try {
    const cleaned = cleanJson(rawText);
    const parsed = JSON.parse(cleaned);
    return handleZodError(validateAIQuestions(parsed));
  } catch (err) {
    throw new CustomError(
      ResponseStatus.InternalServerError,
      "Failed to parse or validate AI response. Please try again."
    );
  }
};

export const generateConceptExplanation = async (question: string) => {
  const prompt = generateConceptExplanationPrompt(question);

  const rawText = await getAIResponse(prompt);

  try {
    const cleaned = cleanJson(rawText);
    const parsed = JSON.parse(cleaned);
    return handleZodError(validateAIExplanation(parsed));
  } catch (err) {
    throw new CustomError(
      ResponseStatus.InternalServerError,
      "Failed to parse or validate AI response. Please try again."
    );
  }
};

export const getAIResponse = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gemini-2.5-flash-preview-04-17",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "";
};
