import request from 'supertest';
import app from './app';

describe('App', () => {
  it('sends a default message on /api route', async () => {
    const response = await request(app).get('/api').send();

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Server is listening!/i);
  });
});
