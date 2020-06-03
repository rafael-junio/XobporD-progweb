import fs from 'fs-extra';
import zlib from 'zlib';
import models from '../database/models';

exports.sendFile = async (res, idMedia) => {
  const filePath = await models.Files.findOne({
    where: { id: idMedia },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
  const stream = fs.createReadStream(`/usr/app/${path}`);
  stream.pipe(res);
};

exports.sendFileGz = async (res, idMedia) => {
  const filePath = await models.Files.findOne({
    where: { id: idMedia },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
  const stream = fs.createReadStream(`/usr/app/${path}`);
  stream.pipe(zlib.createGzip()).pipe(res);
};

exports.sendFileAl = async (req, res) => {
  const filePath = await models.Files.findOne({
    where: { id: req.params.idFile },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const { range } = req.headers;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
};
