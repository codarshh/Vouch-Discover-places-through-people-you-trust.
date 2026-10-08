import { Request, Response, NextFunction } from 'express';

/**
 * Type structure prepared for future authenticated user payload (Phase 3: Authentication).
 */
export interface AuthUser {
  id: string;
  email: string;
  username: string;
}

/**
 * Extended Express Request with user property for future authenticated routes.
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

/**
 * Authentication Middleware Placeholder.
 *
 * NOTE: Authentication logic is intentionally not implemented in Phase 2.
 * This file serves only as structural and type preparation for Phase 3.
 */
export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  // Pass-through placeholder for Phase 3 implementation.
  next();
};
