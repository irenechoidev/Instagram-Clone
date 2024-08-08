const fs = require('fs');
const path = require('path');
const {
  EXPRESS_STATIC_PATH,
  POSTS_API_CONTROLLER_LOG_GROUP,
  LIKES_API_CONTROLLER_LOG_GROUP,
  COMMENTS_API_CONTROLLER_LOG_GROUP,
  NOTIFICATIONS_API_CONTROLLER_LOG_GROUP,
  FOLLOWERS_API_CONTROLLER_LOG_GROUP,
} = require('../commons/constants');

const ERROR_SEVERITY = 'ERROR';
const WARNING_SEVERITY = 'WARN';
const INFO_SEVERITY = 'INFO';

const LOGS_FILE_MAP = {
  [POSTS_API_CONTROLLER_LOG_GROUP]: 'posts-api-controller.txt',
  [LIKES_API_CONTROLLER_LOG_GROUP]: 'likes-api-controller.txt',
  [COMMENTS_API_CONTROLLER_LOG_GROUP]: 'comments-api-controller.txt',
  [NOTIFICATIONS_API_CONTROLLER_LOG_GROUP]: 'notifications-api-controller.txt',
  [FOLLOWERS_API_CONTROLLER_LOG_GROUP]: 'followers-api-controller.txt',
};

exports.createLogger = () => {
  const logger = {
    getLogGroup: (logGroupName) => {
      const filePath = getFilePath(logGroupName);

      return {
        info: (text) => {
          const content = formatContent(INFO_SEVERITY, text);
          console.log(content);

          fs.appendFile(filePath, content, (_) => _);
        },
        warn: (text) => {
          const content = formatContent(WARNING_SEVERITY, text);
          console.log(content);

          fs.appendFile(filePath, content, (_) => _);
        },
        error: (text) => {
          const content = formatContent(ERROR_SEVERITY, text);
          console.log(content);

          fs.appendFile(filePath, content, (_) => _);
        },
      };
    },
  };

  return logger;
};

const getFilePath = (logGroupName) => {
  return path.join(
    __dirname,
    '../../',
    EXPRESS_STATIC_PATH,
    LOGS_FILE_MAP[logGroupName]
  );
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
