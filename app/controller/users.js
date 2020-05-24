import models from '../database/models';

exports.register = async (userData) => {
  const user = await models.User.create(userData).then((m) => m);
  return user;
};
