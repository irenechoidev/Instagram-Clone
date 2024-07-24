require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const { createMetrics } = require('./metrics/createMetrics');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

const metrics = createMetrics();
app.use((req, _, next) => {
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
