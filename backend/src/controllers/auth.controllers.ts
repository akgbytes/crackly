import asyncHandler from "../utils/asyncHandler";
import { handleZodError } from "../utils/handleZodError";
import {
  validateLogin,
  validateRegister,
} from "../validations/auth.validation";
import { logger } from "../configs/logger";
import { db } from "../db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import {
  createHash,
  generateAccessRefreshToken,
  hashPassword,
  verifyPassword,
} from "../utils/helpers";
import { ApiResponse } from "../utils/ApiResponse";
import { accessTokenOptions, refreshTokenOptions } from "../configs/cookies";
import { uploadOnCloudinary } from "./cloudinary";

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = handleZodError(validateRegister(req.body));

  logger.info("Registration attempt", { email, ip: req.ip });

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    throw new CustomError(
      ResponseStatus.Conflict,
      "Email is already registered"
    );
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
      name,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      avatar: users.avatar,
    });

  logger.info("User registered successfully", {
    email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "User registered successfully",
        user
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = handleZodError(validateLogin(req.body));

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new CustomError(ResponseStatus.Unauthorized, "Invalid credentials");
  }

  const isPasswordCorrect = await verifyPassword(user.password, password);

  if (!isPasswordCorrect) {
    throw new CustomError(ResponseStatus.Unauthorized, "Invalid credentials");
  }

  const { accessToken, refreshToken } = generateAccessRefreshToken(user);

  const hashedToken = createHash(refreshToken);

  await db
    .update(users)
    .set({ refreshToken: hashedToken })
    .where(eq(users.id, user.id));

  logger.info("User logged in", {
    email: user.email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(ResponseStatus.Success)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(ResponseStatus.Success, "Logged in successfully", {
        accessToken,
        refreshToken,
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { id, email } = req.user;

  if (!refreshToken) {
    throw new CustomError(ResponseStatus.BadRequest, "Refresh token missing");
  }

  const hashedToken = createHash(refreshToken);

  await db
    .update(users)
    .set({ refreshToken: null })
    .where(eq(users.refreshToken, hashedToken));

  logger.info("User logged out", { email, userId: id, ip: req.ip });

  res
    .status(ResponseStatus.Success)
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions)
    .json(
      new ApiResponse(ResponseStatus.Success, "Logged out successfully", null)
    );
});

export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      avatar: users.avatar,
    })
    .from(users)
    .where(eq(users.id, id));

  if (!user) {
    throw new CustomError(ResponseStatus.NotFound, "User not found");
  }

  logger.info("User profile fetched", {
    email: user.email,
    userId: user.id,
    ip: req.ip,
  });

  res
    .status(ResponseStatus.Success)
    .json(
      new ApiResponse(
        ResponseStatus.Success,
        "User profile fetched successfully",
        user
      )
    );
});

export const uploadAvatar = asyncHandler(async (req, res) => {
  const { email } = req.user;

  let avatarUrl;
  if (req.file) {
    try {
      const uploaded = await uploadOnCloudinary(req.file.path);
      avatarUrl = uploaded?.secure_url;

      await db
        .update(users)
        .set({ avatar: avatarUrl })
        .where(eq(users.email, email));

      logger.info("Avatar uploaded successfully", { email, avatarUrl });
      res
        .status(ResponseStatus.Success)
        .json(
          new ApiResponse(
            ResponseStatus.Success,
            "Avatar uploaded successfully",
            { avatarUrl }
          )
        );
    } catch (err: any) {
      logger.warn(`Avatar upload failed for ${email} due to ${err.message}`);
    }
  } else {
    throw new CustomError(ResponseStatus.BadRequest, "No image uploaded");
  }
});
