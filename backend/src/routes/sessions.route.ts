import { Router } from "express";
import {
  generateCompleteSession,
  getSessionsWithQuestionCount,
  getQuestionsBySessionId,
  deleteSession,
  generateAIExplanation,
  togglePinQuestion,
  updateQuestionNote,
  generateMoreQuestions,
} from "../controllers/sessions.controller";
import { isLoggedIn } from "../middlewares/auth.middleware";

const router = Router();

router.post("/generate", isLoggedIn, generateCompleteSession);
router.get("/summary", isLoggedIn, getSessionsWithQuestionCount);
router.get("/:sessionId/questions", isLoggedIn, getQuestionsBySessionId);
router.delete("/:sessionId", isLoggedIn, deleteSession);
router.post(
  "/:sessionId/question/:questionId/explain",
  isLoggedIn,
  generateAIExplanation
);
router.post("/:sessionId/generate/more", isLoggedIn, generateMoreQuestions);
router.post(
  "/:sessionId/question/:questionId/pin",
  isLoggedIn,
  togglePinQuestion
);
router.post(
  "/:sessionId/question/:questionId/note",
  isLoggedIn,
  updateQuestionNote
);

export default router;
