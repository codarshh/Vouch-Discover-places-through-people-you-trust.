import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { ValidationError } from '../utils/errors.js';

export interface RequestValidationSchema {
  body?: ZodTypeAny;
  query?: ZodTypeAny;
  params?: ZodTypeAny;
}

/**
 * Reusable middleware to validate request body, params, and query using Zod.
 * Compatible with Express 4 and Express 5 (where query/params have getter properties).
 */
export const validateRequest = (schema: RequestValidationSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        const parsedQuery = await schema.query.parseAsync(req.query);
        Object.defineProperty(req, 'query', {
          value: parsedQuery,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      if (schema.params) {
        const parsedParams = await schema.params.parseAsync(req.params);
        Object.defineProperty(req, 'params', {
          value: parsedParams,
          writable: true,
          enumerable: true,
          configurable: true,
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorSummary = error.issues
          .map((issue) => `${issue.path.join('.') || 'root'}: ${issue.message}`)
          .join('; ');
        next(new ValidationError(errorSummary, error.issues));
      } else {
        next(error);
      }
    }
  };
};
