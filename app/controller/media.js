import fs from 'fs-extra';
import zlib from 'zlib';
import fetch from 'node-fetch';
import models from '../database/models';

const baseUrl = 'https://api.themoviedb.org/3/';
const pattRegex = /.*\//;

exports.sendFileGz = async (res, idMedia) => {
  await models.Files.findOne({ where: { id: idMedia } })
    .then(filePath => {
      const path = `${process.env.PATH_DIR_UPLOAD}/${filePath.dataValues.uploadName}`;
      const stream = fs.createReadStream(`/usr/app/${path}`);
      stream.pipe(zlib.createGzip()).pipe(res);
    })
    .catch(err => {
      return console.err(err);
    });
};

exports.sendFile = (req, res) => {
  models.Files.findOne({ where: { id: req.params.idFile }, })
    .then(file => {
      const mime = file.type;
      const mimeShort = mime.match(pattRegex)[0].slice(0, -1);
      const path = `${process.env.PATH_DIR_UPLOAD}/${file.uploadName}`;
      if (mimeShort === 'video') { return sendFileVideo(req, res, path); }
      else if (mimeShort === 'image') { return res.sendFile(`/usr/app/${path}`); }
      else if (mimeShort === 'audio') { return sendFileAudio(req, res, `/usr/app/${path}`, mime); }
      else { return res.redirect('/users/home'); }
    })
}

exports.search = (req, resp) => {
  const { titleMedia, typeMedia, language } = req.body;

  fetch(
    `${baseUrl}search/${typeMedia}?api_key=${process.env.TMDB_API_KEY}&language=${language}&query=${titleMedia}`,
  )
    .then((res) => res.json())
    .then((result) => {
      resp.render('upload', { title: 'Search', result: result.results, type: typeMedia });
    })
    .catch(err => {
      return console.err(err)
    });
};

async function sendFileAudio(req, res, filePath, mime) {
  const stat = fs.statSync(filePath);
  const total = stat.size;
  if (req.headers.range) {
    const range = req.headers.range;
    const parts = range.replace(/bytes=/, "").split("-");
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = (end - start) + 1;
    const readStream = fs.createReadStream(filePath, { start: start, end: end });
    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
      'Content-Type': 'audio/ogg'
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': 'audio/ogg',
      'Content-Length': stat.size
    });
      const stream = fs.createReadStream(filePath, { highWaterMark: 10 });
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
};

exports.deleteFile = (req, res) => {
  models.Files.findOne({ where: { id: req.params.idFile }, })
    .then((file) => file.destroy())
    .then(() => res.redirect('/users/home'))
    .catch(err => { return console.log(err) })
}

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