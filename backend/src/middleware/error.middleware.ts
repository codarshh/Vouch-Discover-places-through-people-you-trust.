import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError, NotFoundError } from '../utils/errors.js';
import { HttpStatus } from '../utils/statusCodes.js';
import { env } from '../config/env.js';

export interface FormattedErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Global 404 handler for routes that do not match any defined endpoint.
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};

/**
 * Centralized application error handling middleware.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  // Handle JSON parse errors from body parser
  if (err instanceof SyntaxError && 'status' in err && (err as { status?: number }).status === 400 && 'body' in err) {
    const response: FormattedErrorResponse = {
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'Malformed JSON payload in request body',
      },
    };
    res.status(HttpStatus.BAD_REQUEST).json(response);
    return;
  }

  // Handle known operational application errors
  if (err instanceof AppError) {
    const response: FormattedErrorResponse = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        ...(env.NODE_ENV !== 'production' && err.details ? { details: err.details } : {}),
      },
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Handle Zod schema validation errors directly
  if (err instanceof ZodError) {
    const formattedIssues = err.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));

    const response: FormattedErrorResponse = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        ...(env.NODE_ENV !== 'production' ? { details: formattedIssues } : {}),
      },
    };
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(response);
    return;
  }

  // Unhandled / Unexpected internal errors
  if (env.NODE_ENV !== 'production') {
    console.error('Unhandled server error:', err);
  }

  // In production, ensure no stack traces, DB queries, or internal details leak
  const fallbackResponse: FormattedErrorResponse = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal server error occurred',
    },
  };

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(fallbackResponse);
};
