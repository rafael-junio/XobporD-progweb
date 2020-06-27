import models from '../database/models';

exports.register = async (userData) => {
  const user = await models.User.create(userData).then((m) => m);
  return user;
};

exports.isValidFormRegister = async (userData) => {
  const haveContent = userData.email !== '' || userData.password !== '';
  const isValidPassword = userData.password.length >= 8;
  const isValidConfirmation = userData.password === userData.confirm_password
    || userData.email === userData.confirm_email;
  return haveContent && isValidPassword && isValidConfirmation;
};
