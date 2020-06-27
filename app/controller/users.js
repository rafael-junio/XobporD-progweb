import models from '../database/models';

exports.register = (userData) => models.User.create(userData);

exports.delete = (userId) => models.User.destroy({
  where: {
    id: userId,
  },
});

exports.update = (userData, idUser) => models.User.update({
  userData,
  where: {
    id: idUser,
  },
});

exports.findUser = (userId) => models.User.findOne({
  where: {
    id: userId,
  },
});

exports.list = () => models.User.findAll({
  attributes: ['email', 'id'],
});

exports.isValidFormRegister = (userData) => {
  const haveContent = userData.email !== '' || userData.password !== '';
  const isValidPassword = userData.password.length >= 8;
  const isValidConfirmation = userData.password === userData.confirm_password
    && userData.email === userData.confirm_email;
  return haveContent && isValidPassword && isValidConfirmation;
};
