import fs from 'fs-extra';
import zlib from 'zlib';
import fetch from 'node-fetch';
import models from '../database/models';

const baseUrl = 'https://api.themoviedb.org/3/';
const pattRegex = /.*\//;

exports.sendFileGz = async (req, res, next) => {
  await models.Files.findOne({ where: { id: req.params.idFile } })
    .then((filePath) => {
      const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
      const stream = fs.createReadStream(`/usr/app/${path}`);
      stream.pipe(zlib.createGzip()).pipe(res);
    })
    .catch((err) => {
      return next(err);
    });
};

exports.sendFile = (req, res, next) => {
  models.Files.findOne({ where: { id: req.params.idFile } })
    .then((file) => {
      const mime = file.type;
      const mimeShort = mime.match(pattRegex)[0].slice(0, -1);
      const path = `${process.env.PATH_DIR_UPLOAD}/${file.uploadName}`;
      if (mimeShort === 'video') { return sendFileVideo(req, res, path); } if (mimeShort === 'image') { return res.sendFile(`/usr/app/${path}`); } if (mimeShort === 'audio') { return sendFileAudio(req, res, `/usr/app/${path}`); } return res.redirect('/users/home');
    })
    .catch(err => {
      return next(err);
    })
};

async function sendFileAudio(req, res, filePath) {
  const stat = fs.statSync(filePath);
  const total = stat.size;
  if (req.headers.range) {
    const { range } = req.headers;
    const parts = range.replace(/bytes=/, '').split('-');
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = (end - start) + 1;
    const readStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'audio/ogg',
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': 'audio/ogg',
      'Content-Length': stat.size,
    });
    const stream = fs.createReadStream(filePath, { highWaterMark: 2 });
    stream.pipe(res);
  }
}

async function sendFileVideo(req, res, filePath) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const { range } = req.headers;
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
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
    fs.createReadStream(filePath).pipe(res);
  }
}

exports.deleteFile = (req, res, next) => {
  models.Files.findOne({ where: { id: req.params.idFile } })
    .then((file) => {
      const path = `${process.env.PATH_DIR_UPLOAD}/${file.dataValues.uploadName}`;
      fs.unlinkSync(path);
      file.destroy();
    })
    .then(() => res.redirect('/users/home'))
    .catch((err) => {
      return next(err)
    });
};

exports.search = (req, resp, next) => {
  const { titleMedia, typeMedia, language } = req.body;

  fetch(
    `${baseUrl}search/${typeMedia}?api_key=${process.env.TMDB_API_KEY}&language=${language}&query=${titleMedia}`,
  )
    .then((res) => res.json())
    .then((result) => {
      resp.render('upload', { result: result.results, type: typeMedia });
    })
    .catch((err) => {
      return next(err);
    })
};
