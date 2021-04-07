import { Request, Response, NextFunction } from "express";
import { CustomerError } from "../errors/custom-error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomerError) {
    return res.status(error.errorCode).json({ errors: error.serializeError() });
  }
  console.error(error);
  return res.status(400).json({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
