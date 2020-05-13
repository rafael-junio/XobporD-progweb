import db from '../../database/models';

export default () => Promise.all(
  // eslint-disable-next-line max-len
  Object.keys(db.sequelize.models).map((key) => db.sequelize.models[key].destroy({ truncate: true })),
);
