const fs = require('fs');
const path = require('path');
const { EXPRESS_STATIC_PATH } = require('../commons/constants');

const ERROR_SEVERITY = 'ERROR';
const WARNING_SEVERITY = 'WARN';
const INFO_SEVERITY = 'INFO';
const LOGS_FILE_NAME = 'logs.txt';

const filePath = path.join(
  __dirname,
  '../../',
  EXPRESS_STATIC_PATH,
  LOGS_FILE_NAME
);

exports.createLogger = () => {
  const logger = {
    info: (text) => {
      const content = formatContent(INFO_SEVERITY, text);
      fs.appendFile(filePath, content, (_) => _);
    },
    warn: (text) => {
      const content = formatContent(WARNING_SEVERITY, text);
      fs.appendFile(filePath, content, (_) => _);
    },
    error: (text) => {
      const content = formatContent(ERROR_SEVERITY, text);
      fs.appendFile(filePath, content, (_) => _);
    },
  };

  return logger;
};

const formatContent = (severity, text) => {
  let content = '';
  content += new Date().toISOString();

  content += ' ';
  content += '[' + severity + ']';

  content += ' ';
  content += text;
  content += '\n';

  return content;
};
