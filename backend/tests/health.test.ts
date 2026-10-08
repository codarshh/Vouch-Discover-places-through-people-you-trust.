import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Health Check API', () => {
  it('GET /api/health should return 200 OK with status "ok"', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
