import fs from 'fs-extra';
import zlib from 'zlib';
import models from '../database/models';
import fetch from 'node-fetch';

const baseUrl = 'https://api.themoviedb.org/3/';

exports.sendFileGz = async (res, idMedia) => {
  const filePath = await models.Files.findOne({
    where: { id: idMedia },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
  const stream = fs.createReadStream(`/usr/app/${path}`);
  stream.pipe(zlib.createGzip()).pipe(res);
};

exports.sendFile = async (req, res) => {
  const filePath = await models.Files.findOne({
    where: { id: req.params.idFile },
  });
  const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.uploadName}`;
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

exports.search = (req, resp) => {
  const { titleMedia, typeMedia, language } = req.body;

  fetch(
    `${baseUrl}search/${typeMedia}?api_key=${process.env.TMDB_API_KEY}&language=${language}&query=${titleMedia}`,
  )
    .then((res) => res.json())
    .then((result) => {
      resp.render('upload', { title: 'Search', result: result.results, type: typeMedia });
    });
};