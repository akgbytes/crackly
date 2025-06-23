import { decodedUser } from "../types";
import jwt from "jsonwebtoken";
import { env } from "../configs/env";
import { StringValue } from "ms";
import crypto from "crypto";

export const generateJWT = (user: decodedUser) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRY as StringValue }
  );

export const createHash = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const generateSecureToken = () => {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = createHash(unHashedToken);
  const tokenExpiry = new Date(Date.now() + 30 * 60 * 1000);

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const capitalize = (name: string) =>
  name
    .split(" ")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");
