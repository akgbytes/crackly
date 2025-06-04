import { Router } from "express";
import {
  createSession,
  deleteSession,
  getSessions,
  getSessionById,
  getSessionsWithQuestionCount,
} from "../controllers/sessions.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/", isLoggedIn, createSession);
router.get("/", isLoggedIn, getSessions);
router.get("/summary", isLoggedIn, getSessionsWithQuestionCount);
router.get("/:sessionId", isLoggedIn, getSessionById);
router.delete("/:sessionId", isLoggedIn, deleteSession);

export default router;
