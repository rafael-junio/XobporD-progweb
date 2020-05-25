import bcrypt from 'bcrypt';
import User from '../../database/models';
import truncate from '../utils/trucate';

describe('Sample Test', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should encypt user password', () => {
    jest.setTimeout(async () => {
      const userResult = await User.User.create({
        email: 'test@test.com',
        password: '123456',
      });
      const compareHash = await bcrypt.compare('123456', userResult.password);
      expect(compareHash).toBe(true);
    }, 5000);
  });
});
