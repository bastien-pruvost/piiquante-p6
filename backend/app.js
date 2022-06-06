const express = require('express');
const path = require('path');
const helmet = require('helmet');
const { logs } = require('./configs/logs.config');
const routing = require('./routes');

// Initialize express in app const
const app = express();

// Connect to database with the database config file
require('./configs/database.config');

// Set headers for all responses
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Use helmet middleware for all request (Add some recommended security headers)
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));

// Use logs for all requests
app.use(logs);

// General middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use router for '/api' route
app.use('/api', routing);

// Export the app for 'server.js' file
module.exports = app;
