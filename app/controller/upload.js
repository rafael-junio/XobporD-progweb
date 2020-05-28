import models from '../database/models';

exports.register = async (fileData) => {
  const file = await models.Files.create(fileData).then((m) => m);
  return file;
};
