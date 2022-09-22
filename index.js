require('dotenv').config();
const path = require('path');
const open = require('open');
const express = require('express');

const app = express();

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen(
  { port: process.env.PORT || 5500, host: process.env.HOST || 'localhost' },
  () => {
    const url = `http://${process.env.HOST || 'localhost'}:${
      process.env.PORT || 3000
    }`;

    console.log(`🚀 Server ready at ${url}`);
    open(url);
  },
);
