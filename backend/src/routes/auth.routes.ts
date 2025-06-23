import { Router } from "express";
import {
  getProfile,
  logout,
  googleLogin,
} from "../controllers/auth.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/register", googleLogin);
router.post("/login", googleLogin);
router.post("/logout", isLoggedIn, logout);
router.get("/me", isLoggedIn, getProfile);

export default router;
