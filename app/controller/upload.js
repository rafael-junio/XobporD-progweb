import fetch from 'node-fetch';
import models from '../database/models';

const baseUrl = 'https://api.themoviedb.org/3/';
const result = {};

exports.register = (req, res, payload) => {
  const message = [];
  const { file } = req;

  if (!file) {
    message.push({ msg: 'Campo do arquivo vazio!' });
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

  console.log(fileData);

  models.Files.create(fileData)
    .then((data) => {
      console.log(data);
      message.push({ msg: 'Upload feito com sucesso' });
      return res.render('upload', { message, result: undefined });
    })
    .catch((err) => console.err(err));
};

exports.showAll = async () => {
  await models.Files.findAll({
    attributes: ['id', 'fileName', 'uploadName', 'type', 'size', 'idTMDB', 'tag', 'uploadedBy'],
  })
    .then(async (files) => {
      result.total_size = files.length;
      result.files = files;
      result.TMDB = {};
    });

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
        .then((data) => data);
    }
  }
  return result;
};
