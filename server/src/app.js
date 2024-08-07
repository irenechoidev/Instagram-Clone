require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { v4 } = require('uuid');
const { createMetrics } = require('./metrics/createMetrics');
const { EXPRESS_STATIC_PATH } = require('./commons/constants');
const { createLogger } = require('./utils/createLogger');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../', EXPRESS_STATIC_PATH)));
app.use(express.json());

const metrics = createMetrics();
const logger = createLogger();
app.use((req, _, next) => {
  req.id = v4();
  req.logger = logger;
  req.metrics = metrics;
  next();
});

app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));
app.use('/comment', require('./routes/comment'));
app.use('/like', require('./routes/like'));
app.use('/follow', require('./routes/follow'));
app.use('/notification', require('./routes/notification'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
