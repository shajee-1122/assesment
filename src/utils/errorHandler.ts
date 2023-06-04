import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { APIError } from '../types/types';

const mongoValidationError = (err: APIError, res: Response) => {
  res.status(httpStatus.FORBIDDEN).json({
    statusCode: httpStatus.FORBIDDEN,
    message: err.message
  });
};

const sendErrorDev = (err: APIError, req: Request, res: Response) => {
  const { statusCode = 500, message, stack, name } = err;

  if (name === 'ValidationError') {
    mongoValidationError(err, res);
  }

  console.error('ERROR! 💥', err);

  res.status(statusCode).json({
    error: err,
    statusCode,
    message,
    stack
  });
};

const sendErrorProd = (err: APIError, req: Request, res: Response) => {
  let { statusCode, message, name } = err;

  if (name === 'ValidationError') {
    mongoValidationError(err, res);
  }

  statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  message = message || (httpStatus[statusCode] as string);

  const response = {
    statusCode,
    message
  };

  res.status(statusCode).send(response);
};

export const globalErrorHandler = (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, req, res);
  }

  sendErrorDev(err, req, res);
};
