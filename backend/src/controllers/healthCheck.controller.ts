import { Request, Response } from "express";
import { ResponseStatus } from "../utils/constants";
import { ApiResponse } from "../utils/ApiResponse";

export const healthCheck = (req: Request, res: Response) => {
  res
    .status(ResponseStatus.Success)
    .json(new ApiResponse(ResponseStatus.Success, "Health check passed", null));
};
