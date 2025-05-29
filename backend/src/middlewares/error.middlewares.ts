import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/customError";
import { ResponseStatus } from "../utils/constants";
import { logger } from "../config/logger";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let customError: CustomError;

  if (error instanceof CustomError) {
    customError = error;
  } else {
    customError = new CustomError(
      ResponseStatus.InternalServerError,
      error.message || "Internal Server Error"
    );
  }

  logger.error(customError.message);

  res.status(customError.code).json({
    code: customError.code,
    message: customError.message,
    data: customError.data,
    success: customError.success,
  });
};
