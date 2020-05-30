import fs from 'fs-extra';
import zlib from 'zlib';
import models from '../database/models';

exports.sendFile = async (res, idMedia) => {
  const filePath = await models.Files.findOne({
    where: { id: idMedia },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
  const stream = fs.createReadStream(`/usr/app/${path}`);
  stream.pipe(zlib.createGzip()).pipe(res);
};
