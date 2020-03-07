'use strict';

const express = require('express');
const http = require('http');

const logger = require('./logger');

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('<h2>Hello App</h2><a href="/success">Success Logs</a>&nbsp;|&nbsp;<a href="/warning">Warning Logs</a>&nbsp;|&nbsp;<a href="/error">Error Logs</a>');
});
app.get('/success', (req, res) => {
  logger.info('Inline success logs were sent');
  res.send('<a href="/">Home</a><br /><p style="color: green">Success logs were generated</p>');
});
app.get('/warning', (req, res) => {
  logger.warn('Inline warn logs were sent');
  res.send('<a href="/">Home</a><br /><p style="color: green">Warning logs were generated</p>');
});
app.get('/error', (req, res) => {
  logger.error('Inline error logs were sent');
  res.send('<a href="/">Home</a><br /><p style="color: green">Error logs were generated</p>');
});

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`📟 REST API ready at http://localhost:${PORT}`);
});