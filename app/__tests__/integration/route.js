import request from 'supertest';
import app from '../../app';
import truncate from '../utils/trucate';

describe('Authentication', () => {
  beforeAll(async () => {
    await truncate();
  });
  it('Test middleware error - 404', async () => {
    const response = await request(app).post('/users/home');
    expect(response.status).toBe(404);
  });

  it('Test render register', async () => {
    const response = await request(app).get('/register');
    expect(response.status).toBe(200);
  });

  it('Test render login', async () => {
    const response = await request(app).get('/login');
    expect(response.status).toBe(200);
  });

  it('Test render index', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
