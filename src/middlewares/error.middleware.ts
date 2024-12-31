import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  error: Error,
  _: Request,
  response: Response,
  __: NextFunction
) {
  if (error instanceof ZodError) {
    response.status(400).send(error.issues);
    return;
  }

  console.log(error);
  response.status(500).send({ error: "Internal Server Error" });
}

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
