import { Router } from "express";
import {
  register,
  login,
  getProfile,
  logout,
} from "../controllers/auth.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/profile", isLoggedIn, getProfile);

export default router;
