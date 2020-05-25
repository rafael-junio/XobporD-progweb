import jwt from 'jsonwebtoken';
import auth from '../../controller/auth';
import truncate from '../utils/trucate';

describe('Sample Test', () => {
  beforeAll(async () => {
    await truncate();
  });
  test('should generate token with "sub" containing user email', () => {
    const token = auth.signToken('test@test.com');
    const tokenBody = jwt.decode(token);
    expect(tokenBody.sub).toBe('test@test.com');
    expect(tokenBody.iss).toBe('xobpord');
  });
});
