const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: 'config/.env.local',
  });
} else {
  dotenv.config({
    path: 'config/.env.test',
  });
}

module.exports = {
  username: process.env.MYSQL_USER_NAME || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || 'passwordRoot',
  database: process.env.MYSQL_DATABASE || 'xobpord',
  host: process.env.MYSQL_IP || '173.20.0.2',
  dialect: process.env.DIALECT || 'mysql',
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: false,
  },
};
