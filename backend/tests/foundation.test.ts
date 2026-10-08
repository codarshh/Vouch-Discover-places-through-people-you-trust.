import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express, { Request, Response } from 'express';
import { z } from 'zod';
import app from '../src/app';
import { validateRequest } from '../src/middleware/validation.middleware';
import { errorHandler } from '../src/middleware/error.middleware';
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  InternalServerError,
} from '../src/utils/errors';
import { HttpStatus } from '../src/utils/statusCodes';

describe('Backend Foundation & Security', () => {
  it('should return 404 with structured JSON for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-endpoint');

    expect(res.status).toBe(HttpStatus.NOT_FOUND);
    expect(res.body).toEqual({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Route GET /api/unknown-endpoint not found',
      },
    });
  });

  it('should include security headers and hide X-Powered-By', async () => {
    const res = await request(app).get('/api/health');

    expect(res.headers['x-powered-by']).toBeUndefined();
    expect(res.headers['x-content-type-options']).toBe('nosniff');
    expect(res.headers['x-frame-options']).toBe('DENY');
    expect(res.headers['x-xss-protection']).toBe('1; mode=block');
    expect(res.headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  });

  it('should respect CORS configuration for frontend origin', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'http://localhost:5173');

    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(res.headers['access-control-allow-credentials']).toBe('true');
  });
});

describe('Validation Middleware', () => {
  const testApp = express();
  testApp.use(express.json());

  const sampleSchema = {
    body: z.object({
      name: z.string().min(3),
    }),
    query: z.object({
      page: z.coerce.number().min(1).optional(),
    }),
  };

  testApp.post(
    '/test-validation',
    validateRequest(sampleSchema),
    (req: Request, res: Response) => {
      res.json({ success: true, body: req.body, query: req.query });
    }
  );
  testApp.use(errorHandler);

  it('should pass validation when input is valid', async () => {
    const res = await request(testApp)
      .post('/test-validation?page=2')
      .send({ name: 'ValidName' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.body).toEqual({ name: 'ValidName' });
    expect(res.body.query).toEqual({ page: 2 });
  });

  it('should reject invalid body with 422 and VALIDATION_ERROR code', async () => {
    const res = await request(testApp)
      .post('/test-validation')
      .send({ name: 'ab' }); // Too short (min 3)

    expect(res.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});

describe('Custom Errors & Status Codes', () => {
  const errApp = express();
  errApp.use(express.json());

  errApp.get('/error/bad-request', () => {
    throw new BadRequestError('Bad input');
  });
  errApp.get('/error/unauthorized', () => {
    throw new UnauthorizedError('Not logged in');
  });
  errApp.get('/error/forbidden', () => {
    throw new ForbiddenError('Access denied');
  });
  errApp.get('/error/not-found', () => {
    throw new NotFoundError('Item missing');
  });
  errApp.get('/error/conflict', () => {
    throw new ConflictError('Duplicate entity');
  });
  errApp.get('/error/validation', () => {
    throw new ValidationError('Field invalid');
  });
  errApp.get('/error/internal', () => {
    throw new InternalServerError('Server failed');
  });
  errApp.use(errorHandler);

  it('should correctly format BadRequestError (400)', async () => {
    const res = await request(errApp).get('/error/bad-request');
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'BAD_REQUEST', message: 'Bad input' },
    });
  });

  it('should correctly format UnauthorizedError (401)', async () => {
    const res = await request(errApp).get('/error/unauthorized');
    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Not logged in' },
    });
  });

  it('should correctly format ForbiddenError (403)', async () => {
    const res = await request(errApp).get('/error/forbidden');
    expect(res.status).toBe(403);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Access denied' },
    });
  });

  it('should correctly format NotFoundError (404)', async () => {
    const res = await request(errApp).get('/error/not-found');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Item missing' },
    });
  });

  it('should correctly format ConflictError (409)', async () => {
    const res = await request(errApp).get('/error/conflict');
    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'CONFLICT', message: 'Duplicate entity' },
    });
  });

  it('should correctly format ValidationError (422)', async () => {
    const res = await request(errApp).get('/error/validation');
    expect(res.status).toBe(422);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'VALIDATION_ERROR', message: 'Field invalid' },
    });
  });

  it('should correctly format InternalServerError (500)', async () => {
    const res = await request(errApp).get('/error/internal');
    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Server failed' },
    });
  });
});
