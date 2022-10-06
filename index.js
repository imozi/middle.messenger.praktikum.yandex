require('dotenv').config();
const path = require('path');
const open = require('open');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5500;
const HOST = process.env.HOST || 'localhost';
const url = `http://${process.env.HOST}:${process.env.PORT}`;

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

app.listen({ port: PORT, host: HOST }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
  open(url);
});
