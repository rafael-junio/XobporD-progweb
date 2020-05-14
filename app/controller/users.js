import User from '../database/models';

exports.register = async (userData) => {
  const user = await User.User.create(userData).then((m) => m);
  return user;
};
