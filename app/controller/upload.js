import models from '../database/models';

exports.register = async (fileData) => {
  const file = await models.Files.create(fileData).then((m) => m);
  return file;
};

exports.showAll = async () => {
  let result = {};
  await models.Files.findAll({
    attributes: ['id', 'fileName', 'uploadName', 'type', 'size', 'idTMDB', 'tag','uploadedBy']
  }).then(m => {
    result['total_size'] = m.length;
    result['files'] = m;
  })

  return result;
}
