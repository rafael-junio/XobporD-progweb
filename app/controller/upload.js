import fetch from 'node-fetch';
import models from '../database/models';

const path = require('path');

const baseUrl = 'https://api.themoviedb.org/3/';
const result = {};

exports.register = (req, res, next, payload) => {
  const message = [];
  const { file } = req;

  if (!file) {
    message.push({ msg: 'Campo do arquivo vazio!' });
    return res.render('home', { message });
  }
  const mimetype = file.mimetype.substring(0, 5);
  console.log(mimetype);
  if (mimetype !== 'image' && mimetype !== 'video' && mimetype !== 'audio') {
    message.push({ msg: 'Formato inválido, somente imagens, vídeos e aúdios são aceitos!' });
    return res.render('home', { message });
  }

  console.log('file received');
  const fileData = {
    fileName: file.originalname,
    uploadName: file.filename,
    type: file.mimetype,
    size: file.size,
    uploadedBy: payload.sub,
    idTMDB: req.body.idTMDB,
    tag: req.body.typeMedia,
  };

  models.Files.create(fileData)
    .then((data) => {
      message.push({ msg: 'Upload feito com sucesso' });
      return res.render('upload', { message, result: undefined });
    })
    .catch((err) => {
      return next(err);
    });
};

exports.showAll = async (req, res, next) => {
  await models.Files.findAll({
    attributes: ['id', 'fileName', 'uploadName', 'type', 'size', 'idTMDB', 'tag', 'uploadedBy'],
  })
    .then(async (files) => {
      result.total_size = files.length;
      result.files = files;
      result.TMDB = {};
    })
    .catch(err => {
      return next(err);
    })

  if (result.files.length === 0) { return null; }

  for (let i = 0; i < result.files.length; i++) {
    if (result.files[i].tag === 'movie' || result.files[i].tag === 'tv') {
      /**
       * API use exemple:
       * https://api.themoviedb.org/3/movie/550?api_key=API_KEY&language=en-US
       * https://api.themoviedb.org/3/tv/60735?api_key=API_KEY&language=en-US
       */
      result.TMDB[i] = await fetch(`${baseUrl}${result.files[i].tag}/${result.files[i].idTMDB}?api_key=${process.env.TMDB_API_KEY}&language=pt-BR`)
        .then((res) => res.json())
        .then((data) => data)
        .catch(err => {
          return next(err);
        })
    }
  }
  return result;
};
