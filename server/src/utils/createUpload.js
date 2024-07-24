const { v4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const { EXPRESS_STATIC_PATH, IMAGE_KEY } = require('../commons/constants');

exports.createUpload = () => {
  const destination = path.join(__dirname, '../../', EXPRESS_STATIC_PATH);

  const storage = multer.diskStorage({
    destination,
    filename: (_, file, cb) => {
      const extension = path.extname(file.originalname);
      const prefix = v4();
      const filename = prefix + extension;

      cb(null, filename);
    },
  });

  const upload = multer({ storage }).single(IMAGE_KEY);
  return upload;
};
