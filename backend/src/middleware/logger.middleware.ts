import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';

/**
 * Lightweight, development-friendly HTTP request logger.
 * Logs method, sanitised URL path, HTTP status, and duration in ms.
 * Sensitive data (body, query, headers, cookies, credentials) are never logged.
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (env.NODE_ENV === 'test') {
    next();
    return;
  }

  const start = Date.now();
  // Safe URL path only - strip query parameters to avoid logging tokens or credentials
  const safePath = req.originalUrl ? req.originalUrl.split('?')[0] : req.url;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    const method = req.method;

    console.log(`[HTTP] ${method} ${safePath} ${statusCode} (${duration}ms)`);
  });

  next();
};
