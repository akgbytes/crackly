import { handleZodError } from "./../utils/handleZodError";
import asyncHandler from "../utils/asyncHandler";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import {
  generateInterviewQuestionsPrompt,
  generateConceptExplanationPrompt,
} from "../utils/prompts";
import { getAIResponse } from "../utils/openai";
import { cleanJson } from "../utils/cleanJson";
import { ApiResponse } from "../utils/ApiResponse";
import {
  validateConceptExplanation,
  validateInterviewQuestion,
} from "../validations/ai.validation";

export const generateAIQuestions = asyncHandler(async (req, res) => {
  const { role, experience, importantTopics, numberOfQuestions } =
    handleZodError(validateInterviewQuestion(req.body));

  const prompt = generateInterviewQuestionsPrompt(
    role,
    experience,
    importantTopics,
    numberOfQuestions
  );

  const rawText = await getAIResponse(prompt);

  try {
    const cleaned = cleanJson(rawText);
    const data = JSON.parse(cleaned);
    res
      .status(ResponseStatus.Success)
      .json(
        new ApiResponse(
          ResponseStatus.Success,
          "Interview questions generated successfully",
          data
        )
      );
  } catch (err) {
    throw new CustomError(
      ResponseStatus.InternalServerError,
      "Failed to parse AI response. Please try again."
    );
  }
});

export const generateAIConceptExplanation = asyncHandler(async (req, res) => {
  const { question } = handleZodError(validateConceptExplanation(req.body));

  const prompt = generateConceptExplanationPrompt(question);

  const rawText = await getAIResponse(prompt);

  try {
    const cleaned = cleanJson(rawText);
    const data = JSON.parse(cleaned);
    res
      .status(ResponseStatus.Success)
      .json(
        new ApiResponse(
          ResponseStatus.Success,
          "Explanation generated successfully",
          data
        )
      );
  } catch (err) {
    throw new CustomError(
      ResponseStatus.InternalServerError,
      "Failed to parse AI response. Please try again."
    );
  }
});
