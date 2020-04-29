'use strict';

require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const s3Proxy = require('s3-proxy');

const logger = require('./logger');

// Constants
const PORT = process.env.PORT || 8080;

const TEMPLATES_PATH = path.join(__dirname, 'static/templates');

// App
const app = express();
app.get('/', (req, res) => {
  res.sendFile(path.join(TEMPLATES_PATH, 'index.html'));
});
app.get('/success', (req, res) => {
  logger.info('Inline success logs were sent');
  res.sendFile(path.join(TEMPLATES_PATH, 'success.html'));
});
app.get('/warning', (req, res) => {
  logger.warn('Inline warn logs were sent');
  res.sendFile(path.join(TEMPLATES_PATH, 'warning.html'));
});
app.get('/error', (req, res) => {
  logger.error('Inline error logs were sent');
  res.sendFile(path.join(TEMPLATES_PATH, 'error.html'));
});

app.get('/static/*', s3Proxy({
  bucket: process.env.S3_BUCKET,
  prefix: process.env.S3_PREFIX,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  overrideCacheControl: 'max-age=100000',
  defaultKey: 'index.html'
}));

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`📟 REST API ready at http://localhost:${PORT}`);
});