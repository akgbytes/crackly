import { sessions } from "./../db/schema/sessions";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { ResponseStatus } from "../utils/constants";
import { handleZodError } from "../utils/handleZodError";
import {
  validateGenerateEplanation,
  validateNote,
  validateSession,
} from "../validations/sessions.validation";
import { CustomError } from "../utils/CustomError";
import { questions } from "../db/schema/questions";
import {
  generateAIQuestions,
  generateConceptExplanation,
} from "../utils/openai";

export const generateCompleteSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    role,
    experience,
    importantTopics,
    description,
    numberOfQuestions = 10,
  } = handleZodError(validateSession(req.body));

  const generatedQuestions = await generateAIQuestions({
    role,
    experience,
    importantTopics,
    numberOfQuestions,
  });

  try {
    const result = await db.transaction(async (tx) => {
      const [session] = await tx
        .insert(sessions)
        .values({
          userId,
          role,
          experience,
          importantTopics,
          description,
        })
        .returning();

      if (!session) {
        throw new CustomError(
          ResponseStatus.InternalServerError,
          "Failed to create session"
        );
      }

      const questionData = generatedQuestions.map(({ question, answer }) => ({
        sessionId: session.id,
        userId,
        question,
        answer,
      }));

      const insertedQuestions = await tx
        .insert(questions)
        .values(questionData)
        .returning();

      return {
        session,
        questions: insertedQuestions,
      };
    });

    res
      .status(ResponseStatus.Created)
      .json(
        new ApiResponse(
          ResponseStatus.Created,
          "Session and questions created",
          result
        )
      );
  } catch (error) {
    console.error("Error in generateCompleteSession:", error);
    throw new CustomError(
      ResponseStatus.InternalServerError,
      "Failed to create session and questions"
    );
  }
});

export const deleteSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { id } = req.user;

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (!session) {
    throw new CustomError(ResponseStatus.NotFound, "Session not found");
  }

  if (session.userId !== id) {
    throw new CustomError(
      ResponseStatus.Unauthorized,
      "Not authorized to delete this session"
    );
  }

  // await db.delete(questions).where(eq(questions.sessionId, sessionId));

  await db.delete(sessions).where(eq(sessions.id, sessionId));

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Session deleted successfully",
        null
      )
    );
});

export const getSessionsWithQuestionCount = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const sessionsData = await db
    .select({
      id: sessions.id,
      role: sessions.role,
      importantTopics: sessions.importantTopics,
      experience: sessions.experience,
      description: sessions.description,
      lastUpdated: sessions.updatedAt,
      questionCount: db.$count(questions, eq(questions.sessionId, sessions.id)),
    })
    .from(sessions)
    .where(eq(sessions.userId, userId));

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Sessions fetched successfully",
        sessionsData
      )
    );
});

export const getQuestionsBySessionId = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const sessionId = req.params.sessionId;

  const [session] = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.id, sessionId), eq(sessions.userId, userId)));

  if (!session) {
    throw new CustomError(
      ResponseStatus.NotFound,
      "Invalid session ID or not authorized"
    );
  }

  const sessionQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.sessionId, sessionId))
    .orderBy(desc(questions.isPinned), asc(questions.createdAt));

  res.status(ResponseStatus.Success).json(
    new ApiResponse(ResponseStatus.Success, "Questions fetched successfully", {
      session,
      sessionQuestions,
    })
  );
});

export const generateAIExplanation = asyncHandler(async (req, res) => {
  const { question } = handleZodError(validateGenerateEplanation(req.body));

  const result = generateConceptExplanation(question);

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Explanation generated successfully",
        result
      )
    );
});

export const togglePinQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const [question] = await db
    .select()
    .from(questions)
    .where(eq(questions.id, questionId));

  if (!question || question.userId !== req.user.id) {
    throw new CustomError(ResponseStatus.NotFound, "Question not found");
  }

  await db
    .update(questions)
    .set({ isPinned: !question.isPinned })
    .where(eq(questions.id, questionId));

  res.status(ResponseStatus.Success).json(
    new ApiResponse(ResponseStatus.Success, "Pin status toggled successfully", {
      isPinned: !question.isPinned,
    })
  );
});

export const updateQuestionNote = asyncHandler(async (req, res) => {
  const { note } = handleZodError(validateNote(req.body));
  const { questionId } = req.params;

  const [question] = await db
    .select()
    .from(questions)
    .where(eq(questions.id, questionId));

  if (!question || question.userId !== req.user.id) {
    throw new CustomError(ResponseStatus.NotFound, "Question not found");
  }

  await db.update(questions).set({ note }).where(eq(questions.id, questionId));

  res.status(ResponseStatus.Success).json(
    new ApiResponse(ResponseStatus.Success, "Note updated successfully", {
      note,
    })
  );
});
