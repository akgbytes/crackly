import { Router } from "express";
import {
  generateAIInterviewQuestions,
  generateAIConceptExplanation,
} from "../controllers/ai.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/generate-questions", isLoggedIn, generateAIInterviewQuestions);
router.post("/generate-explanation", isLoggedIn, generateAIConceptExplanation);

export default router;
