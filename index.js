require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('dist'));

app.listen(
  { port: process.env.PORT || 5500, host: process.env.HOST || 'localhost' },
  () =>
    console.log(
      `🚀 Server ready at http://${process.env.HOST || 'localhost'}:${
        process.env.PORT || 3000
      }`,
    ),
);
