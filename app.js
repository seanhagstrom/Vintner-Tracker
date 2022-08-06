const express = require('express');
const app = express();
const client = require('./db/client');
client.connect();

app.get('/', (req, res) => {
  res.send("This is a vintner's paradise!");
});

module.exports = app;
