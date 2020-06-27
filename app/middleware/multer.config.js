import multer from 'multer';
import path from 'path';

const DIR = process.env.PATH_DIR_UPLOAD;

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, DIR);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
