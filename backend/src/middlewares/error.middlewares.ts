import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/CustomError";
import { ResponseStatus } from "../utils/constants";
import { logger } from "../configs/logger";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log("midd", error);
  let customError;

  if (error instanceof CustomError) {
    customError = error;
  } else {
    customError = new CustomError(
      ResponseStatus.InternalServerError,
      error.message || "Internal Server Error"
    );
  }

  logger.error(customError.message, {
    path: req.path,
    method: req.method,
    ip: req.ip,
    stack: customError.stack || "",
  });

  res.status(customError.code).json({
    code: customError.code,
    message: customError.message,
    data: customError.data,
    success: customError.success,
  });
};
