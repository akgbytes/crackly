import { Router } from "express";
import {
  generateAIInterviewQuestions,
  generateAIConceptExplanation,
} from "../controllers/ai.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/questions", isLoggedIn, generateAIInterviewQuestions);
router.post("/explanations", isLoggedIn, generateAIConceptExplanation);

export default router;
