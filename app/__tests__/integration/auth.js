import bcrypt from 'bcrypt';
import userController from '../../controller/users';
import truncate from '../utils/trucate';

describe('Authentication', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should be create a user', async (done) => {
    const userResult = await userController.register({
      email: 'test@test.com',
      password: '123456',
    });
    const compareHash = await bcrypt.compare('123456', userResult.password);
    expect(userResult.email).toBe(userResult.email);
    expect(compareHash).toBe(true);
    done();
  });
});
