import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('Core API Gateway & HTTP Endpoints', () => {
  it('GET /health should return 200 with service health metadata', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBe('Ruthved Organic API');
  });

  it('GET / should return root welcome message and api docs location', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Ruthved Organic E-Commerce API');
    expect(res.body.documentation).toBe('/api/docs');
  });

  it('GET /api/docs.json should serve OpenAPI 3.0 specification JSON', async () => {
    const res = await request(app).get('/api/docs.json');
    expect(res.status).toBe(200);
    expect(res.body.openapi).toBe('3.0.0');
    expect(res.body.info.title).toContain('Ruthved Organic');
  });

  it('GET /api/v1/unknown-endpoint should return 404 with structured error', async () => {
    const res = await request(app).get('/api/v1/non-existent-route-xyz');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('not found');
  });

  it('Protected route GET /api/v1/wishlist should reject unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/v1/wishlist');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('Protected route GET /api/v1/admin/dashboard should reject unauthenticated request with 401', async () => {
    const res = await request(app).get('/api/v1/admin/dashboard');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
