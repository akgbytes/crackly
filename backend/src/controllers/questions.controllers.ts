import { asc, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { sessions } from "../db/schema/sessions";
import asyncHandler from "../utils/asyncHandler";
import { handleZodError } from "../utils/handleZodError";
import {
  validateNote,
  validateQuestions,
} from "../validations/questions.validation";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import { questions } from "../db/schema/questions";
import { ApiResponse } from "../utils/ApiResponse";

export const addQuestions = asyncHandler(async (req, res) => {
  const { sessionId, questions: questionList } = handleZodError(
    validateQuestions(req.body)
  );

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (!session) {
    throw new CustomError(ResponseStatus.NotFound, "Invalid session ID");
  }

  const dataToInsert = questionList.map((q) => ({
    sessionId,
    userId: req.user.id,
    question: q.question,
    answer: q.answer,
  }));

  await db.insert(questions).values(dataToInsert);

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Questions added successfully",
        null
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

export const getQuestionsBySession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  if (!session || session.userId !== req.user.id) {
    throw new CustomError(ResponseStatus.NotFound, "Invalid session ID");
  }

  const sessionQuestions = await db
    .select()
    .from(questions)
    .where(eq(questions.sessionId, sessionId))
    .orderBy(desc(questions.isPinned), asc(questions.createdAt));

  res.status(ResponseStatus.Success).json(
    new ApiResponse(ResponseStatus.Success, "Questions fetched successfully", {
      questions: sessionQuestions,
    })
  );
});
