import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export class ValidationError extends Error {
}

export const errorHandler = (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  res.json({
    msg: error instanceof ValidationError ? error.message : 'Come back later',
    errorCode: error instanceof ValidationError ? 400 : 500,
  })
}