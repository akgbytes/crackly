import { Router } from "express";
import {
  register,
  login,
  getProfile,
  logout,
  uploadAvatar,
} from "../controllers/auth.controllers";
import { isLoggedIn } from "../middlewares/auth.middlewares";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/profile", isLoggedIn, getProfile);
router.post(
  "/upload-avatar",
  isLoggedIn,
  upload.single("avatar"),
  uploadAvatar
);

export default router;
