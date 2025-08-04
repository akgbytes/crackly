import asyncHandler from "../utils/asyncHandler";
import { logger } from "../configs/logger";
import { db } from "../db";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import { generateJWT } from "../utils/helpers";
import { ApiResponse } from "../utils/ApiResponse";
import { verifyGoogleToken } from "../utils/verifyGoogleToken";
import { env } from "../configs/env";
import ms, { StringValue } from "ms";

export const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const payload = await verifyGoogleToken(token);

  const { email, name, picture } = payload;
  if (!email || !name || !picture) {
    throw new CustomError(200, "");
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  let user = existingUser;

  if (!user) {
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        name,
        avatar: picture,
      })
      .returning();
    user = newUser;
  }

  const jwtToken = generateJWT({ id: user.id, email: user.email });

  logger.info(`${email} logged in via Google`);

  res
    .status(200)
    .cookie("jwtToken", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      maxAge: ms(env.JWT_EXPIRY as StringValue),
    })
    .json(new ApiResponse(200, "Google login successful", user));
});

export const logout = asyncHandler(async (req, res) => {
  const { jwtToken } = req.cookies;
  const { id, email } = req.user;

  if (!jwtToken) {
    throw new CustomError(ResponseStatus.BadRequest, "JWT not found");
  }

  logger.info("User logged out", { email, userId: id, ip: req.ip });

  res
    .status(ResponseStatus.Success)
    .clearCookie("jwtToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none" as const,
      maxAge: ms(env.JWT_EXPIRY as StringValue),
    })
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
