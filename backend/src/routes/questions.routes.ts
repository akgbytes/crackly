import { Router } from "express";
import {
  addQuestions,
  getQuestionsBySession,
  togglePinQuestion,
  updateQuestionNote,
} from "../controllers/questions.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/", isLoggedIn, addQuestions);
router.post("/:questionId/pin", isLoggedIn, togglePinQuestion);
router.post("/:questionId/note", isLoggedIn, updateQuestionNote);
router.get("/session/:sessionId", isLoggedIn, getQuestionsBySession);

export default router;
