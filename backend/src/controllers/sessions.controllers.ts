import { sessions } from "./../db/schema/sessions";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";
import { ResponseStatus } from "../utils/constants";
import { handleZodError } from "../utils/handleZodError";
import { validateSession } from "../validations/sessions.validation";
import { CustomError } from "../utils/CustomError";
import { questions } from "../db/schema/questions";

export const createSession = asyncHandler(async (req, res) => {
  const { role, experience, importantTopics, description } = handleZodError(
    validateSession(req.body)
  );

  const { id } = req.user;

  const [session] = await db
    .insert(sessions)
    .values({
      userId: id,
      role,
      experience,
      importantTopics,
      description,
    })
    .returning();

  res
    .status(ResponseStatus.Created)
    .json(
      new ApiResponse(
        ResponseStatus.Created,
        "Session created successfully",
        session
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

export const getSessions = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  const allSessions = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId));

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Sessions fetched successfully",
        allSessions
      )
    );
});

export const getSessionById = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, sessionId));

  // need to do extra checks later

  if (!session) {
    throw new CustomError(ResponseStatus.NotFound, "Session not found");
  }

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "Session fetched successfully",
        session
      )
    );
});
