import { sessions } from "./../db/schema/sessions";
import { and, asc, count, desc, eq } from "drizzle-orm";
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
  generateMoreAIQuestions,
} from "../utils/openai";

export const generateCompleteSession = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const {
    role,
    experience,
    importantTopics,
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

export const generateMoreQuestions = asyncHandler(async (req, res) => {
  console.log("questions received: ", req.body);
  console.log("session received: ", req.params);
  const userId = req.user.id;
  const { sessionId } = req.params;
  const { questions: questionList } = req.body;
  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (!session) {
    // throw error
  }

  // counting no of question, if already 30 then return
  const [existingQuestions] = await db
    .select({ count: count() })
    .from(questions)
    .where(eq(questions.sessionId, sessionId));

  if (existingQuestions.count >= 30) {
    return res
      .status(ResponseStatus.TooManyRequests)
      .json(
        new ApiResponse(
          ResponseStatus.TooManyRequests,
          "Question limit reached. You can't generate more than 30 questions per session.",
          null
        )
      );
  }

  console.log("session from db: ", session);

  console.log("hehehehhehehhe sess", sessionId);
  const generatedQuestions = await generateMoreAIQuestions({
    role: session.role,
    experience: session.experience,
    importantTopics: session.importantTopics,
    numberOfQuestions: 10,
    questions: questionList,
  });

  console.log("error fffffkkkkkk");

  const questionData = generatedQuestions.map(({ question, answer }) => ({
    sessionId: session.id,
    userId,
    question,
    answer,
  }));

  console.log("yhaa hu");

  const insertedQuestions = await db
    .insert(questions)
    .values(questionData)
    .returning();

  console.log("nhi bc idhr hu");

  res
    .status(ResponseStatus.Created)
    .json(
      new ApiResponse(
        ResponseStatus.Created,
        "More Questions generated successfully",
        insertedQuestions
      )
    );
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
      createdAt: sessions.createdAt,
      questionsCount: db.$count(
        questions,
        eq(questions.sessionId, sessions.id)
      ),
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

  const result = await generateConceptExplanation(question);

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
