import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import jwt from "jsonwebtoken";
import { env } from "../configs/env";
import { decodedUser } from "../types";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("cookies: ", req.cookies);
  const { jwtToken } = req.cookies;
  console.log("jwt: ", jwtToken);

  if (!jwtToken)
    throw new CustomError(ResponseStatus.Unauthorized, "JWT token is missing");

  try {
    const decoded = jwt.verify(jwtToken, env.JWT_SECRET);
    req.user = decoded as decodedUser;
    next();
  } catch (error) {
    throw new CustomError(
      ResponseStatus.Unauthorized,
      "Invalid or expired JWT"
    );
  }
};
