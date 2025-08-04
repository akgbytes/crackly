import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new CustomError(ResponseStatus.Unauthorized, "Unauthorized");
    }

    req.user = session.user;
    next();
  } catch (error) {
    throw new CustomError(ResponseStatus.Unauthorized, "Unauthorized");
  }
};
