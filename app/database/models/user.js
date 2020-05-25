import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        notEmpty: true,
      },
      email: {
        type: DataTypes.STRING,
        notEmpty: true,
      },
      password: {
        type: DataTypes.STRING,
        notEmpty: true,
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            // eslint-disable-next-line no-param-reassign
            user.password = await bcrypt.hash(user.password, 15);
          }
        },
      },
    },
  );
  return User;
};
