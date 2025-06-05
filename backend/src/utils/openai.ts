import { OpenAI } from "openai";
import { env } from "../configs/env";
import {
  generateConceptExplanationPrompt,
  generateInterviewQuestionsPrompt,
  generateMoreQuestionsPrompt,
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

export const getAIResponse = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: "gemini-2.5-flash-preview-04-17",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "";
};

interface GenerateAIQuestionsParams {
  role: string;
  experience: number;
  importantTopics: string;
  numberOfQuestions: number;
}

interface GenerateMoreAIQuestionsParams {
  role: string;
  experience: number;
  importantTopics: string;
  numberOfQuestions: number;
  questions: string[];
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

export const generateMoreAIQuestions = async (
  data: GenerateMoreAIQuestionsParams
) => {
  const formattedQuestions = data.questions
    .map((ques, index) => `Q${index + 1}. ${ques}`)
    .join("\n");

  console.log("formattedQUs", formattedQuestions);

  const prompt = generateMoreQuestionsPrompt(
    data.role,
    data.experience,
    data.importantTopics,
    data.numberOfQuestions,
    formattedQuestions
  );

  console.log("prompt generated: ", prompt);

  const rawText = await getAIResponse(prompt);

  console.log("response from ai: ", rawText);

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
