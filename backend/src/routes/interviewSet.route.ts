import { Router } from "express";
import {
  generateCompleteInterviewSet,
  deleteInterviewSet,
  getInterviewSetWithQuestionCount,
  getQuestionsByInterviewSetId,
  generateAIExplanation,
  togglePinQuestion,
  updateQuestionNote,
  generateMoreQuestions,
} from "../controllers/interviewSet.controller";
import { isLoggedIn } from "../middlewares/auth.middleware";

const router = Router();

router.post("/generate", isLoggedIn, generateCompleteInterviewSet);

router.get("/summary", isLoggedIn, getInterviewSetWithQuestionCount);

router.get(
  "/:interviewSetId/questions",
  isLoggedIn,
  getQuestionsByInterviewSetId
);

router.delete("/:interviewSetId", isLoggedIn, deleteInterviewSet);

router.post(
  "/:interviewSetId/question/:questionId/explain",
  isLoggedIn,
  generateAIExplanation
);

router.post(
  "/:interviewSetId/generate/more",
  isLoggedIn,
  generateMoreQuestions
);

router.post(
  "/:interviewSetId/question/:questionId/pin",
  isLoggedIn,
  togglePinQuestion
);

router.post(
  "/:interviewSetId/question/:questionId/note",
  isLoggedIn,
  updateQuestionNote
);

export default router;
