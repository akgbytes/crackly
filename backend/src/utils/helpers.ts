import bcrypt from "bcrypt";
import { decodedUser } from "../types";
import jwt from "jsonwebtoken";
import { env } from "../configs/env";
import { StringValue } from "ms";
import crypto from "crypto";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);

export const verifyPassword = async (
  hashedPassword: string,
  enteredPassword: string
) => await bcrypt.compare(enteredPassword, hashedPassword);

export const generateAccessRefreshToken = (user: decodedUser) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY as StringValue }
  );

  const refreshToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY as StringValue }
  );

  return { accessToken, refreshToken };
};

export const createHash = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const generateSecureToken = () => {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = createHash(unHashedToken);
  const tokenExpiry = new Date(Date.now() + 30 * 60 * 1000);

  return { unHashedToken, hashedToken, tokenExpiry };
};
