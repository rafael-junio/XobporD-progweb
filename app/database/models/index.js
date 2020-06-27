import { readdirSync } from 'fs';
import { basename, join } from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database';

const db = {};
const sequelize = new Sequelize(config);

readdirSync(__dirname)
  .filter(
    (file) => file.indexOf('.') !== 0
      && file !== basename(__filename)
      && file.slice(-3) === '.js',
  )
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => sequelize.sync()
  .then(() => console.log("All models were synchronized successfully.")))
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
