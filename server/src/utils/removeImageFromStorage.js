const fs = require('fs');
const path = require('path');
const { EXPRESS_STATIC_PATH } = require('../commons/constants');

exports.removeImageFromStorage = (imageName) => {
  fs.unlink(
    path.join(__dirname, '../../', EXPRESS_STATIC_PATH, imageName),
    (_) => _
  );
};
